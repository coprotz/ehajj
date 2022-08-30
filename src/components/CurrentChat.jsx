import React, {useState} from 'react'
import { BiArrowBack,BiSend, BiEnvelope, BiArrowFromRight} from "react-icons/bi";
import {  serverTimestamp, setDoc, addDoc, doc, collection, onSnapshot } from 'firebase/firestore' 
import { useAuth } from '../hooks/useAuth';
import userEvent from '@testing-library/user-event';

const CurrentChat = ({chat, setChat, messages, register, msgChat, cuChat, cuAgent, watch, cuPil  }) => {

    const [sending, setSending] = useState(null)
    const [err, setErr] = useState('')
    const { db, user } = useAuth()

    let own = cuPil?.id || cuAgent?.id

    const sender = cuPil? {id: cuPil?.id, name: cuPil?.firstname } : cuAgent? {id: cuAgent?.id, name: cuAgent?.pName} : null
    
    const options = { weekday: 'short', year: '2-digit', month: 'short', day: 'numeric' };

    const messageRef = collection(db, 'messages')

    const body = watch('body')

    const data = {
      chatId: cuChat?.chatId,
      sender: sender,
      receiver: {id: cuChat?.sender.id, name: cuChat?.sender.name},
      subject: cuChat?.subject,
      body: body,
      isSeen: false,
      timeStamp: serverTimestamp(),
    }

    const [form, setForm] = useState({
      chatId: cuChat?.chatId,
      sender: sender,
      receiver: {id: cuChat?.sender.id, name: cuChat?.sender.name},
      subject: cuChat?.subject,
      body: '',
      isSeen: false,
      timeStamp: serverTimestamp(),
    })
  

    const handleChat = async (e) => {
        e.preventDefault();
    
        setSending(true)
        
    
        // console.log('data', form)
    
        try {
          await addDoc(messageRef, form);
          setSending(false)
       
        } catch (error) {
         console.log(error)
         setErr(error.message)
        }
      }

      console.log('chat', chat)
      

      const currentMessages = messages?.filter((m) => m?.chatId === chat.id)

      console.log('messages', currentMessages)
  return (
    <div className='chat_container'>
    <div className={msgChat? "current_chat" : "current_caht"}> 
      <div className="current_chat_container">
                      
        <div className="current_top">
          <BiArrowBack onClick={() =>setChat(null)}/>
          <div className="current_card_info">
            {chat?.sender?.name[0]}
          </div>
          <div className="cu_chat_title">
            {cuPil ? <h4>{chat?.sender?.name}</h4> : 
             <h4>{chat?.receiver.length > 1? 'Mahujaji' : chat?.receiver?.find(r => r?.id !== user.uid)?.firstname}</h4> }
             <small>{cuChat?.subject}</small>
          </div>
         
        </div>
        {err && <span className='error'>{err}</span>}
        <div className="chat_messages_wrapper">
           <div className="chat_messages" >
            {currentMessages && currentMessages.sort((a, b) => a.timeStamp < b.timeStamp ? -1 : 1).map((item) => (
              <div className={item?.sender?.id === own? 'message_lists_own' : "message_lists"} key={item?.id}>                            
                  <span  className={item?.sender?.id === own? 'own_msg': 'not_own'} >
                    <small className={item?.sender?.id === own?'sender_null':'sender_name'}>{item?.sender?.name}</small>
                    {item?.body}
                    <small className='message_time'>{new Date(item?.timeStamp?.seconds * 1000).toLocaleTimeString("en-US", options)}</small>
                  </span>
              </div>
            
            ))}
          </div>
         
        </div>
       </div> 

        
        
    </div>
      <form onSubmit={handleChat} className="chat_actions">
        <div className="message_input">
          <textarea 
            name="body"
            value={form.body}
            onChange={(e) => setForm({...form, body: e.target.value})}
            // {...register("body", { required: true })}
            ></textarea>
        </div>
        <button type='submit'>{sending? '...': <BiSend/>}</button>
    </form>
   </div>
  )
}

export default CurrentChat
