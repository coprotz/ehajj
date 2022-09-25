import React from 'react'
import './register.css'
import videoBg from '../../components/images/kaaba3.mp4'
import Register from '../home/Register'
import logo from '../../components/images/logo1.png'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from "react-i18next";


const Signup = () => {
  const navigate = useNavigate()
  const { t } = useTranslation();

  return (
    <div className='register'>
       
        <div className="register_left">
            <div className="reg_logo" onClick={() =>navigate(-1)}><img src={logo} alt="" /></div>
            <h1 className="reg_welcome">{t('welcome_to_ehajj')}</h1>
            <div className="reg_reg_details">
                <Register/>
            </div>
            <div className="reg_footer_info">
              <span onClick={() =>navigate('/help')}>{t('help')}</span>
              <span onClick={() =>navigate('/terms')}>{t('terms')}</span>
              <span onClick={() =>navigate('/privacy')}>{t('privacy')}</span>
            </div>
        </div>
        <div className="cont_video reg_video">
            <video src={videoBg} autoPlay loop muted/>                      
        </div>
        
      
    </div>
  )
}

export default Signup
