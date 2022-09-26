
import React from 'react'
import { useNavigate } from 'react-router-dom'
import bar from '../images/bar.png'
import './menu.css'
import {motion} from 'framer-motion'
import { useTranslation } from "react-i18next";



const MainMenu = ({setShowMenu}) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

  return (
    <div className='main_outer'>
        {/* <button>Close</button> */}
        <motion.div 
             initial={{ x: '100vw'}}
             animate={{x:0}} 
             transition={{ ease: "easeOut", duration: 0.5 }} 
            className="menu_wrapper">
            <div className="menu_barcode">
                <img src={bar} alt="" />
            </div>
            <div 
                className="menu_inner">
                <span onClick={() => {setShowMenu(null); navigate('/')}} className='menu_inner_item'>{t('home')}</span>
                <span onClick={() => {setShowMenu(null); navigate('/about')}} className='menu_inner_item'>{t('about')}</span>
                <span onClick={() => {setShowMenu(null); navigate('/blogs')}} className='menu_inner_item'>{t('blogs')}</span>
                <span onClick={() => {setShowMenu(null); navigate('/agents')}} className='menu_inner_item'>{t('agents')}</span>
                <span onClick={() => {setShowMenu(null); navigate('/helps')}} className='menu_inner_item'>{t('help')}</span>
                <span onClick={() => {setShowMenu(null); navigate('/contact')}} className='menu_inner_item'>{t('contact')}</span>
                <span onClick={() => {setShowMenu(null); navigate('/terms')}} className='menu_inner_item'>{t('terms')}</span>
                <span onClick={() => {setShowMenu(null); navigate('/privacy')}} className='menu_inner_item'>{t('privacy')}</span>
            </div>
            <div className="menu_footer">
                <h4>{t('powered_by')} BarruTech</h4>
            </div>      

        </motion.div>
      
    </div>
  )
}

export default MainMenu
