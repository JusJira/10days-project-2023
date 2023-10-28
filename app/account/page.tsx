import { DarkModeToggle } from "@/components/ThemeToggle";
import SignOutButton from "@/components/signOutButton";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import {
  LoginLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { Label } from "@/components/ui/label";
import { db } from "@/lib/db";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Heart, Package, ShoppingBag, Wallet } from "lucide-react";
import { Clock, MapPin, User2 } from "lucide-react";

export default async function AccountProfile() {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();
  async function checkIfNew() {
    const dbUser = await db.user.findUnique({
      where: {
        id: user?.id || "",
      },
    });
    if (!dbUser) {
      // create user in db
      await db.user.create({
        data: {
          id: user.id as string,
          displayName: user.given_name as string,
        },
      });

      redirect("/account/edit");
    }
    // const newDbUser = await db.user.findUnique({
    //   where: {
    //     id: user?.id||""
    //   }
    // })

    return dbUser;
  }
  async function getUserData() {
    if (await !isAuthenticated()) {
      return null;
    } else {
      const data = await checkIfNew();
      return data;
    }
  }

  const userData = await getUserData();

  // console.log(userData)

  return (
    <div className="relative flex min-h-full flex-col gap-3 bg-neutral-100 p-3 dark:bg-neutral-800">
      <div className="px-5">
        <h3 className="text-lg font-medium">Profile</h3>
      </div>
      <Separator />
      {!user && (
        <div className="flex h-full min-h-full items-center justify-center rounded-md">
          <Button asChild className="w-2/3 lg:w-48">
            <LoginLink className={buttonVariants()}>Sign in</LoginLink>
          </Button>
        </div>
      )}
      {user && (
        <div className="flex h-full  min-h-full flex-col md:flex-row items-center justify-center gap-3 rounded-md">
          <div className="flex w-full justify-center">
            <DarkModeToggle />
          </div>
          <div className="flex w-full justify-center">
            <Link
              className={`${buttonVariants({
                variant: "outline",
              })} w-2/3 lg:w-48 !border-black`}
              href="/merchant"
              prefetch={false}
            >
              Merchant Page
            </Link>
          </div>
          <div className="flex w-full justify-center">
            <Link
              className={`${buttonVariants({
                variant: "outline",
              })} w-2/3 lg:w-48 !border-black`}
              href="/account/edit"
              prefetch={false}
            >
              Edit Profile
            </Link>
          </div>
          <div className="flex w-full justify-center">
            <SignOutButton />
          </div>
        </div>
      )}
      {user && (
        <div className="flex flex-col">
          {/* Profile Avatar / Name / Role */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 p-2 -m-2 mt-2 mb-2 px-3 py-2 w-full">
            <div className="inline-flex basis-32 items-center justify-center min-w-32 min-h-32 w-32 h-32 md:w-32 md:h-32 overflow-hidden bg-[#C3DCE3] rounded-full relative">
              {
                <Image
                  className="h-full !object-cover"
                  src={userData?.image as string}
                  alt="Profile Image"
                  fill
                ></Image>
              }
            </div>
            <div className="flex flex-col items-center md:items-start space-y-3 md:pl-6">
              <div className="max-w-sm text-center">
                <Label className="font-bold text-md break-words">
                  {userData?.displayName}
                </Label>
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
                  <Label className="font-bold text-lg break-words">
                    Personal Profile
                  </Label>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-start space-y-4">
                  <div className="w-full flex flex-row space-x-4">
                    <User2 className="w-5 h-5"/>
                    <Label className="text-sm break-words"><span className="font-bold">Full Name :</span> {user.given_name + " " + user.family_name}</Label>
                  </div>
                  <div className="w-full flex flex-row space-x-4">
                    <MapPin className="w-5 h-5"/>
                    <Label className="text-sm break-words"><span className="font-bold">Address :</span> {userData?.address}</Label>
                  </div>
                  <div className="w-full flex flex-row space-x-4">
                    <Clock className="w-5 h-5"/>
                    <Label className="text-sm break-words"><span className="font-bold">Account Created At :</span> {userData?.createdAt.toString()}</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* User Orders */}
          <div className="flex flex-col gap-2 px-4 md:px-10 py-3 w-full">
            <Card>
              <CardContent className="!p-6 flex flex-row justify-center items-center gap-6">
                <Link
                  className="flex flex-col items-center justify-center"
                  href={"/account/wishlist"}
                >
                  <Button className="aspect-square h-full flex flex-col">
                  <Heart fill="red" color="red" size={32}/>
                  </Button>
                  <span>Wishlist</span>
                </Link>
                <div className="flex flex-col items-center justify-center">
                  <Button className="aspect-square h-full flex flex-col">
                    <ShoppingBag size={32} />
                  </Button>
                  <span>Orders</span>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <Link
                    className="flex flex-col items-center justify-center"
                    href={"/money/wallet"}
                  >
                    <Button className="aspect-square h-full flex flex-col">
                      <Wallet size={32} />
                    </Button>
                    <span>Wallet</span>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
