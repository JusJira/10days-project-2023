import React from "react";
import Image from "next/image";
import { db } from "@/lib/db";
import { Heart, Lightbulb, Package } from "lucide-react";
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
import ReviewForm from "@/components/ui/review_form";
import AddToCardButton from "./AddToCardButton";

type Cascade_review = Review & {
  user : User
}

export default async function Page({ params }: { params: { id: string } }) {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();
  const id = parseInt(params.id);

  const is_reviewable = (await db.product.findFirst({
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
  if (is_reviewable === null) return <div>Loading ...</div>

  const prev_review = (!user) ? null : ( await db.review.findFirst({
    where : {
      productId : id,
      userId : user.id as string
    }
  }))
  console.log(prev_review)
  const is_reviewables : Cascade_review[] = is_reviewable.reviews
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
    <div className="relative flex min-h-full flex-col gap-3 bg-neutral-100 p-3 dark:bg-neutral-800">
      <div className="px-5 flex flex-row space-x-3">
        <Package className="content-center" size={25}></Package>
        <h3 className="text-lg font-medium">Product</h3>
      </div>
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
            <div className="flex flex-row items-center gap-3 py-5">
              <Link href={`/account/${data?.owner.accountId}`} className="flex flex-row items-center gap-3">
                <Avatar>
                  <AvatarImage className='object-cover object-center' src={data?.owner.image} />
                  <AvatarFallback>
                    {initials(data?.owner.displayName as string)}
                  </AvatarFallback>
                </Avatar>
                <span>{name}</span>
              </Link>
            </div>
            <h2>{data?.description}</h2>

            <div className="flex items-start justify-start gap-3 pt-5 pb-8 md:pb-0">
              {isOwner() ? (
                <Link
                  href={`/merchant/product/edit/${id}`}
                  className={`${buttonVariants()}`}
                >
                  Edit Item
                </Link>
              ) : (
                <>
                {/* <Link href={`#`} className={`${buttonVariants()}`}>
                  Add to Cart
                </Link> */}
                <AddToCardButton productId={data.id} maxQuantity={data.quantity}/>
                <WishButton id={id} wished={await isWished()} />
                </>
              )}
              
            </div>
          </div>
          
          {/* <div className="flex flex-row mt-10 gap-8">
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
            
          </div> */}
        </div>
      </div>
      <div className=" items-center flex-col">
        <Card className="w-full">
          <CardHeader className="">
            <div className="items-center flex justify-center">Review section</div>
            {(isAuthenticated()) ? (<ReviewForm productId={id} prev_review={prev_review}/> ): (<></>)}
          </CardHeader>
        </Card>
        
        <div className="rounded-[5rem]">
          <ReviewBox reviews = {is_reviewables}></ReviewBox>
          
           
        </div>
          
      </div>
      
    </div>
  );
}
