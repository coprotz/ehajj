import React from 'react'
import './chataction.css'

import { HiMenuAlt4, HiX } from "react-icons/hi";
import { useState } from 'react';
import {motion} from 'framer-motion'
import { useNavigate } from 'react-router-dom';

const ChatAction = () => {

    const [open, setOpen] = useState(null);
    const navigate = useNavigate()
  return ( 
    <div className="chat_rec_action">
      <button className='btn_action' onClick={() => setOpen(!open)}>{open? <HiX/> : <HiMenuAlt4/>}</button> 
      {open && 
      <motion.div 
        initial={{ x: '100vw'}}
        animate={{x:0}} 
        transition={{ ease: "easeOut", duration: 0.5 }} 
        className="chat_action_menu">
            <span onClick={() => navigate('/account/contacts')}>New Chat</span>
            <span onClick={() => setOpen(null)}>Report</span>
           
      </motion.div>
      }
    </div>
    

  )
}

export default ChatAction
