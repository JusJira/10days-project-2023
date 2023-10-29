"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import Link from "next/link";



// Build form schema
const topupFormSchema = z.object({
  email: z
    .string()
    .email()
    .min(1, {
      message: "Please fill email",
    }),
  password: z.string()
    .min(1, {
      message: "Please fill password",
    }),
  amount: z.coerce.number().min(1, {
      message: "Please fill positive amount"
  })
})

type TopupFormValues = z.infer<typeof topupFormSchema>

export function TopupForm() { // change any type if u have free time, I am lazy

  const [isProcessing, setProcessing] = useState<boolean>(false);

  const defaultValues: Partial<TopupFormValues> = {
    email: "",
    password: "",
    amount: 1
  }

  const form = useForm<TopupFormValues>({
    resolver: zodResolver(topupFormSchema),
    defaultValues,
    mode: "onChange",
  })


  async function onSubmit(data: TopupFormValues) {
    setProcessing(true)
    try {

      const res = await fetch("/api/payment/paotooong/topup",
        {
          method : "POST",

          headers: {
            "Content-Type": "application/json",
          },
          body : JSON.stringify(data)
        }
      )

      const resJson = await res.json()

      if (resJson.status == 400) {
        toast({
          title: "Topup Failed",
          description: `${resJson.message}`,
          variant: "destructive"
        })
      }
      else {
        toast({
          title: "Topup Successful",
          description: `Now balance in wallet is ${resJson.message.balance}`,
        })
      }
    }
    catch (err) {
      toast({
        title: "Topup Failed",
        description: `${err}`,
        variant: "destructive"
      })
    }
    finally {
      setProcessing(false)
    }
    
  }

  return (
    <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Paotooong Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Paotooong Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input placeholder="Amount" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Label className="text-center">Don't have Paotooong account? <Link href="/money/register?rdb=/money/topup" className="text-indigo-600 hover:text-indigo-400">Create one</Link></Label>

        <Button className="w-fit" type="submit">Top Up</Button>
        
      </form>
    </Form>
    <Dialog open={isProcessing} >
      <DialogContent>
        <div className="w-full text-center justify-center">
          <Label className="text-xl">Processing...</Label>
          <Loader2 className="h-10 w-full animate-spin justify-center" />
        </div>
      </DialogContent>
    </Dialog>
    </>
  )
}