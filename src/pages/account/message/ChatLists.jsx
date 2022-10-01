import React from 'react'
import { useNavigate } from 'react-router-dom';
import ChatAction from '../../../components/chatAction/ChatAction';
import { useAuth } from '../../../hooks/useAuth';
import useData from '../../../hooks/useData'
import ChatCard from './ChatCard';



const ChatLists = () => {
    const { user } = useAuth();
    const { pilgrims, agents, chats, admins, mission } = useData();


    const navigate = useNavigate();

    // const pilgrim = pilgrims && pilgrims.find(p => p.userId === user.uid)
    const agent = agents?.find(a => a?.users?.includes(`${user.uid}`)) || agents?.find(a => a?.createdBy === user?.uid)
    const pilgrim = pilgrims?.find(p=>p.id === user.uid)
    const admin = admins?.find(a => a.userId === user.uid)
    const isMission = mission?.find(a => a.userId === user.uid)

    const agentChats = chats && chats.filter(c =>c.members.includes(`${agent?.id}`))
    const pilChats = chats && chats.filter(c =>c.members.includes(`${pilgrim?.id}`))
    const adminChats = chats && chats.filter(c =>c.members.includes(`${admin?.id}`))
    const missionChats = chats && chats.filter(c =>c.members.includes(`${isMission?.id}`))

    console.log('pilChats', pilChats)

  

    const RenderChats = () => {
      if(agent){
        return (
          <>
          {agentChats?.map(chat => (
            <ChatCard chat={chat} key={chat.id} /> 
          ))}
          </>
        )
      }else if(admin){
        return (
          <>
          {adminChats?.map(chat => (
            <ChatCard chat={chat} key={chat.id} /> 
          ))}
          </>
        )
      }else if(pilgrim){
        return (
          <>
          {pilChats?.map(chat => (
            <ChatCard chat={chat} key={chat.id} /> 
          ))}
          </>
        )
      }else if(isMission){
        return (
          <>
          {missionChats?.map(chat => (
            <ChatCard chat={chat} key={chat.id} /> 
          ))}
          </>
        )

    }else{
      return (
        <div className='exist_chats'>
          <span>No chats</span>
          <button className='btn_create' onClick={() => navigate('/account/contacts')}>Creat new Chat</button>
        </div>
      )   
  }
}
  return (
    <div className="chat_lists">
      <div className="chat_list_head">
          <h3 className='chat_left_title'>Chats</h3>
          <div className="chat_kichumba">
             <ChatAction/> 
          </div>
         
        </div>
        {RenderChats()}
    </div>
  )
}

export default ChatLists
