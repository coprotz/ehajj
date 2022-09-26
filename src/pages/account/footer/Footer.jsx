import React from 'react'
import { useNavigate } from 'react-router-dom'
import './footer.css'
import { useTranslation } from "react-i18next";

const Footer = () => {
  const navigate = useNavigate()
  const { t } = useTranslation();

  return (
    <div className="acc_footer">
      <div className="footer_inner">
        <div className="acc_footer_left">
            <small>{t('powered_by')} BarruTech</small>
        </div>
        <div className="acc_footer_right">
            <small onClick={() =>navigate('/')}>{t('home')}</small>    
            <small onClick={() =>navigate('/about')}>{t('about')}</small>          
            <small onClick={() =>navigate('/agents')}>{t('agents')}</small>
            <small onClick={() =>navigate('/blogs')}>{t('blogs')}</small>
            <small onClick={() =>navigate('/contact')}>{t('contact')}</small>         
            <small onClick={() =>navigate('/terms')}>{t('terms')}</small>
            <small onClick={() =>navigate('/help')}>{t('help')}</small>
            <small onClick={() =>navigate('/privacy')}>{t('privacy')}</small>
        </div>
        </div>
    </div>
  )
}

export default Footer
