import React from 'react'
import { useAuth } from '../../../hooks/useAuth'
import useData from '../../../hooks/useData';
import moment from 'moment'
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

const ChatCard = ({chat}) => {

    const { id } = useParams()

    console.log('id', id)

    const {user} = useAuth();
    const { messages, agents, users, pilgrims, admins, mission} = useData();
    const navigate = useNavigate();
 
    const agent = agents?.find(a => a?.users?.includes(`${user.uid}`)) || agents?.find(a => a?.createdBy === user?.uid)
    const pilgrim = pilgrims?.find(p=>p.id === user.uid)
    const admin = admins?.find(a => a.userId === user.uid)
    const isMission = mission?.find(a => a.userId === user.uid)

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

    const memberName =   member?.name || member?.coName || member?.fname+" "+member?.lname
    const memberIcon = 
      member?.logo? <img src={member?.logo} alt="" />: 
        <>{member?.name} </>||                          
        <>{member?.coName} </> ||    
      member?.photo?  
        <img src={member?.photo} alt="" />:             
        <>{member?.fname} </> 
      
                   
        
      
         
                      
           
           
         
                     
        
          
          
         

    const cuMsgs = messages && messages.filter(m => m.room === chat.id)
    const lastMsg = messages && messages.findLast((m) => m.room === chat.id)
    


    console.log('chat', memberId)

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
