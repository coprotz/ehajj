import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../footer/Footer'
import Navbar from '../navbar/Navbar'
import './agent.css'
import { HiArrowNarrowLeft } from "react-icons/hi";
import AgentSidebar from '../sidebar/AgentSidebar'


const Agent = () => {   
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
