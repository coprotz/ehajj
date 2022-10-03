import React from 'react'
import { useAuth } from '../../../hooks/useAuth'
import useData from '../../../hooks/useData';
import moment from 'moment'
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

const ChatCard = ({chat}) => {

    const { id } = useParams()

    // console.log('chat', chat)

    const {user} = useAuth();
    const { messages, agents, users, pilgrims, admins, mission} = useData();

    // const cuUser = users?.find(u => u.id === user.uid)
    const navigate = useNavigate();
 
    // const agent = agents?.find(a => a?.users?.includes(`${user.uid}`)) || agents?.find(a => a?.createdBy === user?.uid)
    const cuUser = users?.find(u => u.id === user.uid)
    const agent = agents?.find(a => a.id === cuUser?.agentId)
    const pilgrim = pilgrims?.find(p=>p.id === user.uid)
    const admin = admins?.find(a => a.userId === user.uid)
    const isMission = mission?.find(a => a.userId === user.uid)

    const userChats = chat?.members?.find(m =>m !== cuUser?.id)
    const pilgrimChats = chat?.members?.find(m =>m !== pilgrim?.id)
    const adminChats = chat?.members?.find(m =>m !== admin?.id)
    const missionChats = chat?.members?.find(m =>m !== isMission?.id)
    const agentChats = chat?.members?.find(m =>m !== agent?.id)

    const allChats = userChats.concat(agentChats)



    const memberId = 
      
      cuUser? allChats  :
      pilgrim? pilgrimChats : 
      isMission? missionChats :   
      admin? adminChats :  null

    // console.log('chat', chat)

    const Name = () => {
      if(agents?.find(a => a.id === memberId)){
        return (
          <>{member?.coName || member?.name }</>
        )
      }else {
        return (
          <>{member?.fname+" "+member?.lname}</>
        )
      }
    }

    const member = 
              agents?.find(a => a.id === memberId) ||
              pilgrims?.find(a => a.id === memberId) || 
              users?.find(a => a.id === memberId) ||             
              mission?.find(m => m.id === memberId) ||
              admins?.find(a => a.id === memberId)

    // const memberName =   member?.fname+" "+member?.lname || member?.coName || member?.name 
    const memberIcon = 
      member?.logo? <img src={member?.logo} alt="" />: 
        <>{member?.name} </>||                          
        <>{member?.coName} </> ||    
      member?.photo?  
        <img src={member?.photo} alt="" />:             
        <>{member?.fname} </> 
      


    const cuMsgs = messages && messages.filter(m => m.room === chat.id)
    const lastMsg = messages && messages.findLast((m) => m.room === chat.id)
    


    // console.log('memberId', memberId)

    // const {name, createdAt, text} = lastMsg && lastMsg

    
  return (
    <div 
      className={chat.id === id ? 'active_card_message' : 'card_message'} 
      onClick={() => navigate(`/account/messages/${chat.id}`)}
      >
        <div className="card_msg_details">
          <span className="member_icon">
            {memberIcon}
          </span>          
          <div className="card_member_details">          
            <h4 className='member_name'>{Name()}</h4>
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
