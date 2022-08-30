import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import useData from '../../../hooks/useData'
import {motion} from 'framer-motion'
import { BiArrowBack } from "react-icons/bi";

const Complete = ({props}) => {
    const {pilgrim, pilgrimRef, setPage, setErr, user } = props
    const navigate = useNavigate()
   
  return (
    <motion.div 
    initial={{ x: '-100vw'}}
    animate={{x:0}} 
    transition={{ ease: "easeOut", duration: 0.5 }}  
        className='complete_wrapper'>
        <div className="complete_top">
            {pilgrim && pilgrim.payTime === 'later' ? 
            <div className="pay_later">
                <div className="acc_back">
                    <BiArrowBack onClick={() => setPage(8)} className='page_back'/>
                    <h3>Your application is pending due to unpaid {pilgrim?.ibada} cost amount to $ {pilgrim?.agentCost}.</h3> 
                </div>
                            
                <div className="btns_pay">
                    <button className='btn_now' onClick={() => setPage(8)}>Pay Now</button>
                    <span>OR</span>
                    <form>
                        <label htmlFor="pay_evi" className='pay_evi'>
                            <input type="file" id='pay_evi' style={{display: 'none'}}/>
                            <span>Attach Bank Slip</span>
                        </label>
                    </form>
                    
                </div>
                <div>
                   <button onClick={() => navigate('/account/main')} className='btn_pay_later'>Pay Later</button> 
                </div>
                
            </div>
           
            : 'Your application has been successful recieved'
            }
        </div>
      
    </motion.div>
  )
}

export default Complete
