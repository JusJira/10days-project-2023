import { db } from "@/lib/db";
import { getdbUser } from "@/lib/getUser";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req : NextRequest) {
    const dbUser = await getdbUser();
    if (!dbUser) return NextResponse.json({status : 204, message : "session failure"});
    const {displayName , bio} = await req.json();
    const res = await db.user.update({where : {id : dbUser.id} , data : {displayName : displayName , bio : bio}});

    return NextResponse.json({status : 200 , message : res});

    
}