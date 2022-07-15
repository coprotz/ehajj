import React from 'react'
import './about.css'
import { FaArrowLeft,FaArrowRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import Main from '../main/Main';

const About = ({setPage}) => {
  const navigate = useNavigate()

  return (
    <div className='home'>
      <Main/>
      <div className="home_right">
        <div className='about'>
          <div className="about_wrapper">
            <div className="about_inner">
              <div className="page_title_wrapper">
                <h1 className='page_title'><FaArrowLeft onClick={() => navigate('/')}/>Kuhusu Sisi</h1>
                <button className='page_next' onClick={() => navigate('/services')}><FaArrowRight /></button>
              </div>
              
              <div className="about_top_1">
                <h1 className='about_title'>Tumekuja kukufanyia wepesi kuelekea Ibada yako ya Hijja na Umrah</h1>
              </div>
              <div className="about_3">
                <div className="about_3_inner">
                  ALHAJJ TANZANIA ni Taasisi inayodhamiria kuleta unafuu mkubwa katika kusimamia waislamu wanaotaka kufanya ibada ya Hijja na Umrah Tanzania.
                </div>
                <p>Katika Ulimwengu huu wa maendeleo makubwa ya kiteknolojia, ambapo sasa mambo karibu yote yamerahisishwa kwa kutumia 
                  simu yako janja ya mkononi au kumputa yako na kuokoa muda na ghalama kutafuta huduma. Ndugu zako 
                  ALHAJJ TANZANIA, tumekuja na ufumbuvuzi wa kurahisisha mchakato wa kujisajiri kuelekea kufanya ibadah ya Hijja na Umrah 
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About