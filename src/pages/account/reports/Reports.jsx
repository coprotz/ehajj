import React from 'react'
import { useState } from 'react'
import useData from '../../../hooks/useData'
import Graph from './Graph'
import { Chart as ChartJS } from 'chart.js/auto'
import GenderPie from './pie/GenderPie'
import './reports.css'
import MaritalPie from './pie/MaritalPie'
import IbadaCompletePie from './pie/IbadaCompletePie'
import IbadaTypePie from './pie/IbadaTypePie'



const Reports = () => {

  return (
    <div className='reports_wrapper'>        
        <Graph /> 
        <div className="reports_inside">
            <div className="inner_report_card">
                <GenderPie/>
            </div>
            <div className="inner_report_card">
                <MaritalPie/>
            </div>
            <div className="inner_report_card">
                <GenderPie/>
            </div>
            <div className="inner_report_card">
                <IbadaCompletePie/>
            </div>
            <div className="inner_report_card">
                <IbadaTypePie/>
            </div>
        </div>   
    </div>
    
  )
}

export default Reports
