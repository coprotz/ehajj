import React, { useEffect} from 'react'
import {  HiOutlineArrowLeft, } from "react-icons/hi";
import { useAuth } from '../../../hooks/useAuth';
import useData from '../../../hooks/useData';
import MessageCard from './MessageCard';
import {motion} from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom';
import SendMessage from './SendMessage';
import ChatAction from '../../../components/chatAction/ChatAction';
import ChatLists from './ChatLists';

const ChatRoom = () => {
    const { id } = useParams();
    const {user} = useAuth();
    
    const {groups, messages, agents, users, chats} = useData();
    const cuUser = users && users.find(u => u.id === user.uid)
    const navigate = useNavigate();

    const isAgent = users && users.find(u => u.id === user.uid)?.typeOf === 'agent'

    const currentRoom = chats && chats.find(c => c.id === id) 
    // const memberId = currentRoom && currentRoom.members.find(m => m !== user.uid) 

    const memberId = isAgent? currentRoom && currentRoom.members.find(m => m !== cuUser?.agentId) 
    || currentRoom && currentRoom.members.find(m => m !== cuUser?.groupId) : currentRoom && currentRoom.members.find(m => m !== cuUser?.id)

    const member = groups && groups.find(g => g.id === memberId)?.name 
    || agents && agents.find(a => a.id === memberId)?.coName || agents && agents.find(a => a.id === memberId)?.name
    || users && users.find(a => a.id === memberId)?.fname +" "+users?.find(a => a.id === memberId)?.lname


    const scrollRef = React.useRef(null);

    React.useLayoutEffect(() => {
      if(scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    })

    useEffect(() => {
      setTimeout(() => {
        // setLoading(false)
      }, 3000)
    }, [])


  return (
    <div className='chatroom_container'>
      <div className="chatroom_left">
        <h3 className='chat_left_title'>Chats</h3>
        <ChatLists/>
      </div>
      <motion.div 
          initial={{ x: '-100vw'}}
          animate={{x:0}} 
          transition={{ ease: "easeOut", duration: 0.5 }} 
          className="chatRoom_wrapper"> 
          {/* {loading && <span className='loading'>Loading...</span>}    */}
          <div className='chatroom'>
              <div className="chat_room_top">
                <div className="chat_name_info">
                  <HiOutlineArrowLeft onClick={() => navigate('/account/messages')}/>
                  <h4 >{member}</h4> 
                </div>           
                <ChatAction/>          
              </div>
              <div className="messages_wrapper" ref={scrollRef}>
                  {messages && messages.filter(m=> m.room === currentRoom?.id).map((message) => (               
                      <MessageCard  message={message} key={message.id}/>             
                ))} 
                  
              </div>
          </div> 
          <SendMessage currentRoom={currentRoom}/>
        </motion.div> 
        <div className="chatroom_right">
          <div className="chat_r_top">
            Member Profile
          </div>
          <div className="chat_r_middle">
            <h4 >{member}</h4>
          </div>
          <div className="chat_r_bottom">
            footer
          </div>
        </div>
   </div>
  )
}

export default ChatRoom
