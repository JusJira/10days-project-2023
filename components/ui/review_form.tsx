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
import ReactStars from 'react-stars'

const reviewSchema = z.object({
    score: z
      .number().int()
      .min(0).max(10),
    description: z.string().max(1000).optional(),
  }).strict()

type ReviewFormValue = z.infer<typeof reviewSchema>


export default function ReviewForm({productId,prev_review} : {productId : number,prev_review : Review | null}){
    

    const { toast } = useToast();
    const [type,setType] = useState<string>((prev_review) ? "PUT" : "POST");
    const defaultValues: Partial<ReviewFormValue> = {
      score: prev_review?.score||3,
      description: prev_review?.description||"",
    }
    const form = useForm<ReviewFormValue>({
        resolver: zodResolver(reviewSchema),
        defaultValues,
        mode: "onChange",
      })
    const [score,setScore] = useState(defaultValues.score);


    const onDelete = async () => {
      try {
        const res = await fetch("/api/review",
          {
          method : "DELETE" ,
          headers :{
            "Content-Type": "application/json",
          }, body : JSON.stringify({
            productId : productId
          })
          }
        )
        setType("POST");
        form.setValue("score",3);
        form.setValue("description","");
        window.location.replace("/product/" + productId.toString());
        toast({
          title: "Successfully Delete review",
          description: `Your review was deleted.`,})
        
      } catch (err) {
        console.log(err);
      }


    };

    const onSubmit = async (data : ReviewFormValue) => {

        try {
            
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
                toast({
                title: "Edit Review",
                description: `The Review is saved.`,
                })
               window.location.replace("/product/" + productId.toString());
                
            } else if (res.ok && type === "POST"){
                setType("PUT");
                window.location.replace("/product/" + productId.toString());
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
        <form onSubmit={ form.handleSubmit(onSubmit)} className="space-y-8">
            {/* TODO better ui for review score ?
            */}
            <FormField
            control={form.control}
            name="score"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Score</FormLabel>
                <FormControl>
                  <div className="flex flex-row items-center">
                    <ReactStars
                      count={5}
                      onChange={(e) => {setScore(e);form.setValue("score",e)}}
                      value = {score}
                      size={24}
                      half={false}
                      color2={'#ffd700'} 
                    />
                    <div className="ml-3">({score})</div>
                  </div>
                
                  {/* <Input {...field} onChange = {(e) => {setScore(e.target.valueAsNumber);form.setValue("score",e.target.valueAsNumber)}} value = {score}type = 'number'/> */}
                </FormControl>
                <FormDescription>
                    This is your public score review that show in web application.
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
                    This is your public description review that show in web application.
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />
        <div className="flex justify-between">
        <Button type="submit"> {(type === "POST") ? "Create Review" : "Edit Review"}</Button>
        {(type === "PUT") ? <Button type="submit"  onClick = {(e) => {e.preventDefault(); onDelete();}}>Delete Review</Button>: <></>}
        </div>
        </form>
    </Form>)
}