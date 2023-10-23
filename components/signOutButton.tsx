"use client";
import React from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

function SignOutButton() {
  return (
    <Button
      className="w-2/3 lg:w-48"
      onClick={(event) => {
        event.preventDefault();
        signOut({});
      }}
    >
      Sign Out
    </Button>
  );
}

export default SignOutButton;