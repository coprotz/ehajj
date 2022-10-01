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
import Page404 from '../404/Page404'
import { doc, updateDoc } from 'firebase/firestore'
// import NewUser from './newUser/NewUser'

const Account = () => {

    // const options = {
    //     animationData: data,
    //     autoplay: true,
    //     loop: true
    //   };

    const { pilgrims, messages, agents, users, chats, mission, admins } = useData();

    const navigate = useNavigate()
    const {user, logOut, db} = useAuth()
    const [message, setMessage] = useState(null)

    const [showMainMenu, setShowMainMenu] = useState(null)
    const [page, setPage] = useState(1)

    const [loading, setLoading] = useState(true)
    const [msg, setMsg] = useState('')
    const [error, setError] = useState('')
    // console.log('user', user)

    const cuUser = users.find((u) => u?.id === user?.uid)
    const cuAgent = agents.find((a) => a?.id === user?.uid)
    const cuPil = pilgrims.find((p) => p.id === user?.uid)
    const pilAgent = agents?.find((a) => a.id === cuPil?.agentId)
    const userAgent = agents?.find((a) => a.id === cuUser?.groupId)
    const agentPils = pilgrims?.filter((a) => a.agentId === cuAgent?.id)
    const isMission = mission?.find(m => m?.userId === user?.uid)
    const isAdmin = admins.find(a =>a.userId === user?.uid)
    const isAgent = agents?.find(a => a?.users?.includes(`${user.uid}`)) || agents?.find(a => a?.createdBy === user?.uid)

    // console.log('isgent',isAgent)
    const pilgrim = pilgrims?.find(p=>p.id === user.uid)
    

    // console.log('cuUser', cuUser)

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
        if(pilgrim){
            return (
                <Pilgrim/>
            )
        }
        else if(isAgent){
            return (
                <Agent/>
            )
        }else if(isAdmin){
            return (
                <Admin/>
            )
        }else if(isMission){
            return (
                <Mission/>
            )
        }else{
            return (
               <Page404/>
            )
        }
    }


    
    useEffect(() => {
      setTimeout(() => {
        setLoading(false)
      }, 3000)
    }, [])

    const pilgrimRef = doc(db, 'pilgrims', `${pilgrim?.id}`)
    const userRef = doc(db, 'users', `${cuUser?.id}`)

    useEffect(() => {

        setTimeout(() => {
  
        const makeOnline = async () => {
            

            try {

                if(pilgrim){
                   await updateDoc(pilgrimRef, {
                        isOnline: true
                    })  
                }else if(cuUser){
                    await updateDoc(userRef, {
                        isOnline: true
                    }) 
                }
                
                setTimeout(() => {
                    setMsg('You are online')  
                 },4000)
                setTimeout(() => {
                   setMsg('')  
                },7000)
               
                
            } catch (error) {
                setError(error.message)
            }
           
        }
        makeOnline()
        },5000)
    },[pilgrim?.id, cuUser?.id])

   
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
