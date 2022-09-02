import { addDoc, collection, doc } from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'
import { db, useAuth } from '../../../hooks/useAuth'
import useData from '../../../hooks/useData'
import Agent from './Agent'
import './application.css'
import Ibada from './Ibada'
import Maharim from './Maharim'
import MaharimPassport from './MaharimPassport'
import NextOfKin from './NextOfKin'
import Passport from './Passport'
import Payment from './Payment'
import Personal from './Personal'
import { AiOutlineCheck } from "react-icons/ai";
import Complete from './Complete'
import { serverTimestamp } from 'firebase/database'


const Application = () => {

  const [page, setPage] = useState(1)
  const {pilgrims, users} = useData();
  const { user } = useAuth();

  const pilgrim = pilgrims && pilgrims.find(p => p.userId === user.uid)
  const cuUser = users && users.find(u => u.id === user.uid)

  const fname = cuUser && cuUser.fname
  // const { fname, lname, email } = cuUser;
  const [loading, setLoading] = useState(null)
  const [err, setErr] = useState('')

  const pilgrimsRef = collection(db, 'pilgrims')
  const pilgrimRef = doc(db, 'pilgrims', `${pilgrim?.id}`)

  const addPilgrim = async(e) => {
    e.preventDefault()

    setLoading(true)

    const data = {
      userId: user.uid,
      status: 'Pending',
      fname: fname,
      gender: 'No data',
      marital: 'No data',
      dob: 'No data',
      photo: '',
      lname: cuUser && cuUser.lname,
      email: cuUser && cuUser.email,
      region: '',
      district: '',
      phone: '',
      ibada: '',
      agent: '',
      passNo: '',
      passIssue: '',
      passExp: '',
      passCopy:'',
      maFname: '',
      maLname:'',
      maRel: '',
      maDob:'',
      maEmail:'',
      maPhone:'',
      maPassNo:'',
      maPassIssue:'',
      maPassExp:'',
      maPassCopy: '',
      nextFname:'',
      nextLname: '',
      nextDob: '',
      nextRel:'',
      nextEmail: '',
      nextPhone: '',
      payMode: '',
      payTime: '',
      payDate: '',
      isCompleted: false,
      isPaid: false,
      amout: '',
      payEvidence: '',
      createdAt: serverTimestamp(),
      createdBy: 'Online'

    }
    try {
      await addDoc(pilgrimsRef, data)
      setLoading(false)
    } catch (error) {
      setErr(error.message)
    }
    

  }

  const props = {pilgrim, cuUser, pilgrimRef, setPage, setErr, err, user}

  const RenderPage = () => {
    if(page === 1){
      return (
        <Agent props={props}/>
      )
    }else if(page === 2) {
      return (
        <Ibada props={props}/>
      )
    }else if(page === 3) {
      return (
        <Personal props={props}/>
      )
    }else if(page === 4){
      return (
        <Passport props={props}/>
      )
    }else if(page === 5){
      return (
        <Maharim props={props}/>
      )
    }else if(page === 6){
      return (
        <MaharimPassport props={props}/>
      )
    }else if(page === 7){
      return (
        <NextOfKin props={props}/>
      )
    }else if(page === 8){
      return (
        <Payment props={props}/>
      )
    }else if(page === 9) {
      return (
        <Complete props={props}/>
      )
    }
  }

 
  return (
    <div className='application_wrapper'>
      
      {pilgrim &&
        <div className="appli_inner_left">
          
            <span 
              className={page === 1? 'appli_active': 'appli_item'} 
              onClick={() => setPage(1)}>
                Agent Name 
                {pilgrim?.agent !== '' &&<AiOutlineCheck className='checked_svg'/>}
              </span>
            <span 
              className={page === 2? 'appli_active': 'appli_item'} 
              onClick={() => setPage(2)}>
                Ibada Type
                {pilgrim?.ibada !== '' &&<AiOutlineCheck className='checked_svg'/>}
                </span>
            <span 
              className={page === 3? 'appli_active': 'appli_item'} 
              onClick={() => setPage(3)}>
                Personal Details
                {pilgrim?.gender !== '' &&<AiOutlineCheck className='checked_svg'/>}
                </span>
            <span 
              className={page === 4? 'appli_active': 'appli_item'} 
              onClick={() => setPage(4)}>
                Passport
                {pilgrim?.passNo !== '' &&<AiOutlineCheck className='checked_svg'/>}
            </span>
            {pilgrim.gender !=='Male' &&
            <>
              <span 
              className={page === 5? 'appli_active': 'appli_item'} 
              onClick={() => setPage(5)}>
                Maharim
                {pilgrim?.maFname !== '' &&<AiOutlineCheck className='checked_svg'/>}
                </span>
            <span 
              className={page === 6? 'appli_active': 'appli_item'} 
              onClick={() => setPage(6)}>
                Maharim's Passport
                {pilgrim?.maPassNo !== '' &&<AiOutlineCheck className='checked_svg'/>}
              </span> 
            </>}           
            <span 
              className={page === 7? 'appli_active': 'appli_item'} 
              onClick={() => setPage(7)}>
                Next of Kin
                {pilgrim?.nextFname !== '' &&<AiOutlineCheck className='checked_svg'/>}
                </span>
            <span 
              className={page === 8? 'appli_active': 'appli_item'} 
              onClick={() => setPage(8)}>
                Payment
                {pilgrim?.payMode !== '' &&<AiOutlineCheck className='checked_svg'/>}
                </span>
            <span 
              className={page === 9? 'appli_active': 'appli_item'} 
              onClick={() => setPage(9)}>
                COMPLETE
                {pilgrim?.isCompleted &&<AiOutlineCheck className='checked_svg'/>}
                </span>
        </div>
        }
        <div className="appli_inner_right">
        <h3 className='appli_head'>Application</h3>
          {err && <span className='error'>
            {err}
            <button onClick={() => setErr('')}>x</button>
            </span>}
          {pilgrim ? 
          <>
            {RenderPage()}
            </>
            :
            <div className='no_appli'>
              You dont have an application yet
              <button className='btn_nav' onClick={addPilgrim}>{loading ? 'Creating...' : 'Create a new application'}</button>
            </div>}
        </div>
    </div>
  )
}

export default Application
