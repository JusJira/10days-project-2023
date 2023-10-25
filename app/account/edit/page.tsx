import { DarkModeToggle} from "@/components/ThemeToggle";
import SignOutButton from "@/components/signOutButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import { Label } from "@/components/ui/label";

export default async function EditAccount() {
  const {getUser} = getKindeServerSession();
  const user = await getUser();
  console.log(user)

  return (
    <div className="relative flex min-h-full flex-col gap-3 bg-neutral-100 p-3 dark:bg-neutral-800">
      
      {
        (user) && (
          <div className="flex flex-col">
            {/* Profile Avatar / Name / Role */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 p-2 -m-2 mt-2 mb-2 px-3 py-2 w-full">
              <div className="inline-flex basis-32 items-center justify-center min-w-32 min-h-32 w-32 h-32 md:w-32 md:h-32 overflow-hidden bg-[#C3DCE3] rounded-full">
                {
                  (!user.picture) ? 
                  (<span className="font-large text-[#2B788B] font-[Montserrat]">{(user.given_name || "A")[0]}</span>)
                  :
                  (<img className='h-full !object-cover' src="https://nhadepso.com/wp-content/uploads/2023/03/cap-nhat-99-hinh-anh-avatar-gau-cute-de-thuong-ngo-nghinh_1.jpg"></img>)
                }
              </div>
              <div className="flex flex-col items-center md:items-start space-y-3 md:pl-6">
                <div className="max-w-sm text-center">
                  <Label className="font-bold text-md break-words">[DisplayName]</Label>
                </div>
                <div className="max-w-sm">
                  <Label className="text-sm break-words">[Bio]</Label>
                </div>
              </div>
            </div>
          </div>
        )
      }
      
    </div>
  );
}