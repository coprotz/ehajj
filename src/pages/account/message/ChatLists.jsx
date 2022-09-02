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

    const pilgrim = pilgrims && pilgrims.find(p => p.userId === user.uid)
    const agent = agents && agents.find(a => a.id === cuUser.agentId)

    const group = groups && groups.find((u) => u.id === cuUser?.groupId)
    const isPilgrim = users && users.find(u => u.id === user.uid)?.typeOf === 'pilgrim'
    const isAgent = users && users.find(u => u.id === user.uid)?.typeOf === 'agent'
    const isMission = users && users.find(u => u.id === user.uid)?.typeOf === 'mission' 
    const isAdmin = users && users.find(u => u.id === user.uid)?.typeOf ===  'admin'
    const userChats = chats && chats.filter(c => c.members.includes(`${user.uid}`))

    
    
    
    const groupChats = chats && chats.filter(c =>c.members.includes(`${group?.id}`))
    const allChats = userChats.concat(groupChats)

    const activeChats = userChats || groupChats || allChats

    const RenderChats = () => {
        if(isPilgrim){
          return (
            <div className="chat_lists">
              {userChats.length > 0 ? <>
                {userChats && userChats.map(c => (                              
                <ChatCard c={c} key={c.id} />                          
                ))} 
              
              </> : 
              <div className='exist_chats'>
                <span>No chats</span>
                <button className='btn_create' onClick={() => navigate('/account/contacts')}>Creat new Chat</button>
              </div>  }
                                  
    
          </div>
          )
        }else if(isMission){
          return (
            <div className="chat_lists">  
            {groupChats && groupChats.map(c => (                              
              <ChatCard c={c} key={c.id} />                          
              ))}                        
    
          </div>
    
          )
            
          
        }else if(isAdmin){
          return (
            <div className="chat_lists">  
            {allChats && allChats.map(c => (                              
              <ChatCard c={c} key={c.id} />                          
              ))}                        
    
          </div>
    
          )
            
          
        }else if(isAgent){
          return (
            <div className="chat_lists">  
            {userChats && userChats.map(c => (                              
              <ChatCard c={c} key={c.id} />                          
              ))}                        
    
          </div>
          )
        }
      }
    
    
    
  return (
    <div className="chat_lists">
        {activeChats.length > 0 ? <>
            {activeChats && activeChats.map(c => (                              
            <ChatCard c={c} key={c.id} />                          
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
