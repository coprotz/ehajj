import React from 'react'
import { FaArrowLeft,FaArrowRight, FaChalkboardTeacher, FaNewspaper, FaExclamation, FaSearch, FaCaretDown, FaPlay } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import './teachings.css'
import Image from '../../components/images/hijja.jpg'
import Image1 from '../../components/images/hijja2.jpg'

import Main from '../main/Main';
import {motion} from 'framer-motion'
import ReactPlayer from 'react-player'
import UserTopbar from '../../components/userTopbar/UserTopbar';


const Teachings = () => {

  const navigate = useNavigate()

  return (
    <div className='home'>
      <div className="main_hide">
        <Main/>
      </div>
      <div className='home_right'>
      <motion.div 
             initial={{ x: '100vw'}}
             animate={{x:0}} 
             transition={{ ease: "easeOut", duration: 0.5 }}
        className="about">
        <div className="about_wrapper">
            <div className="about_inner"></div>
            <div className="page_title_wrapper">
                <h1 className='page_title'>
                  <div><FaArrowLeft onClick={() => navigate('/agents')}/>Mafunzo na Habari</div>
                  <div><FaArrowRight onClick={() => navigate('/contact')}/></div>
                </h1>
            </div>
            <div className="incase_menu">
                <UserTopbar/>
              </div>
          <div className="teachings_body">
            <div className="teachs_1">
              <div className="teachs_img">
                <img src={Image} alt="" />
              </div>
              <div className="teachs_contents">
                <h2>Nana ya kufanya hijja kwa mujibu wa Quran na Sunnah (SAW) na kuchunga miiko yake.</h2>
                <p>References in this section to a document being (or purporting to be) signed by
                  a director or secretary are to be read, in a case where that office is held...
                </p>
                <div className="teah_author">
                  <div className="tach_img">
                    <img src={Image} alt="" />
                  </div>
                  <div className="teach_name">
                    <span>Shukuru Mohammed</span>
                    <small>12 June 2022</small>
                  </div>
                </div>
                <span className='all_items'>Zote<FaArrowRight/></span>
              </div>
            </div>
            <div className="teach_2">
              <div className="teach_2_div">
                <FaChalkboardTeacher/>
                Mafunzo
              </div>
              <div className="teach_2_div">
                <FaNewspaper/>
                Habari
              </div>
              <div className="teach_2_div">
                <FaExclamation/>
                Maswali na Majibu
              </div>
            </div>
          </div>
          <div className="news_body">
            <div className="news_body_1">
              <div className="news_body_1_img">
                <img src={Image1} alt="" />
              </div>
              <h2>Utaratibu mpya wa Hijja 2022 nchin Saudia Arabia</h2>
                <div className="teah_author">
                  <div className="tach_img">
                    <img src={Image} alt="" />
                  </div>
                  <div className="teach_name">
                    <span>Shukuru Mohammed</span>
                    <small>12 June 2022</small>
                  </div>
                </div>
                <span className='all_items'>Zote<FaArrowRight/></span>
            </div>
            <div className="news_body_2">
              <div className="news_body_1_top">
                <div className="news_body_search">
                  <div className="search_wrapper">
                    <div className="search_search">
                      <input type="text" className='news_search_input' placeholder='Tafuta...'/>
                      <FaSearch/>
                    </div>
                    <button className='btn_search'>Tafuta Maudhui<FaCaretDown/></button>
                  </div>
                </div>
                <div className="news_video">
                    <div className="video_video">
                      <ReactPlayer
                            url='https://www.youtube.com/watch?v=4vCp850WSmo'
                            width='100%'
                            height='100%'
                            controls={true} 
                        /> 
                    </div>
                    <div className="video_desc">
                      <FaPlay/>
                      <h4>Mawaidha ya Kipekee</h4>
                      <small>Waliotazama 125</small>
                    </div>
                </div>
              </div>
              <div className="news_body_1_bottpm">
                <div className="mews_bottom_left">
                  <div className="home_date">
                      <small> Jtatu: 12 June 2022 | 12 DhulHija 1445</small>
                    
                  </div>
                  <div className="news_prayer_time">
                    <div className="news_preayer_city">
                      <small>Muda wa Swala</small>
                      <h3>Dodoma</h3>
                    </div>
                    <div className="news_preayer_city">
                      <small>Muda Uliosalia</small>
                      <h3>00:27:12</h3>
                    </div>
                  </div>
                  <div className="news_prayer_name">
                    <div className="prayer_name_item">
                      <span>ALFAJIRI</span>
                      <span>11:35</span>
                    </div>
                    <div className="prayer_name_item active_prayer">
                      <span>ADHUHUR</span>
                      <span>06:49</span>
                    </div>
                    <div className="prayer_name_item">
                      <span>ALASRI</span>
                      <span>10:06</span>
                    </div>
                    <div className="prayer_name_item">
                      <span>MAGHARIB</span>
                      <span>12:36</span>
                    </div>
                    <div className="prayer_name_item">
                      <span>ISHA</span>
                      <span>01:46</span>
                    </div>
                    
                  </div>
                </div>
                <div className="mews_bottom_right">
                  <small>Swali</small>
                  <h3>Ni ipi hukumu ya Mtu mwenye uwezo wa kuhiji kisha asifanye hivo?</h3>
                  <small>Jawabu</small>
                  <h4>Bismillahir Rahmaanir Rahiim. Amesema Mtume SAW ...</h4>
                  <span className='all_items'>Zote<FaArrowRight/></span>
                </div>
              
              </div>
            </div>
          </div>
          </div>
          
        </motion.div>
      </div>
    </div>
  )
}

export default Teachings