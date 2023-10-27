import { db } from "@/lib/db";
import { getdbUser } from "@/lib/getUser";
import { NextRequest, NextResponse } from "next/server";
/*
call by METHOD /api/review

edit user review

tested by postman
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
prototype get 

*/

export async function GET(){
    // need to pass user id to show user reviews
    
    try {
        const user = await getdbUser();
        if (!user) return NextResponse.json({status : 204, message : "you didn't login"})
        const id = user.id;
        const res = await db.review.findMany({where : {userId : id}});
        return NextResponse.json({status : 200,message :res});       
    } catch (error) {
        return NextResponse.json({status : 204,message : error })
    }
}   



/*
creating a review 
*/
export async function POST(req : NextRequest) {
    
    const dbUser = await getdbUser();
    if (!dbUser) return NextResponse.json({status : 204, message : "session failure"});
    
    const userId = dbUser.id;
    
    const {productId, score , description} = await req.json();

    const my_order = await db.order.findFirst({where : {
        userId : userId,
        orderLines : {
            some : {
                productId : productId
            }
        }
    }})
    if (!my_order) return NextResponse.json({status : 204 , message : "you didn't buy this yet"})
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

/*
delete all
*/

export async function DELETE(req : NextRequest){
    
    const dbUser = await getdbUser();
    if (!dbUser) return NextResponse.json({status : 204 , message : "session failure"})
    
    const userId = dbUser.id;
    const {productId} = await req.json();
    try {
        const res = await db.review.deleteMany({where : {userId : userId, productId : productId}});
        return NextResponse.json({status : 200,message :res});    
    } catch (error) {
        return NextResponse.json({status : 204,message : error });
    }
}