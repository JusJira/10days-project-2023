import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator'
import React, { useEffect, useRef, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

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

    const transactionHistory = await db.order.findMany({
        select: {
            id: true,
            orderedAt: true,
            totalPrice: true,
            orderLines: {
                select: {
                    orderId: true,
                    quantity: true,
                    totalPrice: true,
                    product: true
                }
            }
        },
        where: {
            userId: user.id || ""
        },
        orderBy: {
            orderedAt: 'desc'
        }
    })
    


    return (
        <div className="relative flex min-h-full flex-col gap-3 bg-neutral-100 p-3 dark:bg-neutral-800">
            <div className="px-5 flex flex-row space-x-3">
                <ShoppingBag className="content-center" size={25}></ShoppingBag>
                <h3 className="text-lg font-medium">Order</h3>
            </div>
            <Separator />
            <div className="flex flex-col items-center">
                <Card className="w-[95%] md:w-[70%]"> 
                    <CardContent className="pt-5">
                        <Accordion type="single" collapsible>
                        {
                            transactionHistory.map(function(val, idx) {
                                return (
                                    
                                    <AccordionItem key={idx} value={"item-"  + (idx + 1).toString()}>
                                        <AccordionTrigger>
                                            <div className="w-full flex justify-between">
                                                <div className="w-fit">Order #{val.id}</div>
                                                <div className="w-fit pr-5">{val.orderedAt.toLocaleString()}</div>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="">Item</TableHead>
                                                    {/* <TableHead>Status</TableHead> */}
                                                    <TableHead className="w-[100px]">Quantity</TableHead>
                                                    <TableHead className="text-right w-[60px]">Price</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                            {
                                                val.orderLines.map(function(ol, idx) {
                                                    return (
                                                        <TableRow key={idx}>
                                                            <TableCell className="font-medium"><Link href={`/product/${ol.product.id}`}>{ol.product.name}</Link></TableCell>
                                                            <TableCell className="h-full text-center align-middle">{ol.quantity}</TableCell>
                                                            <TableCell className="text-right">{ol.totalPrice}</TableCell>
                                                        </TableRow>
                                                    )
                                                })

                                            }
                                                <TableRow>
                                                    <TableCell className="font-bold">Total</TableCell>
                                        
                                                    <TableCell className="text-right col-span-2" colSpan={2}>{val.totalPrice}</TableCell>
                                                </TableRow>

                                            </TableBody>
                                        </Table>
                                    </AccordionContent>
                                </AccordionItem>  
                                )
                            })
                            
                        }
                        </Accordion>
                    </CardContent>
                </Card>
                
                
            <div>

                </div>
            </div>
        </div>
    )
}

export default OrderPage