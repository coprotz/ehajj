import userEvent from '@testing-library/user-event'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import useData from '../../../hooks/useData'
import { jsPDF } from "jspdf";
import PdfInvoice from '../pdfInvoice/PdfInvoice'

const InvoiceCard = ({index, s}) => {

  const { user } = useAuth()

    const { agents, invoices, pilgrims } = useData()
    const agent = agents?.find(a => a.id === s?.agentId)
    const pilgrim = pilgrims?.find(p => p.id === user.uid)

    

 

  const generatePdf = (id) => {
    const doc = new jsPDF("p", "pt", "a4");
    doc.html(document.querySelector(`#${id}`), {
      callback: function(pdf){
        const pageCount = doc.internal.getNumberOfPages();
        pdf.deletePage(pageCount)
        pdf.save(`${s?.no}.pdf`)
      }
    })
  }
  


    

    const isOwn = user.uid === s?.creatorId
    const navigate = useNavigate()


    // console.log('s', s)
  return (
    <>
    
   
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
             <button onClick={() => generatePdf(s?.id)} className='btn_dwn'>Download Pdf</button> 
           
                 
        </div>
        
        </td>
    </tr>
    <div className="pdf_download" style={{display: 'none'}}>
      <PdfInvoice id={s?.id}/>
    </div>
    
    </>
  )
}

export default InvoiceCard
