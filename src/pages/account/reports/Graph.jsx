import React from 'react'
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import { Title, Tooltip, Legend, Filler } from 'chart.js'
import useData from '../../../hooks/useData';
import { useState } from 'react';


{/* <Doughnut data={...} /> */}

const Graph = () => {

    const { agents, pilgrims } = useData()   

    const agentNames = pilgrims.map((d) => d.agentName).filter((agentName, index, array) => array.indexOf(agentName) === index)
    const counts = agentNames.map(agentName => ({
        name: agentName,
        count: pilgrims.filter(item => item.agentName === agentName).length
    }));

    const options = {        
            maintainAspectRatio: false,
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
            }, 
            plugins: {
                legend: {
                    position: 'top',
                },
            
                title: {
                    display: true,
                    text: 'Applicants Agents'
                }      
            }, 
        };
     

    const data = {
        labels: counts.map((data) => data.name), 
            datasets: 
            [{ 
                label: 'Applicants', 
                fill: true,
                data: counts.map((data) => data.count),
                backgroundColor: ['#7d25d7', '#795548', '#fcb900','#00d084','#009688', '#fcb900', '#795548'],
                borderColor:'white',
                borderWidth:'1'
            }]
        }

    

    console.log('counts', counts)
  
  return (
    <div className='graph_inner'>
      <Bar         
        data={data }
        width={400}
        height={400}
        options={options}
      />
    </div>
  )
}

export default Graph
