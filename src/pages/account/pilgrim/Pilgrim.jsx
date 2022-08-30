import React from 'react'
import { useNavigate, Route, Routes, Outlet } from 'react-router-dom'
// import { useAuth } from '../../../hooks/useAuth'
// import useData from '../../../hooks/useData'
// import Account from '../Account'
import Footer from '../footer/Footer'
// import Home from '../Main'
// import Messages from '../Messages'
import Navbar from '../navbar/Navbar'
// import Ticket from '../Ticket'
import './pilgrims.css'

const Pilgrim = () => {


  // const cuUser = users && users.find(u => u.userId === user.uid)

  const navigate = useNavigate()
  return (
    <div className='acc_wrapper'>
      <Navbar/>     
      <Outlet/>      
      <Footer/>
    </div>
  )
}

export default Pilgrim
