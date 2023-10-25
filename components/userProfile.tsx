import { UserCircle2 } from "lucide-react";
import React from "react";
import Image from "next/image";
import { db } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function UserProfile() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div className="flex h-full min-h-full items-center justify-center rounded-md bg-white p-3 dark:bg-neutral-900">
      {user ? (
        <div className="flex flex-col gap-3 items-center justify-center">
          Hi {user.given_name}
          {user.picture ? (
            <Image
              className="rounded-xl"
              src={user.picture as string}
              alt="Profile Image"
              width={100}
              height={100}
            />
          ) : (
            <div className="bg-blue-300 p-1 rounded-xl">
              <UserCircle2 size={100} />
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col">You are not Logged In</div>
      )}
    </div>
  );
}
