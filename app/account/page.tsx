import { DarkModeToggle} from "@/components/ThemeToggle";
import SignOutButton from "@/components/signOutButton";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function account() {
  const session = await getServerSession(authOptions);
  return (
    <div className="relative flex min-h-full flex-col gap-3 bg-neutral-100 p-3 dark:bg-neutral-800">
      <div className="flex h-full min-h-full items-center justify-center rounded-md bg-white p-3 dark:bg-neutral-900">
        {session ? (
          <div className="flex flex-col gap-3 items-center justify-center">
            Hi {session?.user?.name}
            <Image
              className="rounded-full"
              src={session?.user?.image as string}
              alt="Profile Image"
              width={100}
              height={100}
            />
          </div>
        ) : (
          <div className="flex flex-col">You are not Logged In</div>
        )}
      </div>
      {session ? (
        <div className="flex h-full  min-h-full flex-col items-center justify-center gap-3 rounded-md bg-white p-3 dark:bg-neutral-900">
          <div>Version {process.env.VERSION}</div>
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