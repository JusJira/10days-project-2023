import { DarkModeToggle} from "@/components/ThemeToggle";
import SignOutButton from "@/components/signOutButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import { Label } from "@/components/ui/label";
import { db } from "@/lib/db";

export default async function account() {
  const {getUser} = getKindeServerSession();
  const user = await getUser();
  console.log(user)


  const userData = await db.user.findUnique({
    where: {
      id: user.id||""
    }
  })
  console.log(userData)

  

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
      {
        (user) && (
          <div className="flex flex-col">
            {/* Profile Avatar / Name / Role */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 p-2 -m-2 mt-2 mb-2 px-3 py-2 w-full">
              <div className="inline-flex basis-32 items-center justify-center min-w-32 min-h-32 w-32 h-32 md:w-32 md:h-32 overflow-hidden bg-[#C3DCE3] rounded-full">
                {
                  (<img className='h-full !object-cover' src={userData?.image}></img>)
                }
              </div>
              <div className="flex flex-col items-center md:items-start space-y-3 md:pl-6">
                <div className="max-w-sm text-center">
                  <Label className="font-bold text-md break-words">{userData?.displayName}</Label>
                </div>
                <div className="max-w-sm">
                  <Label className="text-sm break-words">{userData?.bio}</Label>
                </div>
              </div>
            </div>
          </div>
        )
      }
      
    </div>
  );
}