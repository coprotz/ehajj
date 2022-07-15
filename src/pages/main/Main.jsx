import React from 'react'
import { AiOutlinePlayCircle, AiOutlineSearch } from "react-icons/ai";
import Sidebar from '../../components/sidebar/Sidebar';
import { FaKaaba } from "react-icons/fa";
import './main.css'
import { useNavigate } from 'react-router-dom'

const Main = () => {
    const navigate = useNavigate()

  return (
    <div className="home_left">
          <div className="home_left_top">
              <div className="home_logo"><FaKaaba/></div>
              <div className="home_login">
                  <button>INGIA</button>
                  <button onClick={() =>navigate('/register')} className='btn_register'>JISAJIRI</button>
              </div>
              
          </div>
          <div className="home_top">
              <div className="home_date">
                  12 June 2022 | 12 DhulHija 1445
              </div>
              <div className="home_search"><AiOutlineSearch/></div>
          </div>
          
          <div className="home_menu">
              <div className="home_title_wrapper">
                  <h1 className='home_title'>Hajj & Umrah</h1>
              </div>
              
              <p>Mtandao namba <span>MOJA</span> Tanzania wa kusajiri waislamu wanaotaka kufanya IBADAH 
              ya HIJJA na UMRAH Makkah. Ni njia nyepesi na ya kisasa yenye kupunguza ghalama na muda wako. Jisajili kupitia Wakala unayempenda! </p>
              <button className='btn_home' onClick={() =>navigate('/register')}>Anzisha Safari</button>
              <div className="home_menu_wrapper">                 
                  <Sidebar />
                  <div className="home_video">
                      <div className="home_video_player">
                          <AiOutlinePlayCircle/>
                      </div>
                  </div>
              </div>
              
              <h1 className="home_year">
                  2022
                  
              </h1>
          </div>
      </div>
  )
}

export default Main