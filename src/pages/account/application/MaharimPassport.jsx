import { updateDoc } from 'firebase/firestore';
import React, {useState} from 'react'
import { AiOutlinePlus,AiOutlineMinus } from "react-icons/ai";
import {motion} from 'framer-motion'
import { BiArrowBack } from "react-icons/bi";

const MaharimPassport = ({props}) => {

    const {pilgrim, pilgrimRef, setPage, setErr } = props

    const [maPassNo, setMaPassNo] = useState(pilgrim.maPassNo)
    const [maPassIssue, setMaPassIssue] = useState(pilgrim.maPassIssue)
    const [maPassExp, setMaPassExp] = useState(pilgrim.maPassExp)
    const [loading, setLoading] = useState(null)

    const handleMaPass = async (e) => {
        e.preventDefault();
  
        setLoading(true)
  
        try {
          await updateDoc(pilgrimRef, {
            maPassNo,
            maPassIssue,
            maPassExp,
                
         })
         setPage(7)
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
        className='appli_items' onSubmit={handleMaPass}>
        
        <div className="acc_back">
          <BiArrowBack onClick={() => setPage(5)} className='page_back'/>
          <span className='appli_title'>Maharim Passport</span>
        </div>
        <div className="passport_inner">       
            <div className="group_inner_inputs">
                <div className="input_inner">
                    <small>Passport Number</small>
                    <input 
                        type="text" 
                        className='appli_input' 
                        placeholder='Passport Number'
                        name='maPassNo' 
                        value={maPassNo} 
                        onChange={e => setMaPassNo(e.target.value)}
                        />                
                </div>
                <div className="input_inner">
                    <small>Date of Issue</small>
                    <input 
                        type="date" 
                        className='appli_input' 
                        placeholder='Passport Number'
                        name='maPassIssue' 
                        value={maPassIssue} 
                        onChange={e => setMaPassIssue(e.target.value)}
                        />                
                </div>
                <div className="input_inner">
                    <small>Expiring Date</small>
                    <input 
                        type="date" 
                        className='appli_input' 
                        placeholder='Passport Number'
                        name='maPassExp' 
                        value={maPassExp} 
                        onChange={e => setMaPassExp(e.target.value)}
                        />                
                </div>
            </div>
            <div className="photo_inner">
                <label htmlFor="pass_copy" className='pass_attach'>
                    <input type="file" id='pass_copy' style={{display: 'none'}}/>
                    <span><AiOutlinePlus/>Add Passport Copy</span>
                </label>
               
            </div>
        </div>
       
        <button className='btn_appli' type='submit'>{loading ? 'Saving...' : 'Continue'}</button>
    </motion.form>
  )
}

export default MaharimPassport