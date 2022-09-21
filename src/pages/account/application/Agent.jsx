import { updateDoc } from 'firebase/firestore';
import React from 'react'
import { useState } from 'react';
import useData from '../../../hooks/useData'
import {motion} from 'framer-motion'
import { BiArrowBack } from "react-icons/bi";
import {  useNavigate } from 'react-router-dom';

const Agent = ({props}) => {

    const {pilgrim, pilgrimRef, setPage, setErr } = props
    const [loading, setLoading] = useState(null)
    const [agent, setAgent] = useState(pilgrim.agent)
    const {agents } = useData();
    const agentName = agents && agents.find(a => a.id === agent)?.coName || agents && agents.find(a => a.id === agent)?.name
    const agentCost = agents && agents.find(a => a.id === agent)?.cost

    const navigate = useNavigate();

    console.log('agent', agentCost);

    const handleAgent = async (e) => {
      e.preventDefault()

      setLoading(true)

      try {
         await updateDoc(pilgrimRef, {
          agent: agent,
          agentName,
          agentCost
       
        })
        setPage(2)
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
    className='appli_items' onSubmit={handleAgent}>
        <div className="acc_back">
          <BiArrowBack onClick={() => navigate('/account/main')} className='page_back'/>
          <span className='appli_title'>Agent Name</span>
        </div>
    
        <div className="input_inner">
            <small>Agent</small>
            <select 
                name="agent" id="" 
                className='appli_input'
                onChange={e => setAgent(e.target.value)}
                >
              <option value="">{agentName ? agentName : '--Select Agent--'}</option>
              {agents && agents.map(a => (
                <option value={a.id} key={a.id}>{a.coName || a.name}</option>
              ))}
            </select>            
        </div>
      <button className='btn_appli' type='submit'>{loading ? 'Saving...' : 'Continue'}</button>
    </motion.form>
  )
}

export default Agent
