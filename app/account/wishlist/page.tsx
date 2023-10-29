import ProductBox from "@/components/productBox";
import { db } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";
import pluralize from "pluralize";
import { Heart } from "lucide-react";
import { Separator } from "@/components/ui/separator";

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
      <div className="px-5 flex flex-row space-x-3">
        <Heart className="content-center" size={25}></Heart>
        <h3 className="text-lg font-medium">Wishlist</h3>
      </div>
      <Separator />
      <div>
        <p>
          There are {pluralize("product", wished?.wishlists.length, true)} in
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
