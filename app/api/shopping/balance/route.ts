import {NextResponse} from "next/server";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/lib/db";

export async function GET() {
    const {getUser, isAuthenticated} = getKindeServerSession();

    if (await !isAuthenticated()) {
        return new Response("Unauthorized", {status: 401});
    }
    const user = await getUser();
    const dbUser = await db.user.findFirst({
        where: {
          id: user.id as string,
        },
    })
  
    if (!dbUser) {
        // create user in db
        const dbUser = await db.user.create({
          data: {
            id: user.id as string,
            email: user.email as string,
          },
        })
    }

    
    const data = {message: "Hello User", id: user.id, balance: dbUser?.balance};

    return NextResponse.json({data});
}