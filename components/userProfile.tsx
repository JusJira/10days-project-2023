import React from "react";
import Image from "next/image";
import { db } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function UserProfile() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const dbUser = await db.user.findUnique({
    where: {
      id: user.id as string
    }
  })

  return (
    <div className="flex h-full min-h-full items-center justify-center rounded-md bg-white p-3 dark:bg-neutral-900">
      {user ? (
        <div className="flex flex-col gap-3 items-center justify-center">
          Hi {dbUser?.displayName}
            <Image
              className="rounded-full aspect-square"
              src={dbUser?.image as string}
              alt="Profile Image"
              width={100}
              height={100}
            />
        </div>
      ) : (
        <div className="flex flex-col">You are not Logged In</div>
      )}
    </div>
  );
}
