import React from 'react'
import { useNavigate } from 'react-router-dom'
import {motion} from 'framer-motion'
import Navbar from '../../components/navbar/Navbar'
import { BiChevronsLeft } from "react-icons/bi";
import './blogs.css'
import { news, questions, teachings } from '../../hooks/data';
import { useState } from 'react';
import Footer from '../account/footer/Footer';
import { useTranslation } from "react-i18next";
import { useEffect } from 'react';


const Blogs = ({showMenu, setShowMenu}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='blogs'>
      <Navbar showMenu={showMenu} setShowMenu={setShowMenu}/>
      <div className="blogs_wrapper">
        <div className="page_back">
          <button className='btn_btn_back' onClick={() =>navigate(-1)}><BiChevronsLeft/></button> {t('blogs')}
        </div> 
        <div className="blogs_inner">
          <div className={showAll === 1? 'show_all': "blog_news_wrapper"}>
             <h3>{t('recent_news')}</h3>
             <div className="blogs_news">
              {news.slice(0,2).map((item, index) => (
                <div className="blog_news_card news_card" key={index}>
                  <img src={item.url} alt="" />
                  <h1>{t(`${item.title}`)}</h1>
                  <p className='news_card_pg'>{t(`${item.body}`)}
                  </p>
                  <button onClick={() => navigate(`/blogs/${item.id}`)} className='btn_read'>{t('read_more')}</button>
                </div>
              ))}
      
            </div>
            <div>
                <button className='btn_all' onClick={() =>setShowAll(1)}>{t('show_all')}</button>
              </div>
          </div>
         
          <motion.div 
          initial={{ x: '100vw'}}
          animate={{x:0}} 
          transition={{ ease: "easeOut", duration: 0.5 }} 
            className="blogs_cat">
            <div className={showAll === 2? 'hide_all': "blog_teach"}>
              <h3>{t('recent_teachings')}</h3>
              {teachings.slice(0,2).map((item, index) => (
                <div className="blog_news_card" key={index}>               
                  <h1 className='teach_card_title'>{t(`${item.title}`)}</h1>
                  <p className='teach_card_pg'>{t(`${item.body}`)}</p>
                  
                  <button onClick={() => navigate(`/blogs/${item.id}`)} className='btn_read'>{t('read_more')}</button>
                </div>
              ))}
              
              <div>
                <button  className='btn_all' onClick={() =>setShowAll(2)}>{t('show_all')}</button>
              </div>
              
            </div>
            <div className={showAll === 2? 'teach_all': "blog_teach_all"}>
              <h3>{t('recent_teachings')}</h3>
              {teachings.map((item, index) => (
                <div className="blog_news_card" key={index}>               
                  <h1 className='teach_card_title'>{t(`${item.title}`)}</h1>
                  <p className='teach_card_pg'>{t(`${item.body}`)}</p>
                  
                  <button onClick={() => navigate(`/blogs/${item.id}`)} className='btn_read'>{t('read_more')}</button>
                </div>
              ))}
                
              <div>
                <button  className='btn_all' onClick={() =>setShowAll(null)}>Hide Teachings</button>
              </div>
              
            </div>
            <div className="blog_qna">
              <h3>{t('recent_questions')}</h3>
              <div className="que_wrapper">
                {questions && questions.slice(0,2).map((item, index) => (
                  <div className="que_wrap_inner">
                    <span className='que_span'>H</span>
                     <h4 className='blog_qna_body' key={index} onClick={() => navigate(`/blogs/${item.id}`)}>{t(`${item.title}`)}</h4>
                  </div>
                 
                ))}
              </div>
              
              <div>
                <button  className='btn_all'>{t('show_all')}</button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer/>
     
    </div>
  )
}

export default Blogs
