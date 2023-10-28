import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic' 

export async function GET(request: NextRequest, { params }: any) {
    const query = params.id

    try {
        const res = await db.user.findUnique({
            where: {
                id: query
            },
        });
        return NextResponse.json({status : 200,message : res});   
    }
    catch (error) {
        return NextResponse.json({status : 204,message : error })
    }
}