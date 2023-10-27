import ProductBox from "@/components/productBox";
import { db } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";
import pluralize from "pluralize";

export default async function Page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const wished = await db.user.findUnique({
    where: {
      id: user.id as string,
    },
    select: {
      wishlists: {
        select: {
          product: {
            select: {
              id: true,
              price: true,
              image: true,
              name: true,
            },
          },
        },
      },
    },
  });
  
  return (
    <div className="relative flex min-h-full flex-col gap-3 bg-neutral-100 p-3 dark:bg-neutral-800">
      <div>
        <p>
          There are {pluralize("product", wished?.wishlists.length, true)} is
          your wishlist
        </p>
      </div>
      <div className="grid-container">
        {wished?.wishlists.map((p, index) => (
          <ProductBox
            key={index}
            name={p.product.name}
            id={p.product.id}
            image={p.product.image}
            price={p.product.price}
          />
        ))}
      </div>
    </div>
  );
}
