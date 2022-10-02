import React from 'react'
import { useNavigate } from 'react-router-dom'
import './loading.css'

const Loading = () => {
    const navigate = useNavigate()

    // setTimeout(()=>{
    //     navigate('/account/main')
    // },4000)
  return (
    <div className="loading_wrapper">
      <div className='loading'>
        <div className="obj"></div>
        <div className="obj"></div>
        <div className="obj"></div>
        <div className="obj"></div>
        <div className="obj"></div>
        <div className="obj"></div>
        <div className="obj"></div>
        <div className="obj"></div>
        
      </div>
    </div>
  )
}

export default Loading
