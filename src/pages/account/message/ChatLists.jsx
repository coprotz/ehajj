import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import useData from '../../../hooks/useData'
import ChatCard from './ChatCard';


const ChatLists = () => {
    const { user } = useAuth();
    const { users, groups, pilgrims, agents, chats } = useData();
    const cuUser = users && users.find(u => u.id === user.uid)

    const navigate = useNavigate();

    // const pilgrim = pilgrims && pilgrims.find(p => p.userId === user.uid)
    const agent = agents && agents.find(a => a.id === cuUser.agentId)

    const group = groups && groups.find((u) => u.id === cuUser?.groupId)
    // const agentChats = agents && agents.find(a => a.id === cuUser.agent)
    // const isPilgrim = users && users.find(u => u.id === user.uid)?.typeOf === 'pilgrim'
    // const isAgent = users && users.find(u => u.id === user.uid)?.typeOf === 'agent'
    // const isMission = users && users.find(u => u.id === user.uid)?.typeOf === 'mission' 
    // const isAdmin = users && users.find(u => u.id === user.uid)?.typeOf ===  'admin'
    const userChats = chats && chats.filter(c => c.members.includes(`${user.uid}`))
    const agentChats = chats && chats.filter(c =>c.members.includes(`${agent?.id}`))

    console.log('agentChats', agentChats)

    

    
    
    
    const groupChats = chats && chats.filter(c =>c.members.includes(`${group?.id}`))
    const allChats = userChats.concat(groupChats)

    const tchats = allChats.concat(agentChats)

    const activeChats = userChats || groupChats || allChats

    console.log('tchats', tchats)

      
  return (
    <div className="chat_lists">
        {tchats.length > 0 ? <>
            {tchats && tchats.map(chat => (                              
            <ChatCard chat={chat} key={chat.id} />                          
        ))} 
        
        </> : 
        <div className='exist_chats'>
        <span>No chats</span>
        <button className='btn_create' onClick={() => navigate('/account/contacts')}>Creat new Chat</button>
        </div>  }
    </div>
  )
}

export default ChatLists
