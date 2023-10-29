import { db } from "@/lib/db";
import { getdbUser } from "@/lib/getUser";
import { NextRequest, NextResponse } from "next/server";


// Create transaction history
export async function POST(req : NextRequest) {

    const res = await db.transaction.createMany({ data : await req.json() });

    return NextResponse.json({status : 200 , message : res});

    
}