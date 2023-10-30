'use client'

import { Review, User } from "@prisma/client";
import { Card, CardContent } from "./card";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import initials from "initials";
import { useEffect, useState } from "react";
import Link from "next/link";
import ReactStars from "react-stars";
import ReviewStackBar from "../ReviewStackBar";


type Cascade_review = Review & {
    user : User
}

export default function ReviewBox({reviews} : {reviews : Cascade_review[]}){
    // magic 
    const [hydrated, setHydrated] = useState(false);

    const [overallScore, setOverallScore] = useState<{sum: number, count: number, avg: number}>({sum: 0, count: 0, avg: 0});
    const [ratingData, setRatingData] = useState<{five: number, four: number, three: number, two: number, one: number}>({five: 0, four: 0, three: 0, two: 0, one: 0})

    function getOverallScore() {
        var data = {five: 0, four: 0, three: 0, two: 0, one: 0}
        for (var e of reviews) {
            if (e.score == 5) {
                data.five += 1
            }
            else if (e.score == 4) {
                data.four += 1
            }
            else if (e.score == 3) {
                data.three += 1
            }
            else if (e.score == 2) {
                data.two += 1
            }
            else if (e.score == 1) {
                data.one += 1
            }
        }
        const count = data.five + data.four + data.three + data.two + data.one
        const sum = 5*data.five + 4*data.four + 3*data.three + 2*data.two + 1*data.one

        var avg = -1.0
        if (count != 0) {
            avg = sum/count
        }

        setOverallScore({sum: sum, count: count, avg: avg})
        setRatingData(data)
    }
    
    useEffect(() => {
        setHydrated(true);
    }, []);

    useEffect(() => {
        getOverallScore();
    }, []);

    if (!hydrated) {
        // Returns null on first render, so the client and server match
        return null;
    }
    //
    
    return(<>
        {(reviews.length !== 0) && <ReviewStackBar overallScore={overallScore} ratingData={ratingData}/>}
        {(reviews.length !== 0) ? (reviews.map((r) => (
            <Card key = {r.id} className="flex flex-col md:flex-row p-[1rem] border-r-2 box-border ">
                <div className="md:w-[40%] lg:w-[30%] border-b-2 border-b-foreground md:border-b-0 md:border-r-2 border-r-foreground flex flex-wrap m-0 h-auto">
                    <Link href={`/account/${r.user.accountId}`}>
                        <Avatar className=" mr-[1rem]">
                            <AvatarImage className='object-cover object-center' src={r.user.image || "https://res.cloudinary.com/dqervfik7/image/upload/v1698202449/10-day-project/image/users/n5o6jwbsitgdvsuxrhfa.png"} />
                            <AvatarFallback>{initials(r.user.displayName as string)}</AvatarFallback>
                        </Avatar>
                    </Link>
                    
                    <div className="flex flex-col">
                        <div className="md:flex block">
                            {"Name : " +  ((r.user.displayName) ? r.user.displayName : "Anonymous") }
                        </div>
                        <div className="flex items-center">
                            <div className="mr-3">{`Score : `} </div>
                            <ReactStars count={5}
                                value = {r.score}
                                size={24}
                                half={false}
                                edit={false}
                                color2={'#ffd700'} 
                            />
                            <div className="ml-3">({r.score})</div>
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
                😢 there&apos;s no one comment yet
            </Card>
        )}</>) 



}