"use client"

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
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { db } from "@/lib/db"
import { User } from "@prisma/client"
import { Router, useRouter } from 'next/router'
import { redirect } from "next/navigation"

// Build form schema
const profileFormSchema = z.object({
  displayName: z
    .string()
    .min(1, {
      message: "Display name must not be empty",
    }),
  bio: z.string().max(1000).optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// const {getUser} = getKindeServerSession();
// const user = await getUser();
// const userData = await db.user.findUnique({
//   where: {
//     id: user?.id||""
//   }
// })

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
    //   displayName: userData?.displayName||"",
    //   bio: userData?.bio||""
}

export function ProfileForm() {
    

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })


  async function onSubmit(data: ProfileFormValues) {
    try {
      const res = await fetch("/api/editProfile",
        {
          method : "PUT",

          headers: {
            "Content-Type": "application/json",
          },
          body : JSON.stringify({
            displayName : data.displayName,
            bio : data.bio
          })

        }  
      )
      alert(JSON.stringify(data, null, 2));
      console.log(res);
    }
    catch (err) {
      console.log(err)
    }
    finally {
      window.location.replace("/account")
    }
      
      
    
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Name</FormLabel>
              <FormControl>
                <Input placeholder="Display Name" {...field} />
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
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Tell about yourself
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update Profile</Button>
        
      </form>
    </Form>
  )
}