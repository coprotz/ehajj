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
    const { chats, agents, users, admins, pilgrims, mission } = useData();
    const [open, setOpen] = useState(null)
    const [sending, setSending] = useState(null)
    const navigate = useNavigate();

    const cuUser = users && users.find(a => a.id === user.uid)
    const agent = agents && agents.find(a => a.id === cuUser?.agentId)
    const admin = admins?.find(a => a.userId === user.uid)
    const isMission = mission?.find(m => m.userId === user.uid)
    const pilgrim = pilgrims?.find(p =>p.id === user.uid)

    // const userChats = chats && chats.filter(c =>c.members.includes(`${user.uid}`))
    const userChats = chats && chats.filter(c => c.members.includes(`${cuUser?.id}`))
    // const adminChats = chats && chats.filter(c => c.members.includes(`${admin?.id}`))
    // const missionChats = chats && chats.filter(c => c.members.includes(`${isMission?.id}`))
    // const pilgrimChats = chats && chats.filter(c => c.members.includes(`${pilgrim?.id}`))
    const agentChats = chats && chats.filter(c => c.members.includes(`${agent?.id}`))

    const allChats = userChats.concat(agentChats)

    const oldChats = 
      cuUser? allChats :
      admin? chats?.filter(c => c.members.includes(`${admin?.id}`)) :
      isMission? chats?.filter(c => c.members.includes(`${isMission?.id}`)):
      pilgrim? chats?.filter(c => c.members.includes(`${pilgrim?.id}`)) : null
    

    // console.log('agent', agent?.id)

    const myId =  
      cuUser? cuUser.id :
      admin?  admin?.id :
      pilgrim? pilgrim?.id:
      isMission? isMission?.id : null

    // console.log('myId', myId)

    // console.log('pilgrimChats', pilgrimChats)
    // console.log('adminChats', adminChats)
    // console.log('missionChats', missionChats)
    // console.log('userChats', userChats)

    const chatsRef = collection(db, 'chats')
    const [action, setAction] = useState(null)

    console.log('s', s)

    // const allChats = userChats.concat(agentChats)

    const oldChat = oldChats?.find(c => c.members.includes(`${s}`))
                // cuUser? allChats && allChats.find(c => c.members.includes(`${s}`)) :
                // admin? adminChats && adminChats.find(c => c.members.includes(`${s}`)) :
                // pilgrim? pilgrimChats && pilgrimChats.find(c => c.members.includes(`${s}`)) :
                // isMission? missionChats && missionChats.find(c => c.members.includes(`${s}`)) : null


    
    const handleNew = async(e) => {

        e.preventDefault();
        
        setSending(true)
    
        try {

          if(oldChat){
            // console.log('old', oldChat)
           navigate(`/account/messages/${oldChat.id}`)       
          }
          else{
            const data = {
              members : [`${ myId}`, `${s}`]
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
        <div className="pop_new_msg">        
          <div className="pop_new_chat">
              <span>Send message to <strong>{name}</strong>?</span>
              <div className="group_btns">
                  <button onClick={handleNew}>{sending? <Loading/>: 'OK'}</button>
                  <button onClick={() => setOpen(null)}>CANCEL</button>
              </div>
          </div>
        </div>
        
        }
    </div>
  )
}

export default NewChat
