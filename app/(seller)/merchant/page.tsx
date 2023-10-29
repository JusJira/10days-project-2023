import { Button } from "@/components/ui/button";
import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/lib/db";
import { ShoppingBag, Store, Wallet } from "lucide-react";
import { Package } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default async function account() {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();
  const products = await db.product.count({
    where: {
      ownerId: user.id as string,
    },
  });
  const wished = await db.wishlist.count({
    where: {
      product: {
        ownerId: user.id as string,
      },
    },
  });

  return (
    <div className="relative flex min-h-full flex-col gap-3 bg-neutral-100 p-3 dark:bg-neutral-800">
      <div className="px-5 flex flex-row space-x-3">
        <Store className="content-center" size={25}></Store>
        <h3 className="text-lg font-medium">Merchant</h3>
      </div>
      <Separator />
      <div className="flex h-full  min-h-full flex-row items-center justify-center gap-3 rounded-md bg-white p-3 dark:bg-neutral-900">
        <Link
          className="flex flex-col items-center justify-center"
          href={"/merchant/product"}
        >
          <Button className="aspect-square h-full flex flex-col">
            <Package size={32} />
          </Button>
          <span>Products</span>
        </Link>
        <Link
          className="flex flex-col items-center justify-center"
          href={"/account/order"}
        >
          <Button className="aspect-square h-full flex flex-col">
          <ShoppingBag size={32}/>
          </Button>
          <span>Order</span>
        </Link>
        <div className="flex flex-col items-center justify-center">
          <Link
            className="flex flex-col items-center justify-center"
            href={"/money/wallet"}
          >
            <Button className="aspect-square h-full flex flex-col">
              <Wallet size={32} />
            </Button>
            <span>Wallet</span>
          </Link>
        </div>
      </div>
      <div className="flex h-full  min-h-full flex-row items-center justify-center gap-3 rounded-md bg-white p-3 dark:bg-neutral-900">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Your Products</CardTitle>
            <CardDescription>Summary of your products</CardDescription>
          </CardHeader>
          <CardContent>
            <Label htmlFor="name">Total Number of Product</Label>
            <p>{products}</p>
            <Label htmlFor="name">Added to Wishlist</Label>
            <p>{wished}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
