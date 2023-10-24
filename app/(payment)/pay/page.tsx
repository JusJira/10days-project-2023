"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import React from "react";
import { toast } from "@/components/ui/use-toast";

import { cn } from "@/lib/utils";

const FormSchema = z.object({
  amount: z.coerce
    .number({
      required_error: "Amount is required",
      invalid_type_error: "Amount must be a number",
    })
    .gte(0, {
      message: "Amount must be more than zero.",
    }),
  accId: z.string({
    required_error: "An account id is required.",
  }),
});

export default function InputForm() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);

    const response = await fetch("/api/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: data.amount,
        accId: data.accId,
      }),
    });

    setIsLoading(false);

    if (response?.ok) {
      return toast({
        title: "Success",
        description: "Your transaction has been added.",
      });
    }

    if (!response?.ok) {
      if (response.status === 402) {
        return toast({
          title: "Limit of 3 posts reached.",
          description: "Please upgrade to the PRO plan.",
          variant: "destructive",
        });
      }

      if (response.status === 404) {
        return toast({
          title: "Receiver account was not found.",
          description: "Your money was not transferred please check the Account ID.",
          variant: "destructive",
        });
      }

      if (response.status === 405) {
        return toast({
          title: "Not enough money",
          description: "You can not transfer more than your balance.",
          variant: "destructive",
        });
      }

      return toast({
        title: "Something went wrong.",
        description: "Your money was not transferred.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex items-center justify-center h-full w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="accId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account ID</FormLabel>
                <FormControl>
                  <Input placeholder="Receiver's Account ID" {...field} />
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
                  <Input type="number" placeholder="1000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit" disabled={isLoading}>
            Pay
          </Button>
        </form>
      </Form>
    </div>
  );
}
