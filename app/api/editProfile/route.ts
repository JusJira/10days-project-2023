import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";




export async function PUT(req : NextRequest) {
    const {id,displayName , bio} = await req.json();

    const res = await db.user.update({where : {id : id} , data : {displayName : displayName , bio : bio}});

    return NextResponse.json({status : 200 , message : res});

    
}