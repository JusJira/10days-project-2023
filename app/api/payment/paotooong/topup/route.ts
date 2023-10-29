// import { db } from "@/lib/db";
// import { getdbUser } from "@/lib/getUser";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req : NextRequest) {
    
//     const data = await req.json()

//     if (!dbUser) return NextResponse.json({status : 403, message : "session failure"});
//     // const {displayName , bio, image} = await req.json();
//     // console.log(await req.json())
//     const res = await db.user.update({where : {id : dbUser.id} , data : await req.json()});

//     return NextResponse.json({status : 200 , message : res});

    
// }