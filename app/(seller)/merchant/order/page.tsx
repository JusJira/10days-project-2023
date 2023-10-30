import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";

type Transaction = {
  id: number;
  orderedAt: Date;
  totalPrice: number;
  orderLines: {
    product: {
      id: number;
      ownerId: string;
      price: number;
      name: string;
      description: string | null;
      image: string;
      quantity: number;
      createdAt: Date;
    };
    quantity: number;
    totalPrice: number;
    orderId: number;
  }[];
};

const OrderPage = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const userData = await db.user.findFirst({
    where: {
      id: user.id || "",
    },
  });

  if (!userData) {
    redirect("/");
  }
  const prodOrder = await db.product.findMany({
    where: {
      ownerId: user.id as string,
    },
    select: {
      image: true,
      orderLineContains: {
        orderBy: {
            order: {
                orderedAt: "desc"
            }
        },
        select: {
          productId: true,
          orderId: true,
          quantity: true,
          order: {
            select: {
              user: {
                select: {
                  displayName: true,
                  address: true
                },
              },
            },
          },
        },
      },
      name: true,
    },
  });

  return (
    <div className="relative flex min-h-full flex-col gap-3 bg-neutral-100 p-3 dark:bg-neutral-800">
      {prodOrder.map(function (val, idx) {
        return val.orderLineContains.map((d, index) => (
          <div key={index} className="flex flex-col items-center">
            <Card className="w-[95%] md:w-[70%]">
              <CardContent className="pt-5">
                <Accordion type="single" collapsible>
                  <AccordionItem
                    key={idx}
                    value={"item-" + (index + 1).toString()}
                  >
                    <AccordionTrigger>
                      <div className="w-full flex justify-between">
                        <div className="w-fit">Order # {d.orderId}</div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="relative flex gap-10 flex-row">
                        <Image
                          src={val.image}
                          alt="Product Image"
                          height={300}
                          width={300}
                          className="object-cover object-center"
                        />
                        <div className="flex flex-col">
                          <div className="font-bold text-xl mb-1">
                            {val.name}
                          </div>
                          <div>Product # {d.productId}</div>
                          <div>Order # {d.orderId}</div>
                          <div>Quantity : {d.quantity}</div>
                        </div>
                        <Card className="w-[350px]">
                            <CardHeader>
                              <CardTitle>Customer Info</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div>Name : {d.order.user.displayName}</div>
                              <div>Address : {d.order.user.address}</div>
                            </CardContent>
                          </Card>
                      </div>
                      
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        ));
      })}
    </div>
  );
};

export default OrderPage;
