import React from 'react'
import {motion} from 'framer-motion'
import { useNavigate } from 'react-router-dom';
import { BiArrowBack} from "react-icons/bi";
import useData from '../../../hooks/useData';
import { useAuth } from '../../../hooks/useAuth';
import './pilgrims.css'


import Search from '../../../components/search/Search';
import { GoGraph } from "react-icons/go";
import { useTranslation } from "react-i18next";
import { useState } from 'react';
// import Reports from '../reports/Reports';
import { GrClose } from "react-icons/gr";
import PilgrimCard from './PilgrimCard';

const Pilgrims = () => {
    const { t } = useTranslation();

    const { users, pilgrims, agents } = useData()
    const navigate = useNavigate();
    const { user } = useAuth();
    const cuUser = users && users.find(u => u.id === user.uid)
    const isAgent = users && users.find(u => u.id === user.uid)?.typeOf === 'agent'
    const agentPilgrims = pilgrims && pilgrims.filter(a =>a.agent === cuUser.agentId)


    const [report, setReport] = useState(null)

    const RenderRole = () => {
      if(isAgent){
        return (
          <div className="users_inner">
          <span className='page_heading_1'>List of Pilgrims applied with this Firm</span>
          <table className='table'>
                <thead>
                <th >SN</th>
                <th >Firstname</th>
                <th >Lastname</th> 
                <th >Gender</th>
                <th >Marital Status</th> 
                <th >Ibada</th>      
                <th >Phone</th>
                <th >Email</th>
                <th >Completed?</th>
                <th >Paid?</th>
                <th >Status</th>
                <th >Action</th>
                </thead>
                <tbody className='total'>
                {agentPilgrims?.map((s, index) => (
                    <tr key={s.id}>
                    <td data-label='SN'>{index+1}</td>     
                    <td data-label='Firstname'>{s.fname}</td>    
                    <td data-label='Lastname'>{s.lname}</td>   
                    <td data-label='Gender'>{s.gender}</td> 
                    <td data-label='Marital'>{s.marital}</td>
                    <td data-label='Ibada'>{s.ibada}</td>            
                    <td data-label='Phone'>{s.phone}</td>
                    <td data-label='Email'>{s.email}</td>
                    <td data-label='Completed?'>{s.isCompleted}</td>
                    <td data-label='Paid?'>{s.isPaid}</td>
                    <td data-label='Paid?'>{s.isPaid}</td>
                    <td data-label='Action'>Action</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        )
      }else{
        return (
          <div className="users_inner">
          {/* <span className='page_heading_1'>List of Applicants</span> */}
          <div className="appli_layout">
            <div className="appli_search">
              <Search/>
            </div>
            {/* <div className="appli_report" onClick={() => setReport(!report)}>
              {report? <GrClose/>: <><GoGraph/>{t('report')}</>}
            </div> */}
          </div>
        
          <div className={report? 'grid_hide' : "applicants_grid"} >
            {pilgrims && pilgrims.map(s=> (              
              <PilgrimCard s={s} key={s.id}/>
           
           
            ))}
        </div>
        {/* <div className={report? 'show_report' : "hide_report"} >
          <Reports agents={agents}/>
        </div> */}
         </div>
        )
      }
    }

  return (
    <motion.div 
      initial={{ opacity: 0}}
      animate={{opacity: 1}} 
      transition={{ ease: "easeOut", duration: 0.5 }}
      className="users_wrapper"> 
        <h3 className='message_head'><BiArrowBack onClick={() =>navigate('/account/main')}/>Pilgrims</h3>
        {RenderRole()}
             
      </motion.div>
  )
}

export default Pilgrims
