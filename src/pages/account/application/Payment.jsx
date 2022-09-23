import React from 'react'
import amana from '../../../components/images/amana.jpg'
import crdb from '../../../components/images/crdb.png'
import nbc from '../../../components/images/nbc.jpg'
import nmb from '../../../components/images/nmb.jpg'
import master from '../../../components/images/master.png'
import visa from '../../../components/images/visa2.png'
import { useState } from 'react'
import { AiOutlineCheck } from "react-icons/ai";
import useData from '../../../hooks/useData'
import { updateDoc } from 'firebase/firestore'
import {motion} from 'framer-motion'
import { BiArrowBack } from "react-icons/bi";
import Loading from '../../../components/loading/Loading'

const modes = [
    {id: 0, name: 'MASTERCARD', url:master},
    {id: 1, name: 'VISA', url:visa},
    {id: 2, name: 'NMB', url:nmb},
    {id: 3, name: 'CRDB', url:crdb},
    {id: 4, name: 'NBC', url:nbc},
    {id: 5, name: 'AMANA BANK', url:amana},
]

console.log('modes', modes)



const Payment = ({props}) => {

    const {pilgrim, pilgrimRef, setPage, setErr } = props
    const [mode, setMode] = useState('')
    // const [payTime, setPayTime] = useState('')
    const { agents } = useData();

    const agent = agents && agents.find(a => a.id === pilgrim.agent)

    // console.log('mode', mode)
   

   

    const [payDate, setPayDate] = useState(pilgrim.payDate)
    const [payTime, setPayTime] = useState(pilgrim.payTime)
    const [payMode, setPayMode] = useState(pilgrim.payMode)
    const selected = modes.find(m => m.name === payMode)
    // const [maPassExp, setMaPassExp] = useState(pilgrim.maPassExp)
    const [loading, setLoading] = useState(null)

    const handlePay = async (e) => {
        e.preventDefault();
  
        setLoading(true)
  
        try {
          await updateDoc(pilgrimRef, {
            payDate,
            payTime,
            payMode,
           
         })
         setPage(9)
         setLoading(null)
       } catch (error) {
         setErr(error.message)
       }
      }
  
    

  return (
    <motion.form 
    initial={{ x: '-100vw'}}
    animate={{x:0}} 
    transition={{ ease: "easeOut", duration: 0.5 }} 
      className='appli_items' onSubmit={handlePay}>
        
        {!payMode &&
         <div className="acc_back">
         <BiArrowBack onClick={() => setPage(7)} className='page_back'/>
         <span className='appli_cost'>Your cost for hijjah is <strong>$ {agent && agent.cost}</strong></span>
       </div> 
         }
   
        <div className="acc_back">
         <BiArrowBack onClick={() => setPage(7)} className='page_back'/>
         <h4>Select Mode of Pyment</h4>
       </div> 
        <div className="modes_wrapper">        
            {modes.map((item, index) => (
                <label htmlFor={index} key={index} className='mode_label'>
                    <input 
                        type="radio" 
                        id={index} 
                        name='payMode' 
                        value={item.name} 
                        onChange={e => setPayMode(e.target.value)} 
                        style={{display: 'none'}}

                    />
                    <span className='mode_img'><img src={item.url} alt="" /></span>  
                    { item.name === payMode &&
                    <span className='checked_mode'><AiOutlineCheck/></span>  
                    }
                </label>
            ))}
        </div>
        {payMode &&
        <div className="pay_summary">
            <h3>Payment Summary</h3>
            <div className="paid_detail">
              <small>Paid to:</small>
              <h4>Hajj Mission Tanzania</h4> 
            </div>
            <div className="paid_detail">
              <small>Recepient:</small>                
                <h4>{pilgrim && pilgrim.agentName}</h4>   
            </div>
            <div className="paid_detail">
              <small>Amount:</small>
                <h4>$ {pilgrim && pilgrim.agentCost}</h4>  
            </div>
            <div className="paid_detail">
              <small>Payment Mode:</small>
              <div className='pay_item_mode'>
                <img src={selected?.url} alt="" />
                <h4>{payMode}</h4>  
              </div>
                
            </div>
            
            <div className="pay_time">
                
                <label htmlFor="now"
                    className='btn_now'>
                    <input 
                        type="radio" 
                        id='now' 
                        style={{display: 'none'}} 
                        name='payment' 
                        value='now'
                        onChange={e => setPayTime(e.target.value)}
                        />
                    <span>Pay Now</span>
                </label>
                <label htmlFor="later"
                    className='btn_later'>
                    <input 
                        type="radio" 
                        id='later' 
                        style={{display: 'none'}} 
                        name='payment' 
                        value='later' 
                        onChange={e => setPayTime(e.target.value)}
                        />
                    <span>Pay Later</span>
                </label>             
            </div>
            {payTime === 'now' &&
                <span>Go to secured page...</span>}
            {payTime === 'later' &&
             <div className="input_inner1">
             <small>Payment Date</small>
             <div className="mult_inputs">        
                 <input 
                    type="date" 
                    className='appli_input' 
                    placeholder='Lastname'
                    name='payDate'
                    value={payDate}
                    onChange={e => setPayDate(e.target.value)}
                    />
             </div>
            </div>}
        </div>
         }
         <button className='btn_appli' type='submit'>{loading ? <Loading/> : 'Continue'}</button>
    </motion.form>
  )
}

export default Payment
