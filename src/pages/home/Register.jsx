import React from 'react'
import { useState } from 'react';
import { BiRightArrowAlt, BiArrowBack } from "react-icons/bi";
import { useForm } from "react-hook-form";
import useData from '../../hooks/useData';
import { motion } from 'framer-motion';
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db, useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { useEffect } from 'react';
import axios from 'axios';


const Register = () => {

    const { t } = useTranslation();

    const { register,  watch, formState: { isValid } } = useForm({mode: 'all'});

    const { signUp } = useAuth()

    const { agents } = useData();
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

    const selectedAgent = agents && agents.find(a => a.id === agentId)
    const usersRef = collection(db, 'users')

    const navigate = useNavigate()
    const [err, setErr] = useState('')

    const [countryState, setCountryState] = useState({
        loading: false,
        countries: [],
        errMessage: ''
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                setCountryState({
                    ...countryState,
                    loading: true,
                });

                const dataUrl = `https://restcountries.com/v3.1/all`
                const res = await axios.get(dataUrl);
                setCountryState({
                    ...countryState,
                    countries: res.data,
                    loading: false,
                })
            } catch (error) {
                setCountryState({
                    ...countryState,
                    loading: false,                    
                    errMessage: 'Sorry Something is wrong',

                });
            }
        }
        fetchData();
    },[]);

    const { loading, errMessage, countries } = countryState

    console.log('countries', countries)
    const flag = countries && countries.find(d => d.name.common === country)?.flags.png 
    const root1 = countries && countries.find(d => d.name.common === country)?.idd.root  
    const root2 = countries && countries.find(d => d.name.common === country)?.idd.suffixes 
    const code = root1 + root2

    console.log('code', code)

    const [page, setPage] = useState(1)

    const handleCreate = async(e) => {
        e.preventDefault();

        const data = {
            fname,
            lname,
            agentId: agentId || '',
            typeOf: 'agent',
            isOnline: true,
            isApproved: false,
            phone:code + phone,
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
            phone:code + phone,
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

    const RenderButton = () => {
        if(typeOf === 'agent'){
            return (
                <button className='btn_submit' type='button' onClick={() => setPage(3)} disabled={!isValid}>{t('continue')}<BiRightArrowAlt/></button>
            )
        }else{
            return(
                <button 
                    className='btn_submit' 
                    onClick={handleRegister} 
                    disabled={!isValid}>
                    {t('submit')}<BiRightArrowAlt/></button>
            )
        }
    }
    const RenderPage = () => {
        if(page === 1){
            return (
                <div className="cont_register">
                     <motion.div 
                        initial={{ x: -100}}
                        animate={{x: 1}} 
                        transition={{ ease: "easeOut", duration: 0.5 }}
                        className='cont_motion'>
                        <h4>{t('register_head')}</h4>
                        <div className="cont_inputs">
                            <input type="text" placeholder={`${t('fname')}`} className='cont_item' name='fname' {...register("fname", { required: true })}/>
                            <input type="text" placeholder={`${t('lname')}`} className='cont_item' name='lname' {...register("lname", { required: true })}/>
                        </div>
                        <div className="cont_inputs">
                            <input type="email" placeholder={`${t('email')}`} className='cont_item' name='email' {...register("email", { required: true })}/>   
                            <select name="gender" id="" {...register("gender", { required: true })} className='cont_item'>
                                <option value="" >--Select gender--</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>    
                        </div>
                        <div className="cont_inputs">
                            <select name="country" id="" {...register("country", { required: true })} className='cont_item'>
                                <option value="" >--Select Country--</option>
                                {countries && countries.sort((a,b)=>a.name.common < b.name.common ? -1 : a.name.common === b.name.common ? 0 : 1).map((data, index) => (
                                    <option key={index}>{data.name.common}</option>
                                ))}
                            </select>
                            <div className="phone_wrapper">
                                {country && <>
                                    <span className='con_flag'><img src={flag} alt="" /></span>
                                    <span >{code}</span>
                                </>}
                                
                                <input type="tel" 
                                    placeholder={`${t('phone')}`} 
                                    name='phone'
                                    className={country? 'sq_input': 'ext_input'}
                                    {...register("phone", { required: true })}
                                    />
                            </div>                         
                            
                        </div>
                        <div className="cont_inputs">
                            <input type="password" placeholder={`${t('password')}`} className='cont_item' name='password' {...register("password", { required: true })}/>
                            <input type="password" placeholder={`${t('cPassword')}`} className='cont_item' name='cPassword' {...register("cPassword", { required: true })}/>
                        </div>      
                        <button className='btn_submit' onClick={() => setPage(2)} disabled={!isValid}>{t('continue')}<BiRightArrowAlt/></button>
                    </motion.div>
                </div>
            )
        }else if(page === 2){
            return (               
                <div className="cont_register"> 
                 <motion.div 
                    initial={{ x: '-100vw'}}
                    animate={{x: 1}} 
                    transition={{ ease: "easeOut", duration: 0.5 }}
                    className='cont_motion'>                  
                    <h4><BiArrowBack onClick={() => setPage(1)}/>{t('select_role')}</h4>
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
                        {RenderButton()}
                    </motion.div> 
                    
                </div>
            )
        }else if(page === 3){
            return (
                <div className="cont_register">
                    <motion.div 
                    initial={{ x: -100}}
                    animate={{x: 1}} 
                    transition={{ ease: "easeOut", duration: 0.5 }}
                    className='cont_motion'>
                    
                        <h4><BiArrowBack onClick={() => setPage(2)}/>{t('select_agent')}</h4>
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
            )
        }
    }

    
  return (
    <motion.div 
        initial={{ x: -100}}
        animate={{x: 1}} 
        transition={{ ease: "easeOut", duration: 0.5 }}
        className='register_main_container'> 
        {err && <span className='error'>{err}</span>}               
        {RenderPage()}        
    </motion.div>
   
    
  )
}

export default Register
