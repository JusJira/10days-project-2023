import { db } from "@/lib/db";
import { getdbUser } from "@/lib/getUser";
import { OrderLine, Product, User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

type Item = {
    id : number,
    quantity : number,
    totalPrice : number 
};


export async function POST(req : NextRequest){
    const dbUser = await getdbUser();
    if (!dbUser) return new Response("User isn't authorize",{status : 204});
    const current_money = dbUser.balance;
    const {finalOrders,totalPrice} : {finalOrders : Array<Item> , totalPrice : number} = await req.json();
    if (totalPrice > current_money) return new Response("ํYou don't have enough money",{status : 204});

    


    //create Transaction
    const main_trans = await db.order.create({data : {
        userId : dbUser.id,
        totalPrice : totalPrice
    }});


    let transaction : OrderLine[] = finalOrders.map((e : Item) => 
        {   return {
            orderId : main_trans.id,
            productId : e.id,
            quantity : e.quantity,
            totalPrice : e.totalPrice,
            }
        }
    );

    const order_line = await db.orderLine.createMany({data : transaction});

    //decrease Product item
    
    let product_line : Promise<Product>[] =  (transaction.map(
        async (e) => {
            const res : Product = await db.product.update({
                where : {
                    id : e.productId
                },
                data : {
                    quantity : {decrement : e.quantity as number}
                }

            })
            return res
        }
    ));
    
    //add money to seller
    let merchant_updater : User[] = [];
    for (let i = 0; i < transaction.length; ++i){
        const merchant : User = await db.user.update({
            where : {
                id : (await product_line[i]).ownerId
            }, data : {
                balance : {
                    increment : transaction[i].totalPrice as number
                }
            }
        }
        );
        merchant_updater.push(merchant);
    }
    //subsidize money
    const user = await db.user.update({
        where : {
            id : dbUser.id
        } ,
        data : {
            balance : {
                decrement : totalPrice
            }
        }
    })

    // Create transaction history
    const transactionHistory: Array<{userId: string, amount: number, description: string}> = []
    transactionHistory.push({
        userId: dbUser.id,
        amount: -totalPrice,
        description: `Payment for order #${main_trans.id}`
    })
    for (let i = 0; i < transaction.length; ++i) {
        transactionHistory.push({
            userId: (await product_line[i]).ownerId,
            amount: transaction[i].totalPrice,
            description: `Receive money from order #${main_trans.id}`
        })
    }

    const res = await db.transaction.createMany({ data : transactionHistory });

    return NextResponse.json({status : 200,message : merchant_updater});


};