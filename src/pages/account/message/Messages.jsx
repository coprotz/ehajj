import  {useState, useEffect} from 'react'
import {motion} from 'framer-motion'
import moment from 'moment'
import { BiArrowBack} from "react-icons/bi";
import { db, useAuth } from '../../../hooks/useAuth';
import {  serverTimestamp, setDoc, addDoc, doc, collection, onSnapshot } from 'firebase/firestore' 
import { useForm } from "react-hook-form";
// import Chatlists from '../../components/Chatlists';
import Search from '../../../components/search/Search';
// import CurrentChat from '../../components/CurrentChat';
import useData from '../../../hooks/useData';
import './messages.css'
import ChatCard from './ChatCard'
import ChatRoom from './ChatRoom';
import SendMessage from './SendMessage'
import { useNavigate } from 'react-router-dom';
import { BsSearch } from "react-icons/bs";
import { HiMenuAlt4 } from "react-icons/hi";
import ChatAction from '../../../components/chatAction/ChatAction';
import ChatContacts from './ChatContacts';




const Messages = () => {

  const { messages, chats, groups, users, agents, pilgrims } = useData()
  const { user } = useAuth();
  const cuUser = users && users.find(u => u.id === user.uid)

  // console.log('cuUser',cuUser )

  
  const pilgrim = pilgrims && pilgrims.find(p => p.userId === user.uid)
  const agent = agents && agents.find(a => a.id === cuUser.agentId)
  const group = groups && groups.find((u) => u.id === cuUser?.groupId)
  const isPilgrim = users && users.find(u => u.id === user.uid)?.typeOf === 'pilgrim'
  const isAgent = users && users.find(u => u.id === user.uid)?.typeOf === 'agent'
  const isMission = users && users.find(u => u.id === user.uid)?.typeOf === 'mission' 
  const isAdmin = users && users.find(u => u.id === user.uid)?.typeOf ===  'admin'
  const groupChats = chats && chats.filter(c =>c.members.includes(`${group?.id}`))

  // console.log('groupChats', groupChats)

 

  const { register,  watch, formState: { isValid } } = useForm({mode: 'all'});
  const userChats = chats && chats.filter(c => c.members.includes(`${user.uid}`))
  const allChats = userChats.concat(groupChats)
  // console.log('all', allChats)

  // userChats && userChats.find(c => c.members.includes(`${id}`))
  const [currentRoom, setCurrentRoom] = useState(null)
 

 
  const navigate = useNavigate();


  console.log('curr', currentRoom);

  console.log('group', group)





  console.log('isAgent', isAgent)
  console.log('isPligrim', isPilgrim)
  console.log('isMission', isMission)
  console.log('isAdmin', isAdmin)

  const RenderChats = () => {
    if(isPilgrim){
      return (
        <div className="chat_lists">
          {userChats.length > 0 ? <>
            {userChats && userChats.map(c => (                              
            <ChatCard c={c} key={c.id} currentRoom={currentRoom} setCurrentRoom={setCurrentRoom}/>                          
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
          <ChatCard c={c} key={c.id} currentRoom={currentRoom} setCurrentRoom={setCurrentRoom}/>                          
          ))}                        

      </div>

      )
        
      
    }else if(isAdmin){
      return (
        <div className="chat_lists">  
        {allChats && allChats.map(c => (                              
          <ChatCard c={c} key={c.id} currentRoom={currentRoom} setCurrentRoom={setCurrentRoom}/>                          
          ))}                        

      </div>

      )
        
      
    }
  }



 


 
  return (
    <div className='account_wrapper'>
        <div className="account_top">          
            <motion.div 
              initial={{ opacity: 0}}
              animate={{opacity: 1}} 
              transition={{ ease: "easeOut", duration: 0.5 }}
              className="message_wrapper">               
                 <motion.div 
                    initial={{ x: '-100vw'}}
                    animate={{x:0}} 
                    transition={{ ease: "easeOut", duration: 0.5 }}  
                    className= "message_contaoner"> 
                     <div className="message_heading">
                        <h3 className='message_head'><BiArrowBack onClick={() =>navigate('/account/main')}/>Messages</h3> 
                        <div className="msg_chat_menu">                        
                          <h4 className="chat_list_history">Chats</h4>                     
                          <div className="chat_previous">
                            <div className='message_chat'>
                              <BsSearch />
                            </div>
                            
                            <ChatAction />
                          </div>
                          
                        </div>
                      </div>
                                                 
                    <div className= "chatRoom_wrapper">                                        
                     {RenderChats()}
                    </div>
                  </motion.div>
                    {currentRoom? 
                      <motion.div 
                        initial={{ x: '-100vw'}}
                        animate={{x:0}} 
                        transition={{ ease: "easeOut", duration: 0.5 }} 
                        className="chats_room">
                        <ChatRoom 
                          currentRoom={currentRoom} 
                          setCurrentRoom={setCurrentRoom}
                          // setNewChat={setNewChat}
                          />
                        <SendMessage currentRoom={currentRoom}/>
                      </motion.div>
                    :          
                      <div className='no_chat'>
                        Chagua chat kushoto kuendeleza chati au kulia kwa chati mpya!
                      </div>
                    }
                  <div className="new_chat_contact">
                    <ChatContacts />
                  </div>
                   
                  {/* </div> */}

            </motion.div>
         
        </div>
    </div>
  )
}

export default Messages

