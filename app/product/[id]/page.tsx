import React from "react";
import Image from "next/image";
import { db } from "@/lib/db";
import { Heart, Lightbulb } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { classNames } from "uploadthing/client";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import initials from "initials";
import { redirect } from "next/navigation";
import WishButton from "@/components/wishButton";
import { equal } from "assert";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Review, User } from "@prisma/client";
import ReviewBox from "@/components/ui/review-box";

type Cascade_review = Review & {
  user : User
}

export default async function Page({ params }: { params: { id: string } }) {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();
  const id = parseInt(params.id);
  const review = (await db.product.findFirst({
    where : {
      id : id,
    }
    , select : {
        reviews : {
          include : {
            user : true
              
            
          }

      }
    
    },
  }));
  if (!review) return <div> Loading ....</div>
  const reviews : Cascade_review[] = review.reviews
  const data = await db.product.findFirst({
    where: {
      id: id,
    },
    include: {
      owner: true,
    },
  });
  if (!data) {
    redirect("/");
  }
  if (!review) return <div> Loading ....</div>
  
  function isOwner() {
    if (isAuthenticated()) {
      if (user.id == data?.ownerId) {
        return true;
      }
      return false;
    } else {
      return false;
    }
  }
  async function isWished() {
    if (isAuthenticated()) {
      const wish = await db.user.findUnique({
        where: {
          id: user.id as string,
        },
        select: {
          wishlists: {
            where: {
              productId: id,
              userId: user.id as string,
            },
          },
        },
      });
      if (wish?.wishlists.length != 0) {
        return true;
      }
      return false;
    }
    return false;
  }
  const name = data?.owner.displayName || "Unknown Seller";
  return (
    <div className="p-8 bg-neutral-100 dark:bg-neutral-800 min-h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 min-h-[16rem]">
        <div className="flex items-center justify-center relative aspect-square m-4 md:m-10 lg:m-16">
          <Image
            src={data?.image as string}
            alt="Product Image"
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-2xl">{data?.name}</h1>
            <span className="flex flex-row items-center text-[24px] ml-2">
              {data?.price} <Lightbulb size={20} strokeWidth={2} />
            </span>
            <h2>{data?.description}</h2>
          </div>
          <div className="flex flex-row mt-10 gap-8">
            <div className="flex flex-row items-center gap-3">
              <Avatar>
                <AvatarImage className='object-cover object-center' src={data?.owner.image} />
                <AvatarFallback>
                  {initials(data?.owner.displayName as string)}
                </AvatarFallback>
              </Avatar>
              <span>{name}</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              {isOwner() ? (
                <Link
                  href={`/merchant/product/edit/${id}`}
                  className={`${buttonVariants()}`}
                >
                  Edit Item
                </Link>
              ) : (
                <>
                <Link href={`#`} className={`${buttonVariants()}`}>
                  Add to Cart
                </Link>
                <WishButton id={id} wished={await isWished()} />
                </>
              )}
              
            </div>
            
          </div>
        </div>
      </div>
      <div className=" items-center flex-col h-[2000px]">
        <Card className="w-full">
          <CardHeader className="">
            <div className="items-center flex justify-center">Review section</div>
          </CardHeader>
        </Card>
        
        <div className="rounded-[5rem] w-full min-h-[500px] ">
          <ReviewBox reviews = {review.reviews}></ReviewBox>
          
           
        </div>
          
      </div>
      
    </div>
  );
}
