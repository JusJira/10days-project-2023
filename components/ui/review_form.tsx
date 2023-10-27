'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast"
import { Review } from "@prisma/client"

const reviewSchema = z.object({
    score: z
      .number()
      .min(0).max(10),
    description: z.string().max(1000).optional(),
  }).strict()

type ReviewFormValue = z.infer<typeof reviewSchema>


export default function ReviewForm({productId,prev_review} : {productId : number,prev_review : Review | null}){
    

    const { toast } = useToast()
    
    
    
    const defaultValues: Partial<ReviewFormValue> = {
      score: prev_review?.score||10,
      description: prev_review?.description||"",
    }
    const form = useForm<ReviewFormValue>({
        resolver: zodResolver(reviewSchema),
        defaultValues,
        mode: "onChange",
      })
    const [score,setScore] = useState(defaultValues.score);

    const onSubmit = async (data : ReviewFormValue) => {
        try {
            const type = (prev_review) ? "PUT" : "POST"
            const res = await fetch("/api/review",
              {
                method : type ,
      
                headers: {
                  "Content-Type": "application/json",
                },
                body : JSON.stringify({
                    score : data.score,
                    description : data.description,
                    productId : productId
                })
      
              }
            )
            if (res.ok && type === "PUT") {
                console.log(await res.json())
                    toast({
                title: "Edit Review",
                description: `The Review is saved.`,
                })
             //   window.location.replace("/product/" + productId.toString());
                
            } else if (res.ok && type === "POST"){
                    toast({
                title: "Create Review",
                description: `The Review is created.`,
                    })
            } else {
            //alert(res)
                toast({
                    title: "You cannot review this product",
                    description: `You didn't buy this product, so you don't cannot access this button`,
                })
            // toast({
            //   title: "Edit Profile",
            //   description: `The profile is saved.`,
            // })
            //
            }
        }
          catch (err) {
            alert(err);
            console.log(err)
            toast({
                title: "You cannot review this product",
                description: `You didn't buy this product, so you don't cannot access this button`,
            })
          }
          finally {
           
          }
    }
    

    return  (
    <Form {...form} >
        <form onSubmit={(e) => {e.preventDefault();onSubmit(form.getValues())}} className="space-y-8">
            <FormField
            control={form.control}
            name="score"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Score</FormLabel>
                <FormControl>
                    <Input {...field} min = {0} max = {10} onChange = {(e) => {setScore(e.target.valueAsNumber);form.setValue("score",e.target.valueAsNumber)}} value = {score}type = 'number'/>
                </FormControl>
                <FormDescription>
                    This is your public display name that show in web application.
                </FormDescription>
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
                    <Textarea placeholder="Description" {...field}/>
                </FormControl>
                <FormDescription>
                    This is your public display name that show in web application.
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />
        <Button type="submit">{(!prev_review) ? "Create Review" : "Edit Review"}</Button>
        </form>
    </Form>)
}