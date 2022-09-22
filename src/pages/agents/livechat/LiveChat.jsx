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

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [agree, setAgree] = useState('')

    // const guest = {
    //     username, email, agree
    // }

    const myChats = chats && chats.filter(c =>c.members.includes(`${email}`))

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
                    members: [`${email}`, `${id}`]
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
    // const name = cuUser?.fname +" "+ cuUser?.lname

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
                uid: email,
                name,           
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

        // console.log('data', data)
       
      
    };

    console.log('agree', agree)

   
    

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
                    <div className='live_register'>
                        <div className="live_reg_top">
                            <img src={agent?.logo} alt="" />
                        </div>
                        <div className='live_chat_body'>
                            <h4>Msaada</h4>
                            <h4>Tafadhari tunaomba taarifa zako</h4>
                            <div>
                                <div className="live_inputs">
                                    <div className="live_inputs_group">
                                        <input 
                                            type="text" 
                                            placeholder='Jina' 
                                            value={name}
                                            onChange={e =>setName(e.target.value)}
                                            name='name'/>
                                        <input 
                                            type="email" 
                                            placeholder='Barua Pepe'
                                            value={email}
                                            name='email'
                                            onChange={e =>setEmail(e.target.value)}
                                             />
                                    </div>
                                </div>
                                <div className="chat_terms">
                                    <input 
                                        type="checkbox" 
                                        name='agree'
                                        value={agree}
                                        onChange={e =>setAgree(e.target.checked)}
                                        />
                                    <span>Nakubali kwamba taarifa zangu zinaweza kutumika
                                        na kampuni ili kuboresha Huduma za Kampuni.
                                    </span>
                                </div>
                            </div>
                            
                        </div>
                        <button 
                            className='btn_btn_live'
                            disabled={!name || !email || !agree}
                            onClick={(e) => handleChat(agent?.id, e)}
                            >CHAT</button>                        
                      
                    </div>}
                    
                </div> }
            </motion.div>}
             
        </div>
        
    </div>
  )
}

export default LiveChat
