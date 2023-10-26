import React from "react";
import Image from "next/image";
import { db } from "@/lib/db";
import { Lightbulb } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import initials from "initials"
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { classNames } from "uploadthing/client";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Page({ params }: { params: { id: string } }) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const id = parseInt(params.id);
  const data = await db.product.findUnique({
    where: {
      id: id,
    },
    include: {
      owner: true,
    },
  });

  const name = data?.owner.displayName || 'Unknown Seller'
  return (
    <div className="p-8">
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
          <div className="flex flex-row items-center gap-3">
            <Avatar>
              <AvatarImage src={data?.owner.image} />
              <AvatarFallback>{initials(data?.owner.displayName as string)}</AvatarFallback>
            </Avatar>
            <span>{name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
