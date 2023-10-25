import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


/*
create user wishlist
*/

export async function POST(req : NextRequest){
    // need to pass user id to show user reviews
    const {userId,productId}= await req.json();
    try {
        const res = await db.wishlist.create({data : {
            userId : userId,
            productId : productId,
        }});
        return NextResponse.json({status : 200,message :res});       
    } catch (error) {
        return NextResponse.json({status : 204,message : error })
    }
}   