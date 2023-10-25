import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import * as z from "zod";
import { db } from "@/lib/db";
import { productSchema } from "@/utils/zod";

const postCreateSchema = productSchema

export async function POST(req: Request) {
  try {
    const { getUser, isAuthenticated } = getKindeServerSession();
    const user = await getUser();

    if (await !isAuthenticated()) {
      return new Response("Unauthorized", { status: 403 });
    }

    const json = await req.json();
    const id = json.id;

    const product = await db.product.delete({
      where: {
        ownerId: user.id as string,
        id: id,
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
