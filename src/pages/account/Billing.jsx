import React from 'react'

import  {useState} from 'react'
import {motion} from 'framer-motion'

const Billing = ({setMessage}) => {

  const [messageType, setMessageType] = useState(1)

  const RenderType = () => {
    if(messageType === 1){
      return (
        <motion.div 
             initial={{ x: '100vw'}}
             animate={{x:0}} 
             transition={{ ease: "easeOut", duration: 0.5 }}
        className='message_table'>
         
         <div className='bill_info'>
            <span>Unadaiwa</span>
            <h1>$ 3,586</h1>
            <button className='btn_home'>Lipa Sasa</button>
         </div>
       
        </motion.div>
      )
    }else if(messageType === 2){
      return (
        <motion.div 
        initial={{ x: '100vw'}}
        animate={{x:0}} 
        transition={{ ease: "easeOut", duration: 0.5 }}
        className='message_table'>

        <div className='bill_info'>
            <span>Hakuna Taarifa za Malipo</span>
            
         </div>
    
    
        </motion.div>
      )
    }

    else if(messageType === 3){
        return (
          <motion.div 
          initial={{ x: '100vw'}}
          animate={{x:0}} 
          transition={{ ease: "easeOut", duration: 0.5 }}
          className='message_table'>
  
        <div className='bill_info'>
            <span>Umechagua Kulipa ghalama zako za Hija kwa Kuhamisha pesa kutoka benki kwenda benki</span>
            <button className='btn_home'>Chagua njia nyingine</button>
         </div>
      
      
          </motion.div>
        )
      }
  }
  return (
    <div className='account_wrapper'>
        <div className="account_top">
            <h2 className='account_title'>Bili na Malipo</h2>
            <div className="message_type">
              <span onClick={() => setMessageType(1)} className={messageType === 1? 'message_active': 'message_item'}>Bili</span>
              <span onClick={() => setMessageType(2)} className={messageType === 2? 'message_active': 'message_item'}>Taarifa za Malipo</span>
              <span onClick={() => setMessageType(3)} className={messageType === 3? 'message_active': 'message_item'}>Njia za Malipo</span>
            </div>
            <div className="message_render">
              {RenderType()}
            </div>
        </div>
    </div>
  )
}

export default Billing


