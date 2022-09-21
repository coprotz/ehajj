import React from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import Footer from '../footer/Footer'
import Navbar from '../navbar/Navbar'
import AgentSidebar from '../sidebar/AgentSidebar'
import { HiArrowNarrowLeft } from "react-icons/hi";
import './pilgrims.css'


const Pilgrim = () => {


  // const cuUser = users && users.find(u => u.userId === user.uid)

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

export default Pilgrim
