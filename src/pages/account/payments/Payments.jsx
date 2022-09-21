import React from 'react'
import { useAuth } from '../../../hooks/useAuth'
import useData from '../../../hooks/useData'
import { BiArrowBack } from "react-icons/bi";
import {motion} from 'framer-motion'
import './payments.css'
import { useNavigate } from 'react-router-dom';

const Payments = () => {

  const { user } = useAuth()
  const { payments, pilgrims } = useData()
  const navigate = useNavigate();
  const pays = payments && payments.filter(p => p?.userId === user.uid)
  const pilgrim = pilgrims && pilgrims.find(p => p.userId === user.uid)
  return (
    <motion.div 
    initial={{ x: '-100vw'}}
    animate={{x:0}} 
    transition={{ ease: "easeOut", duration: 0.5 }} 
      className='agent_body'>
        <div className="acc_back">
          <BiArrowBack onClick={() => navigate('/account/main')} className='page_back'/>
          <h3>Payments</h3>
        </div>
      
      <div className="payments_summary"> 
       <h3>Unpaid hijja cost Summary</h3>  
        {pilgrim?.agentName !== undefined ?    
        <div className="summ_details">          
          <small>Amount Due</small>
          <h1>$ {pilgrim?.agentCost}</h1>
          <small>Payment Method</small>
          <h1 className='pay_mode_info'>{pilgrim?.payMode}</h1>
          <small>Paid to</small>
          <h3>Hajj Mission Tanzania</h3>
          <small>Recepient</small>
          <h3>{pilgrim?.agentName}</h3>
          <small>Payment Due Date</small>
          <h3>{pilgrim?.payDate}</h3>
          <button className='btn_pay'>Pay Now</button>
          <button className='btn_invoice'>Download Invoice</button>
        </div>:
        <div className='no_pays'>Agent is not found, please complete your application</div>}
      </div>
      <div className="transaction_history">
        <h3>Payments Records</h3>
        {pays.length > 0 ? pays.map(p => (
          <span>{p}</span>
        )) : <div className='no_pays'>No Payment Records Found</div>}
        
      </div>
    </motion.div>
  )
}

export default Payments
