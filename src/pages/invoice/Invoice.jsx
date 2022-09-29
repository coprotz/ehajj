import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useData from '../../hooks/useData'
import { HiMenuAlt4, HiX } from "react-icons/hi";
import './invoice.css'
import { useState } from 'react';

const Invoice = () => {

    const { id } = useParams()
    const { pilgrims, agents, invoices } = useData()
    const invoice = invoices?.find(i => i.id === id)
    const agent = agents?.find(a => a.id === invoice?.agentId)
    const pilgrim = pilgrims?.find(p => p.id === invoice?.creatorId)
    const navigate = useNavigate()
    const [open, setOpen] = useState(null)
    
  return (
    <div className='invoice_container'>
      <div className="invoice_wrapper">
        <div className="invoice_top">
            <button className='btn_menu' onClick={()  =>navigate(-1)}><HiX/></button>
            <div className="invoice_actions">
                <button className='btn_action' onClick={() => setOpen(!open)}>{open? <HiX/> : <HiMenuAlt4/>}</button> 
                {open &&
                <div className="invoice_menu">
                    <span>Download Invoice</span>
                    <span>Pay Invoice</span>
                    <span>Change Payment Method</span>
                    <span>Settings</span>
                </div>   }   
            </div>
               
        </div>
        <div className="invoice_to">
            <div className="invoice_logo">
                <img src={agent?.logo} alt="" />
            </div>
            <h1 className="invoice_co_name">{agent?.name || agent?.coName}</h1>
            <span className="invoice_no"># {invoice?.no}</span>             
        </div>
      </div>
      <div className="invoice_rece_wrapper">
        <div className="invoice_rece">
            <div className="invoice_for">
                <span>INVOICE FOR</span>
                <h2>{invoice?.name}</h2>
                <h4>{pilgrim?.email}</h4>
            </div>
            <div className="invoice_for">
                <span>PAYMENT METHOD</span>
                <h2>{invoice?.payMode}</h2>
              
            </div>
            <div className="invoice_amount">
                <span>AMOUNT DUE</span>
                <h1>$ {invoice?.amount}</h1>
                <h4>{invoice?.dueDate}</h4>
            </div>
        </div>
      </div>
    
      <div className="invoice_inner">
        <div className="invoice_inner_top">
            <span>TASK</span>
            <span>TOTAL</span>
        </div>
        <div className="invoice_body">
            <h3>{invoice?.desc}</h3>
            <h2>$ {invoice?.amount}</h2>
        </div>
      </div>
      <div className="invoice_footer">
        <span>&copy; 2022 Barru Technologies LTD, 71-75, Shelton Street, Covent Garden, London, WC2H 9JQ, UNITED KINGDOM</span>
      
      </div>
    </div>
  )
}

export default Invoice
