import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import * as z from "zod";
import { db } from "@/lib/db";

const postCreateSchema = z.object({
  id: z.number()
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

    const prodId = body.id;
    const productOwner = await db.product.findFirst({
        where: {
            id: prodId
        },
        select: {
            ownerId: true
        }
    })

    if (productOwner?.ownerId != user.id) {
        return new Response("Unauthorized", { status: 403 });
    }

    const product = await db.product.findFirst({
      where: {
        ownerId: user.id as string,
        id: prodId
      },
      select: {
        price: true,
        description: true,
        name: true,
        quantity: true,
        image: true
      }
    });

    return new Response(JSON.stringify(product));

  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
