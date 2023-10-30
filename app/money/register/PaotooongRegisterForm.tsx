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
import { redirect, useSearchParams } from "next/navigation";

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

// Build form schema
const registerFormSchema = z.object({
  email: z
    .string()
    .email()
    .min(1, {
      message: "Please fill email",
    }),
  password: z.string()
    .min(8, {
      message: "The password must be at least 8 characters",
    })
})

type RegisterFormValues = z.infer<typeof registerFormSchema>

export function PaotooongRegisterForm() { // change any type if u have free time, I am lazy
  const queryParams = useSearchParams();
  const redirectQuery = queryParams ? queryParams.get("rdb") : "/wallet";

  const [isProcessing, setProcessing] = useState<boolean>(false);
  const [allowSubmit, setAllowSubmit] = useState<boolean>(true);

  const defaultValues: Partial<RegisterFormValues> = {
    email: "",
    password: ""
  }

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues,
    mode: "onChange",
  })


  async function onSubmit(data: RegisterFormValues) {
    // alert(JSON.stringify(data))
    setProcessing(true)
    setAllowSubmit(false)
    try {

      const res = await fetch("/api/payment/paotooong/create",
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
          title: "Register Failed",
          description: `${resJson.message}`,
          variant: "destructive"
        })
        setProcessing(false)
        setAllowSubmit(true)
      }
      else {
        toast({
          title: "Register Successful",
          description: `We will redirect you to previous page soon...`,
        })
        setProcessing(false)
        await delay(2000);
        window.location.href = (redirectQuery || "/wallet")
      }
      
    }
    catch (err) {
      toast({
        title: "Register Failed",
        description: `${err}`,
        variant: "destructive"
      })
      setProcessing(false)
      setAllowSubmit(true)
    }
    
  }

  return (
    <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

        <Button type="submit" disabled={!allowSubmit}>Create</Button>
        
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