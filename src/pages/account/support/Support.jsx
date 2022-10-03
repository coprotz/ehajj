import React from 'react'
import './support.css'
import {motion} from 'framer-motion'
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import photo from '../../../components/images/profile.png'
import NewChat from '../message/NewChat';
import useData from '../../../hooks/useData';
import { useAuth } from '../../../hooks/useAuth';

const Support = () => {

    const navigate = useNavigate()
    const { admins } = useData();
    const { user } = useAuth();

   


  return (
    <motion.div 
    initial={{ x: '-100vw'}}
    animate={{x:0}} 
    transition={{ ease: "easeOut", duration: 0.5 }} 
      className='agent_body'>
        <div className="acc_back">
          <BiArrowBack onClick={() => navigate('/account/main')} className='page_back'/>
          <h3>Support</h3>
        </div>
        <div className="support_wrapper">
            <h1>Support Team</h1>
            <h3 className='support_welcome'>Welcome to our Support team desk help, if you counter any technical problem, our team is ready to assist you</h3>
            <div className="support_grids">
                {admins?.map(admin => (
                    <div className="support_card" key={admin?.id}>
                      <div className="support_card_front">
                          <div className="su_card_fr_inner">
                            <div className="su_photo">
                                <img src={photo} alt="" />
                                <span className={`online_status ${admin?.isOnline? 'green' : 'grey'}`}></span>
                            </div>
                             
                             <div className="su_card_inside">
                                  <h4>{admin?.fname+" "+admin?.lname[0]}</h4>
                                  <span>{admin?.position}</span>
                                  <p>{admin?.duty}</p> 
                             </div>
                              
                          </div>
                          
                          <button className='support_chat'>
                          {admin?.userId !== user.uid &&
                            <NewChat s={admin?.id} name={admin?.fname+" "+admin?.lname}/>}
                          </button>
                      </div>
                  </div>
                ))}
               
            
            </div>
            {/* <button className='btn_all'>Chat to All</button> */}
        </div>
    </motion.div>
  )
}

export default Support
