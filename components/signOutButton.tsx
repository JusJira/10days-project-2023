"use client";

import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button"

function SignOutButton() {
  return (
    // <Button
    //   className="w-2/3 lg:w-48"
    //   onClick={(event) => {
    //     event.preventDefault();
    //     signOut({});
    //   }}
    // >
    //   Sign Out
    // </Button>
    <Link className={`${buttonVariants({ variant: "outline" })} w-2/3 lg:w-48 !border-black`} href="/api/auth/logout" prefetch={false}>
      Sign Out
    </Link>
  );
}

export default SignOutButton;
