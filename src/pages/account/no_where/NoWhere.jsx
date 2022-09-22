import React from 'react'
import './nowhere.css'
import Lottie from "lottie-react";
import data from '../../../hooks/data.json'
import { db, useAuth } from '../../../hooks/useAuth';
import { motion } from 'framer-motion';
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { BiRightArrowAlt, BiArrowBack } from "react-icons/bi";
import useData from '../../../hooks/useData';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';



const NoWhere = () => {
    const {user, logOut, signUp} = useAuth();
    const { agents, users} = useData()
    const { t } = useTranslation();
    const { register,  watch, formState: { isValid } } = useForm({mode: 'all'});

    const cuUser = users && users.find(u =>u.id === user.uid)
    console.log('cusuer', cuUser)


    const email = watch('email')
    const phone = watch('phone')
    const password = watch('password')
    const fname = watch('fname')
    const lname = watch('lname')
    const cPassword = watch('cPassword')
    const typeOf = watch('typeOf')
    const agentId = watch('agent')
    const office = watch('office')
    const country = watch('country')

    const navigate = useNavigate()
    const [err, setErr] = useState('')

    const selectedAgent = agents && agents.find(a => a.id === agentId)

    const handleCreate = async(e) => {
        e.preventDefault();

        const data = {
            fname,
            lname,
            agentId: agentId || '',
            typeOf: 'agent',
            isOnline: true,
            isApproved: false,
        
            country,
            createdAt: serverTimestamp(),

        }

        try {
            const newUser = await signUp(email, password)            
            await setDoc(doc(db, 'users', `${newUser.user.uid}`), {
                ...data,
                createdAt: serverTimestamp(),
            }) 
            navigate('/createAgent')
            // console.log('user', newUser.user)
        } catch (error) {
            setErr(error.message)
        }
    }

    const handleRegister = async(e) => {
        e.preventDefault()

        const data = {
            fname,
            lname,
            photo:'',
            agentId: agentId || '',
            groupId: typeOf === 'mission'? 'pWNapKqmAA0TzSpoF4hD' : '',
            email,
            typeOf,
            office: office || '',
            isOnline: true,
            isAdmin: false,
            isApproved: false,
           
            country,
            createdAt: serverTimestamp(),
            
        }

        try {
            const newUser = await signUp(email, password)            
            await setDoc(doc(db, 'users', `${newUser.user.uid}`), {
                ...data,
                createdAt: serverTimestamp(),
            }) 
            navigate('/account/main')
            // console.log('user', newUser.user)
        } catch (error) {
            setErr(error.message)
        }
       


    }

  return (
    <div className='no_where'>
        <Lottie animationData={data} loop={true} height={300} width={200}/>
        <h3>Please select your role to proceed</h3>
        <div className="cont_register"> 
                 <motion.div 
                    initial={{ x: '-100vw'}}
                    animate={{x: 1}} 
                    transition={{ ease: "easeOut", duration: 0.5 }}
                    className='cont_motion'>                 
                            <div className="cont_radios">                            
                            <input 
                                type="radio" 
                                name='typeOf'
                                value='pilgrim' 
                                id='pilgrim' 
                                style={{display:'none'}}  
                                {...register("typeOf", { required: true })}                                
                            />
                            <label htmlFor="pilgrim" className='cont_label'><span>{t('pilgrim')}</span></label>                            
                            
                            <input 
                                type="radio" 
                                name='typeOf'
                                value='agent'
                                id='agent'  
                                style={{display:'none'}} 
                                {...register("typeOf", { required: true })}                                  
                            />
                            <label htmlFor="agent" className='cont_label'><span>{t('agent')}</span></label>  
                              <input 
                                type="radio" 
                                name='typeOf'
                                value='mission'
                                id='mission'  
                                style={{display:'none'}} 
                                {...register("typeOf", { required: true })}                                  
                            />
                            <label htmlFor="mission" className='cont_label'><span>{t('mission')}</span></label>                           
                            <input 
                                type="radio" 
                                name='typeOf'
                                value='admin' 
                                id='admin' 
                                style={{display:'none'}}  
                                {...register("typeOf", { required: true })}                                 
                            />
                            <label htmlFor="admin" className='cont_label'><span>{t('admin')}</span></label>                            
                        </div>     
                        {/* <button 
                            className='btn_submit' 
                            type='button'  
                            disabled={!isValid}>{t('continue')}
                            <BiRightArrowAlt/>
                        </button> */}
                    </motion.div> 

                    
                </div>
                <div className="cont_register">
                    <motion.div 
                    initial={{ x: -100}}
                    animate={{x: 1}} 
                    transition={{ ease: "easeOut", duration: 0.5 }}
                    className='cont_motion'>
                    
                        
                        <div className="cont_inputs">
                            <select className='cont_item' name='agent' {...register("agent", { required: true })}>
                                <option value="">--{t('select_agent')}--</option>
                                {agents && agents.map(agent => (
                                <option value={agent.id} key={agent.id}>{agent?.coName || agent?.name}</option> 
                                ))}                                               
                            </select>                    
                        </div>
                        <div className="cont_inputs">
                            <select className='cont_item' name='office' {...register("office", { required: true })}>
                                <option value="">--{t('select_office')}--</option>
                                {selectedAgent && selectedAgent?.office?.map((district, index) => (
                                    <option value="Wazo Agent" key={index}>{district}</option>
                                ))} 
                                <option value="For now">For Now</option>                       
                            </select>                    
                        </div> 
                        <div className="create_agent">
                            <span>Cant you find your agent?</span>
                            <button onClick={handleCreate} className='btn_create_agent'>Create New Agent</button>
                        </div>                    
                        <button 
                            className='btn_submit' 
                            onClick={handleRegister} 
                            disabled={!isValid}
                            >{t('continue')}<BiRightArrowAlt/>
                        </button>
                    </motion.div>
                
            </div>
                <button onClick={() => logOut()} className='btn_no_where'>Home</button>
    </div>
  )
}

export default NoWhere
