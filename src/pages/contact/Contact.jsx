import React from 'react'
import './contact.css'
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import Main from '../main/Main';
import {motion} from 'framer-motion'
import {  AiOutlineTwitter, AiFillInstagram, AiOutlineYoutube, AiFillFacebook } from "react-icons/ai";
import UserTopbar from '../../components/userTopbar/UserTopbar';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../account/footer/Footer';
// import Navbar from '../account/navbar/Navbar';


const Contact = () => {
  const navigate = useNavigate()

  return (
    <div className='home'>
     {/* <div className="main_hide">
        <Main/>
      </div> */}
      <div className="home_right">
      <motion.div 
             initial={{ x: '100vw'}}
             animate={{x:0}} 
             transition={{ ease: "easeOut", duration: 0.5 }} 
          className='about'>
          <div className="about_wrapper">
            <div className="about_inner">
              {/* <div className="page_title_wrapper"> */}
                {/* <h1 className='page_title'><FaArrowLeft onClick={() => navigate('/')}/>Mawasiliano Yetu</h1> */}
                {/* <button className='page_next' onClick={() => navigate('/')}><FaArrowRight /></button> */}
              {/* </div> */}
              <div className="incase_menu">
                <Navbar/>
              </div>
              
              <div className="about_top_1">
                <h1 className='about_title'>Tunakusubiri Tukuhudumie!!</h1>
              </div>
              <div className="contact_body">
                <div className="contact_address">
                  <span>E-HAJJ TANZANIA LTD</span>
                  <span>P.O Box 3355, Dodoma</span>
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
                  <h1>Tuachie Ujumbe</h1>
                  <input type="name" className='contact_input' placeholder='Majina Kamili'/>
                  <input type="tel" className='contact_input' placeholder='Namba ya Simu'/>
                  <input type="email" className='contact_input' placeholder='Barua Pepe'/>
                  <textarea name="" id="" cols="30" rows="5" className='contact_input' placeholder='Ujumbe'></textarea>
                  <button className='btn_contact'>Tuma Ujumbe</button>
                </div>
              </div>
             <Footer/>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Contact

