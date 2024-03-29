import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import videoBg from '../../components/images/kaaba3.mp4'
import './layout.css'
import Register from './Register'
import { BiRightArrowAlt } from "react-icons/bi";
import ReactPlayer from 'react-player'
import { useTranslation } from "react-i18next";
import {  AiOutlineTwitter, AiFillInstagram, AiOutlineYoutube, AiFillFacebook } from "react-icons/ai";
import { useNavigate } from 'react-router-dom'

import { teachings, news } from '../../hooks/data'
import { useAuth } from '../../hooks/useAuth'
import useData from '../../hooks/useData'
import Footer from '../account/footer/Footer'
import { useEffect } from 'react'


const Layout = ({showMenu, setShowMenu}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { users } = useData();
  const { user } = useAuth();
  const cuUser = users && users?.find(u => u.id === user?.uid)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='layout_container'>
     
      <Navbar showMenu={showMenu} setShowMenu={setShowMenu}/>
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
            
        </div>
        <div className="cont_video">
            <video src={videoBg} autoPlay loop muted/>
            {user? 
              <div className='user_login'>
                <small>You are logged in as</small>
                {cuUser?.fname} {cuUser?.lname}
                <button className='btn_agents' onClick={() => navigate('/account/main')}>My Account</button>
              </div> 
            : <div className='register_main_container reg_abso'><Register /></div>}            
        </div>
      </div>
      <div className="home_blog">
              {teachings && teachings.slice(0,1).map((item, index) => (
                <div className="home_blog_card" key={index}>
                    <h1>1</h1>
                    <div className="blog_card_inner">
                        <h3>{t(`${item.title}`)}</h3>
                            <p className='teach_card_pg'>{t(`${item.body}`)}</p>
                            <button onClick={() =>navigate(`/blogs/${item.id}`)}>{t('read_more')}</button>
                    </div>
                </div>
              ))}
              {news && news.slice(0,1).map((item, index) => (
               <div className="home_news" key={index}>
                <div className="news_left">
                  <img src={item.url} alt="" />
                </div>
                <div className="news_card_inner">
                    <h3>{t(`${item.title}`)}</h3>
                      <p className='teach_card_pg'>{t(`${item.body}`)}</p>
                      <button onClick={() =>navigate(`/blogs/${item.id}`)} className='btn_read'>{t('read_more')}</button>
                  </div>
              </div>
              ))}
             
              
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
      <Footer/>
    </div>
  )
}

export default Layout
