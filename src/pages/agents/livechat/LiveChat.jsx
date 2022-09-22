import React from 'react'
import './livechat.css'
import { BsFillChatRightTextFill, BsXLg } from "react-icons/bs";
import useData from '../../../hooks/useData';
import { db, useAuth } from '../../../hooks/useAuth';
import { useState } from 'react';
import {motion} from 'framer-motion'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import MessageCard from '../../account/message/MessageCard';

const LiveChat = ({id}) => {
    const { user } = useAuth()
    const { agents, users, chats, messages } = useData()
    const cuUser = users && users.find(a => a.id === user?.uid)
    const agent = agents && agents.find(a => a.id === id)

    const myChats = chats && chats.filter(c =>c.members.includes(`${user?.uid}`))

    const [liveChat, setLiveChat] = useState(null)
    const [sending, setSending] = useState(null)
    const [loading, setLoding] = useState(null) 
    const [chat, setChat] = useState(null)

    const chatsRef = collection(db, 'chats')

    const handleChat = async(id, e) => {
        e.preventDefault()

        setSending(true)

        try {
            const oldChat = myChats && myChats.find(c => c.members.includes(`${id}`)) 
            if(oldChat){
                setLiveChat(oldChat)
            }else{
                const data = {
                    members: [`${user.uid}`, `${id}`]
                }

                const newChat = await addDoc(chatsRef, data)
                if(newChat){
                    setLiveChat(newChat)
                }
                setSending(null)
            }
        } catch (error) {
            console.log(error.message)
        }

    }

    const [message, setMessage] = useState('')
    // const { uid } = user;
    const name = cuUser?.fname +" "+ cuUser?.lname

    console.log('liveChat', liveChat?.id)

    const scrollRef = React.useRef(null);

    React.useLayoutEffect(() => {
      if(scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    })

    const messageRef = collection(db, 'messages')

    const handleSubmit = async(e) => {
        e.preventDefault()
        setLoding(true)
        const data = {
                uid: user?.uid,
                name: name,           
                createdAt: serverTimestamp(),
                text: message,
                room: liveChat.id,
           
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
    <div className="live_chat">        
        <div className="live_wrpper">
           <button className='btn_live' onClick={() => setChat(!chat)}>{chat? <BsXLg/>: <BsFillChatRightTextFill/>}</button>
           {chat &&
            <motion.div 
            initial={{ x: '100%'}}
            animate={{x: 0}} 
            transition={{ ease: "easeOut", duration: 0.5 }} 
                className='do_want'>
                {liveChat? <>
                <div className="do_top">
                    <div className="do_top_1">
                        <div className="div_logo">
                            <img src={agent?.logo} alt="" />
                        </div>
                        <h4>{agent?.name || agent?.coName}</h4>
                    </div>
                    <div className="do_top_2" onClick={() => setChat(null)}><BsXLg/></div>
                </div>
                <div className="do_body" ref={scrollRef}>
                    {messages && messages.filter(m =>m.room === liveChat?.id).map(message => (
                        <MessageCard message={message} key={message.id}/>
                    ))}
                   
                    
                </div>
                <form className="do_sendform" onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder='Meseji'
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                         />
                    <button
                        disabled={!message && loading}
                        >Send</button>                    
                </form></>
                :
                <div className="do_body">
                    {cuUser? <button className='btn_send btn_live_chat' onClick={(e) => handleChat(agent?.id, e)}>
                        Bonyeza Kuendelea kuchat na {agent?.name || agent?.coName}</button> : 
                    <span className='live_register'>Tafadhari ingia katika akaunti au jisajiri kama hauna akaunti ili kuchat na {agent?.name || agent?.coName}
                    </span>}
                    
                </div> }
            </motion.div>}
             
        </div>
        
    </div>
  )
}

export default LiveChat
