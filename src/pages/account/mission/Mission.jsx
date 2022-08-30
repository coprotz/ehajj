import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../footer/Footer'
import Navbar from '../navbar/Navbar'

const Mission = () => {
  return (
    <div className='acc_wrapper'>
        <Navbar/>
        <Outlet/>
        <Footer/>
     
    </div>
  )
}

export default Mission