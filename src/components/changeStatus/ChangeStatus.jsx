import React, { useState } from 'react'
import './change.css'
import {  BsChatLeftText, BsEye, BsPencil } from "react-icons/bs";
import useData from '../../hooks/useData';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../hooks/useAuth';
import Loading from '../loading/Loading';

const ChangeStatus = ({id}) => {
    const [action, setAction] = useState(null)
    const [change, setChange] = useState(null)
    const [loading, setLoading] = useState(null)
    const [update, setUpdate] = useState('')
    const [err, setErr] = useState('')

    const { pilgrims } = useData()

    const pilRef = doc(db, 'pilgrims', `${id}`)

    const updateStatus = async (e) => {
        e.preventDefault();

        setLoading(true)

        try {
            await updateDoc(pilRef, {
                status: update
            })
            setLoading(null)
            setChange(false)
        } catch (error) {
            setErr(error.message)
        }
    }

  return (
    <div className="btn_action_btn" onMouseEnter={() =>setAction(1)} onMouseLeave={() =>setAction(null)}>
        <button className='btn' onClick={() =>setChange(!change)}><BsPencil/></button>
        {action === 1 &&
        <span className='div_span'>Badilisha Hatua</span>}
        {change && 
        <form className='change_wrapper' onSubmit={updateStatus}>
            {err && <span className='error'>{err}</span>}
            Select Action
            <select name="update" id="" onChange={(e) =>setUpdate(e.target.value)}>
                <option value="">--Select--</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Payment Received">Payment Received</option>
                <option value="Payment Confirmed">Payment Confirmed</option>
                <option value="Payment Verified">Payment Verified</option>
                <option value="Payment Verifying">Payment Verifying</option>
                <option value="Visa Processing">Visa Processing</option>
                <option value="Visa is Ready">Visa is Ready</option>
                <option value="Ticket is Ready">Ticket is Ready</option>              
                <option value="Ticket & Visa Processin">Ticket & Visa Processing</option>
                <option value="Ticket Processing & Visa is Ready">Ticket Processing & Visa is Ready</option>
                <option value="Ticket is Ready & Visa Processing">Ticket is Ready & Visa Processing</option>
                <option value="Ticket  & Visa are Ready">Ticket  & Visa are Ready</option>
                <option value="Cost Paid">Cost Paid</option>
                <option value="Pending">Pending</option>
            </select>
            <div className="actions_btns">
                <button className='btn_send'>{loading? <Loading/> :'Update Status'}</button>
                <button className='btn_cancel' onClick={() =>setChange(null)}>CANCEL</button>
            </div>
            
        </form>}

    </div>
  )
}

export default ChangeStatus
