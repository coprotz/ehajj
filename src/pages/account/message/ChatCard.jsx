import React from 'react'
import { useAuth } from '../../../hooks/useAuth'
import useData from '../../../hooks/useData';
import moment from 'moment'
import { useNavigate } from 'react-router-dom';

const ChatCard = ({chat, currentRoom}) => {

    const {user} = useAuth();
    const { messages, agents, users, pilgrims, admins, mission} = useData();
    const navigate = useNavigate();
 
    const agent = agents?.find(a => a?.users?.includes(`${user.uid}`)) || agents?.find(a => a?.createdBy === user?.uid)
    const pilgrim = pilgrims?.find(p=>p.id === user.uid)
    const admin = admins?.find(a => a.userId === user.uid)
    const isMission = mission?.find(a => a.userId === user.uid)

    // const agentChats = chats && chats.filter(c =>c.members.includes(`${agent?.id}`))
    // const pilChats = chats && chats.filter(c =>c.members.includes(`${pilgrim?.id}`))
    // const adminChats = chats && chats.filter(c =>c.members.includes(`${admin?.id}`))
    // const missionChats = chats && chats.filter(c =>c.members.includes(`${isMission?.id}`))
   

    // const memberId = c.members.find(m => m !== user.uid)

    const memberId =    
    agent? chat?.members?.find(m =>m !== agent?.id) : 
    pilgrim? chat?.members?.find(m =>m !== pilgrim?.id) : 
    isMission? chat?.members?.find(m =>m !== isMission?.id) : 
    admin? chat?.members?.find(m =>m !== admin?.id) : null

    const member = 
              pilgrims?.find(a => a.id === memberId) || 
              agents?.find(a => a.id === memberId) ||             
              mission?.find(m => m.id === memberId) ||
              admins?.find(a => a.id === memberId)

    const memberName = member?.fname+" "+member?.lname || member?.name || member?.coName
    const memberIcon = 
          <span className="member_icon">
            <img src={member?.photo} alt="" />            
          </span> || 
          <span className="member_icon">
            <img src={member?.logo} alt="" />            
          </span> ||
          <span className="member_icon">
           {member?.fname[0]}            
          </span> ||
          <span className="member_icon">
            {member?.name[0]}            
          </span> ||
          <span className="member_icon">
            {member?.coName[0]}            
          </span>  
          
         

    const cuMsgs = messages && messages.filter(m => m.room === chat.id)
    const lastMsg = messages && messages.findLast((m) => m.room === chat.id)


    // console.log('memberId', member)

    // const {name, createdAt, text} = lastMsg && lastMsg

    
  return (
    <div className={currentRoom === chat ? 'active_card_message' : 'card_message'} onClick={() => navigate(`/account/messages/${chat.id}`)}>
        <div className="card_msg_details">
          {memberIcon}
          <div className="card_member_details">          
            <h4 className='member_name'>{memberName}</h4>
            <div className="chat_id">           
              <small className='chat_text'>{lastMsg && lastMsg.text}</small>
            </div>
          </div>
        </div>
        <div className="card_msg_time">
          <small className='card_time'>{moment(lastMsg && lastMsg.createdAt?.toDate()).fromNow(true)}</small> 
          <span className='card_small_qty'>{cuMsgs && cuMsgs.length}</span>
        </div>
      
    </div>
  )
}

export default ChatCard
