import React, { useState } from 'react'
import {motion} from 'framer-motion'
import { useNavigate } from 'react-router-dom';
import { BiArrowBack} from "react-icons/bi";
import useData from '../../../hooks/useData';
import { useAuth } from '../../../hooks/useAuth';
import './agent.css'
import AgentCard from './AgentCard';


const Teams = () => {

  const navigate = useNavigate();
  const {  agents } = useData();
  // const { user } = useAuth();
  // const cuUser = users && users.find(u => u.id === user.uid)
  // const agentUsers = users && users.filter(a =>a.typeOf === 'agent')?.filter(u => u.agentId === cuUser.agentId)
  // console.log('agentusers', agentUsers)
  // const agent = agents && agents.find(a => a.id === cuUser.agentId)
  // const agentPilgrims = users && users.filter(a =>a.typeOf === 'pilgrim' )
  // const isMission = mission && mission.find(m => m.userId === user.uid)
  

  return (
    <motion.div 
      initial={{ opacity: 0}}
      animate={{opacity: 1}} 
      transition={{ ease: "easeOut", duration: 0.5 }}
      className="agent_body"> 
        <h3 className='message_head'><BiArrowBack onClick={() =>navigate('/account/main')}/>Users</h3>
        <div className="users_inner">
          <h3>List of Agents</h3>
          <table className='table'>
        <thead>
          <th >SN</th>
          <th >Logo</th>
          <th >Name</th> 
          <th >Phone</th>
          <th >Website</th>
          <th >Joined</th>
          <th >Createdby</th>
          <th >Pilgrims</th>
          <th >Users</th>
          <th >Status</th>
          <th >Action</th>
        </thead>
        <tbody className='total'>         
           {agents?.reverse().map((s, index) => (
              <AgentCard s={s} index={index}/>
           ))}          
        </tbody>
      </table>
        </div>
             
      </motion.div>

  )
}

export default Teams