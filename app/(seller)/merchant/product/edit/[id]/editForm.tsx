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
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { productSchema } from "@/utils/zod";
import { UploadButton } from "@/utils/uploadthing";

const FormSchema = productSchema;
type ProfileFormValues = z.infer<typeof FormSchema>;

export default function EditForm({ productData, id }: { productData: any, id: number }) {
  const [imageUrl, setImageUrl] = React.useState(productData.image);
  const [isFetching, setIsFetching] = React.useState<boolean>(true);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const defaultValues: Partial<ProfileFormValues> = {
    price: productData.price|| "",
    stock: productData.quantity || "",
    name: productData.name || "",
    description: productData.description || "",
    image: imageUrl,
  };
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
    mode: "onChange",
  });


  async function onDelete() {
    const response = await fetch("/api/product/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });

    if (response?.ok) {
      window.location.href = "/merchant/product";
      return toast({
        title: "Success",
        description: "Your product has been deleted.",
      });
    }
  }
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);

    const response = await fetch("/api/product/edit", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price: data.price,
        name: data.name,
        stock: data.stock,
        description: data.description,
        id: id,
        image: imageUrl,
      }),
    });

    setIsLoading(false);

    if (response?.ok) {
      window.location.href = "/merchant/product";
      return toast({
        title: "Success",
        description: "Your product has been edited.",
      });
    }

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your was not edited.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="p-3">
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="">
              <div className="w-full dark:bg-neutral-600 bg-neutral-100 rounded-md grid grid-cols-1 md:grid-cols-3">
                <div className="flex items-center justify-center p-3 flex-col gap-3">
                    <Image
                      src={imageUrl}
                      alt="Product Image"
                      width={300}
                      height={300}
                    />
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormDescription>Upload your product image</FormDescription>
                    <FormMessage />
                  </FormItem>
                  <div className="flex-col flex items-center justify-center gap-3">
                    <UploadButton
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        toast({
                            title: "Upload Image : Success",
                            description: `The image will be loaded soon. By the way, you must press "Save" to update image.`,
                          })
                        // Do something with the response
                        if (res) {
                          setImageUrl(res[0].url);
                        }
                      }}
                      onUploadError={(error: Error) => {
                        // Do something with the error.
                        alert(`ERROR! ${error.message}`);
                      }}
                    />
                  </div>
                </div>
                <div className="p-4 flex flex-col gap-3 col-span-2">
                  <span className="text-4xl font-bold">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Product Name"
                              className="appearance-none w-fit"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </span>
                  <div className="flex gap-3 flex-col md:flex-row">
                    <span className="text-xl font-bold flex flex-row items-center gap-3">
                      Price:{" "}
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Product Price"
                                className="appearance-none w-fit"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </span>
                    <span className="text-xl font-bold flex flex-row items-center gap-3">
                      Stock:{" "}
                      <FormField
                        control={form.control}
                        name="stock"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Product Stock"
                                className="appearance-none w-fit"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl">Description:</span>
                    <span className="text-lg">
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us about your product"
                                className="resize-none h-64"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center px-8 py-4 flex-col gap-3">
                <Button
                  className="w-full mx-32"
                  type="submit"
                  disabled={isLoading}
                >
                  Save
                </Button>
              </div>
            </form>
          </Form>
          <div className="flex items-center justify-center px-8 flex-col gap-3">
            <Button
              className="w-full mx-32"
              variant={"destructive"}
              onClick={() => onDelete()}
            >
              Delete
            </Button>
          </div>
        </>
    </div>
  );
}
