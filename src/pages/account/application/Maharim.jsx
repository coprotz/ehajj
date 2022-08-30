import { updateDoc } from 'firebase/firestore'
import React, {useState} from 'react'
import {motion} from 'framer-motion'
import { BiArrowBack } from "react-icons/bi";

const Maharim = ({props}) => {
  const {pilgrim, pilgrimRef, setPage, setErr } = props

  const [maFname, setMaFname] = useState(pilgrim.maFname)
  const [maLname, setMaLame] = useState(pilgrim.maLname)
  const [maDob, setMaDob] = useState(pilgrim.maDob)
  const [maRel, setMaRel] = useState(pilgrim.maRel)
  const [maEmail, setMaEmail] = useState(pilgrim.maEmail)
  const [maPhone, setMaPhone] = useState(pilgrim.maPhone)
  const [loading, setLoading] = useState(null)

  const handleMaharim = async (e) => {
    e.preventDefault();

    setLoading(true)

    try {
      await updateDoc(pilgrimRef, {
        maFname,
        maLname,
        maDob,
        maRel,
        maEmail,
        maPhone,

            
     })
     setPage(6)
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
      className='appli_items' onSubmit={handleMaharim}>
        
        <div className="acc_back">
          <BiArrowBack onClick={() => setPage(4)} className='page_back'/>
          <span className='appli_title'>Maharim Info</span>
        </div>       
        <div className="input_inner">
            <small>Name</small>
            <div className="mult_inputs">         
                <input 
                  type='text'                
                  className='appli_input' 
                  placeholder='Firstname'
                  name='maFname' 
                  value={maFname} 
                  onChange={e => setMaFname(e.target.value)}
                  />                      
                <input 
                  type="text" 
                  className='appli_input' 
                  placeholder='Lastname'
                  name='maLname' 
                  value={maLname} 
                  onChange={e => setMaLame(e.target.value)}
                  />
            </div>
        </div>
        <div className="input_inner">
            <small>Date of Birth</small>
            <input 
              type="date" 
              placeholder='Date of Birth' 
              className='appli_input'
              name='maDob' 
              value={maDob} 
              onChange={e => setMaDob(e.target.value)}
              />
        </div>
        <div className="input_inner">
          <small>Relation</small>
          <select name="maRel" className='appli_input' onChange={e => setMaRel(e.target.value)}>
            <option value="">{maRel !== ''? maRel : '--Select Relation--'}</option>
            <option value='Husband'>Husband</option>
            <option value='Son'>Son</option>  
            <option value='Father'>Father</option>  
            <option value='Ground Father'>Ground Father</option>        
          </select>
        </div>
        <div className="input_inner">
            <small>Contacts</small>
            <div className="mult_inputs">         
                <input 
                  type='email'                    
                  className='appli_input' 
                  placeholder='Email'
                  name='maEmail' 
                  value={maEmail} 
                  onChange={e => setMaEmail(e.target.value)}
                />                      
                <input 
                  type="tel" 
                  className='appli_input' 
                  placeholder='Phone Number'
                  name='maPhone' 
                  value={maPhone} 
                  onChange={e => setMaPhone(e.target.value)}
                />
            </div>
        </div>
        <button className='btn_appli' type='submit'>{loading ? 'Saving...' : 'Continue'}</button>
    </motion.form>
  )
}

export default Maharim
