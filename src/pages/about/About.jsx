import React from 'react'
import './about.css'
import { useNavigate } from 'react-router-dom'
import {motion} from 'framer-motion'

const About = () => {
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
              {/* <div className="page_title_wrapper">
                <h1 className='page_title'>
                  <div><FaArrowLeft onClick={() => navigate('/')}/>Kuhusu Sisi</div>
                  <div><FaArrowRight onClick={() => navigate('/services')}/></div>
                </h1>
              </div> */}
              {/* <div className="incase_menu">
                <UserTopbar/>
              </div> */}
              
              <div className="about_top_1">
                <h1 className='about_title'>Tumekuja kukufanyia wepesi kuelekea Ibada yako ya Hijja na Umrah</h1>
              </div>
              <div className="about_3">
                <div className="about_3_inner">
                  E-HAJJ TANZANIA ni Taasisi inayodhamiria kuleta unafuu mkubwa katika kusimamia waislamu wanaotaka kufanya ibada ya Hijja na Umrah Tanzania.
                </div>
                <p>Katika Ulimwengu huu wa maendeleo makubwa ya kiteknolojia, ambapo sasa mambo karibu yote yamerahisishwa kwa kutumia 
                  simu yako janja ya mkononi au kumputa yako na kuokoa muda na ghalama kutafuta huduma. Ndugu zako 
                  ALHAJJ TANZANIA, tumekuja na ufumbuvuzi wa kurahisisha mchakato wa kujisajiri kuelekea kufanya ibadah ya Hijja na Umrah 
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default About