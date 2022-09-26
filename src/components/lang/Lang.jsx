import React from 'react'
import i18next from 'i18next'
import cookies from 'js-cookie'
import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import {  AiFillCaretUp } from "react-icons/ai";
import {  BiCaretDown, BiGlobe } from "react-icons/bi";
import './lang.css'



const languages = [
    {
      code: 'ar',
      name: 'العربية',
      country_code: 'sa',
      dir: 'rtl'
    },
    {
      code: 'en',
      name: 'English',
      country_code: 'gb'
    },
    {
      code: 'fr',
      name: 'Français',
      country_code: 'ar'
    },
    {
      code: 'sw',
      name: 'Swahili',
      country_code: 'tz'
    },
    {
      code: 'hi',
      name: 'हिन्दी',
      country_code: 'in'
    }
  
  ]

const Lang = () => {
    const { t } = useTranslation();
    const [lang, setLang] = useState(null)
    const currentLangCode = cookies.get('i18next') || 'en'

    const langu = languages.find(l => l.code === currentLangCode)
  
    useEffect(() => {
      document.body.dir = langu.dir || 'ltr'
    },[langu])
  
    const handleLanguage = (code) => {
      i18next.changeLanguage(code)
      setLang(null)
      // setActiveLan(code)
    }
  return (
    <div className='lan_lang'>
        <button className='btn_lang' onClick={() => setLang(!lang)}><BiGlobe/><span className='name_lan'>{langu?.name}</span>{!lang? <BiCaretDown/> :<AiFillCaretUp/> }</button>
        {lang && 
        <div className="lang_select">
          <span>{t('language')}</span>
          <div className='lang_code reg_lan'>         
          {languages.map(({ code, name, country_code }) => (
              <div key={code}>
                <button 
                  className='btn_langz' 
                  onClick={() => handleLanguage(code)}
                  disabled={code === currentLangCode}
                  >
                  <span className='name_con'></span>
                  {name}
                </button>
              </div>
          ))}
          </div>
        </div>}
      
    </div>
  )
}

export default Lang
