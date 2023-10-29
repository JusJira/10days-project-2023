"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useRef, useState } from "react";
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
import Link from 'next/link';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import { ShoppingCart } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

type Item = {
  id: number;
  quantity: number;
  totalPrice: number;
};

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

const CartPage = () => {
  const dataFetchedRef = useRef(false);

  const [orderList, setOrderList] = useState<
    Array<{
      id: number;
      name: string;
      amount: number;
      max_quantity: number;
      price: number;
    }>
  >([]);
  // const [orderList, setOrderList] = useState<Array<any>>([]);

  const [totalPrice, setTotalPrice] = useState<number>(0);

    const [balance, setBalance] = useState<number>(0)

    const [isPurchasing, setIsPurchasing] = useState<boolean>(false)

  async function getBalance() {
    const userRes = await fetch(`/api/account/current`);
    const userResJson = await userRes.json();

    const res = await fetch(`/api/account/${userResJson.user.id}`);
    const data = await res.json();

    setBalance(data.message.balance);
  }

  async function getOrderList() {
    const order = localStorage.getItem("order");
    if (!order) {
      return;
    }
    try {
      const orderJson: Array<{ id: number; quantity: number }> =
        JSON.parse(order);

      const idFilter: Array<number> = [];
      let idWithAmount = new Map<number, number>();

      orderJson.forEach((element) => {
        if (element.quantity != 0) {
          idFilter.push(element.id);
          idWithAmount.set(element.id, element.quantity);
        }
      });

      const res = await fetch(`/api/product/all/${idFilter.join("_")}`);
      const data = await res.json();

      const productList = data.message;

      const orders: Array<{
        id: number;
        name: string;
        amount: number;
        max_quantity: number;
        price: number;
      }> = [];
      for (let e of productList) {
        orders.push({
          id: e.id,
          name: e.name,
          amount: Math.min(e.quantity, idWithAmount.get(e.id) || 0),
          max_quantity: e.quantity,
          price: e.price,
        });
      }

      setOrderList(orders);
      // console.log(productList)

      // const o = orderList
      // o[0].quantity = 100
      // setOrderList(o)
    } catch (err) {
      // localStorage.removeItem('order');
      return;
    }
  }

  function refreshLocalStorage() {
    const refreshLocal = [];
    for (var i = 0, numOrder = orderList.length; i < numOrder; i++) {
      refreshLocal.push({
        id: orderList[i].id,
        quantity: orderList[i].amount,
      });
    }
    localStorage.setItem("order", JSON.stringify(refreshLocal));
  }

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    getOrderList();
    getBalance();
  }, []);

  useEffect(() => {
    let newTotalPrice = 0;
    for (let e of orderList) {
      newTotalPrice += e.amount * e.price;
    }
    setTotalPrice(newTotalPrice);
  }, [orderList]);

  // Button function

  function increaseQuantity(idx: number) {
    const order = orderList;
    order[idx].amount = Math.min(
      order[idx].amount + 1,
      order[idx].max_quantity
    );
    setOrderList([...order]);
    refreshLocalStorage();
  }

  function decreaseQuantity(idx: number) {
    const order = orderList;
    order[idx].amount = Math.max(order[idx].amount - 1, 0);
    setOrderList([...order]);
    refreshLocalStorage();
  }

    async function purchase() {
        setIsPurchasing(true)

        const finalOrders : Item[] = []
        for (let e of orderList) {
            if (e.amount != 0) {
                finalOrders.push({
                    id: e.id,
                    quantity: e.amount,
                    totalPrice : e.amount * e.price
                })
            }
        }
        const res = await fetch('/api/product/transaction',{method : "POST"
        ,headers : {
            "Content-Type": "application/json",
          },
        body : JSON.stringify({ 
            finalOrders : finalOrders,
            totalPrice : totalPrice
        })
    })  
        toast({
          title: "Success",
          description: "Your order is completed. You will be sent to order page soon...",
        });
        await delay(2000)
        window.location.href = '/account/order'
        localStorage.removeItem('order')
        // alert("Final Order : " + JSON.stringify(finalOrders) + "\nTotal Price : " + totalPrice.toString())
        
        return res;
    }


    return (
        <div className="relative flex min-h-full flex-col gap-3 bg-neutral-100 p-3 dark:bg-neutral-800">
            <div className="px-5 flex flex-row space-x-3">
                <ShoppingCart className="content-center" size={25}></ShoppingCart>
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
                                        <TableCell className="font-medium"><Link href={`/product/${val.id}`}>{val.name}</Link></TableCell>
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
                            <TableRow>
                                <TableCell className="font-bold">Total</TableCell>

                  <TableCell className="text-right col-span-2" colSpan={2}>
                    {totalPrice}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold">Current Balance</TableCell>

                  <TableCell className="text-right col-span-2" colSpan={2}>
                    {balance}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold">Left Balance</TableCell>

                                <TableCell className={"text-right col-span-2 " + ((balance - totalPrice < 0) && "text-red-500")} colSpan={2}>{balance - totalPrice}</TableCell>
                            </TableRow>
                            
                        </TableBody>
                    </Table>
                    
                    </CardContent>
                </Card>
                <div className="flex w-[95%] md:w-[70%] pt-10 justify-end">
                    {
                        ((totalPrice > 0) && (balance - totalPrice >= 0)) ? (
                            
                                (isPurchasing == true) ? (
                                    <Button disabled>Purchase</Button>
                                ) : (
                                    <Button onClick={async () => {purchase()}}>Purchase</Button>
                                )

                        
                            
                        ) : (
                            <Button disabled>Purchase</Button>
                        )
                        
                    }
                </div>
                
            <div>

                </div>
            </div>
        </div>
    )
}

export default CartPage;
