import userEvent from '@testing-library/user-event'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import useData from '../../../hooks/useData'

const InvoiceCard = ({index, s}) => {


    const { user } = useAuth()

    const { agents, invoices, pilgrims } = useData()
    const agent = agents?.find(a => a.id === s?.agentId)
    const pilgrim = pilgrims?.find(p => p.id === user.uid)

    const isOwn = user.uid === s?.creatorId
    const navigate = useNavigate()


    // console.log('s', s)
  return (
    <tr >
        <td data-label='SN'>{index+1}</td>     
        <td data-label='Invoice No'>{s?.no}</td>  
        <td data-label='Invoice Amount'>$ {s?.amount}</td>    
        <td data-label='Paid To'>{agent?.name || agent?.coName}</td>   
        <td data-label='Due Date'>{s?.dueDate}</td>             
        <td data-label='Payment Method'>{s?.payMode}</td>   
        <td data-label='Invoice Status'>{s?.status}</td>            
        <td >
        <div className="actions_btns">
            {isOwn && <>
              <button onClick={() =>navigate(`/invoice/${s?.id}`)}>View</button> 
              <button >Pay Now</button>
            </>}     
             <button onClick={alert('under construction')}>Download</button> 
           
                 
        </div>
        
        </td>
    </tr>
  )
}

export default InvoiceCard
