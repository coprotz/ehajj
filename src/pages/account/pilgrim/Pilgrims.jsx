import React from 'react'
import {motion} from 'framer-motion'
import { useNavigate } from 'react-router-dom';
import { BiArrowBack} from "react-icons/bi";
import useData from '../../../hooks/useData';
// import moment from 'moment'
import { useAuth } from '../../../hooks/useAuth';
// import {  BsChatLeftText, BsEye, BsPencil } from "react-icons/bs";
import './pilgrims.css'


// import Search from '../../../components/search/Search';
// import { GoGraph } from "react-icons/go";
import { useTranslation } from "react-i18next";
import { useState } from 'react';
// import Reports from '../reports/Reports';
// import { GrClose } from "react-icons/gr";
import PilgrimCard from './PilgrimCard';
// import ChangeStatus from '../../../components/changeStatus/ChangeStatus';
// import NewChat from '../message/NewChat';
// import ViewProfile from '../../../components/viewProfile/ViewProfile';
// PilgrimCard


const Pilgrims = () => {
    const { t } = useTranslation();

    const { users, pilgrims, agents, mission, admins } = useData()
    const navigate = useNavigate();
    const { user } = useAuth();
    const cuUser = users && users.find(u => u.id === user.uid)
    const isAgent = users && users.find(u => u.id === user.uid)?.typeOf === 'agent'
    const agentPilgrims = pilgrims && pilgrims.filter(a =>a.agent === cuUser?.agentId)
    const isMission = mission && mission.find(m => m.userId === user.uid)
    const isAdmin = admins?.find(a => a?.userId === user?.uid)


    // const [report, setReport] = useState(null)
    // const [action, setAction] = useState(null)

    const RenderRole = () => {
       return (
          <div className="users_inner">
          <span className='page_heading_1'>List of Pilgrims</span>
          <table className='table'>
            <thead>
              <th>Photo</th>
              <th>Name</th>              
              <th>Age</th>
              <th>Gender</th> 
              <th>Ibada Type</th>         
              <th>Created At</th>          
              <th>Application Status</th>
              <th>Wakala</th>  
              <th>Action</th>
            </thead>
            <tbody>
              {isAgent && <>
                {agentPilgrims && agentPilgrims.map(pil => (
                 <PilgrimCard pil={pil} key={pil.id}/>
                ))}
              </>}
              {isMission && <>
                {pilgrims && pilgrims.reverse().map(pil => (
                <PilgrimCard pil={pil}/>
                ))}
              </>}
              {isAdmin && <>
                {pilgrims && pilgrims.reverse().map(pil => (
                <PilgrimCard pil={pil}/>
                ))}
              </>}
            </tbody>
          </table>
        </div>
        )
     
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
