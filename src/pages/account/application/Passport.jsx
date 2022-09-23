import { updateDoc } from 'firebase/firestore';
import React, {useState} from 'react'
import { AiOutlinePlus,AiOutlineMinus } from "react-icons/ai";
import {motion} from 'framer-motion'
import { BiArrowBack } from "react-icons/bi";
import Loading from '../../../components/loading/Loading';

const Passport = ({props}) => {
    const {pilgrim, pilgrimRef, setPage, setErr } = props

    const [passNo, setPassNo] = useState(pilgrim.passNo)
    const [passIssue, setPassIssue] = useState(pilgrim.passIssue)
    const [passExp, setPassExp] = useState(pilgrim.passExp)
    const [loading, setLoading] = useState(null)

    const handlePass = async (e) => {
        e.preventDefault();
  
        setLoading(true)
  
        try {
          await updateDoc (pilgrimRef, {
            passNo,
            passIssue,
            passExp,
                
         })
         setPage(5)
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
        className='appli_items' onSubmit={handlePass}>
        <div className="acc_back">
          <BiArrowBack onClick={() => setPage(3)} className='page_back'/>
          <span className='appli_title'>Passport</span>
        </div>
        <div className="passport_inner">       
            <div className="group_inner_inputs">
                <div className="input_inner">
                    <small>Passport Number</small>
                    <input 
                        type="text" 
                        className='appli_input' 
                        placeholder='Passport Number'
                        name='passNo' 
                        value={passNo} 
                        onChange={e => setPassNo(e.target.value)}
                    />                
                </div>
                <div className="input_inner">
                    <small>Date of Issue</small>
                    <input 
                        type="date" 
                        className='appli_input' 
                        placeholder='Passport Number'
                        name='passIssue' 
                        value={passIssue} 
                        onChange={e => setPassIssue(e.target.value)}
                    />                
                </div>
                <div className="input_inner">
                    <small>Expiring Date</small>
                    <input 
                        type="date" 
                        className='appli_input' 
                        placeholder='Passport Number'
                        name='passExp' 
                        value={passExp} 
                        onChange={e => setPassExp(e.target.value)}
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
        <button className='btn_appli' type='submit'>{loading ? <Loading/> : 'Continue'}</button>
    </motion.form>
  )
}

export default Passport
