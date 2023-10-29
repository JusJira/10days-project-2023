import { db } from "@/lib/db";
import { getDbUser } from "@/lib/getUser";
import { NextRequest, NextResponse } from "next/server";
/*
call by METHOD /api/review

edit user review

tested by postman
*/
export async function PUT(req : NextRequest){
    const {productId,score,description} = await req.json(); // product , score ,description
    const user = await getDbUser();
    if (!user) return new Response("session failure",{status : 403})
    const review = await db.review.findFirst({where : {
        productId : productId,
        userId : user.id
    }})
    if (!review) return new Response("cannot update because you didn't buy it",{status : 204})
    try {
        const res = await db.review.update({where : {
            id : review.id
        }, data : {
            score : score,
            description : description,
        }
    })
        return NextResponse.json({status : 200, message : res});

    } catch (error) {
        return new Response("cannot updated",{status : 403})
    }
}

/*
prototype get 

*/

export async function GET(){
    // need to pass user id to show user reviews
    
    try {
        const user = await getDbUser();
        if (!user) return NextResponse.json({status : 204, message : "you didn't login"})
        const id = user.id;
        const res = await db.review.findMany({where : {userId : id}});
        return NextResponse.json({status : 200,message :res});       
    } catch (error) {
        return  new Response("session not avaliable",{status : 403})
    }
}   



/*
creating a review 
*/
export async function POST(req : NextRequest) {
    
    const dbUser = await getDbUser();
    if (!dbUser) return NextResponse.json({status : 401, message : "session failure"});
    
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
    if (!my_order) return new Response("You didn't buy this item yet",{status : 403})
    
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
        return new Response("This review already avaliable",{status : 403})
    }


}

/*
delete all
*/

export async function DELETE(req : NextRequest){
    
    const dbUser = await getDbUser();
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