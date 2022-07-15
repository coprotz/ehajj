import React from 'react'
import './contact.css'
import { FaArrowLeft,FaArrowRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import Main from '../main/Main';
import { AiOutlineMenu, AiOutlineTwitter, AiFillInstagram, AiOutlineYoutube, AiFillFacebook } from "react-icons/ai";

const Contact = ({setPage}) => {
  const navigate = useNavigate()

  return (
    <div className='home'>
      <Main/>
      <div className="home_right">
        <div className='about'>
          <div className="about_wrapper">
            <div className="about_inner">
              <div className="page_title_wrapper">
                <h1 className='page_title'><FaArrowLeft onClick={() => navigate('/')}/>Mawasiliano Yetu</h1>
                {/* <button className='page_next' onClick={() => navigate('/')}><FaArrowRight /></button> */}
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
              {/* <div className="about_3">
                <div className="about_3_inner">
                  ALHAJJ TANZANIA ni Taasisi inayodhamiria kuleta unafuu mkubwa katika kusimamia waislamu wanaotaka kufanya ibada ya Hijja na Umrah Tanzania.
                </div>
                <p>Katika Ulimwengu huu wa maendeleo makubwa ya kiteknolojia, ambapo sasa mambo karibu yote yamerahisishwa kwa kutumia 
                  simu yako janja ya mkononi au kumputa yako na kuokoa muda na ghalama kutafuta huduma. Ndugu zako 
                  ALHAJJ TANZANIA, tumekuja na ufumbuvuzi wa kurahisisha mchakato wa kujisajiri kuelekea kufanya ibadah ya Hijja na Umrah 
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact

