import { Outlet } from 'react-router-dom'
import Footer from '../footer/Footer'
import Navbar from '../navbar/Navbar'
import './admin.css'

const Admin = () => {
  return (
    <div className='acc_wrapper'>
        <Navbar/>
        <Outlet/>
        <Footer/>
     
    </div>
  )
}

export default Admin
