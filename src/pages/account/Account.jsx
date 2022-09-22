import React, { useState, useEffect } from 'react'
import './account.css'
import MessageModal from '../../components/modal/MessageModal'
import { useNavigate } from 'react-router-dom'
import {motion} from 'framer-motion'
import { useAuth } from '../../hooks/useAuth'
import Agent from './agent/Agent'
import Spinner from '../../components/spinner/Spinner'
import useData from '../../hooks/useData'
import Pilgrim from './pilgrim/Pilgrim'
import Mission from './mission/Mission'

import Admin from './admin/Admin'
import NoWhere from './no_where/NoWhere'
// import NewUser from './newUser/NewUser'

const Account = () => {

    // const options = {
    //     animationData: data,
    //     autoplay: true,
    //     loop: true
    //   };

    const { pilgrims, messages, agents, users, chats } = useData();

    const navigate = useNavigate()
    const {user, logOut, db} = useAuth()
    const [message, setMessage] = useState(null)

    const [showMainMenu, setShowMainMenu] = useState(null)
    const [page, setPage] = useState(1)

    const [loading, setLoading] = useState(true)
    const [msg, setMsg] = useState('')
    console.log('user', user)

    const cuUser = users.find((u) => u?.id === user?.uid)
    const cuAgent = agents.find((a) => a?.id === user?.uid)
    const cuPil = pilgrims.find((p) => p.id === user?.uid)
    const pilAgent = agents?.find((a) => a.id === cuPil?.agentId)
    const userAgent = agents?.find((a) => a.id === cuUser?.groupId)
    const agentPils = pilgrims?.filter((a) => a.agentId === cuAgent?.id)

    console.log('cuUser', cuUser)

    const props = {
        cuUser, 
        userAgent, 
        chats, 
        setPage, 
        cuAgent, 
        agentPils, 
        users, agents, 
        page, pilgrims, 
        cuPil, 
        message, 
        setMessage, 
        pilAgent, 
        setMsg, 
        messages,
        showMainMenu,
        setShowMainMenu,
        loading
    }

    const RenderAccount = () => {
        if(cuUser && cuUser.typeOf === 'pilgrim'){
            return (
                <Pilgrim/>
            )
        }
        else if(cuUser && cuUser.typeOf === 'agent'){
            return (
                <Agent/>
            )
        }else if(cuUser && cuUser.typeOf === 'admin'){
            return (
                <Admin/>
            )
        }else if(cuUser && cuUser.typeOf === 'mission'){
            return (
                <Mission/>
            )
        }else{
            return (
               <NoWhere/>
            )
        }
    }


    
    useEffect(() => {
      setTimeout(() => {
        setLoading(false)
      }, 3000)
    }, [])

   
  return (
    <div className='account'>
        {loading && <Spinner/>}
        {message && <MessageModal props={props}/>}
        {msg && 
            <motion.div 
                initial={{ opacity: 0}}
                animate={{opacity: 1}} 
                transition={{ ease: "easeOut", duration: 0.5 }}
                className='msg_alert'>
                {msg}
            </motion.div>}  
            {RenderAccount()}
    </div>
  )
}

export default Account
