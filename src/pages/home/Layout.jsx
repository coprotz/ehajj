import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import videoBg from '../../components/images/kaaba3.mp4'
import './layout.css'
import Register from './Register'
import { BiRightArrowAlt } from "react-icons/bi";
import ReactPlayer from 'react-player'
import { useTranslation } from "react-i18next";
import { AiOutlineMenu, AiOutlineTwitter, AiFillInstagram, AiOutlineYoutube, AiFillFacebook } from "react-icons/ai";
import { useNavigate } from 'react-router-dom'

const Layout = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className='layout_container'>
      <Navbar/>
      <div className="container_body">
        <div className="cont_body_left">
            <h1 className='cont_title'>{t('Welcome')}</h1>            
            <h3 className='cont_welcome'>{t('Welcome_board')}</h3>
            <div className="cont_div">
               <button className='btn_agents' onClick={() => navigate('/agents')}>{t('View_agent')}<BiRightArrowAlt/></button> 
               <div className="social_media">
                <AiOutlineTwitter/>
                <AiFillInstagram/>
                <AiOutlineYoutube/>
                <AiFillFacebook/>
               </div>
            </div>
            <div className="home_blog">
                <div className="home_blog_card">
                    <h1>{t('blog_no')}</h1>
                    <div className="blog_card_inner">
                        <h3>{t('blog_head')}</h3>
                            <p>{t('blog_body')}</p>
                            <button>{t('read_more')}</button>
                    </div>
                </div>
                <div className="home_video">
                      <div className="home_video_player">
                        <ReactPlayer
                            url='https://www.youtube.com/watch?v=4vCp850WSmo'
                            width='100%'
                            height='100%'
                            controls={true} 
                        />                      
                    </div>
                  </div>
            </div>
        </div>
        <div className="cont_video">
            <video src={videoBg} autoPlay loop muted/>
            <Register/>
        </div>
      </div>
    </div>
  )
}

export default Layout
