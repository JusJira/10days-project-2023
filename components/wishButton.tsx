"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import { toast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/server";

function WishButton({ id, wished }: { id: number; wished: any }) {
  const [isWished, setIsWished] = useState(wished);
  async function onWish({ id }: { id: number }) {
    const response = await fetch("/api/product/wish", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: id,
      }),
    });

    if (response?.ok) {
      setIsWished(true);
      return toast({
        title: "Success",
        description: "This product has been added to your wishlist.",
      });
    }

    if (response?.status == 403) {
      return toast({
        title: "Not Logged In",
        description:
          "You need to be authenticated to add item to your wishlist",
        variant: "destructive",
        action: (
          <ToastAction altText="Login">
            <LoginLink>Login</LoginLink>
          </ToastAction>
        ),
      });
    }

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Product wasn't added to your wishlist",
        variant: "destructive",
      });
    }
  }
  async function onUnWish({ id }: { id: number }) {
    const response = await fetch("/api/product/wish", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: id,
      }),
    });

    if (response?.ok) {
      setIsWished(false);
      return toast({
        title: "Success",
        description: "This product has been removed from your wishlist.",
      });
    }

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Product wasn't removed to your wishlist",
        variant: "destructive",
      });
    }
  }
  if (isWished) {
    return (
      <Button onClick={() => onUnWish({ id })}>
        <Heart className="h-6 w-6" fill="red" color="red" />
      </Button>
    );
  }
  return (
    <div>
      <Button onClick={() => onWish({ id })}>
        <Heart className="h-6 w-6" />
      </Button>
    </div>
  );
}

export default WishButton;
