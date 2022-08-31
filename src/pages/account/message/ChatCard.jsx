import React from 'react'
import { useAuth } from '../../../hooks/useAuth'
import useData from '../../../hooks/useData';
import moment from 'moment'
import { useNavigate } from 'react-router-dom';

const ChatCard = ({c, setCurrentRoom, currentRoom}) => {

    const {user} = useAuth();
    const {groups, messages, agents, users} = useData();
    const navigate = useNavigate();
    
    const cuUser = users && users.find(u => u.id === user.uid)

    const isPilgrim = users && users.find(u => u.id === user.uid)?.typeOf === 'pilgrim'
    const isAgent = users && users.find(u => u.id === user.uid)?.typeOf === 'agent'
    const isMission = users && users.find(u => u.id === user.uid)?.typeOf === 'mission' 
    const isAdmin = users && users.find(u => u.id === user.uid)?.typeOf ===  'admin'

    // const memberId = c.members.find(m => m !== user.uid)

    const memberId = isPilgrim || isAgent? c && c.members.find(m => m !== user.uid) : c && c.members.find(m => m !== cuUser?.groupId)

    // const memberId = cuUser && cuUser.groupId
    // console.log('groupId', groupId)

    const member = groups && groups.find(g => g.id === memberId)?.name 
      || agents && agents.find(a => a.id === memberId)?.coName
      || users && users.find(a => a.id === memberId)?.fname +" "+users?.find(a => a.id === memberId)?.lname



    const cuMsgs = messages && messages.filter(m => m.room === c.id)
    const lastMsg = messages && messages.findLast((m) => m.room === c.id)

    // const membe = groups && groups.find(g => g.id === groupId)

    console.log('groups', groups)

    // const {name, createdAt, text} = lastMsg && lastMsg

    
  return (
    <div className={currentRoom === c ? 'active_card_message' : 'card_message'} onClick={() => navigate(`/account/messages/${c.id}`)}>
        <div className="card_msg_details">
          <span className="member_icon">
            {member[0]}
          </span>
          <div className="card_member_details">          
            <h4 className='member_name'>{member}</h4>
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
