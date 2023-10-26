import { Button } from "@/components/ui/button";
import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/lib/db";
import { ShoppingBag, Wallet } from "lucide-react";
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
        <div className="flex flex-col items-center justify-center">
          <Button className="aspect-square h-full flex flex-col">
            <ShoppingBag size={32} />
          </Button>
          <span>Orders</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Link
            className="flex flex-col items-center justify-center"
            href={"/wallet"}
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
