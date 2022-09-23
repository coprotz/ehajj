import { updateDoc } from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'
import {motion} from 'framer-motion'
import { BiArrowBack } from "react-icons/bi";
import Loading from '../../../components/loading/Loading';

const Ibada = ({props}) => {

    const {pilgrim, pilgrimRef, setPage, setErr } = props
    const [loading, setLoading] = useState(null)
    const [ibada, setIbada] = useState(pilgrim.ibada)

    const handleIbada = async (e) => {
        e.preventDefault()

        setLoading(true)

        try {
           await updateDoc(pilgrimRef, {
            ibada: ibada,
            // agentName: 
          })
          setPage(3)
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
      className='appli_items' onSubmit={handleIbada}>
        <div className="acc_back">
          <BiArrowBack onClick={() => setPage(1)} className='page_back'/>
          <span className='appli_title'>Ibada Type</span>
        </div>
        
        <div className="input_inner">           
          <small>Ibadah Type</small>
          <select 
              name="ibada" 
              onChange={e => setIbada(e.target.value)}
              id="" 
              className='appli_input'>
              <option value="">{ibada !== ''? ibada : '--Select Ibada--'}</option>
              <option value='Hijjah'>Hijjah</option>
              <option value='Umrah'>Umrah</option>         
          </select>            
        </div>
        {/* <button className='btn_appli' type='submit'><Loading/></button> */}
        <button className='btn_appli' type='submit'>{loading ? <Loading/> : 'Continue'}</button>
    </motion.form>
  )
}

export default Ibada
