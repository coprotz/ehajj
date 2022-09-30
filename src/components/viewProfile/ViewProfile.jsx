import React from 'react'
import { useState } from 'react';
import {  BsEye } from "react-icons/bs";
import {  useNavigate } from 'react-router-dom';


const ViewProfile = ({id}) => {
    const [action, setAction] = useState(null)
    const navigate = useNavigate()
  return (
    <div 
      className="btn_action_btn" 
      onMouseEnter={() =>setAction(true)} 
      onMouseLeave={() =>setAction(null)}
      onClick={() =>navigate(`/profile/${id}`)}
      >
        <button className='btn'><BsEye/></button>
        {action &&
        <span className='div_span'>Mwangalie</span>}
    </div>
  )
}

export default ViewProfile
