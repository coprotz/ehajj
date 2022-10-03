import React, { useState } from 'react'
// import './send.css'
import {  HiOutlinePaperClip, HiOutlineCamera } from "react-icons/hi";
import {  ImCamera, ImImage } from "react-icons/im";
import { MdOutlineSend } from "react-icons/md";
import { BsFillFileEarmarkFill } from "react-icons/bs";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import useData from '../../../hooks/useData';
// import { useAuth, db } from '../../config';
// import useData from '../hook/useData';
// import SendDcoument from './SendDcoument';
// import SendImage from './SendImage';
import { db, useAuth } from '../../../hooks/useAuth';
// import useData from '../../hooks/useData';



const SendMessage = ({chat}) => {

  const { users, mission, pilgrims, admins, agents} = useData();
  const { user } = useAuth();
  const [attached, setAttached] = useState(null)
  const { uid } = user
  const [message, setMessage] = useState('')
  const [loading, setLoding] = useState(null) 
  // const cuUser = users && users.find(u => u.id === uid)

  const messageRef = collection(db, 'messages')
  // const [document, setDocument] = useState(null)
  // const [image, setImage] = useState(null)
  const [error, setError] = useState('')

  const cuUser = users?.find(u => u.id === user.uid)
  const agent = agents?.find(a => a.id === cuUser?.agentId)
  const pilgrim = pilgrims?.find(p=>p.id === user.uid)
  const admin = admins?.find(a => a.userId === user.uid)
  const isMission = mission?.find(a => a.userId === user.uid)

  // console.log('user', cuUser)

  // console.log('user', cuUser)

  // const name =
  //   isMission? isMission?.fname+" "+isMission?.lname :
  //   admin? admin?.fname+" "+admin?.lname : 
  //   agent? agentUser?.fname+" "+agentUser?.lname :
  //   pilgrim? pilgrim?.fname+" "+pilgrim?.lname : null
    // cuUser?.fname +" "+ cuUser?.lname

  const name = 
    cuUser? cuUser?.fname+" "+cuUser?.lname :
    isMission? isMission?.fname+" "+isMission?.lname :
    admin? admin?.fname+" "+admin?.lname :
    pilgrim? pilgrim?.fname+" "+pilgrim?.lname :    
    'Guest' 
    


  // const types = ['image/png', 'image/jpeg']


  const handleSubmit = async(e) => {
    e.preventDefault()
    setLoding(true)
    const data = {
            uid,
            name: name,        
            createdAt: serverTimestamp(),
            text: message,
            room: chat.id,
           
    }

    try {
        await addDoc(messageRef, data)
        setLoding(null);
        setMessage('');
        
    } catch (error) {
        console.log(error.message)
    }

  
};
  return (

        <div className='form_container' >      
          <form onSubmit={handleSubmit} className='form_inner_wrapper'>   
            {attached &&
            <div className="attach_wrapper">
              {error && <span className='error'>{error}</span>}
              <div className="attach_items">                
                <label htmlFor='file' className="attach_item">
                  <div className='attach_btns'><BsFillFileEarmarkFill/></div>
                  <span>Document</span>
                  <input 
                    type="file" 
                    style={{display: 'none'}} 
                    id='file'              
                    />
                </label>
                <label htmlFor='image' className="attach_item">
                  <div className='attach_btns'><ImImage/></div>
                  <span>Image</span>
                  <input 
                    type="file" 
                    style={{display: 'none'}} 
                    id='image'
                    // onChange={handleSelect}
                    />
                </label>             
                <div className="attach_item">
                <div className='attach_btns'><ImCamera/></div>
                  <span>Camera</span>
                </div>
              </div>
            </div>}
            <div className="form_outer">        
                <div className="emoj">
                  <button className='btn_form' onClick={() => setAttached(!attached)} type='button'><HiOutlinePaperClip/></button>
                </div> 
                <input 
                  type="text" 
                  value={message} 
                  className='send_input' 
                  placeholder='Message'
                  onChange={(e) =>setMessage(e.target.value)} 
                  />          
                <button className='btn_form' type='button'><HiOutlineCamera/></button>
            </div> 
            <button 
              className='btn_send_msg'
              disabled={!message}
              ><MdOutlineSend/>
            </button>   
        </form>
        </div>
  
  )
}

export default SendMessage
