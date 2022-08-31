import React, {useState, useEffect} from 'react'
import {  HiOutlineArrowLeft, } from "react-icons/hi";
import { useAuth } from '../../../hooks/useAuth';
import useData from '../../../hooks/useData';
import MessageCard from './MessageCard';
import { BiRightArrowAlt } from "react-icons/bi";
import {motion} from 'framer-motion'
import { updateCurrentUser } from 'firebase/auth';
import { useNavigate, useParams } from 'react-router-dom';
import { HiMenuAlt4 } from "react-icons/hi";
import SendMessage from './SendMessage';
import ChatAction from '../../../components/chatAction/ChatAction';

const ChatRoom = ({ setCurrentRoom, setNewChat}) => {
    const { id } = useParams();
    const {user} = useAuth();
    const {groups, messages, agents, users, chats} = useData();
    const navigate = useNavigate();

    const currentRoom = chats && chats.find(c => c.id === id)

    
    const cuUser = users && users.find(u => u.id === user.uid)
    const isPilgrim = users && users.find(u => u.id === user.uid)?.typeOf === 'pilgrim'
    const isAgent = users && users.find(u => u.id === user.uid)?.typeOf === 'agent'

    const memberId = isPilgrim || isAgent? currentRoom && currentRoom.members.find(m => m !== user.uid) : currentRoom && currentRoom.members.find(m => m !== cuUser?.groupId)
    // const memberId = isPilgrim? currentRoom && currentRoom.members.find(m => m !== user.uid) 
    //   : isAgent ? currentRoom && currentRoom.members.find(m => m !== user.uid) 
    //   : currentRoom && currentRoom.members.find(m => m !== cuUser?.groupId) 

    const member = groups && groups.find(g => g.id === memberId)?.name 
      || agents && agents.find(a => a.id === memberId)?.coName
      || users && users.find(a => a.id === memberId)?.fname +" "+users?.find(a => a.id === memberId)?.lname

    console.log('curr', currentRoom);
    console.log('messages', messages)
    const [loading, setLoading] = useState(true)

    // const currentChat = messages && messages.filter(m => m.room === '5WpeHw4LgPrLAAPJVxJt')
    // console.log('cuChats',currentChat )

    const scrollRef = React.useRef(null);
    // const [alert, setAlert] = useState("")

    

    React.useLayoutEffect(() => {
      if(scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    })

    useEffect(() => {
      setTimeout(() => {
        setLoading(false)
      }, 3000)
    }, [])


  return (
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
              <h4>{member}</h4>
            </div>           
            <ChatAction/>          
          </div>
          <div className="messages_wrapper" ref={scrollRef}>
              {messages && messages.filter(m=> m.room === currentRoom.id).map((message) => (               
                  <MessageCard  message={message} key={message.id}/>             
            ))} 
              
          </div>
      </div> 
      <SendMessage currentRoom={currentRoom}/>
    </motion.div>
  )
}

export default ChatRoom
