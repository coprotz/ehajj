import React from 'react'
import { useState } from 'react';
import {  BsEye } from "react-icons/bs";


const ViewProfile = ({id}) => {
    const [action, setAction] = useState(null)
  return (
    <div className="btn_action_btn" onMouseEnter={() =>setAction(true)} onMouseLeave={() =>setAction(null)}>
        <button className='btn'><BsEye/></button>
        {action &&
        <span className='div_span'>Mwangalie</span>}
    </div>
  )
}

export default ViewProfile
