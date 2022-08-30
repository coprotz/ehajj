import React, {useState} from 'react'
import {  AiOutlineSearch } from "react-icons/ai";
import Sidebar from '../../components/sidebar/Sidebar';
import logo from '../../components/images/ehajj.png'
import './main.css'
import { useNavigate } from 'react-router-dom'
import {motion} from 'framer-motion'
import ReactPlayer from 'react-player'
import { TbMenu } from "react-icons/tb";
import { GrClose } from "react-icons/gr";
import { db, useAuth } from '../../hooks/useAuth';
import { doc } from 'firebase/firestore';


const Main = ({user, logOut}) => {
    const navigate = useNavigate()
    const [show, setShow] = useState(null)
    // const {  logOut} = useAuth;

    console.log('user', user )

    // const usersRef = doc(db, "users", `${user.uid}`)
    // const pilsRef = doc(db, "pilgrims", `${cuPil?.id}`)

    const handleLogout = async (e) => {
        e.preventDefault();


        try {
            // if(cuUser){
            //     await updateDoc(usersRef, {
            //     isOnline: false,
            //     }) 
            // }else if(cuPil){
            //     await updateDoc(pilsRef, {
            //         isOnline: false,
            //     })
                
            // }
            await logOut();
        } catch (error) {
            console.log(error.message)
        }
      
       
        
    }

  return (
    <div
        className="home_left">
            {show &&
            <motion.div 
             initial={{ x:'-100vw'}}
             animate={{x:0}} 
             transition={{ ease: "easeOut", duration: 0.5 }}
            className="app_menu">
                <div className="app_menu_wrapper">
                    <span onClick={() =>navigate('/')}>Nyumbani</span>
                    <span onClick={() =>navigate('/about')}>Kuhusu</span>
                    <span onClick={() =>navigate('/services')}>Huduma</span>
                    <span onClick={() =>navigate('/agents')}>Wakala</span>
                    <span onClick={() =>navigate('/teachings')}>Mafunzo</span>
                    <span onClick={() =>navigate('/contact')}>Mawasiliano</span>
                    {/* <span onClick={() =>navigate('/account')}>Akaunti Yangu</span> */}
                    <div className="app_menu_close">
                        <GrClose onClick={() => setShow(null)}/>
                    </div>
                </div>
               
            </motion.div>}
          <div className="home_left_top">
              <div className="home_logo">
                <img src={logo} alt="" />
              </div>
              <div className="home_login">
                {user ? 
                <>
                    <button onClick={() =>navigate('/account/main')} className='btn_login'>AKAUNT YANGU</button>
                    <button onClick={() => logOut()} className='btn_login'>ONDOKA</button>
                </> :
                <>
                    <button onClick={() =>navigate('/login')} className='btn_login'>INGIA</button>
                    <button onClick={() =>navigate('/register')} className='btn_register'>JISAJIRI</button>
                </>
                }
                  <button onClick={() =>setShow(true)} className='btn_app_menu'><TbMenu/></button>
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
              <button className='btn_home' onClick={() =>navigate('/register')}>Hajj Anzisha Safari</button>
              <div className="home_menu_wrapper">                 
                  <Sidebar />
                  <div className="home_video">
                      <div className="home_video_player">
                        <ReactPlayer
                            url='https://www.youtube.com/watch?v=4vCp850WSmo'
                            width='100%'
                            height='100%'
                            controls={true} 
                        />                      
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