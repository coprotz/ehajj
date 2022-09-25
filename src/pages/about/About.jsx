import React from 'react'
import './about.css'
import { useNavigate } from 'react-router-dom'
import {motion} from 'framer-motion'
import Navbar from '../../components/navbar/Navbar'
import { BiChevronsLeft } from "react-icons/bi";
import Footer from '../account/footer/Footer'
import { useTranslation } from "react-i18next";


const About = ({showMenu, setShowMenu}) => {
  const navigate = useNavigate()
  const { t } = useTranslation();

  return (
    <div className='home'>
      <Navbar showMenu={showMenu} setShowMenu={setShowMenu}/>
      <div className="home_right">
      <motion.div 
        initial={{ x: '100vw'}}
        animate={{x:0}} 
        transition={{ ease: "easeOut", duration: 0.5 }}
        className='about'>
          <div className="about_wrapper">
            <div className="about_inner">
              <div className="page_back">
                <button className='btn_btn_back' onClick={() =>navigate(-1)}><BiChevronsLeft/></button> {t('about')}
              </div>             
              <div className="about_top_1">
                <h1 className='about_title'>{t('about_title')}</h1>
              </div>
              <div className="about_3">
                <div className="about_3_inner">{t('about_inner')}</div>
                <p className='about_p'>{t('about_p')}</p>
              </div>
              <div className="about_beneficial">
                <h2>{t('about_bene')}</h2>
                <button className='btn_about' onClick={() =>navigate('/agents')}>{t('btn_view_agents')}.</button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer/>
    </div>
  )
}

export default About