import React from 'react'
import './navbar.css'
import { BiRightArrowAlt, BiX, BiMenu, BiCaretDown, BiGlobe } from "react-icons/bi";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, useAuth } from '../../hooks/useAuth';
import { useForm } from "react-hook-form";
import { motion } from 'framer-motion';
import useData from '../../hooks/useData';
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import Lang from '../lang/Lang';
import logo from '../images/logo1.png'
import MainMenu from '../menu/MainMenu';
import Loading from '../loading/Loading';
import { doc, updateDoc } from 'firebase/firestore';


const Navbar = () => {
  const { t } = useTranslation();
  const [login, setLogin] = useState(null)
  const [loading, setLoading] = useState(null)
  // const [lang, setLang] = useState(null)
  const [err, setErr] = useState('')
  const navigate = useNavigate();
  const { signIn, user, logOut } = useAuth();
  const { users, pilgrims, admins, mission } = useData();
  const { register,  watch, formState: { isValid } } = useForm({mode: 'all'});
  const email = watch('email')
  const password = watch('password')
  const [items, setItems] = useState(null)

  const pilgrim = pilgrims?.find(p => p.id === user?.uid)
  const cuUser = users && users?.find(u => u.id === user?.uid)
  const admin = admins?.find(p => p.userId === user?.uid)
  const isMission = mission?.find(u => u.userId === user?.uid)

  const [showMenu, setShowMenu] = useState(null)

  const userRef = doc(db, 'users', `${cuUser?.id}`)
  const pilRef = doc(db, 'pilgrims', `${pilgrim?.id}`)
  const adminRef = doc(db, 'admins', `${admin?.id}`)
  const missionRef = doc(db, 'mission', `${isMission?.id}`)

  const handleLogin = async(e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await signIn(email, password)
      navigate('/account/main')

        if(cuUser){
        await updateDoc(userRef, {
          isOnline: true
        })
      }else if(pilgrim){
        await updateDoc(pilRef, {
          isOnline: true
        })
      }else if(admin){
        await updateDoc(adminRef, {
          isOnline: true
        })
      }else if(isMission){
        await updateDoc(missionRef, {
          isOnline: true
        })
      }
     
    } catch (error) {
      setErr(error.message);
    }
    setLoading(false)

  }


  return (
    <div className='navbar_container'>
      {showMenu && 
        <MainMenu showMenu={showMenu} setShowMenu={setShowMenu}/>}
      <div className="acc_logo" onClick={() => navigate('/')}><img src={logo} alt=''/></div>
      <div className="cont_menu">    
        
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
        <button style={{border:'none'}}  onClick={() => navigate('/register')} className='btn_register'>{t('Register')}</button>
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
            <button onClick={() => {setErr('');setLoading(null)}} className='login_close' ><BiX/></button>
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
              className='login_in'
              >{loading? <Loading/> : <span >Login<BiRightArrowAlt/></span>}</button>  
          </div> 
           
        </motion.form>
        }
        </>
      }
        <Lang />   
        <button className='btn_menu' onClick={() =>setShowMenu(!showMenu)}>{showMenu? <BiX/> : <BiMenu/>}</button>
        
      </div>
    </div>
  )
}

export default Navbar
