import { Separator } from "@/components/ui/separator";
import React from "react";
import { ProfileForm } from "./ProfileForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/lib/db";

export default async function EditAccount() {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();
  // console.log(user)

  const userData = await db.user.findUnique({
    where: {
      id: user?.id||""
    }
  })

  return (
    <div className="relative flex min-h-full flex-col gap-3 bg-neutral-100 p-3 dark:bg-neutral-800">
      <div className="px-5">
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          Edit your profile and information here
        </p>
      </div>
      <Separator />
      <div className="px-5">
        <ProfileForm userData={userData}/>
      </div>
    </div>
      
   
  );
}