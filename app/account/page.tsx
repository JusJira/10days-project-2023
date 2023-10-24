import { DarkModeToggle } from "@/components/ThemeToggle";
import SignOutButton from "@/components/signOutButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Label } from "@/components/ui/label";
import { db } from "@/lib/db";
import { Lightbulb } from "lucide-react";

export default async function account() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const dbUser = await db.user.findFirst({
    where: {
      id: user.id as string,
    },
})

if (!dbUser) {
    // create user in db
    await db.user.create({
      data: {
        id: user.id as string,
        email: user.email as string,
      },
    })
}
  return (
    <div className="relative flex min-h-full flex-col gap-3 bg-neutral-100 p-3 dark:bg-neutral-800">
      <div className="flex h-full min-h-full items-center justify-center rounded-md bg-white p-3 dark:bg-neutral-900">
        {user ? (
          <div className="flex flex-col gap-3 items-center justify-center">
            Hi {user.given_name}
            <Image
              className="rounded-xl"
              src={user.picture as string}
              alt="Profile Image"
              width={100}
              height={100}
            />
          </div>
        ) : (
          <div className="flex flex-col">You are not Logged In</div>
        )}
      </div>
      {user ? (
        <div className="flex h-full  min-h-full flex-col items-center justify-center gap-3 rounded-md bg-white p-3 dark:bg-neutral-900">
          <div className="flex w-full justify-center">
            <DarkModeToggle />
          </div>
          <div className="flex w-full justify-center">
            <SignOutButton />
          </div>
          <div className="flex w-full justify-center">
            <div className="flex h-10 w-2/3 flex-row items-center justify-center rounded-md border-[1px] border-black bg-white px-2 shadow-2xl dark:bg-black lg:w-48">
              <span className="flex flex-row items-center justify-center">Balance: {dbUser?.balance?.toFixed(2)} <Lightbulb size={24} strokeWidth={2} /></span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-full min-h-full items-center justify-center rounded-md bg-white p-3 dark:bg-neutral-900">
          <Button asChild className="w-2/3 lg:w-48">
            <Link href="/login">Login</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
