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
    
    const { messages, agents, chats, pilgrims, mission, admins, users} = useData();
    // const cuUser = users && users.find(u => u.id === user.uid)
    const navigate = useNavigate();

    const cuUser = users?.find(u => u.id === user.uid)
    const pilgrim = pilgrims?.find(p=>p.id === user.uid)
    const admin = admins?.find(a => a.userId === user.uid)
    const isMission = mission?.find(a => a.userId === user.uid)
    const agent = agents?.find(a => a.id === cuUser?.agentId)

    const chat = chats && chats.find(c => c.id === id) 

    const memberId = 
    cuUser? chat?.members?.find(m =>m !== cuUser?.id) :
    pilgrim? chat?.members?.find(m =>m !== pilgrim?.id) : 
    isMission? chat?.members?.find(m =>m !== isMission?.id) :   
    admin? chat?.members?.find(m =>m !== admin?.id) : chat?.members?.find(m =>m !== agent?.id)
    // const memberId = currentRoom && currentRoom.members.find(m => m !== user.uid) 

    // const memberId = 
    //   agent? currentRoom && currentRoom.members.find(m => m !== cuUser?.agentId) : 
    //   pilgrim? currentRoom?.members.find(m => m !== pilgrim?.id) : null 
    // || currentRoom && currentRoom.members.find(m => m !== cuUser?.groupId) : currentRoom && currentRoom.members.find(m => m !== cuUser?.id)

    const member = 
              agents?.find(a => a.id === memberId) ||
              pilgrims?.find(a => a.id === memberId) || 
              users?.find(a => a.id === memberId) ||             
              mission?.find(m => m.id === memberId) ||
              admins?.find(a => a.id === memberId)

    const memberName =  member?.name || member?.coName || member?.fname+" "+member?.lname

    const memberIcon = 

    member?.logo? <img src={member?.logo} alt="" /> : <>{member?.name}  </> ||  <> {member?.coName} </>  ||
    member?.photo?<img src={member?.photo} alt="" />  : <>{member?.fname} </>
    
         
     
      
      
      console.log('member', member)
   

    // groups && groups.find(g => g.id === memberId)?.name 
    
    // pilgrim? 
    // || users && users.find(a => a.id === memberId)?.fname +" "+users?.find(a => a.id === memberId)?.lname


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
        {/* <div className="chat_list_head">
          <h3 className='chat_left_title'>Chats</h3>
          <div className="chat_kichumba">
             <ChatAction/> 
          </div>
         
        </div> */}
        
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
                  <span className="member_icon">
                     {memberIcon}
                  </span>                 
                  <h4 >{memberName}</h4> 
                </div>           
                <ChatAction/>          
              </div>
              <div className="messages_wrapper" ref={scrollRef}>
                  {messages && messages.filter(m=> m.room === chat?.id).map((message) => (               
                      <MessageCard  message={message} key={message.id}/>             
                ))} 
                  
              </div>
          </div> 
          <SendMessage chat={chat}/>
        </motion.div> 
        <div className="chatroom_right">
          <div className="chat_r_top">
            Member Profile
          </div>
          <div className="chat_r_middle">
            <span className="profile_icon">
              {memberIcon}
            </span>  
            <h4 >{memberName}</h4>
          </div>
          <div className="chat_r_bottom">
            footer
          </div>
        </div>
   </div>
  )
}

export default ChatRoom
