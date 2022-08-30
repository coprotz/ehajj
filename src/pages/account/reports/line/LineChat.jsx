import React from 'react'
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import { Title, Tooltip, Legend, Filler } from 'chart.js'
import useData from '../../../../hooks/useData';

const LineChat = ({datalabel, dataUse, label, title}) => {
    const { pilgrims } = useData()

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
                text: title
            }      
        }, 
    };
 

const data = {
    labels: datalabel, 
        datasets: 
        [{ 
            label: label, 
            fill: true,
            data: dataUse,
            backgroundColor: ['#7d25d7', '#795548', '#fcb900','#00d084','#009688', '#fcb900', '#795548'],
            borderColor:'white',
            borderWidth:'1'
        }]
    }
  return (
    <div className='line_chat'>
        <Line         
            data={data }
            width={400}
            height={900}
            options={options}
        />
      
    </div>
  )
}


export default LineChat
