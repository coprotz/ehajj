import React from 'react'
import './register.css'
import videoBg from '../../components/images/kaaba3.mp4'
import Register from '../home/Register'
import logo from '../../components/images/logo1.png'
import { useNavigate } from 'react-router-dom'



const Signup = () => {
  const navigate = useNavigate()
  return (
    <div className='register'>
       
        <div className="register_left">
            <div className="reg_logo" onClick={() =>navigate(-1)}><img src={logo} alt="" /></div>
            <h1 className="reg_welcome">Welcome to e-hajj Tanzania</h1>
            <div className="reg_reg_details">
                <Register/>
            </div>
            <div className="reg_footer_info">
              <span>Help</span>
              <span>Terms</span>
              <span>Privacy</span>
            </div>
        </div>
        <div className="cont_video">
            <video src={videoBg} autoPlay loop muted/>                      
        </div>
        
      
    </div>
  )
}

export default Signup
