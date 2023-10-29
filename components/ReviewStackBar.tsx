"use client";

import React from 'react'
import BarChart from "./ui/BarChart";
import Chart from "chart.js/auto";
import { Card, CardContent } from './ui/card';
import ReactStars from 'react-stars';
import pluralize, { plural } from 'pluralize';


const ReviewStackBar = ({overallScore, ratingData} : {overallScore: {sum: number, count: number, avg: number}, ratingData: {five: number, four: number, three: number, two: number, one: number}}) => {

    const data = {
        labels: ['5', '4', '3', '2', '1'],
        // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
        datasets: [
            {
              label: 'No. of reviews',
              data: [ratingData?.five, ratingData?.four, ratingData?.three, ratingData?.two, ratingData?.one],
              // you can set indiviual colors for each bar
              backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(255, 99, 132, 0.5)',
                'rgba(255, 99, 132, 0.5)',
                'rgba(255, 99, 132, 0.5)',
                'rgba(255, 99, 132, 0.5)',
              ],
            }
        ]
    }



  return (
    <Card>
        <CardContent className="p-5 flex flex-col">
            <div className="flex flex-row items-center">
                <div className="mr-3">Overall Rating : </div> 

                <ReactStars count={5}
                    value = {overallScore?.avg}
                    size={24}
                    half={true}
                    edit={false}
                    color2={'#ffd700'} 
                />

                <div className="ml-3">({(overallScore?.avg != -1.0) ? overallScore?.avg.toFixed(2) : "-"})</div>
            </div>
            <div className="">From {overallScore.count} {pluralize("review", overallScore.count)}</div>
            <BarChart data={data} max={overallScore.count} />
        </CardContent>
        
    </Card>
        

    
  )
}

export default ReviewStackBar