'use client'

import { Review, User } from "@prisma/client";
import { Card, CardContent } from "./card";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import initials from "initials";
import { useEffect, useState } from "react";


type Cascade_review = Review & {
    user : User
}

export default function ReviewBox({reviews} : {reviews : Cascade_review[]}){

    const [hydrated, setHydrated] = useState(false);
    
    useEffect(() => {
        setHydrated(true);
    }, []);
    if (!hydrated) {
        // Returns null on first render, so the client and server match
        return null;
    }
    
    
    return(<>
        {(reviews.length !== 0) ? (reviews.map((r) => (
            <Card key = {r.id} className="flex flex-col md:flex-row p-[1rem] border-r-2 box-border ">
                <div className="md:w-[40%] lg:w-[30%] border-b-2 border-b-foreground md:border-b-0 md:border-r-2 border-r-foreground flex flex-wrap m-0 h-auto">
                    <Avatar className=" mr-[1rem]">
                        <AvatarImage className='object-cover object-center' src={r.user.image || "https://res.cloudinary.com/dqervfik7/image/upload/v1698202449/10-day-project/image/users/n5o6jwbsitgdvsuxrhfa.png"} />
                        <AvatarFallback>{initials(r.user.displayName as string)}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex flex-col">
                        <div className="md:flex block">
                            {"Name : " +  ((r.user.displayName) ? r.user.displayName : "Anonymous") }
                        </div>
                        <div className="md:flex block">
                            {`Score : ${r.score}`}
                        </div>
                        <div>
                            {`Create At : ${r.reviewedAt.toLocaleString()}`}
                        </div>
                    </div>
                </div>
                <CardContent className="md:w-[60%] lg:w-[70%] flex">
                    { "Description : " +  r.description}
                </CardContent>
            </Card>
          ))) : (
            <Card className=" flex flex-col md:flex-row p-[1rem] justify-center border-r-2 box-border">
                😢 there's no one comment yet
            </Card>
        )}</>) 



}