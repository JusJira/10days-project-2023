import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic' 

export async function GET(request: NextRequest, { params }: any) {
    const query = params.str

    const queryArray = query.split("_").map(Number);

    console.log(queryArray)

    try {
        const res = await db.product.findMany({
            select: {
                name: true,
                id: true,
                price: true,
                quantity: true
            },
            where: {
                id: {
                    in: queryArray
                }
            },
        });
        return NextResponse.json({status : 200,message : res});   
    }
    catch (error) {
        return NextResponse.json({status : 204,message : error })
    }
}