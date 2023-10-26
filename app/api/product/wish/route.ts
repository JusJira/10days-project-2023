import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import * as z from "zod";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { getUser, isAuthenticated } = getKindeServerSession();
    const user = await getUser();

    if (await !isAuthenticated()) {
      return new Response("Unauthorized", { status: 403 });
    }

    const json = await req.json();

    await db.wishlist.create({
      data: {
        productId: json.productId,
        userId: user.id as string
      },
    });

    return new Response(JSON.stringify({}));

  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }
    console.log(error)
    return new Response(null, { status: 500 });
  }
}

export async function DELETE(req: Request) {
    try {
      const { getUser, isAuthenticated } = getKindeServerSession();
      const user = await getUser();
  
      if (await !isAuthenticated()) {
        return new Response("Unauthorized", { status: 403 });
      }
  
      const json = await req.json();

      await db.wishlist.delete({
        where: {
          userId_productId: {
            userId: user.id as string,
            productId: json.productId
          }
        },
      });
  
      return new Response(JSON.stringify({}));
    } catch (error) {
      console.log(error)
      return new Response(null, { status: 500 });
    }
  }