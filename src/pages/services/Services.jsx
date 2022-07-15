import React from 'react'
import { FaArrowLeft,FaArrowRight } from "react-icons/fa";
import './services.css'
import { useNavigate } from 'react-router-dom'
import Main from '../main/Main';

const Services = ({setPage}) => {
  const navigate = useNavigate()

  return (
    <div className='home'>
      <Main/>
      <div className='services_wrapper'>
        <div className="services_inner">
          <div className="page_title_wrapper agent_top">
              <h1 className='page_title'><FaArrowLeft onClick={() => navigate('/about')}/>Huduma Zetu</h1>
              <button className='page_next' onClick={() => navigate('/agents')}><FaArrowRight /></button>
          </div>
          <div className="services_cards">
            <div className="service_card_item">
              <div className="card_item_inner">
                <h3>Kusajiri Mahujaji</h3>
                <p className='card_item_desc'>Sasa Mahujaji hawatalazimika kutembela ofisi za mawakala, bali watamaliza kila kitu mtandaoni.<br/><br/>
                Hakutakuwa na ghalama zozote za usajiri wa Mahujaji Mtandaoni<br/><br/>
                <button className='btn_home'>Kujisajiri Anzia Hapa</button></p>
              </div>
              <div className="card_item_inner">
                <h3>Kusajiri Mawakala</h3>
                <p className='card_item_desc'> Tunasimamia zoezi zima la kusajiri Mawakala wote waliofuzu vigezo vilivyowekwa na Bodi ya Kusimamia shughuri za Hija nchini.</p>
              </div>
              <div className="card_item_inner">
                <h3>Kuunanisha Mawakala na Mahujaji</h3>
                <p className='card_item_desc'>Sasa Mahujaji hawatalazimika kutembela ofisi za mawakala, bali watamaliza kila kitu mtandaoni.</p>
              </div>
              <div className="card_item_inner">
                <h3>Kutoa habari za hijja nchini na kwingineko</h3>
                <p className='card_item_desc'>Sasa Mahujaji hawatalazimika kutembela ofisi za mawakala, bali watamaliza kila kitu mtandaoni.</p>
              </div>
              <div className="card_item_inner">
                <h3>Kutoa mafunzo ya hija</h3>
                <p className='card_item_desc'>Sasa Mahujaji hawatalazimika kutembela ofisi za mawakala, bali watamaliza kila kitu mtandaoni.</p>
              </div>
              <div className="card_item_inner">
                <h3>Kutoa habari za mawakala na huduma zao</h3>
                <p className='card_item_desc'>Mawakala wote wanaotoa huduma ya kusafirisha Mahujaji nchini wamesajiliwa humu na kila mmoja 
                ameonesha huduma anazotoa na ghalama zao.<br/><br/>Tazama orodha yao kwenye ukurasa wetu wa Mawakala au <div onClick={() => setPage(4)}>hapa</div></p>
              </div>
            </div>
          </div>
      
        </div>
      </div>
    </div>
  )
}

export default Services