import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import * as z from "zod";
import { db } from "@/lib/db";
import { productSchema } from "@/utils/zod";

const postCreateSchema = productSchema;

export async function GET(req: Request) {
  try {
    const { getUser, isAuthenticated } = getKindeServerSession();
    const user = await getUser();

    if (await !isAuthenticated()) {
      return new Response("Unauthorized", { status: 401 });
    }

    const productsCount = await db.product.count();
    const skip = Math.floor(Math.random() * productsCount);
    const product = await db.product.findMany({
      where: {
        ownerId: {
          not: user.id as string,
        },
      },
      take: 1,
      skip: skip,
      select: {
        id: true,
      },
    });

    return new Response(JSON.stringify(product));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
