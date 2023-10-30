import { Separator } from "@/components/ui/separator";
import React from "react";
import { User, Wallet } from "lucide-react";
import { PaotooongRegisterForm } from "./PaotooongRegisterForm";

export default async function PaotooongRegisterPage() {

  return (
    <div className="relative flex min-h-full flex-col gap-3 bg-neutral-100 p-3 dark:bg-neutral-800">
      <div className="px-5 flex flex-row space-x-3">
        <Wallet className="content-center" size={25}></Wallet>
        <h3 className="text-lg font-medium">Wallet &gt; Paotooong Registration</h3>
      </div>
      <Separator />
      <div className="px-5">
        <PaotooongRegisterForm />
      </div>
    </div>
      
   
  );
}