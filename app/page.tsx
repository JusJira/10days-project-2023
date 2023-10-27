import { Label } from "@/components/ui/label";
import ProductPanel from "./product/ProductPanel";
import { Button } from "@/components/ui/button";
import AnimateTypeText from "@/components/AnimateTypeText";
import { LoginLink, getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { db } from "@/lib/db";
import { ShoppingCart, User } from "lucide-react";


export default async function Home() {
  const { isAuthenticated } = getKindeServerSession();

  const userCount = await db.user.count({
    select: {
      _all: true, // Count all records
    },
  })

  const productCount = await db.product.count({
    select: {
      _all: true, // Count all records
    },
  })

  return (
    <>
      <div className="h-[75vh] flex flex-col md:flex-row items-center justify-center bg-neutral-100 dark:bg-neutral-800">
        <div className="flex flex-col w-full items-center justify-center">
          <div>
            <Label className="font-extrabold text-6xl bg-gradient-to-r from-sky-400 to-violet-400 text-transparent bg-clip-text">ChadMart</Label>
          </div>
          <div className="pt-5 text-center">
            <Label className="flex flex-col md:flex-row font-extrabold text-3xl">Market for<span className="hidden md:block">&nbsp;</span><AnimateTypeText /></Label>
          </div>
          <div className="pt-8">
            <Button>
              {
                (isAuthenticated()) ? (
                  <Link href="/product">Get Start!</Link>
                ) : (
                  <LoginLink>Get Start!</LoginLink>
                )
              }
            </Button>
          </div>
        </div>
        {/* <div className="hidden md:flex w-[50%] items-center justify-center">
          <Label>Market for GigaChad</Label>
        </div> */}
      </div>

      <div className="py-14 flex flex-col items-center justify-center space-y-10">
          <div className="text-center">
            <Label className="font-bold text-2xl">Web application for trading everything...</Label>
          </div>
            
          <div className="grid grid-cols-2 w-full">
            <div className="flex flex-col items-center space-y-5">
              <div className="flex flex-row">
                <User className="w-7 h-7 mr-4" />
                <Label className="font-bold text-2xl">{(userCount) ? userCount._all : "0"}</Label>
              </div>
              
              <div className="text-center">
                <Label className="text-xl">users have registered in platform</Label>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-5">
            <div className="flex flex-row">
                <ShoppingCart className="w-7 h-7 mr-4" />
                <Label className="font-bold text-2xl">{(productCount) ? productCount._all : "0"}</Label>
              </div>
              <div className="text-center">
                <Label className="text-xl">products have been placed in this platform</Label>
              </div>
            </div>
          </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center bg-neutral-100 dark:bg-neutral-800 py-14">
        
        <div className="text-center">
          <Label className="font-bold text-2xl">Many products are placed here...</Label>
        </div>
      </div>
      <ProductPanel path=""/>
    </>
    
  );
}
