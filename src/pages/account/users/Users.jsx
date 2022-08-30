import React, { useState } from 'react'
import {motion} from 'framer-motion'
import CreateUser from './CreateUser';
import ViewUser from './ViewUser';
import { useNavigate } from 'react-router-dom';
import { BiArrowBack} from "react-icons/bi";
import useData from '../../../hooks/useData';
import { useAuth } from '../../../hooks/useAuth';
import './users.css'


const Users = () => {

  const navigate = useNavigate();
  const { users, agents } = useData();
  const { user } = useAuth();
  const cuUser = users && users.find(u => u.id === user.uid)

  const agentUsers = users && users.filter(a =>a.typeOf === 'agent')?.filter(u => u.agentId === cuUser.agentId)
  console.log('agentusers', agentUsers)

  const agent = agents && agents.find(a => a.id === cuUser.agentId)
  const agentPilgrims = users && users.filter(a =>a.typeOf === 'pilgrim' )

  return (
    <motion.div 
      initial={{ opacity: 0}}
      animate={{opacity: 1}} 
      transition={{ ease: "easeOut", duration: 0.5 }}
      className="users_wrapper"> 
        <h3 className='message_head'><BiArrowBack onClick={() =>navigate('/account/main')}/>Users</h3>
        <div className="users_inner">
          <h3>List of Users</h3>
          <table className='table'>
        <thead>
          <th >SN</th>
          <th >Firstname</th>
          <th >Lastname</th>  
          <th >Office</th>      
          <th >Phone</th>
          <th >Email</th>
          <th >Status</th>
          <th >Action</th>
        </thead>
        <tbody className='total'>
          {agentUsers?.map((s, index) => (
            <tr key={s.id}>
              <td data-label='SN'>{index+1}</td>     
              <td data-label='Firstname'>{s.fname}</td>    
              <td data-label='Lastname'>{s.lname}</td>   
              <td data-label='Office'>{s.office}</td>             
              <td data-label='Phone'>{s.phone}</td>
              <td data-label='Email'>{s.email}</td>
              <td data-label='Status'>{s.isApproved? 'Approved': 'Not Approved'}</td>
              <td data-label='Action'>Action</td>
            </tr>
           ))}
        </tbody>
      </table>
        </div>
             
      </motion.div>

  )
}

export default Users
