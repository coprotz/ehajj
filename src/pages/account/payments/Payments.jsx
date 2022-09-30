import React from 'react'
import { useAuth } from '../../../hooks/useAuth'
import useData from '../../../hooks/useData'
import { BiArrowBack } from "react-icons/bi";
import {motion} from 'framer-motion'
import './payments.css'
import { useNavigate } from 'react-router-dom';
import InvoiceCard from './InvoiceCard';

const Payments = () => {

  const { user } = useAuth()
  const { payments, pilgrims, invoices, mission, admins } = useData()
  const navigate = useNavigate();
  const pays = payments && payments.filter(p => p?.userId === user.uid)
  const pilgrim = pilgrims && pilgrims.find(p => p.id === user.uid)
  const isMission = mission && mission.find(p => p.userId === user.uid)
  const isAdmin = admins && admins.find(p => p.userId === user.uid)
  const pilInvoices = invoices?.filter(a => a.creatorId === user.uid)
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
      
        <div className="users_inner">
          <h3>List of Invoices</h3>
          <table className='table'>
        <thead>
          <th >SN</th>
          <th >Invoice No</th>
          <th >Invoice Amount</th>
          <th >Paid To</th>  
          <th >Due Date</th>      
          <th >Payment Method</th> 
          <th >Invoice Status</th>        
          <th >Action</th>
        </thead>
        <tbody className='total'>
       
           {pilInvoices?.map((s, index) => (
            <InvoiceCard s={s} index={index} key={s.id}/>
           ))}
           
         
           {isMission && <>
            {invoices?.reverse().map((s, index) => (
              <InvoiceCard s={s} index={index} key={s.id}/>
           ))}</>}
            {isAdmin && <>
              {invoices?.reverse().map((s, index) => (
              <InvoiceCard s={s} index={index} key={s.id}/>
           ))}</>}
           
           
           
           
        </tbody>
      </table>
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
