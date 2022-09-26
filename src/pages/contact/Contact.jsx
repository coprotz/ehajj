import React from 'react'
import './contact.css'
import { useNavigate } from 'react-router-dom'
import {motion} from 'framer-motion'
import {  AiOutlineTwitter, AiFillInstagram, AiOutlineYoutube, AiFillFacebook } from "react-icons/ai";
import Navbar from '../../components/navbar/Navbar';
import Footer from '../account/footer/Footer';
import { useTranslation } from "react-i18next";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { BsGlobe } from "react-icons/bs";
import chat from '../../components/images/chat1.png'

const Contact = () => {
  const navigate = useNavigate()
  const { t } = useTranslation();

  return (
    
      <div className="contact">
        <Navbar/>
        <motion.div 
             initial={{ x: '100vw'}}
             animate={{x:0}} 
             transition={{ ease: "easeOut", duration: 0.5 }} 
          className='contact_inner'>                     
              <div className="about_top_1">
                <h1 className='about_title'>{t('contact_title')}</h1>
              </div>
              <div className="contact_body">
                <div className="contact_address">
                  <span>E-HAJJ TANZANIA LTD</span>
                  <span>P.O Box 2467, Dodoma</span>
                  <span>Machame Building, Wazo Street</span>
                  <span>Dodoma, Tanzania</span>
                  <span>+255 8877 55665</span>
                  <span>info@ehajj.org</span>
               
                  <div className="contact_social">
                    <AiOutlineTwitter/>
                    <AiFillInstagram/>
                    <AiOutlineYoutube/>
                    <AiFillFacebook/>
                  </div>
                </div>
                <div className="contact_form">
                  <h1>{t('message_title')}</h1>
                  <img src={chat} alt="" />
                  <div className="contact_items_media contact_media">
                    <a href='tel:+255767157057' target='_top' className='contact_link'><FiPhoneCall/></a>
                    <a href='mailto:info@e-hajj.org?Subject=Need%20Help' target='_top' className='contact_link'><MdOutlineAlternateEmail/></a>
                    <a href='https://ehajj-tz.netlify.app' target='_blank' className='contact_link'><BsGlobe/></a>
                  </div>
                </div>
              
             
            </div>
        
        </motion.div>
        <Footer/>
      </div>
    
  )
}

export default Contact

