import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic' 

export async function GET(req : NextRequest){

    try {
        const url = new URL(req.url)

        const search = url.searchParams.get("q") || ""
      
        const res = await db.product.findMany({
            select: {
              name: true,
              id: true,
              price: true,
              image: true,
            },
            where: {
              name: {
                contains: (search != "null") ? search : "",   // idk why but null is string lol
                mode: 'insensitive'
              }
            }
          });
          console.log(res)
        return NextResponse.json({status : 200,message : res});       
    } catch (error) {
        return NextResponse.json({status : 204,message : error })
    }
}   