import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest) {
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

        // const payRes = await fetch(`https://paotooong.thinc.in.th/v1/wallet/pay/${process.env.COMPANT_PAOTOOONG_ID}`, {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //       "Authorization" : `Bearer ${loginJson.token.accesstoken}`
        //     },
        //     body: JSON.stringify({
        //         amount: data.amount
        //     }),
        // });

        return NextResponse.json({status : 200 , message : loginJson});
    }
    catch (err) {
        return NextResponse.json({status : 402 , message : "error occured"});
    }
    

    

    

    // if (!dbUser) return NextResponse.json({status : 403, message : "session failure"});
    // // const {displayName , bio, image} = await req.json();
    // // console.log(await req.json())
    // const res = await db.user.update({where : {id : dbUser.id} , data : await req.json()});

    // return NextResponse.json({status : 200 , message : res});

    
}