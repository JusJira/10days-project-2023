"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator'
import { db } from '@/lib/db';
import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Button } from '@/components/ui/button';

const CartPage = () => {

    const [orderList, setOrderList] = useState<Array<{id: number, name: string, amount: number, max_quantity: number, price: number}>>([]);
    // const [orderList, setOrderList] = useState<Array<any>>([]);


    async function getOrderList() {
        const order = localStorage.getItem('order');
        if (!order) {
            return;
        }
        try {
            const orderJson: Array<{id: number, quantity: number}> = JSON.parse(order);
            

            const idFilter: Array<number> = []
            let idWithAmount = new Map<number, number>()

            orderJson.forEach(element => {
                idFilter.push(element.id);
                idWithAmount.set(element.id, element.quantity)
            });

            

            const res = await fetch(`/api/product/all/${idFilter.join("_")}`)
            const data = await res.json()

            const productList = data.message

            const orders: Array<{id: number, name: string, amount: number, max_quantity: number, price: number}> = []
            for (let e of productList) {
                orders.push({
                    id: e.id,
                    name: e.name,
                    amount: Math.min(e.quantity, idWithAmount.get(e.id) || 0) ,
                    max_quantity: e.quantity,
                    price: e.price
                })
            }
           

            setOrderList(orders)
            // console.log(productList)

            // const o = orderList
            // o[0].quantity = 100
            // setOrderList(o)
        }
        catch (err) {
            // localStorage.removeItem('order');
            return;
        }
    }

    useEffect(() => {
        getOrderList()
    }, [])


    // Button function

    function increaseQuantity(idx: number) {
        const order = orderList
        order[idx].amount = Math.min(order[idx].amount + 1 , order[idx].max_quantity)
        setOrderList([...order])
    }

    function decreaseQuantity(idx: number) {
        const order = orderList
        order[idx].amount = Math.max(order[idx].amount - 1 , 0)
        setOrderList([...order])
    }


    return (
        <div className="relative flex min-h-full flex-col gap-3 bg-neutral-100 p-3 dark:bg-neutral-800">
            <div className="px-5">
                <h3 className="text-lg font-medium">Cart</h3>
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
                                <TableHead className="w-[100px]">Quantity</TableHead>
                                <TableHead className="text-right w-[60px]">Price</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        {
                            orderList.map(function(val, idx) {
                                return (
                                    <TableRow key={idx}>
                                        <TableCell className="font-medium">{val.name}</TableCell>
                                        <TableCell className="h-full text-center align-middle">
                                            <div className="flex flex-row items-center">
                                                <Button variant="ghost" className="w-6 h-6" onClick={() => decreaseQuantity(idx)}>-</Button>
                                                <div className="grid w-full content-center">{val.amount}</div>
                                                <Button variant="ghost" className="w-6 h-6" onClick={() => increaseQuantity(idx)}>+</Button>
                                            </div>
                                            
                                        </TableCell>
                                        <TableCell className="text-right">{val.amount * val.price}</TableCell>
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

export default CartPage