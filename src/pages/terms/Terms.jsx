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
        <motion.div 
          initial={{ opacity: 0}}
          animate={{opacity:1}} 
          transition={{ ease: "easeOut", duration: 0.5 }} 
          className="page_container">
          <h1>{t('under_construction')}</h1>
        </motion.div>
        
        <Footer/>
    </div>
  )
}

export default Terms
