import React from 'react'
import './nowhere.css'
import Lottie from "lottie-react";
import data from '../../../hooks/data.json';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';


const NoWhere = () => {

    const { t } = useTranslation();
    const navigate = useNavigate()

    // const handleContact = (e) => {
    //     e.preventDefault()
    //     logOut();
    //     navigate('/contact')
    // }

  return (
    <div className='no_where'>
        <Lottie animationData={data} loop={true} height={300} width={200}/>
        {/* <h1>Ooops..Something is wrong, click Go Back and restart, if persists please <span className='contact_us' onClick={handleContact}>contact Us</span>.</h1> */}
        {/* <button onClick={() => logOut()} className='btn_no_where'> Go Back</button> */}
    </div>
  )
}

export default NoWhere
