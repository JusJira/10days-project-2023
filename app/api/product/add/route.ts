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
    const body = postCreateSchema.parse(json);

    const price = body.price;
    const name = body.name;
    const stock = body.stock;
    const description = body.description;
    const image = body.image;

    const product = await db.product.create({
      data: {
        ownerId: user.id as string,
        name: name,
        price: price,
        quantity: stock,
        description: description,
        image: image
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
