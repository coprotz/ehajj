import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../account/footer/Footer'
import { useTranslation } from "react-i18next";
import {motion} from 'framer-motion'


const Terms = () => {
  const { t } = useTranslation();
  return (
    <div className='help_container'>
        <Navbar/>
        <div 
          // initial={{ x: '100vw'}}
          // animate={{x:0}} 
          // transition={{ ease: "easeOut", duration: 0.5 }} 
          className="page_container">
          <h1>{t('under_construction')}</h1>
        </div>
        
        <Footer/>
    </div>
  )
}

export default Terms
