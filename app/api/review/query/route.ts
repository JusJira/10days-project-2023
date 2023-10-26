import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

/*
call by METHOD /api/review/query
create query data
*/
export async function POST(req : NextRequest){
    // need to pass user id to show user reviews
    const {id }= await req.json();
    try {
        
        console.log(id)
        const res = await db.review.findMany({where : {userId : id}});
        return NextResponse.json({status : 200,message :res});       
    } catch (error) {
        return NextResponse.json({status : 204,message : error })
    }
}   


