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
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { Coins, Wallet } from 'lucide-react';

const TransactionPage = async () => {
    const { getUser, isAuthenticated } = getKindeServerSession();
    const user = await getUser();

    const userData = await db.user.findFirst({
        where: {
          id: user.id || "",
        },
      });

    if (!userData) {
      redirect("/");
    }

    const transactionHistory = await db.transaction.findMany({
        where: {
            userId: user.id || ""
        },
        orderBy: {
            createdTimestamp: 'desc'
        }
    })
    


    return (
        <div className="relative flex min-h-full flex-col gap-3 bg-neutral-100 p-3 dark:bg-neutral-800">
            <div className="px-5 flex flex-row space-x-3">
                <Coins className="content-center" size={25}></Coins>
            <h3 className="text-lg font-medium">Transaction History</h3>
            </div>
            <Separator />
            <div className="flex flex-col items-center">
                <Card className="w-[95%] md:w-[70%]"> 
                    <CardContent className="pt-5">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="">Item</TableHead>
                                {/* <TableHead>Status</TableHead> */}
                                <TableHead className="w-[300px]">Time</TableHead>
                                <TableHead className="text-right w-[60px]">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        {
                            transactionHistory.map(function(val, idx) {
                                return (
                                    <TableRow key={idx}>
                                        <TableCell className="font-medium">{val.description}</TableCell>
                                        <TableCell>{val.createdTimestamp.toLocaleString()}</TableCell>
                                        <TableCell className={"text-right " + ((val.amount < 0) ? "text-red-500" : "text-green-700")}>{val.amount}</TableCell>
                                    </TableRow>
                                )
                            })
                            
                        }
                        </TableBody>
                    </Table>
                    
                    </CardContent>
                </Card>
                
                
            <div>

                </div>
            </div>
        </div>
    )
}

export default TransactionPage