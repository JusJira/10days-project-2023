import { db } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    const data = await req.json()

    try {
        const loginRes = await fetch("https://paotooong.thinc.in.th/v1/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password
            }),
        });
        

        const loginJson = await loginRes.json()

        console.log(loginJson)

        if (loginJson.code) {
            return NextResponse.json({status : 400 , message : "Email or password is not correct"})
        }

        const payRes = await fetch(`https://paotooong.thinc.in.th/v1/wallet/pay/${process.env.COMPANT_PAOTOOONG_ID}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization" : `Bearer ${loginJson.token.accessToken}`
            },
            body: JSON.stringify({
                amount: data.amount
            }),
        });

        const payJson = await payRes.json()

        console.log(payJson)

        if (payJson.code) {
            return NextResponse.json({status : 400 , message : "No enough money in Paotooong"})
        }

        const dbRes = await db.user.update({
            where: {
                id: user.id || ""
            },
            data: {
                balance: {
                    increment: data.amount
                }
            }
        })

        const transRes = await db.transaction.create({
            data: {
                userId: user.id || "",
                amount: data.amount,
                description: "Top up money from Paotooong"
            }
        })
        

        return NextResponse.json({status : 200 , message : dbRes});
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