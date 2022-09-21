import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import useData from '../../../hooks/useData'
import Footer from '../footer/Footer'
import Navbar from '../navbar/Navbar'
import './agent.css'
import { HiArrowNarrowLeft } from "react-icons/hi";
import AgentSidebar from '../sidebar/AgentSidebar'


const Agent = () => {
  const { user, logOut } = useAuth()
  const { users, agents, pilgrims } = useData()
  const cuUser = users && users.find(u => u.id === user.uid)
  const agent = agents && agents.find(a => a.id === cuUser.agentId)  
  const agentPilgrims = pilgrims && pilgrims.filter(u => u.agent === agent.id) 
  const navigate = useNavigate()


  return (
    <div className='agent_wrapper'>
        <button className='btn_back_home' onClick={() =>navigate('/')}><HiArrowNarrowLeft/></button>
        <Navbar/>
        <div className="agent_container">
          <AgentSidebar/>
          <Outlet/>
        </div>
        <Footer/>
     
    </div>
  )
}

export default Agent
