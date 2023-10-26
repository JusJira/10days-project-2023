import { DarkModeToggle } from "@/components/ThemeToggle";
import SignOutButton from "@/components/signOutButton";
import { Button, buttonVariants } from "@/components/ui/button";
import React from "react";
import {
  LoginLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/lib/db";
import { Lightbulb, ShoppingBag, Wallet } from "lucide-react";
import UserProfile from "@/components/userProfile";
import { Package } from "lucide-react";
import Link from "next/link";

export default async function account() {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();
  async function checkIfNew() {
    const dbUser = await db.user.findFirst({
      where: {
        id: user.id as string,
      },
    });
    if (!dbUser) {
      // create user in db
      await db.user.create({
        data: {
          id: user.id as string,
        },
      });
    }
    return dbUser;
  }
  async function getUserData() {
    if (await !isAuthenticated()) {
      return null;
    } else {
      const data = await checkIfNew();
      return data;
    }
  }

  const dbUser = await getUserData();

  return (
    <div className="relative flex min-h-full flex-col gap-3 bg-neutral-100 p-3 dark:bg-neutral-800">
      <div className="flex h-full  min-h-full flex-row items-center justify-center gap-3 rounded-md bg-white p-3 dark:bg-neutral-900">
        <Link className="flex flex-col items-center justify-center" href={'/merchant/product'}>
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
        <Link className="flex flex-col items-center justify-center" href={'/wallet'}>
          <Button className="aspect-square h-full flex flex-col">
            <Wallet size={32} />
          </Button>
          <span>Wallet</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
