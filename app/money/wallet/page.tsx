import { DarkModeToggle } from "@/components/ThemeToggle";
import SignOutButton from "@/components/signOutButton";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import {
  LoginLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { Label } from "@/components/ui/label";
import { db } from "@/lib/db";
import { Lightbulb, UserCircle2 } from "lucide-react";
import UserProfile from "@/components/userProfile";

export default async function account() {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();
  const dbUser = await db.user.findFirst({
    where: {
      id: user.id as string,
    },
  });

  return (
    <div className="relative flex min-h-full flex-col gap-3 bg-neutral-100 p-3 dark:bg-neutral-800">
      <UserProfile/>
        <div className="flex h-full  min-h-full flex-col items-center justify-center gap-3 rounded-md bg-white p-3 dark:bg-neutral-900">
          <div className="flex w-full justify-center flex-col items-center gap-3">
            <div className="flex h-10 w-2/3 flex-row items-center justify-center rounded-md border-[1px] border-black bg-white px-2 shadow-2xl dark:bg-black lg:w-48">
              <span className="flex flex-row items-center justify-center">
                Account ID: {dbUser?.accountId}
              </span>
            </div>
            <div className="flex h-10 w-2/3 flex-row items-center justify-center rounded-md border-[1px] border-black bg-white px-2 shadow-2xl dark:bg-black lg:w-48">
              <span className="flex flex-row items-center justify-center">
                Balance: {dbUser?.balance}{" "}
                <Lightbulb size={24} strokeWidth={2} />
              </span>
            </div>
            <div className="flex h-10 w-2/3 flex-row items-center justify-center rounded-md border-[1px] border-black bg-white shadow-2xl dark:bg-black lg:w-48">
              <Link className={`w-full text-center !p-0`} href={'/money/pay'}>Pay</Link>
            </div>
          </div>
        </div>
    </div>
  );
}
