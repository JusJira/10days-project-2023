import { DarkModeToggle } from "@/components/ThemeToggle";
import SignOutButton from "@/components/signOutButton";
import { Button, buttonVariants } from "@/components/ui/button";
import React from "react";
import {
  LoginLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/lib/db";
import { Lightbulb } from "lucide-react";
import UserProfile from "@/components/userProfile";
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
      <UserProfile />
      {user ? (
        <div className="flex h-full  min-h-full flex-col items-center justify-center gap-3 rounded-md bg-white p-3 dark:bg-neutral-900">
          <div className="flex w-full justify-center">
            <DarkModeToggle />
          </div>
          <div className="flex w-full justify-center">
            <div className="flex h-10 w-2/3 flex-row items-center justify-center rounded-md border-[1px] border-black bg-white px-2 dark:bg-black lg:w-48">
              <span className="flex flex-row items-center justify-center">
                Balance: {dbUser?.balance}{" "}
                <Lightbulb size={24} strokeWidth={2} />
              </span>
            </div>
          </div>
              <Link className={`${buttonVariants({ variant: "outline" })} w-2/3 lg:w-48 !border-black`} href='/merchant'>Merchant Page</Link>
          <div className="flex w-full justify-center">
            <SignOutButton />
          </div>
        </div>
      ) : (
        <div className="flex h-full min-h-full items-center justify-center rounded-md bg-white p-3 dark:bg-neutral-900">
          <Button asChild className="w-2/3 lg:w-48">
            <LoginLink className={buttonVariants()}>Sign in</LoginLink>
          </Button>
        </div>
      )}
    </div>
  );
}
