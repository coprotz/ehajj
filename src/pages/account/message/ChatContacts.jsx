import React from 'react'
import { BiArrowBack,BiX, BiEnvelope, BiCaretDown, BiRightArrowAlt} from "react-icons/bi";
import { useForm } from "react-hook-form";
import useData from '../../../hooks/useData';
import { db, useAuth } from '../../../hooks/useAuth';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import {motion} from 'framer-motion'
import { useNavigate } from 'react-router-dom';
import { BsSearch } from "react-icons/bs";



const ChatContacts = () => {
    const { user } = useAuth();
    const { users, agents, pilgrims, groups, chats } = useData();
    const cuUser = users && users.find(u => u.id === user.uid)

    const pilgrim = pilgrims && pilgrims.find(p => p.userId === user.uid)
    const agent = agents && agents.find(a => a.id === cuUser.agentId)
    const group = groups && groups.find((u) => u.id === cuUser?.groupId)

    const isPilgrim = users && users.find(u => u.id === user.uid)?.typeOf === 'pilgrim'
    const isAgent = users && users.find(u => u.id === user.uid)?.typeOf === 'agent'
    const isMission = users && users.find(u => u.id === user.uid)?.typeOf === 'mission' 
    const isAdmin = users && users.find(u => u.id === user.uid)?.typeOf ===  'admin'

    const agentUsers = users && users.filter(a =>a.typeOf === 'agent')?.filter(u => u.agentId === cuUser.agentId)

    const groupChats = chats && chats.filter(c =>c.members.includes(`${group?.id}`))

    const userChats = chats && chats.filter(c => c.members.includes(`${user.uid}`))
    const allChats = userChats.concat(groupChats)

    const [selected, setSelected] = useState(null)
    const [newMsg, setNewMsg] = useState(null)
    const [newChat, setNewChat] = useState(null)

    const agentPilgrims = users && users.filter(a =>a.typeOf === 'pilgrim' )
    const activeAgentUsers = agentUsers && agentUsers.filter(a => a?.agentId === pilgrim?.agent)
    const activeAgentPilgrims = agentPilgrims && agentPilgrims.filter(a => a?.agentId === agent?.id)

    const chatsRef = collection (db, 'chats')

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

      const handleNew = async(id, e) => {
        e.preventDefault();
    
    
        try {
          const oldChat = allChats && allChats.find(c => c.members.includes(`${id}`))

          if(oldChat){
            // console.log('old', oldChat)
           navigate(`/account/messages/${oldChat.id}`)       
          }
          else{
            const data = {
              members : [`${cuUser?.groupId? cuUser?.groupId : user.uid}`, `${id}`]
            }
        
            const chat = await addDoc (chatsRef, data)
            if(chat){
              navigate(`/account/messages/${chat.id}`) 
            }
            // setCurrentRoom(chat)
          }     
          setSelected(null)
          setNewMsg(null)
          setNewChat(null)
          
        } catch (error) {
          console.log(error.message)
        }
      }
    

    const { register,  watch, formState: { isValid } } = useForm({mode: 'all'});

    const RenderChoice = () => {
        if(isPilgrim){
          return (
            <div className='pil_inner_1'>
                {/* <button className='btn_sel_new'><BiArrowBack onClick={() => navigate(-1)}/>Select Contact</button> */}
                <div className="message_heading">
                    <h3 className='message_head'><BiArrowBack onClick={() =>navigate(-1)}/>Select Contact</h3> 
                    <div className="msg_chat_menu">
                        <BsSearch className='message_chat'/>                   
                    </div>
                </div>
                {pilgrim?.agentName ? <>              
                <span className='pil_inner_2'>{pilgrim?.agentName}</span>
                <button className='btn_send' onClick={() => setNewMsg(!newMsg)}><BiEnvelope/>Select Member<BiCaretDown/></button> </> 
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
              <button  className='btn_sel_new'><BiArrowBack onClick={() => navigate(-1)}/>Select Contact</button>
              {agent.coName ? <>
              <span className='pil_inner_2'>{agent.coName}</span>
              <button className='btn_send' onClick={() => setNewMsg(!newMsg)}><BiEnvelope/>Select Member<BiCaretDown/></button> </> : 'No pilgrim found'}
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
              <button  className='btn_sel_new'><BiArrowBack onClick={() => navigate(-1)}/>Select Contact</button>
              {agents.length > 0 ? <>
                <h3 className='mission_agents'>{agents?.length} Agents Found</h3>
              <button className='btn_send' onClick={() => setNewMsg(!newMsg)}><BiEnvelope/>Select Member<BiCaretDown/></button> </> : 'No agents found'}
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
              <button  className='btn_sel_new'><BiArrowBack onClick={() => navigate(-1)}/>Select Contact</button>
              {agents.length > 0 ? <>
                <h3 className='mission_agents'>{agents?.length} Agents Found</h3>
              <button className='btn_send' onClick={() => setNewMsg(!newMsg)}><BiEnvelope/>Select Member<BiCaretDown/></button> </> : 'No agents found'}
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
              <button  className='btn_sel_new'><BiArrowBack onClick={() => navigate(-1)}/>Select Contact</button>
              <span>{isAgent? 'No Pilgrim': 'No Agent' }</span>
            </div>
            
          )
        }
    
      }
  return (
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
  )
}

export default ChatContacts
