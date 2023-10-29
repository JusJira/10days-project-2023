import { Separator } from "@/components/ui/separator";
import React from "react";
import { ProfileForm } from "./ProfileForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/lib/db";
import { User } from "lucide-react";

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
      <div className="px-5 flex flex-row space-x-3">
        <User className="content-center" size={25}></User>
        <h3 className="text-lg font-medium">Profile &gt; Editing</h3>
      </div>
      <Separator />
      <div className="px-5">
        <ProfileForm userData={userData}/>
      </div>
    </div>
      
   
  );
}