import { Separator } from "@/components/ui/separator";
import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/lib/db";
import { User, Wallet } from "lucide-react";
import { WithdrawForm } from "./WithdrawForm";

export default async function WithdrawPage() {

  return (
    <div className="relative flex min-h-full flex-col gap-3 bg-neutral-100 p-3 dark:bg-neutral-800">
      <div className="px-5 flex flex-row space-x-3">
        <Wallet className="content-center" size={25}></Wallet>
        <h3 className="text-lg font-medium">Wallet &gt; Withdraw</h3>
      </div>
      <Separator />
      <div className="px-5">
        <WithdrawForm />
      </div>
    </div>
      
   
  );
}