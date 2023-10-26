import { buttonVariants } from "@/components/ui/button";
import { db } from "@/lib/db";
import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import Image from "next/image";

async function page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const products = await db.product.findMany({
    where: {
      ownerId: user.id as string,
    },
  });
  return (
    <div className="relative flex min-h-full flex-col gap-3 bg-neutral-100 p-3 dark:bg-neutral-800">
      <div className="flex h-full  min-h-full flex-col items-center justify-center gap-3 rounded-md bg-white p-3 dark:bg-neutral-900">
        {products.map((p, index) => (
          <div
            key={index}
            className="w-full dark:bg-neutral-600 bg-neutral-100 rounded-md grid grid-cols-1 md:grid-cols-3 min-h-[24rem]"
          >
            <div className="flex items-center justify-center p-3">
              <Image
                src={p.image}
                alt="Product Image"
                width={300}
                height={300}
              />
            </div>
            <div className="p-4 flex flex-col gap-3 col-span-2">
              <span className="text-4xl font-bold">{p.name}</span>
              <div className="flex gap-3">
                <span className="text-xl font-bold">Price: {p.price}</span>
                <span className="text-xl font-bold">Stock: {p.quantity}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl">Description:</span>
                <span className="text-lg">{p.description?.substring(0, 250)}</span>
              </div>
              <Link className={`${buttonVariants({ variant: "outline" })} w-fit bottom-0 mt-auto`} href={`/merchant/product/edit/${p.id}`}>Edit</Link>
            </div>
          </div>
        ))}
        <Link href={'/merchant/product/add'} className={`${buttonVariants()} w-fit bottom-0 mt-auto`}>Add Product</Link>
      </div>
    </div>
  );
}

export default page;
