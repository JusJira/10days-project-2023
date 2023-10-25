"use client";

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
import { UploadButton } from "@/lib/uploadthing";
import { useState } from "react";


// Build form schema
const profileFormSchema = z.object({
  displayName: z
    .string()
    .min(1, {
      message: "Display name must not be empty",
    }),
  bio: z.string().max(1000).optional(),
  address: z.string().optional()
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// const {getUser} = getKindeServerSession();
// const user = await getUser();
// const userData = await db.user.findUnique({
//   where: {
//     id: user?.id||""
//   }
// })
// const userData = await getdbUser()

// This can come from your database or API.
// const defaultValues: Partial<ProfileFormValues> = {
//       // displayName: userData?.displayName||"",
//       // bio: userData?.bio||""
// }


export function ProfileForm({userData} : {userData: any}) { // change any type if u have free time, I am lazy
  const [profileImage, setProfileImage] = useState<string>(userData?.image);

  const defaultValues: Partial<ProfileFormValues> = {
    displayName: userData?.displayName||"",
    bio: userData?.bio||"",
    address: userData?.address||""
  }

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })


  async function onSubmit(data: ProfileFormValues) {
    alert(JSON.stringify(data, null, 2));
    try {
      const res = await fetch("/api/editProfile",
        {
          method : "PUT",

          headers: {
            "Content-Type": "application/json",
          },
          body : JSON.stringify({
            displayName : data.displayName,
            bio : data.bio,
            image: profileImage,
            address: data.address
          })

        }  
      )
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
        <FormItem>
              <FormLabel>Image</FormLabel>
              <FormDescription>
                Upload your profile image
                
              </FormDescription>
              <FormMessage />
              <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-2 p-2 -m-2 mt-2 mb-2 px-3 py-2 w-full">
                <div className="inline-flex basis-32 items-center justify-center min-w-32 min-h-32 w-32 h-32 md:w-32 md:h-32 overflow-hidden bg-[#C3DCE3] rounded-full">
                  {
                    (<img className='h-full !object-cover' src={profileImage}></img>)
                  }
                </div>
                <UploadButton
                  className="py-5 md:px-8 md:py-0"
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    // Do something with the response
                    console.log("Files: ", res);
                    alert("Upload Completed");
                    if (res) {
                      setProfileImage(res[0].url)
                    }
                    
                  }}
                  onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                  }}
                />
              </div>
              </FormItem>
        
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Your address"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Locate your address
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