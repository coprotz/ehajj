import React from 'react'
import { HiOutlineChatAlt } from "react-icons/hi";
import { useState } from 'react'
import { db, useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import useData from '../../../hooks/useData';
import { addDoc, collection } from 'firebase/firestore';
import Loading from '../../../components/loading/Loading';
import {  BsChatLeftText, BsEye, BsPencil } from "react-icons/bs";

const NewChat = ({s, name}) => {
    const { user } = useAuth();
    const { chats, agents, users } = useData();
    const [open, setOpen] = useState(null)
    const [sending, setSending] = useState(null)
    const navigate = useNavigate();

    const cuUser = users && users.find(a => a.id === user.uid)

    const agent = agents && agents.find(a => a.id === cuUser?.agentId)

    const userChats = chats && chats.filter(c =>c.members.includes(`${user.uid}`))
    const agentChats = chats && chats.filter(c => c.members.includes(`${agent?.id}`))
    

    console.log('agent', agent)

    const myId = agent? agent.id : user.uid

    console.log('agentChats', agentChats)
    const chatsRef = collection(db, 'chats')
    const [action, setAction] = useState(null)

    console.log('s', s)
    
    const handleNew = async(id, e) => {
        e.preventDefault();
        
        setSending(true)
    
        try {
          const oldChat = agent? agentChats && agentChats.find(c => c.members.includes(`${id}`)) 
                        : userChats && userChats.find(c => c.members.includes(`${id}`))

          if(oldChat){
            // console.log('old', oldChat)
           navigate(`/account/messages/${oldChat.id}`)       
          }
          else{
            const data = {
              members : [`${ myId}`, `${id}`]
            }
        
            const chat = await addDoc(chatsRef, data)
            if(chat){
              navigate(`/account/messages/${chat.id}`) 
            }
            // setCurrentRoom(chat)
            setSending(null)
            
          }     
        //   setSelected(null)
        //   setNewMsg(null)
        //   setNewChat(null)
          
        } catch (error) {
          console.log(error.message)
        }
      }
    

  return (
    
    <div className='new_chat_app' onMouseEnter={() =>setAction(true)} onMouseLeave={() =>setAction(null)}>
        {/* <HiOutlineChatAlt className='appli_new_chat' onClick={() =>setOpen(s)}/> */}
        <button className='btn' onClick={() =>setOpen(s)}><BsChatLeftText/></button>
        {action && <span className='div_span'>Messeji</span>}
        {open &&
        <div className="pop_new_chat">
            <span>Send message to <strong>{name}</strong>?</span>
            <div className="group_btns">
                <button onClick={(e) => handleNew(s, e)}>{sending? <Loading/>: 'OK'}</button>
                <button onClick={() => setOpen(null)}>CANCEL</button>
            </div>
        </div>
        
        }
    </div>
  )
}

export default NewChat
