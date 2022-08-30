import React from 'react'
import {motion} from 'framer-motion'

const Viza = () => {
  return (
    <div className='account_wrapper'>
        <div className="account_top">
            {/* <h2 className='account_title'>Viza</h2>            */}
            <motion.div 
              initial={{ opacity: 0}}
              animate={{opacity: 1}} 
              transition={{ ease: "easeOut", duration: 0.5 }}>
                <h3 className='no_chats'>Hauna Viza</h3>
              </motion.div>
        </div>
    </div>
  )
}

export default Viza
