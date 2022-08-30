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



const SendMessage = ({currentRoom}) => {

  const { users} = useData();
  const { user } = useAuth();
  const [attached, setAttached] = useState(null)
  const { uid } = user
  const [message, setMessage] = useState('')
  const [loading, setLoding] = useState(null) 
  const cuUser = users && users.find(u => u.id === uid)

  const messageRef = collection(db, 'messages')
  const [document, setDocument] = useState(null)
  const [image, setImage] = useState(null)
  const [error, setError] = useState('')

  // console.log('user', cuUser)

  const name = cuUser?.fname +" "+ cuUser?.lname

  const types = ['image/png', 'image/jpeg']

//   const handleSelect = (e) => {
//       let selected = e.target.files[0];

//       if (selected && types.includes(selected.type)){
//           setImage(selected)
//           setError('')
//       }else {
//           setImage(null)
//           setError('Please select an image file (png or jpeg)')
//       }
//   }


  
  const handleSubmit = async(e) => {
    e.preventDefault()
    setLoding(true)
    const data = {
            uid,
            name: name,
            // photoURL,
            createdAt: serverTimestamp(),
            text: message,
            room: currentRoom.id,
            // memberId: room ? memberId : 'all',
            // displayName: doctor ? doctor.name : displayName
    }

    try {
        await addDoc(messageRef, data)
        setLoding(null);
        setMessage('');
        
    } catch (error) {
        console.log(error.message)
    }
    // scrollRef.current.scrollIntoView({ behavior: 'smooth' })

    // console.log('data', data)
  
};
  return (

        <div className='form_container' >
          
          {/* {document &&
            <SendDcoument setDocument={setDocument} document={document} currentRoom={currentRoom} setAttached={setAttached}/>
          } 
          { image && 
            <SendImage 
              setImage={setImage} 
              image={image} 
              setAttached={setAttached} 
              currentRoom={currentRoom}
              user={user}
              doctor={doctor}
              />
          } */}
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
                    // onChange={handleSelect}
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
              disabled={!message && loading}
              ><MdOutlineSend/>
            </button>   
        </form>
        </div>
  
  )
}

export default SendMessage
