"use client";

import { Button } from '@/components/ui/button'
import React, { useEffect, useRef, useState } from 'react'

const AddToCardButton = ({productId, maxQuantity} : {productId: number, maxQuantity: number}) => {

    const dataFetchedRef = useRef(false);

    const [quantity, setQuantity] = useState(0);

    function getQuantityFromCart() {
        const order = localStorage.getItem("order")
        if (!order) {
            return;
        }

        const orderJson: Array<{id: number, quantity: number}> = JSON.parse(order);

        const matchedOrder = orderJson.find(item => {
            return item.id == productId
        })

        // Not in cart yet
        if (!matchedOrder) {
            return
        }

        // In cart, set quantity
        setQuantity(matchedOrder.quantity)
    }

    function decreaseQuantity() {
        changeQuantityBy(-1)
    }

    function increaseQuantity() {
        changeQuantityBy(1)
    }

    function changeQuantityBy(amount: number) {
        const order = localStorage.getItem("order")

        // Check if lower than 0
        if ((amount == -1) && (quantity == 0)) {
            return
        }
        // Check if more than max quantity
        if ((amount == 1) && (quantity == maxQuantity)) {
            return
        }

        if (!order) {
            const newOrder = [
                {
                    id: productId,
                    quantity: 1
                }
            ]
            localStorage.setItem("order", JSON.stringify(newOrder))
        }

        const orderJson: Array<{id: number, quantity: number}> = JSON.parse(order || "[]")

        var idx = -1
        for (var i = 0, numOrder = orderJson.length || 0; i < numOrder; i++) {
            if (orderJson[i].id == productId) {
                idx = i
                orderJson[i].quantity += amount
                setQuantity(orderJson[i].quantity)
                break
            }
        }

        if (idx == -1) {
            orderJson.push({
                id: productId,
                quantity: 1
            })
            setQuantity(1)
        }
        else if (orderJson[idx].quantity == 0 && amount == -1) {
            orderJson.splice(idx, 1)
        }

        localStorage.setItem("order", JSON.stringify(orderJson))
    }

    // Do only 1 time
    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        getQuantityFromCart()
    })

    return (
        <div className="flex flex-row">
            <Button className="rounded-r-none" onClick={() => decreaseQuantity()}>-</Button>
            <Button className="rounded-none hover:bg-primary w-16">{quantity}</Button>
            <Button className="rounded-l-none" onClick={() => increaseQuantity()}>+</Button>
        </div>
    )
}

export default AddToCardButton