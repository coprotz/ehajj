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
import ChatLists from './ChatLists';
import AgentSidebar from '../sidebar/AgentSidebar';




const Messages = () => {

  const { register,  watch, formState: { isValid } } = useForm({mode: 'all'});
 
  const [currentRoom, setCurrentRoom] = useState(null)
  
  const navigate = useNavigate();


  return (
    <div className='account_wrapper'>      
            <motion.div 
              initial={{ opacity: 0}}
              animate={{opacity: 1}} 
              transition={{ ease: "easeOut", duration: 0.5 }}
              className="message_wrapper">      
              <div className= "chatlist_wrapper">                                        
                <ChatLists/>
              </div>
                 
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
         
        {/* </div> */}
    </div>
  )
}

export default Messages

