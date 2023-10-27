import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic' 

export async function GET(req : NextRequest){

    try {
        const url = new URL(req.url)
        const args =  new URLSearchParams(url.search);
        // console.log("---------")
        // console.log(args)
        
        const search = args.get("q") || ""
        const startPrice = args.get("startprice") || undefined
        const endPrice = args.get("endprice") || undefined
        const sortMode = args.get("sort") || ""

        let priceQuery = {}
        if (startPrice && endPrice) {
          priceQuery = {
              gte : (startPrice) ? Number(startPrice) : 0,
              lte : (endPrice) ? Number(endPrice) : 9999999,
          }
        }
        else if (startPrice && !endPrice) {
          priceQuery = {
              gte : (startPrice) ? Number(startPrice) : 0,
          }
        }
        else if (!startPrice && endPrice) {
          priceQuery = {
              lte : (endPrice) ? Number(endPrice) : 9999999,
          }
        }
        else {
          priceQuery = {
              gte : (startPrice) ? Number(startPrice) : 0,
          }
        }

        
        let orderQuery = {}
        if (sortMode == "nameasc") {
          orderQuery = {
            name: 'asc',
          }
        }
        else if (sortMode == "namedes") {
          orderQuery = {
            name: 'desc',
          }
        }
        else if (sortMode == "priceasc") {
          orderQuery = {
            price: 'asc',
          }
        }
        else if (sortMode == "pricedes") {
          orderQuery = {
            price: 'desc',
          }
        }
      
        const res = await db.product.findMany({
            select: {
              name: true,
              id: true,
              price: true,
              image: true,
            },
            where: {
              name: {
                contains: (search !== "null") ? search : "",   // idk why but null is string lol
                mode: 'insensitive'
              },
              price: priceQuery
            },
            orderBy: [ orderQuery ]
          });
        return NextResponse.json({status : 200,message : res});       
    } catch (error) {
        return NextResponse.json({status : 204,message : error })
    }
}   