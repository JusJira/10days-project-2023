import { faker } from "@faker-js/faker";
import { db } from "@/lib/db";
import { getDbUser } from "@/lib/getUser";
import { NextRequest, NextResponse } from "next/server";
// or, if desiring a different locale
// import { fakerDE as faker } from '@faker-js/faker';

export const dynamic = "force-dynamic";

export async function GET() {
  const dbUser = await getDbUser();
  if (!dbUser) return new Response("User isn't authorize", { status: 401 });

  const id = dbUser.id;
  const name = faker.commerce.product();
  const description = faker.commerce.productDescription();
  const price = faker.commerce.price({ dec: 0 });
  const stock = faker.number.int({ min: 1, max: 99999 });

  try {
    const image = await fetch("https://source.unsplash.com/random");
    const res = await db.product.create({
      data: {
        ownerId: id,
        name: name,
        description: description,
        price: parseInt(price),
        quantity: stock,
        image: image.url,
      },
    });
    return NextResponse.json({ status: 200, message: res });
  } catch (error) {
    return NextResponse.json({ status: 204, message: error });
  }
}
