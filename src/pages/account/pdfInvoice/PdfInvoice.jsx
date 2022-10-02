import React from 'react'
import { jsPDF } from "jspdf";
import './pdfinvoice.css'
import { useParams } from 'react-router-dom';
import useData from '../../../hooks/useData';



const PdfInvoice = ({id}) => {
    // const { id } = useParams()
    const { agents, invoices, pilgrims } = useData()
    const invoice = invoices?.find(i =>i.id === id)
    const agent = agents?.find(a => a.id === invoice?.agentId)
    const pilgrim = pilgrims?.find(p => p.id === invoice?.creatorId)


  return (
   
        <div className="pdf_invoice_inner" id={`${id}`}>
            <div className="pdf_invoice_top">
                <div className="pdf_inv_left">
                    <div className="pdf_invoice_logo">
                        <img src={agent?.logo} alt="" />
                    </div>
                  
                    <h1 className='invoice_title'>INVOICE</h1>
                    <span className='pdf_tin'>Invoice number: {invoice?.no}</span>
                </div>
                <div className="pdf_invoice_right">
                    <h4>{agent?.name || agent?.coName}</h4>
                    <span>Dar es Salaam</span>
                    <span className='pdf_tin'>TIN: 12548468</span>
                </div>
            </div>
            <>
            <div className="pdf_invoice_bill">
                <h4>Bill to</h4>
                <span>{invoice?.name}</span>
                <span>{pilgrim?.phone}</span>
               
            </div>
            <div className="pdf_invoice_body">
                <div className="pdf_invoice_bill">
                    <h4>Details</h4>
                    
                    <div className="pdf_invoice_b_left pdf_detail">
                        <span>Invoice number</span>
                        <span>{invoice?.no}</span>
                    </div>
                    <div className="pdf_invoice_b_left pdf_detail">
                        <span>Invoice Date</span>
                        <span>{new Date(invoice?.createdAt?.seconds * 1000).toLocaleDateString("en-US")}</span>
                    </div>
                    <div className="pdf_invoice_b_left pdf_detail">
                        <span>Due Date</span>
                        <span>{invoice?.dueDate}</span>
                    </div>
                    <div className="pdf_invoice_b_left pdf_detail">
                        <span>Bill ID</span>
                        <span>{invoice?.id}</span>
                    </div>
                    {/* <div className="pdf_invoice_b_left pdf_detail">
                        <span>Account ID</span>
                        <span>{invoice?.creatorId}</span>
                    </div> */}
                    
                   
                </div>
                <div className="pdf_invoice_details">
                    <h4>{invoice?.desc}</h4>
                    <div className="pdf_invoice_det_amount total_usd">
                        <span>Total in Usd</span>
                        <h3>$ {invoice?.amount}</h3>
                    </div>
                    <div className="pdf_invoice_det_amount">
                        <span>Subtotal in USD</span>
                        <span>$ {invoice?.amount}</span>
                    </div>
                    <div className="pdf_invoice_det_amount">
                        <span>VAT</span>
                        <span>$ 0.00</span>
                    </div>
                    <div className="pdf_invoice_det_amount grand_total">
                        <span>Total in USD</span>
                        <h2>$ {invoice?.amount}</h2>
                    </div>
                </div>
            </div>
            <div className="pdf_invoice_bill">
                <h4>Bank Details</h4>
                <span>Jumbe Travel Agency Ltd</span>
                <span>CRDB Account #: 1254884658</span>
                <span>NMB Account #: 1254884658</span>
                <span>AMANA BANK Account #: 1254884658</span>
                <span>NBC Account #: 1254884658</span>
               
                
            </div>
            </>
            <div style={{color: '#3266a8'}}>
                Powered by BarruTech
            </div>
        </div>
 
  
  )
}

export default PdfInvoice
