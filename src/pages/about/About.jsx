import React from 'react'
import './about.css'
import { useNavigate } from 'react-router-dom'
import {motion} from 'framer-motion'
import Navbar from '../../components/navbar/Navbar'
import { BiChevronsLeft } from "react-icons/bi";
import Footer from '../account/footer/Footer'


const About = ({showMenu, setShowMenu}) => {
  const navigate = useNavigate()

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
                <button className='btn_btn_back' onClick={() =>navigate(-1)}><BiChevronsLeft/></button> About
              </div>             
              <div className="about_top_1">
                <h1 className='about_title'>Tumekuja kukufanyia wepesi kuelekea Ibada yako ya Hijja na Umrah</h1>
              </div>
              <div className="about_3">
                <div className="about_3_inner">
                  E-HAJJ TANZANIA ni Taasisi inayodhamiria kuleta unafuu mkubwa katika kusimamia waislamu wanaotaka kufanya ibada ya Hijja na Umrah Tanzania.
                </div>
                <p className='about_p'>Katika Ulimwengu huu wa maendeleo makubwa ya kiteknolojia, ambapo sasa mambo karibu yote yamerahisishwa kwa kutumia 
                  simu yako janja ya mkononi au kumputa yako na kuokoa muda na ghalama kutafuta huduma. Ndugu zako 
                  E-HAJJ TANZANIA, tumekuja na ufumbuvuzi wa kurahisisha mchakato wa kujisajiri kuelekea kufanya ibadah ya Hijja na Umrah 
                </p>
              </div>
              <div className="about_beneficial">
                <h2>Taasisi inawakusudia Watazania wote wanaoishi ndani na nje ya nchi ambao waataka kufanya ibada ya hija au Umrah. Katika 
                  Platform yetu yeyote anayetaka kufanya maombi ya hija, hatalazimika kwenda tena katika maofisi wa hijja bali ataomba maombi yake 
                  kupitia mtandao wetu na kuchangua Wakala ambaye atasimamia ombi lake.
                </h2>
                <button className='btn_about' onClick={() =>navigate('/agents')}>Bonyeza hapa kuona orodha ya Mawakala.</button>
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