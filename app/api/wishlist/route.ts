import { db } from "@/lib/db";
import { getDbUser } from "@/lib/getUser";
import { NextRequest, NextResponse } from "next/server";


/*
for showing wishlist to user
*/

export async function GET(){
    
    const dbUser = await getDbUser();
    if (!dbUser) return NextResponse.json({status : 204 , message : "session failure"})
    const userId = dbUser.id;
    try {
        const res = await db.wishlist.findMany({where : {userId : userId}});
        return NextResponse.json({status : 200,message :res});       
    } catch (error) {
        return NextResponse.json({status : 204,message : error });
    }
}

/*
create user wishlist
required productId
*/

export async function POST(req : NextRequest){
    const dbUser = await getDbUser();
    if (!dbUser) return NextResponse.json({status : 204 , message : "session failure"})
    const {productId}= await req.json();
    const userId = dbUser.id;
    
    try {
        const res = await db.wishlist.create({data : {
            userId : userId,
            productId : productId,
        }});
        return NextResponse.json({status : 200,message :res});       
    } catch (error) {
        return NextResponse.json({status : 204,message : error });
    }
}   

/*
delete user wishlist
*/

export async function DELETE(req : NextRequest){
    const dbUser = await getDbUser();
    if (!dbUser) return NextResponse.json({status : 204 , message : "session failure"})
    const userId = dbUser.id;
    const {productId} = await req.json();
    try {
        const res = await db.wishlist.deleteMany({where : {userId : userId, productId : productId}});
        return NextResponse.json({status : 200,message :res});    
    } catch (error) {
        return NextResponse.json({status : 204,message : error });
    }
}