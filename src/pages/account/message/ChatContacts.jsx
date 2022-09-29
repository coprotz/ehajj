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
import NewChat from './NewChat';



const ChatContacts = () => {
    const { user } = useAuth();
    const { users, agents, pilgrims, groups, chats, mission, admins } = useData();
    const cuUser = users && users.find(u => u.id === user.uid)

    const [selected, setSelected] = useState(null)
    const [newMsg, setNewMsg] = useState(null)
    const [newChat, setNewChat] = useState(null)

    const pilgrim = pilgrims && pilgrims.find(u => u?.id === user.uid)
    const agent = agents?.find(a => a?.users?.includes(`${user.uid}`)) || agents?.find(a => a?.createdBy === user?.uid)
    const isMission = mission?.find(m => m?.userId === user?.uid)
    const isAdmin = admins.find(a =>a.userId === user?.uid)
    const group = groups && groups.find((u) => u.id === cuUser?.groupId)

    const groupChats = chats && chats.filter(c =>c.members.includes(`${group?.id}`))
    const userChats = chats && chats.filter(c => c.members.includes(`${user.uid}`))
    const allChats = userChats.concat(groupChats)
    const pilAgent = agents?.find(p => p.id === pilgrim?.agentId)

    const chatsRef = collection(db, 'chats')

   



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
            console.log('id', id)
           navigate(`/account/messages/${oldChat.id}`)       
          }
          else{
            const data = {
              members : [`${user.uid}`, `${selected}`]
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

    console.log('selcetd', selected)

    const RenderChoice = () => {
        if(pilgrim){
          return (
            <div className='pil_inner_1'>
                {/* <button className='btn_sel_new'><BiArrowBack onClick={() => navigate(-1)}/>Select Contact</button> */}
                <div className="message_heading">
                    <h3 className='message_head'><BiArrowBack onClick={() =>navigate(-1)}/>Select Contact</h3> 
                    <div className="msg_chat_menu">
                        <BsSearch className='message_chat'/>                   
                    </div>
                </div>
                {pilgrim? <>              
                <span className='pil_inner_2'>{pilAgent.coName || pilAgent.name}</span>
                <button className='btn_send' onClick={() => setSelected(pilgrim?.agentId)}><BiEnvelope/></button> </> 
                : <span style={{display: 'block', textAlign: 'center', marginTop: '15px'}}>No agent found</span>}
                {/* {newMsg && <> */}
                
                {selected &&
                <div className='selected'>
                    <span>Would you like to chat with <strong>{pilAgent.coName || pilAgent.name}</strong>?</span>
                    <div className="selected_btns">
                      <button style={{color: '#7d28d4'}} onClick={(e) => handleNew(selected, e)}>OK</button>
                      <button style={{color: '#aaaaaa'}} onClick={() => setSelected(null)}>CANCEL</button>
                    </div>
                </div>}
                {/* </>} */}
            </div>
          )
        }else if(agent){
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
                {/* {activeAgentPilgrims.length > 0 ?<> */}
                {/* {activeAgentPilgrims && activeAgentPilgrims.map(member => (
                  <span onClick={() => setSelected(member)} key={member.id}>{member.fname} {member.lname}</span>
                ))} */}
              {/* </> : "No Pilgrim"} */}
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
                  <span onClick={() => setSelected(member)} key={member.id}>{member.coName || member.name} </span>
                ))}
              </> : "No Agent"}
            </div>
            :
            <div className='selected'>
                <span>Would you like to chat with <strong>{selected?.coName || selected?.name}</strong>?</span>
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
              <span>{agent? 'No Pilgrim': 'No Agent' }</span>
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
            <NewChat s={g.id} name={g.name}/>
            {/* <BiEnvelope onClick={(e) => handleNew(g.id, e)}/>  */}
          </div>
        ))}
        
      </div>                   
    </div>                       
  </motion.div> 
  )
}

export default ChatContacts
