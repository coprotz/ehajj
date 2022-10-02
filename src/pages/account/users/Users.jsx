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
import moment from 'moment'
import ViewProfile from '../../../components/viewProfile/ViewProfile';
import UserCard from './UserCard';
import Search from '../../../components/search/Search';



const Users = () => {

  const navigate = useNavigate();
  const { users, agents, mission, admins } = useData();
  const { user } = useAuth();
  const cuUser = users && users.find(u => u.id === user.uid)

  const agentUsers = users?.filter(u => u.agentId === cuUser?.agentId)
 

  const agent = agents && agents.find(a => a.id === cuUser?.agentId)
  // const agentPilgrims = users && users.filter(a =>a.typeOf === 'pilgrim' )
  const isMission = mission && mission.find(m => m.userId === user.uid)
  const isAdmin = admins?.find(a => a?.userId === user?.uid)

  console.log('agent', agent)

  const isCreator = cuUser?.id === agent?.createdBy
  // const agent = agents && agents.find(u => u.id === user?.agentId)
  

  return (
    <motion.div 
      initial={{ opacity: 0}}
      animate={{opacity: 1}} 
      transition={{ ease: "easeOut", duration: 0.5 }}
      className="agent_body"> 
        <h3 className='message_head'><BiArrowBack onClick={() =>navigate('/account/main')}/>Users</h3>
        <div className="users_inner">
        <h4 className='account_page_name'>List of Users</h4>
        <Search/>
        <table className='table'>
        <thead>
          <th >SN</th>
          <th >Photo</th>
          <th >Name</th>
          <th >Firm</th>  
          <th >Status Line</th>      
          <th >Phone</th>
          <th >Email</th>
          <th >Created At</th>
          <th >Status</th>
          <th >Action</th>
        </thead>
        <tbody className='total'>
          {cuUser && <>
           {agentUsers?.map((s, index) => (
            <tr key={s.id}>
              <td data-label='SN'>{index+1}</td> 
              <td data-label='Photo'>{s?.photo? <img src={s?.photo} alt="" />: 
                <span className='agent_logo2'>{s?.fname[0]+""+s?.lname[0]}</span>}
              </td>    
              <td data-label='Name'>{s?.fname+" "+s?.lname}</td>      
              <td data-label='Firm'>{agent?.name || agent?.coName}</td>   
              <td data-label='Status Line' className='user_line'>
                {s?.isOnline? <span className='online1'></span> : <span className='offline1'></span>}
              </td>             
              <td data-label='Phone'>{s?.phone}</td>
              <td data-label='Email'>{s?.email}</td>
              <td data-label='Created At'>{moment(s?.createdAt?.toDate()).fromNow()}</td>
              <td data-label='Status'>{s?.status}</td>
              <td data-label='Action'>
                <div className="actions_btns">                  
                  <ChangeStatus id={s?.id}/>                                 
                  <ViewProfile id={s?.id}/>                 
                  <NewChat s={s?.id} name={s?.fname+" "+s?.lname}/>             
                </div>
              
              </td>
            </tr>
           ))}
           
           </>}
           {isMission && <>
            {users?.reverse().map((s, index) => (
              <UserCard user={s} key={s.id} index={index}/>
           ))}</>}
            {isAdmin && <>
              {users?.reverse().map((s, index) => (
              <UserCard user={s} key={s.id} index={index}/>
           ))}</>}
           
           
           
           
        </tbody>
      </table>
        </div>
             
      </motion.div>

  )
}

export default Users
