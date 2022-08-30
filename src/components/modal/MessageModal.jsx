import React, { useEffect, useState } from 'react'
import './modal.css'
import { HiX } from "react-icons/hi";
import { useAuth } from '../../hooks/useAuth';
import {  serverTimestamp, setDoc, addDoc, doc, collection } from 'firebase/firestore' 

import { useForm } from "react-hook-form";




const MessageModal = ({props}) => {

  const { db } = useAuth()
  const [sending, setSending] = useState(null)
  const [error, setError] = useState('')
  const { register,  watch, formState: { isValid } } = useForm({mode: 'all'});

  const {pilAgent, setMessage, cuPil, setMsg, chats, message, pilgrims, cuAgent} = props

  // console.log('message', message)

  // const getRandomId = (min = 0, max = 50000000) => {
  //   min = Math.ceil(min);
  //   max = Math.floor(max);
  //   const num =  Math.floor(Math.random() * (max - min + 1)) + min;
  //   return num.toString().padStart(6, "0")
  // };


  const subject = watch('title')
  const body = watch('body')

  const activePils = pilgrims.filter(p => message?.includes(p.id)) 

  const sender = cuPil? {id: cuPil?.id, name: cuPil?.firstname} : cuAgent? {id: cuAgent?.id, name: cuAgent?.pName} : null

  const data = {
    // chatId: 1026+getRandomId(),
    sender: sender,
    receiver: activePils,
    subject: subject,
    body: body,
    isSeen: false,
  }

  const chatRef = collection(db, 'chats')
  const messageref = collection(db, 'messages')

  

  const handleMessage = async (e) => {
    e.preventDefault()

    // console.log('data', data)

    setSending(true)

    try {
      const chat = await addDoc(chatRef, {
        sender: sender,
        receiver: activePils,
        timeStamp: serverTimestamp(),
      })
      await addDoc(messageref, {
        ...data,
        chatId: chat.id,
        timeStamp: serverTimestamp(),
      })
      setMessage(null)
      setSending(null)
      setMsg('Ujumbe umetumwa vizuri!')
          setTimeout(() => {
          setMsg('')
      }, 3000);
    } catch (error) {
      setError(error.message)
    }

  
  };


  return (
    <div className='modal_overlay'>
        <div className="modal_message">
            <div className="modal_top">
                
                {activePils? 'Mahujaji': null}
                <HiX onClick={() => setMessage(null)}/>
            </div>
            <form className="modal_body">
                {error && <span className='error'>{error}</span>}              
                  <div className='modal_select'>
                    {activePils?.map((ac) => 
                      (<span key={ac.id}>{ac.firstname}, </span>
                    ))}
                  </div>
                  
                <select name='title'
                  {...register("title", { required: true })}
                  className='modal_select'
                  >
                  <option value="Pasipoti">Pasipoti</option>
                  <option value="Viza">Viza</option>
                  <option value="Tiketi">Tiketi</option>
                  <option value="Malipo">Malipo</option>
                  <option value="Mengineyo">Mengineyo</option>
                
                </select>
               
                <textarea 
                  name="body" 
                  id="" 
                  cols="30" 
                  rows="10" 
                  placeholder='Ujumbe'
                  {...register("body", { required: true })}
                  className='modal_select' 
                  ></textarea>
                <button onClick={handleMessage}>{sending && !error? 'Inatuma...' : 'Tuma'}</button>
            </form>
        </div>
      
    </div>
  )
}

export default MessageModal
