"use client";

import { Bar } from "react-chartjs-2";
import React from 'react'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement
  } from 'chart.js'
  import { Chart } from 'react-chartjs-2'
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend, 
    BarElement
  )



const BarChart = ({data, max} : {data : any, max: number}) => {
    const options = {
        indexAxis: 'y' as const,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: false
            },
            
        },
        scales: {
            x: {
                min: 0,
                max: max,
                grid: {
                    display: false
                },
                display: false
            },
            y: {
                grid: {
                    display: false
                }
            }
        },

    }

  return (
    <div className="chart-container p-5">
    <Bar
        data={data}
        options={options}
    />
  </div>
  )
}

export default BarChart