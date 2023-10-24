import { DarkModeToggle} from "@/components/ThemeToggle";
import SignOutButton from "@/components/signOutButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";

export default async function account() {
  const {getUser} = getKindeServerSession();
  const user = await getUser();
  return (
    <div className="relative flex min-h-full flex-col gap-3 bg-neutral-100 p-3 dark:bg-neutral-800">
      <div className="flex h-full min-h-full items-center justify-center rounded-md bg-white p-3 dark:bg-neutral-900">
        {user ? (
          <div className="flex flex-col gap-3 items-center justify-center">
            Hi {user.given_name}
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