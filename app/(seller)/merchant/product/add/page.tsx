"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button, buttonVariants } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { UploadButton } from "@/utils/uploadthing";
import {useRouter} from "next/navigation"
import Image from "next/image";
import { productSchema } from "@/utils/zod";
import { Separator } from "@/components/ui/separator";
import { Store } from "lucide-react";

const FormSchema = productSchema

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

export default function InputForm() {
  const [resource, setResource] = React.useState<string>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [disableButton, setDisableButton] = React.useState<boolean>(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setDisableButton(true)

    const response = await fetch("/api/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price: data.price,
        name: data.name,
        stock: data.stock,
        description: data.description,
        image: data.image,
      }),
    });

    setIsLoading(false);

    if (response?.ok) {
      toast({
        title: "Success",
        description: "Your product has been added. You will be sent back soon...",
      });
      await delay(1500);
      window.location.href = '/merchant/product'
      return
    }

    if (!response?.ok) {
      setDisableButton(false)
      return toast({
        title: "Something went wrong.",
        description: "Your product was not created",
        variant: "destructive",
      });
    }
  }

  return (
    
    <div className="relative flex min-h-full flex-col gap-3 bg-neutral-100 p-3 dark:bg-neutral-800">
      <div className="px-5 flex flex-row space-x-3">
        <Store className="content-center" size={25}></Store>
        <h3 className="text-lg font-medium">Merchant &gt; Product &gt; Adding</h3>
      </div>
      <Separator />
      <div className="flex flex-col items-center justify-center w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Product Name"
                    className="appearance-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Image</FormLabel>
                <FormControl>
                  <Input
                  type="hidden"
                    placeholder="Product Image Url"
                    className="appearance-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex-col flex items-center justify-center gap-3">
            <div className="relative">
              {resource ? <img src={resource} alt="Product Image"></img>: null}
            </div>
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                // Do something with the response
                if (res) {
                  form.setValue('image',res[0].url)
                  setResource(res[0].url)
                }
                
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />
          </div>
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="1000"
                    className="appearance-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="99"
                    className="appearance-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about your product"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit" disabled={disableButton}>
            Add Product
          </Button>
        </form>
      </Form>
    </div>
    </div>
    
  );
}
