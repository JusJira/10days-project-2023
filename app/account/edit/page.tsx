import { Separator } from "@/components/ui/separator";
import React from "react";
import { ProfileForm } from "./ProfileForm";

export default async function EditAccount() {
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
        <ProfileForm/>
      </div>
    </div>
      
   
  );
}