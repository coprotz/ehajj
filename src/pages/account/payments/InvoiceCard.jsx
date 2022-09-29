import React from 'react'
import { useNavigate } from 'react-router-dom'
import useData from '../../../hooks/useData'

const InvoiceCard = ({index, s}) => {
    const { agents, invoices } = useData()
    const agent = agents?.find(a => a.id === s?.agentId)
    const navigate = useNavigate()


    console.log('s', s)
  return (
    <tr >
        <td data-label='SN'>{index+1}</td>     
        <td data-label='Invoice No'>{s?.no}</td>  
        <td data-label='Invoice Amount'>$ {s?.amount}</td>    
        <td data-label='Paid To'>{agent?.name || agent?.coName}</td>   
        <td data-label='Due Date'>{s?.dueDate}</td>             
        <td data-label='Payment Method'>{s?.payMode}</td>   
        <td data-label='Invoice Status'>{s?.status}</td>            
        <td data-label='Action'>
        <div className="actions_btns">
            <button onClick={() =>navigate(`/invoice/${s?.id}`)}>View</button> 
            <button >Pay Now</button>
            <button>Download</button>      
        </div>
        
        </td>
    </tr>
  )
}

export default InvoiceCard
