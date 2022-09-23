import React, { useState } from 'react'
import './change.css'
import {  BsChatLeftText, BsEye, BsPencil } from "react-icons/bs";

const ChangeStatus = ({id}) => {
    const [action, setAction] = useState(null)
  return (
    <div className="btn_action_btn" onMouseEnter={() =>setAction(1)} onMouseLeave={() =>setAction(null)}>
        <button className='btn'><BsPencil/></button>
        {action === 1 &&
        <span className='div_span'>Badilisha Hatua</span>}
    </div>
  )
}

export default ChangeStatus
