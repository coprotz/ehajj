import React from 'react'
import './navbar.css'
import { BiRightArrowAlt, BiX, BiMenu, BiCaretDown, BiGlobe } from "react-icons/bi";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useForm } from "react-hook-form";
import { motion } from 'framer-motion';
import useData from '../../hooks/useData';
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import Lang from '../lang/Lang';
import logo from '../images/logo1.png'


const Navbar = () => {
  const { t } = useTranslation();
  const [login, setLogin] = useState(null)
  const [loading, setLoading] = useState(null)
  // const [lang, setLang] = useState(null)
  const [err, setErr] = useState('')
  const navigate = useNavigate();
  const { signIn, user, logOut } = useAuth();
  const { users } = useData();
  const { register,  watch, formState: { isValid } } = useForm({mode: 'all'});
  const email = watch('email')
  const password = watch('password')
  const [items, setItems] = useState(null)


  const cuUser = users && users?.find(u => u.id === user?.uid)

  const handleLogin = async(e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await signIn(email, password)
      navigate('/account/main')
    } catch (error) {
      setErr(error.message);
    }

  }


  return (
    <div className='navbar_container'>
      <div className="acc_logo" onClick={() => navigate('/')}><img src={logo} alt=''/></div>
      <div className="cont_menu">    
      <Lang />     
         {user ?         
        <div className="cuUser_wrapper">
          <span className='cuUser' onClick={()=> setItems(!items)}>{cuUser?.fname} {cuUser?.lname}{!items? <AiFillCaretDown/> : <AiFillCaretUp/>}</span>
          {items &&
          <div className="cuUser_item">
            <span onClick={() => navigate('/account/main')}>{t('my_account')}</span>
            <span>{t('settings')}</span>
            <span onClick={() => logOut()}>{t('logout')}</span>
          </div>}
        </div>
        :
        <>
        <button style={{border:'none'}}  onClick={() => setLogin(!login)}>{login? <BiX className='bix'/>: <button className='btn_login'>{t('login')}</button>}</button>
        {login &&
        <motion.form 
          initial={{ x: '100vw'}}
          animate={{x: 1}} 
          transition={{ ease: "easeOut",  }}
          className="cont_login" onSubmit={handleLogin}>
          {err && 
          <span className='error'>
            {err}
            <button onClick={() => setErr('')} className='login_close'>x</button>
          </span>}
          <div className="login_wrapper">
            <input 
              type="text" 
              placeholder={`${t('email')}`} 
              {...register("email", { required: true })}
              />
            <input 
              type="Password" 
              placeholder={`${t('password')}`} 
              {...register("password", { required: true })}
              />
            <button
              disabled={!isValid}
              type='submit'
              ><span className='login_in'>Login</span><BiRightArrowAlt/></button>  
          </div>     
        </motion.form>
        }
        </>
      }
        <button className='btn_menu'><BiMenu/></button>
      </div>
    </div>
  )
}

export default Navbar
