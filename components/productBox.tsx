import React from "react";
import Image from "next/image";
import { Lightbulb } from "lucide-react";
import Link from "next/link";

export default function ProductBox({
  name,
  image,
  price,
  id,
}: {
  name: string;
  image: string;
  price: number;
  id: number;
}) {
  return (
    <Link className="w-64 h-64 bg-neutral-900 grid grid-rows-3" href={`/product/${id}`}>
      <div className="row-span-2 relative">
        <Image
          src={image}
          alt="Product Image"
          fill
          objectFit="cover"
          objectPosition="center"
        />
      </div>
      <div className="p-3 flex flex-col justify-between">
        <span>{name}</span>
        <span className="flex flex-row items-center text-[20px]">{price} <Lightbulb size={18} strokeWidth={2} /></span>
      </div>
    </Link>
  );
}
