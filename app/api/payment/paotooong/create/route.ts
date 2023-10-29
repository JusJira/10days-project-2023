import { db } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    const data = await req.json()

    try {
        // console.log(JSON.stringify(user))
        const registerRes = await fetch("https://paotooong.thinc.in.th/v1/auth/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password,
                firstName: (user.given_name) ? ((user.given_name.length > 0) ? user.given_name : "A") : "A",
                familyName: (user.family_name) ? ((user.family_name.length > 0) ? user.family_name : "B") : "B"
            }),
        });
        

        const registerJson = await registerRes.json()

        if (registerJson.code) {
            // return NextResponse.json({status : 400 , message : "This email has already used"});
            return NextResponse.json({status : 400 , message : "This email has already been used"});
        }

        
        return NextResponse.json({status : 200 , message : registerJson});
    }
    catch (err) {
        console.log(err)
        return NextResponse.json({status : 400 , message : "Error occured"});
    }
    

    

    

    // if (!dbUser) return NextResponse.json({status : 403, message : "session failure"});
    // // const {displayName , bio, image} = await req.json();
    // // console.log(await req.json())
    // const res = await db.user.update({where : {id : dbUser.id} , data : await req.json()});

    // return NextResponse.json({status : 200 , message : res});

    
}