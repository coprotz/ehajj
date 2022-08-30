import { updateDoc } from 'firebase/firestore'
import React, {useState} from 'react'
import {motion} from 'framer-motion'
import { BiArrowBack } from "react-icons/bi";

const NextOfKin = ({props}) => {

  const {pilgrim, pilgrimRef, setPage, setErr } = props

    const [nextFname, setNextFname] = useState(pilgrim.nextFname)
    const [nextLname, setNextLname] = useState(pilgrim.nextLname)
    const [nextDob, setNextDob] = useState(pilgrim.nextDob)
    const [nextRel, setNextRel] = useState(pilgrim.nextRel)
    const [nextEmail, setNextEmail] = useState(pilgrim.nextEmail)
    const [nextPhone, setNextPhone] = useState(pilgrim.nextPhone)
    const [loading, setLoading] = useState(null)

    const handleMaPass = async (e) => {
      e.preventDefault();

      setLoading(true)

      try {
        await updateDoc(pilgrimRef, {
          nextFname,
          nextLname,
          nextDob,
          nextRel,
          nextEmail,
          nextPhone
       })
       setPage(8)
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
          <BiArrowBack onClick={() => setPage(4)} className='page_back'/>
          <span className='appli_title'>Next Of Kin Info</span>
        </div>       
        <div className="input_inner">
            <small>Name</small>
            <div className="mult_inputs">         
                <input 
                  type='text'                  
                  className='appli_input' 
                  placeholder='Firstname'
                  name='nextFname' 
                  value={nextFname} 
                  onChange={e => setNextFname(e.target.value)}
                />                      
                <input 
                  type="text" 
                  className='appli_input' 
                  placeholder='Lastname'
                  name='nextLname' 
                  value={nextLname} 
                  onChange={e => setNextLname(e.target.value)}
                  />
            </div>
        </div>
        <div className="input_inner">
            <small>Date of Birth</small>
            <input 
              type="date" 
              placeholder='Date of Birth' 
              className='appli_input'
              name='nextDob' 
              value={nextDob} 
              onChange={e => setNextDob(e.target.value)}
              />
        </div>
        <div className="input_inner">
          <small>Relation</small>
          <select name="nextRel" id="" className='appli_input' onChange={e => setNextRel(e.target.value)}>
            <option value="">{nextRel ? nextRel : '--Select Relation--'}</option>
            <option value='Husband'>Husband</option>
            <option value='Son'>Son</option> 
            <option value='Daughter'>Daughter</option> 
            <option value='Mother'>Mother</option> 
            <option value='Sister'>Sister</option> 
            <option value='Aunt'>Aunt</option> 
            <option value='Ancle'>Ancle</option> 
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
                  name='nextEmail' 
                  value={nextEmail} 
                  onChange={e => setNextEmail(e.target.value)}
                  />                      
                <input 
                  type="tel" 
                  className='appli_input' 
                  placeholder='Phone Number'
                  name='nextPhone' 
                  value={nextPhone} 
                  onChange={e => setNextPhone(e.target.value)}
                />
            </div>
        </div>
        <button className='btn_appli' type='submit'>{loading ? 'Saving...' : 'Continue'}</button>
    </motion.form>
  )
}
export default NextOfKin
