import React from 'react'
import {motion} from 'framer-motion'
import AgentSidebar from './sidebar/AgentSidebar'

const Ticket = () => {
  return (
    <div className='agent_body'>
      {/* <AgentSidebar/> */}
    <div className="account_top">
        {/* <h2 className='account_title'>Tiketi</h2>            */}
        <motion.div 
          initial={{ opacity: 0}}
          animate={{opacity: 1}} 
          transition={{ ease: "easeOut", duration: 0.5 }}>
            <h3 className='no_chats'>Hauna Tiketi</h3>
          </motion.div>
    </div>
</div>
  )
}

export default Ticket
