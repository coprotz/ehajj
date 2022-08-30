import React from 'react'
import { useNavigate } from 'react-router-dom'
import {motion} from 'framer-motion'
import './success.css'

const Success = () => {
    const navigate = useNavigate()
  return (
    <motion.div 
    initial={{ opacity: 0}}
    animate={{opacity: 1}} 
    transition={{ ease: "easeOut", duration: 0.5 }}
    className='success_container'>
      Maombi yako yamepokelewa na utajuliwa yakishapitishwa
      <button onClick={() =>navigate('/')}>Nyumbani</button>
    </motion.div>
  )
}

export default Success
