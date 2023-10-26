import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import * as z from "zod";
import { db } from "@/lib/db";

const postCreateSchema = z.object({
  price: z.coerce
    .number({
      required_error: "Amount is required",
      invalid_type_error: "Amount must be a number",
    })
    .gte(0, {
      message: "Amount must be more than zero.",
    }),
  name: z.string({
    required_error: "An account id is required.",
  }),
  description: z.string(),
  stock: z.coerce.number({
    required_error: "Amount is required",
    invalid_type_error: "Amount must be a number",
  }),
  id: z.number(),
});

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
    const id = body.id;

    const product = await db.product.update({
      where: {
        ownerId: user.id as string,
        id: id,
      },
      data: {
        ownerId: user.id as string,
        name: name,
        price: price,
        quantity: stock,
        description: description,
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
