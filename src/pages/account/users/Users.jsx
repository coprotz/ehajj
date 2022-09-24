import React, { useState } from 'react'
import {motion} from 'framer-motion'
import CreateUser from './CreateUser';
import ViewUser from './ViewUser';
import { useNavigate } from 'react-router-dom';
import { BiArrowBack} from "react-icons/bi";
import useData from '../../../hooks/useData';
import { useAuth } from '../../../hooks/useAuth';
import './users.css'
import NewChat from '../message/NewChat';
import ChangeStatus from '../../../components/changeStatus/ChangeStatus';

import ViewProfile from '../../../components/viewProfile/ViewProfile';
import UserCard from './UserCard';



const Users = () => {

  const navigate = useNavigate();
  const { users, agents, mission } = useData();
  const { user } = useAuth();
  const cuUser = users && users.find(u => u.id === user.uid)

  const agentUsers = users && users.filter(a =>a.typeOf === 'agent')?.filter(u => u.agentId === cuUser.agentId)
  console.log('agentusers', agentUsers)

  const agent = agents && agents.find(a => a.id === cuUser.agentId)
  const agentPilgrims = users && users.filter(a =>a.typeOf === 'pilgrim' )
  const isMission = mission && mission.find(m => m.userId === user.uid)
  

  return (
    <motion.div 
      initial={{ opacity: 0}}
      animate={{opacity: 1}} 
      transition={{ ease: "easeOut", duration: 0.5 }}
      className="agent_body"> 
        <h3 className='message_head'><BiArrowBack onClick={() =>navigate('/account/main')}/>Users</h3>
        <div className="users_inner">
          <h3>List of Users</h3>
          <table className='table'>
        <thead>
          <th >SN</th>
          <th >Name</th>
          <th >Role</th>
          <th >Firm</th>  
          <th >Office</th>      
          <th >Phone</th>
          <th >Email</th>
          <th >Status</th>
          <th >Action</th>
        </thead>
        <tbody className='total'>
          {agent && <>
           {agentUsers?.filter(a => a.id !==cuUser.id).map((s, index) => (
            <tr key={s.id}>
              <td data-label='SN'>{index+1}</td>     
              <td data-label='Name'>{s?.fname+" "+s?.lname}</td>  
              <td data-label='Role'>{s?.typeOf}</td>    
              <td data-label='Firm'>{s?.lname}</td>   
              <td data-label='Office'>{s?.office}</td>             
              <td data-label='Phone'>{s?.phone}</td>
              <td data-label='Email'>{s?.email}</td>
              <td data-label='Status'>{s?.status}</td>
              <td data-label='Action'>
                <div className="actions_btns">
                  {agent &&
                    <ChangeStatus id={s?.id}/>
                  }                  
                  <ViewProfile id={s?.id}/>
                  <NewChat s={s?.id} name={s?.fname+" "+s?.lname}/>                
                </div>
              
              </td>
            </tr>
           ))}
           
           </>}
           {isMission && <>
            {users?.map((s, index) => (
              <UserCard user={s} key={s.id} index={index}/>
           ))}
           
           
           </>}
        </tbody>
      </table>
        </div>
             
      </motion.div>

  )
}

export default Users
