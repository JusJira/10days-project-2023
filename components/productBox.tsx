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
  function textEllipsis(str: string, maxLength: number, { side = "end", ellipsis = "..." } = {}) {
    if (str.length > maxLength) {
      switch (side) {
        case "start":
          return ellipsis + str.slice(-(maxLength - ellipsis.length));
        case "end":
        default:
          return str.slice(0, maxLength - ellipsis.length) + ellipsis;
      }
    }
    return str;
  }
  return (
    <Link
      className="w-64 h-64 dark:bg-neutral-900 bg-white grid grid-rows-3 shadow-xl"
      href={`/product/${id}`}
    >
      <div className="row-span-2 relative border-white border-4">
        <Image
          src={image}
          alt="Product Image"
          fill
          className="object-cover object-center"
        />
      </div>
      <div className="p-3 flex flex-col justify-between">
        <span>{textEllipsis(name,24)}</span>
        <span className="flex flex-row items-center text-[20px]">
          {price} <Lightbulb size={18} strokeWidth={2} />
        </span>
      </div>
    </Link>
  );
}
