import { DarkModeToggle } from "@/components/ThemeToggle";
import SignOutButton from "@/components/signOutButton";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import {LoginLink, getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import { Label } from "@/components/ui/label";
import { db } from "@/lib/db";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Clock, MapPin, User2 } from "lucide-react";

export default async function account({ params }: { params: { accountId: string } }) {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();
  const accountId = parseInt(params.accountId);


  const userData = await db.user.findFirst({
    where: {
      accountId: accountId || 0,
    },
  });
  if (!userData) {
    redirect("/account");
  }
  

  function isOwner() {
    if (isAuthenticated()) {
      if (user.id == userData?.id) {
        return true;
      }
      return false;
    } else {
      return false;
    }
  }


  



  

  return (
    <div className="relative flex min-h-full flex-col gap-3 bg-neutral-100 p-3 dark:bg-neutral-800">
      <div className="px-5">
        <h3 className="text-lg font-medium">Profile</h3>
      </div>
      <Separator />
      { (isOwner()) && (
          <div className="flex h-full  min-h-full flex-col md:flex-row items-center justify-center gap-3 rounded-md">
            <div className="flex w-full justify-center">
              <DarkModeToggle />
            </div>
            <div className="flex w-full justify-center">
              <SignOutButton />
            </div>
            <div className="flex w-full justify-center">
              <Link className={`${buttonVariants({ variant: "outline" })} w-2/3 lg:w-48 !border-black`} href="/merchant" prefetch={false}>
                Merchant Page
              </Link>
            </div>
            <div className="flex w-full justify-center">
              <Link className={`${buttonVariants({ variant: "outline" })} w-2/3 lg:w-48 !border-black`} href="/account/edit" prefetch={false}>
                Edit Profile
              </Link>
            </div>
          </div>
        ) 
      }
      {
        (true) && (
          <div className="flex flex-col">
            {/* Profile Avatar / Name / Role */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 p-2 -m-2 mt-2 mb-2 px-3 py-2 w-full">
              <div className="inline-flex basis-32 items-center justify-center min-w-32 min-h-32 w-32 h-32 md:w-32 md:h-32 overflow-hidden bg-[#C3DCE3] rounded-full relative">
                {
                  (<Image className='h-full !object-cover' src={userData?.image as string} alt="Profile Image" fill></Image>)
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

            {/* User Profile */}
            <div className="flex flex-col gap-2 mt-2 mb-2 px-4 md:px-10 py-3 w-full"> 
              <Card>
                <CardHeader>
                <div className="w-full md:px-4 text-center md:text-left">
                  <Label className="font-bold text-lg break-words">Personal Profile</Label>
                </div>
                </CardHeader>
                <CardContent>
                <div className="flex flex-col items-start space-y-4">
                  <div className="w-full flex flex-row space-x-4">
                    <User2 className="w-5 h-5"/>
                    <Label className="text-sm break-words"><span className="font-bold">Full Name :</span> {(isOwner()) ? (user.given_name + " " + user.family_name) : "<Private Information>" }</Label>
                  </div>
                  <div className="w-full flex flex-row space-x-4">
                    <MapPin className="w-5 h-5"/>
                    <Label className="text-sm break-words"><span className="font-bold">Address :</span> {(isOwner()) ? (userData?.address) : "<Private Information>"}</Label>
                  </div>
                  <div className="w-full flex flex-row space-x-4">
                    <Clock className="w-5 h-5"/>
                    <Label className="text-sm break-words"><span className="font-bold">Account Created At :</span> {userData?.createdAt.toString()}</Label>
                  </div>
                </div>
                </CardContent>
              </Card>
              
            </div>
            
          </div>
          
        )
      }
      
    </div>
  );
}
