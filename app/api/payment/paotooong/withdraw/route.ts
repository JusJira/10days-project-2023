import { db } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    const data = await req.json()

    try {

        // Check if amount is enough to withdraw
        const userData = await db.user.findFirst({
            where: {
                id: user.id || "",
            },
        });
        if (!userData) {
            return NextResponse.json({status : 400 , message : "Look like you are disappeard"});
        }

        if (data.amount > userData.balance) {
            return NextResponse.json({status : 400 , message : "Your amount is more than your balance in wallet"});
        }

        const userPTRes = await fetch("https://paotooong.thinc.in.th/v1/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password
            }),
        });
        

        const userPTJson = await userPTRes.json()

        // console.log(loginJson)

        // Not found paotooong
        if (userPTJson.code) {
            return NextResponse.json({status : 400 , message : "Email or password is not correct"})
        }

        const receiverDataRes = await fetch(`https://paotooong.thinc.in.th/v1/auth/me`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization" : `Bearer ${userPTJson.token.accessToken}`
            },
        });

        const receiverDataJson = await receiverDataRes.json()

        // Cannot get code hehehe
        if (receiverDataJson.code) {
            return NextResponse.json({status : 400 , message : "Paotooong don't want you to get your balance"})
        }

        const companyRes = await fetch("https://paotooong.thinc.in.th/v1/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: process.env.COMPANY_PAOTOOONG_EMAIL,
                password: process.env.COMPANY_PAOTOOONG_PASSWORD
            }),
        });

        const companyJson = await companyRes.json()

        // Company cannot login, sussy!
        if (companyJson.code) {
            return NextResponse.json({status : 400 , 
                message : "Contact platform owner if you see this error, it is sussy!"})
        }

        const payRes = await fetch(`https://paotooong.thinc.in.th/v1/wallet/pay/${receiverDataJson.user.id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization" : `Bearer ${companyJson.token.accessToken}`
            },
            body: JSON.stringify({
                amount: data.amount
            }),
        });

        const payJson = await payRes.json()

        console.log(payJson)

        const dbRes = await db.user.update({
            where: {
                id: user.id || ""
            },
            data: {
                balance: {
                    decrement: data.amount
                }
            }
        })

        const transRes = await db.transaction.create({
            data: {
                userId: user.id || "",
                amount: -data.amount,
                description: "Withdraw money to Paotooong"
            }
        })

        return NextResponse.json({status : 200 , message : dbRes});

        // const payJson = await payRes.json()

        // console.log(payJson)

        // if (payJson.code) {
        //     return NextResponse.json({status : 400 , message : "No enough money in Paotooong"})
        // }

        // const dbRes = await db.user.update({
        //     where: {
        //         id: user.id || ""
        //     },
        //     data: {
        //         balance: {
        //             increment: data.amount
        //         }
        //     }
        // })

        

        // return NextResponse.json({status : 200 , message : dbRes});
    }
    catch (err) {
        return NextResponse.json({status : 400 , message : "Error occured"});
    }
    

    

    

    // if (!dbUser) return NextResponse.json({status : 403, message : "session failure"});
    // // const {displayName , bio, image} = await req.json();
    // // console.log(await req.json())
    // const res = await db.user.update({where : {id : dbUser.id} , data : await req.json()});

    // return NextResponse.json({status : 200 , message : res});

    
}