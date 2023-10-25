import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
/*
call by METHOD /api/review

edit user review
*/
export async function PUT(req : NextRequest){
    const {id,score,description} = await req.json(); // reviewId, score ,description
    try {
        const res = await db.review.update({where : {
            id : id
        }, data : {
            score : score,
            description : description,
        }
    })
        return NextResponse.json({status : 200, message : res});

    } catch (error) {
        return NextResponse.json({status : 204, message : error});
    }
}


/*
creating a review 
*/
export async function POST(req : NextRequest) {
    const {userId, productId, score , description} = await req.json();
    const validation = await db.user.findFirst({where : {id : userId}})
    if (!validation) return NextResponse.json({status : 204, message : "this user doesn't exist"})
    try {
        const res = await db.review.create({
            data : {
                userId : userId,
                productId : productId,
                score : score,
                description : description
            }
        });
        return NextResponse.json({status : 200, message : res });
    } catch (error) {
        return NextResponse.json({status : 204, message : error});
    }


}