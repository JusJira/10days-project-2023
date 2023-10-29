"use client";

import { Button, buttonVariants } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast';
import React, { useEffect, useRef, useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  

const AddToCardButton = ({productId, maxQuantity} : {productId: number, maxQuantity: number}) => {

    const dataFetchedRef = useRef(false);

    const [quantity, setQuantity] = useState(0);

    function getQuantityFromCart() {
        const order = localStorage.getItem("order")
        if (!order) {
            return 0;
        }

        const orderJson: Array<{id: number, quantity: number}> = JSON.parse(order);

        const matchedOrder = orderJson.find(item => {
            return item.id == productId
        })

        // Not in cart yet
        if (!matchedOrder) {
            return 0
        }

        // In cart, set quantity
        
        return matchedOrder.quantity
    }

    // function decreaseQuantity() {
    //     changeQuantityBy(-1)
    // }

    function decreaseQuantity() {
        setQuantity(Math.max(quantity - 1, 0))
    }

    // function increaseQuantity() {
    //     changeQuantityBy(1)
    // }

    function increaseQuantity() {
        setQuantity(Math.min(quantity + 1, maxQuantity))
    }

    function addToCart() {
        var isMoreThanStock = false
        var finalAddedQuantity = quantity
        var inCartQuantity = getQuantityFromCart()

        if (quantity + inCartQuantity > maxQuantity) {
            isMoreThanStock = true
            finalAddedQuantity = maxQuantity - inCartQuantity
        }

        const order = localStorage.getItem("order")

        // No product in cart yet
        if (!order) {
            const newOrder = [
                {
                    id: productId,
                    quantity: finalAddedQuantity
                }
            ]
            localStorage.setItem("order", JSON.stringify(newOrder))
        }
        else {
            const orderJson: Array<{id: number, quantity: number}> = JSON.parse(order || "[]")

            var idx = -1
            for (var i = 0, numOrder = orderJson.length || 0; i < numOrder; i++) {
                if (orderJson[i].id == productId) {
                    idx = i
                    orderJson[i].quantity += finalAddedQuantity
                    setQuantity(orderJson[i].quantity)
                    break
                }
            }
    
            if (idx == -1) {
                orderJson.push({
                    id: productId,
                    quantity: finalAddedQuantity
                })
            }

            localStorage.setItem("order", JSON.stringify(orderJson))
        }

        toast({
            title: "Added to Cart",
            description: (isMoreThanStock) ? `Because there isn't enough items in stock, only ${finalAddedQuantity} items will be added to cart. Now you have ${inCartQuantity + finalAddedQuantity} items of this product in cart.` : `${finalAddedQuantity} items have been added to cart. Now you have ${inCartQuantity + finalAddedQuantity} items of this product in cart.`,
            variant: 'default',
        })
        
        // Reset after done
        setQuantity(0)

        
    }

    // function changeQuantityBy(amount: number) {
    //     const order = localStorage.getItem("order")

    //     // Check if lower than 0
    //     if ((amount == -1) && (quantity == 0)) {
    //         return
    //     }
    //     // Check if more than max quantity
    //     if ((amount == 1) && (quantity == maxQuantity)) {
    //         return
    //     }

    //     if (!order) {
    //         const newOrder = [
    //             {
    //                 id: productId,
    //                 quantity: 1
    //             }
    //         ]
    //         localStorage.setItem("order", JSON.stringify(newOrder))
    //     }

    //     const orderJson: Array<{id: number, quantity: number}> = JSON.parse(order || "[]")

    //     var idx = -1
    //     for (var i = 0, numOrder = orderJson.length || 0; i < numOrder; i++) {
    //         if (orderJson[i].id == productId) {
    //             idx = i
    //             orderJson[i].quantity += amount
    //             setQuantity(orderJson[i].quantity)
    //             break
    //         }
    //     }

    //     if (idx == -1) {
    //         orderJson.push({
    //             id: productId,
    //             quantity: 1
    //         })
    //         setQuantity(1)
    //     }
    //     else if (orderJson[idx].quantity == 0 && amount == -1) {
    //         orderJson.splice(idx, 1)
    //     }

    //     localStorage.setItem("order", JSON.stringify(orderJson))
    // }

    // Do only 1 time
    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        // getQuantityFromCart()
    })

    return (
        <div className="flex flex-row">
            <Dialog>
                <DialogTrigger className={buttonVariants({ variant: "default" })}>Add to Cart</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Adding to Cart</DialogTitle>
                        <DialogDescription>
                            <div className="flex flex-col gap-5">
                                <div>Enter number of items for adding to cart</div>
                                <div>
                                <Button className="rounded-r-none" onClick={() => decreaseQuantity()}>-</Button>
                                <Button className="rounded-none hover:bg-primary w-14">{quantity}</Button>
                                <Button className="rounded-l-none" onClick={() => increaseQuantity()}>+</Button>

                                {
                                    (quantity == 0) ? (
                                        <Button className="ml-4" disabled>Add to Cart</Button>
                                    ) : (
                                        <DialogClose asChild><Button className="ml-4" onClick={() => addToCart()}>Add to Cart</Button></DialogClose>
                                    )
                                }
                                </div>
                            </div>
                            
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            
            
        </div>
    )
}

export default AddToCardButton