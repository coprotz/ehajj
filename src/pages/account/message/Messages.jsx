import  {useState, useEffect} from 'react'
import {motion} from 'framer-motion'
import moment from 'moment'
import { BiArrowBack,BiX, BiEnvelope, BiCaretDown, BiRightArrowAlt} from "react-icons/bi";
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




const Messages = () => {

  const { messages, chats, groups, users, agents, pilgrims } = useData()
  const { user } = useAuth();
  const cuUser = users && users.find(u => u.id === user.uid)

  // console.log('cuUser',cuUser )

  const chatsRef = collection(db, 'chats')
  const pilgrim = pilgrims && pilgrims.find(p => p.userId === user.uid)
  const agent = agents && agents.find(a => a.id === cuUser.agentId)
  const group = groups && groups.find((u) => u.id === cuUser?.groupId)
  const isPilgrim = users && users.find(u => u.id === user.uid)?.typeOf === 'pilgrim'
  const isAgent = users && users.find(u => u.id === user.uid)?.typeOf === 'agent'
  const isMission = users && users.find(u => u.id === user.uid)?.typeOf === 'mission' 
  const isAdmin = users && users.find(u => u.id === user.uid)?.typeOf ===  'admin'
  const groupChats = chats && chats.filter(c =>c.members.includes(`${group?.id}`))

  console.log('groupChats', groupChats)

 

  const { register,  watch, formState: { isValid } } = useForm({mode: 'all'});
  const userChats = chats && chats.filter(c => c.members.includes(`${user.uid}`))
  const allChats = userChats.concat(groupChats)
  console.log('all', allChats)

  // userChats && userChats.find(c => c.members.includes(`${id}`))
  const [currentRoom, setCurrentRoom] = useState(null)
 

 
  const navigate = useNavigate();

  const handleChat = async (id, e) => {
    e.preventDefault()

    const data = {
      members : [`${user.uid}`, `${id}`]
    }

    try {
      await addDoc(chatsRef, data)
    } catch (error) {
      console.log(error.message)
    }

    // console.log('data', data);
  }

  console.log('curr', currentRoom);

  const [selected, setSelected] = useState(null)
  const [newMsg, setNewMsg] = useState(null)

  const agentUsers = users && users.filter(a =>a.typeOf === 'agent')?.filter(u => u.agentId === cuUser.agentId)

  console.log('agentusers', agentUsers)
  const agentPilgrims = users && users.filter(a =>a.typeOf === 'pilgrim' )

  

  const activeAgentUsers = agentUsers && agentUsers.filter(a => a?.agentId === pilgrim?.agent)
  const activeAgentPilgrims = agentPilgrims && agentPilgrims.filter(a => a?.agentId === agent?.id)

  



  // console.log('agentPilgrims', agentPilgrims)
  console.log('group', group)

  const handleNew = async(id, e) => {
    e.preventDefault();


    try {
      const oldChat = allChats && allChats.find(c => c.members.includes(`${id}`))
      if(oldChat){
        console.log('old', oldChat)
        setCurrentRoom(oldChat)        
      }
      else{
        const data = {
          members : [`${cuUser?.groupId? cuUser?.groupId : user.uid}`, `${id}`]
        }
    
        const chat = await addDoc(chatsRef, data)
        setCurrentRoom(chat)
      }     
      setSelected(null)
      setNewMsg(null)
      setNewChat(null)
      
    } catch (error) {
      console.log(error.message)
    }
  }

  const [newChat, setNewChat] = useState(null)

  console.log('isAgent', isAgent)
  console.log('isPligrim', isPilgrim)
  console.log('isMission', isMission)
  console.log('isAdmin', isAdmin)

  const RenderChats = () => {
    if(isPilgrim){
      return (
        <div className="chat_lists">  
        {userChats && userChats.map(c => (                              
          <ChatCard c={c} key={c.id} currentRoom={currentRoom} setCurrentRoom={setCurrentRoom}/>                          
          ))}                        

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

  const RenderChoice = () => {
    if(isPilgrim){
      return (
        <div className='pil_inner_1'>
            <button className='btn_sel_new'><BiArrowBack onClick={() => setNewChat(null)}/>Select Contact</button>
            {pilgrim?.agentName ? <>              
            <span className='pil_inner_2'>{pilgrim?.agentName}</span>
            <button className='btn_send' onClick={() => setNewMsg(!newMsg)}><BiEnvelope/>New Message<BiCaretDown/></button> </> 
            : <span style={{display: 'block', textAlign: 'center', marginTop: '15px'}}>No agent found</span>}
            {newMsg && <>
            
            {!selected ?
            <div className="agents_mbs">
              <div className="selected_new">
                <span>Select Member</span>
                <button onClick={() => setNewMsg(null)}><BiX/></button>
              </div>
              <span onClick={() => setSelected(pilgrim?.agent)}>All Staff</span>
              {activeAgentUsers.length > 0 ?<>
              {activeAgentUsers && activeAgentUsers.map(member => (
                <span onClick={() => setSelected(member.id)} key={member.id}>{member.fname} {member.lname} ({ member.office })</span>
              ))}
            </> : "No Staff"}
            </div>
            :
            <div className='selected'>
                <span>Would you like to chat with <strong>{selected?.fname} {selected?.lname}</strong>?</span>
                <div className="selected_btns">
                  <button style={{color: '#7d28d4'}} onClick={(e) => handleNew(selected, e)}>OK</button>
                  <button style={{color: '#aaaaaa'}} onClick={() => setSelected(null)}>CANCEL</button>
                </div>
            </div>}
            </>}
        </div>
      )
    }else if(isAgent){
      return (
        <div className='pil_inner_1'>
          <button  className='btn_sel_new'><BiArrowBack onClick={() => setNewChat(null)}/>Select Contact</button>
          {agent.coName ? <>
          <span className='pil_inner_2'>{agent.coName}</span>
          <button className='btn_send' onClick={() => setNewMsg(!newMsg)}><BiEnvelope/>New Message<BiCaretDown/></button> </> : 'No pilgrim found'}
          {newMsg && <>
          
          {!selected ?
          <div className="agents_mbs">
            <div className="selected_new">
              <span>Select Member</span>
              <button onClick={() => setNewMsg(null)}><BiX/></button>
            </div>
            <span onClick={() => setSelected(agent.id)}>All Pilgrims</span>
            {activeAgentPilgrims.length > 0 ?<>
            {activeAgentPilgrims && activeAgentPilgrims.map(member => (
              <span onClick={() => setSelected(member)} key={member.id}>{member.fname} {member.lname}</span>
            ))}
          </> : "No Pilgrim"}
        </div>
        :
        <div className='selected'>
            <span>Would you like to chat with <strong>{selected?.fname} {selected?.lname}</strong>?</span>
            <div className="selected_btns">
              <button style={{color: '#7d28d4'}} onClick={(e) => handleNew(selected.id, e)}>OK</button>
              <button style={{color: '#aaaaaa'}} onClick={() => setSelected(null)}>CANCEL</button>
            </div>
        </div>}
        </>}
      </div>
      )
    }else if(isMission){
      return (
        <div className='pil_inner_1'>
          <button  className='btn_sel_new'><BiArrowBack onClick={() => setNewChat(null)}/>Select Contact</button>
          {agents.length > 0 ? <>
            <h3 className='mission_agents'>{agents?.length} Agents Found</h3>
          <button className='btn_send' onClick={() => setNewMsg(!newMsg)}><BiEnvelope/>New Message<BiCaretDown/></button> </> : 'No agents found'}
          {newMsg && <>
          
          {!selected ?
          <div className="agents_mbs">
            <div className="selected_new">
              <span>Select Member</span>
              <button onClick={() => setNewMsg(null)}><BiX/></button>
            </div>           
            {agents.length > 0 ?<>
            {agents && agents.map(member => (
              <span onClick={() => setSelected(member)} key={member.id}>{member.coName} </span>
            ))}
          </> : "No Agent"}
        </div>
        :
        <div className='selected'>
            <span>Would you like to chat with <strong>{selected?.coName}</strong>?</span>
            <div className="selected_btns">
              <button style={{color: '#7d28d4'}} onClick={(e) => handleNew(selected.id, e)}>OK</button>
              <button style={{color: '#aaaaaa'}} onClick={() => setSelected(null)}>CANCEL</button>
            </div>
        </div>}
        </>}
      </div>
      )
    }else if(isAdmin){
      return (
        <div className='pil_inner_1'>
          <button  className='btn_sel_new'><BiArrowBack onClick={() => setNewChat(null)}/>Select Contact</button>
          {agents.length > 0 ? <>
            <h3 className='mission_agents'>{agents?.length} Agents Found</h3>
          <button className='btn_send' onClick={() => setNewMsg(!newMsg)}><BiEnvelope/>New Message<BiCaretDown/></button> </> : 'No agents found'}
          {newMsg && <>
          
          {!selected ?
          <div className="agents_mbs">
            <div className="selected_new">
              <span>Select Member</span>
              <button onClick={() => setNewMsg(null)}><BiX/></button>
            </div>           
            {agents.length > 0 ?<>
            {agents && agents.map(member => (
              <span onClick={() => setSelected(member)} key={member.id}>{member.coName} </span>
            ))}
          </> : "No Agent"}
        </div>
        :
        <div className='selected'>
            <span>Would you like to chat with <strong>{selected.coName}</strong>?</span>
            <div className="selected_btns">
              <button style={{color: '#7d28d4'}} onClick={(e) => handleNew(selected.id, e)}>OK</button>
              <button style={{color: '#aaaaaa'}} onClick={() => setSelected(null)}>CANCEL</button>
            </div>
        </div>}
        </>}
      </div>
      )
    }else {
      return (
        <div className="no_any_wrapper">
          <button  className='btn_sel_new'><BiArrowBack onClick={() => setNewChat(null)}/>Select Contact</button>
          <span>{isAgent? 'No Pilgrim': 'No Agent' }</span>
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
                                
                    <div className= {currentRoom ? 'chat_list_hide' : "chatList"}>
                      <h3 className='message_head'><BiArrowBack onClick={() =>navigate('/account/main')}/>Message</h3> 
                      <div className="chat_search">
                        <Search />
                        <button className='btn_chat_new' onClick={() => setNewChat(true)}>New<BiRightArrowAlt/></button>
                      </div>                    
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
                      setNewChat={setNewChat}
                      />
                    <SendMessage currentRoom={currentRoom}/>
                  </motion.div>:
          
                  <div className='no_chat'>
                    Chagua chat kushoto kuendeleza chati au kulia kwa chati mpya!
                  </div>}
                  {/* <div className="new_chat_wrapper">                  */}
                    <motion.div 
                      initial={{ x: '-100vw'}}
                      animate={{x:0}} 
                      transition={{ ease: "easeOut", duration: 0.5 }} 
                      className={newChat ? 'new_chat_active': "chats_detail"}>                  
                      <div className="chats_body">               
                        {RenderChoice()}
                      </div>
                      <div className="chats_footer">
                        {isMission || isAdmin? 'New Message to:' : 'Complaints'}
                        <div className="chat_footer_inner">
                          {groups && groups.filter(g => g.id !== group?.id).map(g => (
                            <div className="footer_inner_con" key={g.id}>
                              <h4 >{g.name}</h4>
                            <BiEnvelope onClick={(e) => handleNew(g.id, e)}/> 
                            </div>
                          ))}
                          
                        </div>                   
                      </div>                       
                    </motion.div> 
                  {/* </div> */}

            </motion.div>
         
        </div>
    </div>
  )
}

export default Messages

