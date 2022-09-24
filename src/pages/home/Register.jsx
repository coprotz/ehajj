import React from 'react'
import { useState } from 'react';
import { BiRightArrowAlt, BiArrowBack } from "react-icons/bi";
import { useForm } from "react-hook-form";
import useData from '../../hooks/useData';
import { motion } from 'framer-motion';
import { addDoc, collection, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db, useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { useEffect } from 'react';
import axios from 'axios';
import Loading from '../../components/loading/Loading'


const Register = () => {

    const { t } = useTranslation();

    const { register,  watch, formState: { isValid } } = useForm({mode: 'all'});

    const { signUp } = useAuth()
    const { mission, admins, agents } = useData();
  

    const email = watch('email')
    const phone = watch('phone')
    const password = watch('password')
    const fname = watch('fname')
    const lname = watch('lname')
    const gender = watch('gender')
    const cPassword = watch('cPassword')
    const typeOf = watch('typeOf')
    const agentId = watch('agent')
    const office = watch('office')
    const country = watch('country')
    const mPhone = watch('mPhone')

    const selectedAgent = agents && agents.find(a => a.id === agentId)
    const usersRef = collection(db, 'users')

    const navigate = useNavigate()
    const [err, setErr] = useState('')
    const [loading, setLoading] = useState(null)

    const agent = agents?.find(a => a.id === agentId)

    console.log('agent', agent)

    const fdig = mPhone.slice(4,7)
    const ldig = mPhone.slice(10,13)

    // console.log('lastdi', lastDigits)

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

    const { errMessage, countries } = countryState

    console.log('countries', countries)
    const flag = countries && countries.find(d => d.name.common === country)?.flags.png 
    const root1 = countries && countries.find(d => d.name.common === country)?.idd.root  
    const root2 = countries && countries.find(d => d.name.common === country)?.idd.suffixes 
    const code = root1 + root2

    console.log('code', code)

    const [page, setPage] = useState(1)

    const handleCreate = async(e) => {
        e.preventDefault();

        setLoading(true)

        const data = {
            fname,
            lname,
            missionId:'',
            email,
            gender,
            status: 'Approved',
            agentId: agentId || '',
            typeOf: 'agent',
            isOnline: true,
            isApproved: false,
            phone:code + phone,
            isAdmin: false,
            country,
            createdAt: serverTimestamp(),

        }

        try {
            const newUser = await signUp(email, password)            
            await setDoc(doc(db, 'users', `${newUser.user.uid}`), {
                ...data,
                createdAt: serverTimestamp(),
            }) 
            setLoading(null)
            navigate('/createAgent')
            // console.log('user', newUser.user)
        } catch (error) {
            setErr(error.message)
        }
    }

    // const agent = agents.find(a =>a.id === agentId)
    const [pils, setPils] = useState([agent?.pilgrims])

    const handleAgent = async(e) => {
        e.preventDefault()

        setLoading(true)

        const data = {
            fname,
            lname,
            photo:'',
            agentId: agentId,
            groupId:'',
            email,
            status:'Not Approved',
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

            const agent = agents?.find(a =>a.id === agentId)
            await updateDoc(doc(db, 'agents', `${agentId}`), {
                users: [...agent?.users, `${newUser.user.uid}`],
            })  
            setLoading(null)
            navigate('/account/main')
            // console.log('user', newUser.user)
        } catch (error) {
            setErr(error.message)
        }
       


    }

    const handlePilgrim = async(e) => {
        e.preventDefault()

        setLoading(true)

        const data = {
            fname,
            lname,
            photo:'',          
            gender,
            agentId,
            email,
            status:'Not Approved',              
            isOnline: true,     
            isApproved: false,
            phone:code + phone,
            country,
            createdAt: serverTimestamp(),
            
        }

        try {
            const newUser = await signUp(email, password)
            await setDoc(doc(db, 'pilgrims', `${newUser.user.uid}`), {
                ...data,               
                createdAt: serverTimestamp(),
            }) 
            
        //    setPils(current => [current, newUser.user.uid])

            const agent = agents?.find(a => a.id === agentId)
           await updateDoc(doc(db, 'agents', `${agentId}`), {
                pilgrims: [...agent?.pilgrims, `${newUser.user.uid}`],
            })  
            setLoading(null)
            navigate('/account/main') 
       
        } catch (error) {
            setErr(error.message)
        }
    }

    const RenderButton = () => {
        if(typeOf === 'agent'){
            return (
                <button 
                    className='btn_submit' 
                    type='button' 
                    onClick={() => setPage(3)} 
                    disabled={!isValid}>{loading? <Loading/>:<span>{t('continue')}<BiRightArrowAlt/></span>}
                    </button>
            )
        }else if((typeOf === 'pilgrim')){
            return (
                <button 
                    className='btn_submit' 
                    type='button' 
                    onClick={() => setPage(4)} 
                    disabled={!isValid}>{t('continue')}<BiRightArrowAlt/>
                    </button>
            )
        }else if(typeOf === 'mission'){
            return (
                <button 
                    className='btn_submit' 
                    type='button' 
                    onClick={() => setPage(5)} 
                    disabled={!isValid}>{t('continue')}<BiRightArrowAlt/>
                    </button>
            )
        }else if(typeOf === 'admin'){
            return (
                <button 
                    className='btn_submit' 
                    type='button' 
                    onClick={() => setPage(6)} 
                    disabled={!isValid}>{t('continue')}<BiRightArrowAlt/>
                    </button>
            )
        }
        // else{
        //     return(
        //         <button 
        //             className='btn_submit' 
        //             onClick={handleRegister} 
        //             disabled={!isValid}>
        //             {loading? <Loading/> : <span>{t('submit')}<BiRightArrowAlt/></span>}</button>
        //     )
        // }
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
                            <input 
                                type="text" 
                                placeholder={`${t('lname')}`} 
                                className='cont_item' 
                                name='lname' 
                                {...register("lname", { required: true })}
                            />
                        </div>
                        <div className="cont_inputs">
                            <input 
                                type="email" 
                                placeholder={`${t('email')}`} 
                                className='cont_item' 
                                name='email' 
                                {...register("email", { required: true })}
                                />   
                            <select name="gender" id="" {...register("gender", { required: true })} className='cont_item'>
                                <option value="" >--Select gender--</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>    
                        </div>
                        {/* <div className="cont_inputs">
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
                            
                        </div> */}
                        <div className="cont_inputs">
                            <input type="password" placeholder={`${t('password')}`} className='cont_item' name='password' {...register("password", { required: true })}/>
                            {/* <input type="password" placeholder={`${t('cPassword')}`} className='cont_item' name='cPassword' {...register("cPassword", { required: true })}/> */}
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
                                {agents && agents.filter(a => a.status==='Approved').map(agent => (
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
                        {!agentId &&
                        <div className="create_agent">
                            <span>Cant you find your agent?</span>
                            <button onClick={handleCreate} className='btn_create_agent'>{loading? <Loading/> : 'Create New Agent'}</button>
                        </div> }                   
                        <button 
                            className='btn_submit' 
                            onClick={handleAgent} 
                            disabled={!isValid}
                            >{t('continue')}<BiRightArrowAlt/>
                        </button>
                    </motion.div>
                
            </div>
            )
        }else if(page === 4){
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
                                {agents && agents.filter(a => a.status==='Approved').map(agent => (
                                <option value={agent.id} key={agent.id}>{agent?.coName || agent?.name}</option> 
                                ))}                                               
                            </select>                    
                        </div>  
                        {!agentId &&                     
                        <div className="create_agent">
                            <span>Cant you find your agent?</span>
                            <button onClick={()=>navigate('/contact')} className='btn_create_agent'>Contact Us</button>
                        </div>  }                  
                        <button 
                            className='btn_submit' 
                            onClick={handlePilgrim} 
                            disabled={!isValid}
                            >{t('continue')}<BiRightArrowAlt/>
                        </button>
                    </motion.div>
                
            </div>
            )
        }else if(page === 5){
            return (
                <div className="cont_register">
                    <motion.div 
                    initial={{ x: -100}}
                    animate={{x: 1}} 
                    transition={{ ease: "easeOut", duration: 0.5 }}
                    className='cont_motion'>
                    
                        <h4><BiArrowBack onClick={() => setPage(2)}/>{t('select_position')}</h4>
                        <div className="cont_inputs">
                            <select className='cont_item' name='mPhone' {...register("mPhone", { required: true })}>
                                <option value="">--{t('select_position')}--</option>
                                {mission && mission.map(m => (
                                <option value={m.phone} key={m.id} style={{color: 'black'}}>{m.position}</option> 
                                ))}                                               
                            </select>                    
                        </div>                                         
                        <button 
                            className='btn_submit' 
                            onClick={() => setPage(7)} 
                            disabled={!isValid}
                            >{t('continue')}<BiRightArrowAlt/>
                        </button>
                    </motion.div>
                
            </div>
            )
        }else if(page === 7){
            return (
                <div className="cont_register">
                    <motion.div 
                    initial={{ x: -100}}
                    animate={{x: 1}} 
                    transition={{ ease: "easeOut", duration: 0.5 }}
                    className='cont_motion'>
                    
                        <h4><BiArrowBack onClick={() => setPage(5)}/>
                            Please Enter the Code that has been sent to 0{fdig}_ _ _ _{ldig}</h4>
                        <div className="cont_inputs">                            
                            <input 
                                type="number" 
                                placeholder='ENTER CODE' 
                                className='cont_item' 
                                name='code' 
                                {...register("code", { required: true })}
                            />
                        </div>                                         
                        <button 
                            className='btn_submit' 
                            onClick={() => setPage(8)} 
                            disabled={!isValid}
                            >{t('continue')}<BiRightArrowAlt/>
                        </button>
                    </motion.div>
                
            </div>
            )
        }else if(page === 6){
            return (
                <div className="cont_register">
                    <motion.div 
                    initial={{ x: -100}}
                    animate={{x: 1}} 
                    transition={{ ease: "easeOut", duration: 0.5 }}
                    className='cont_motion'>
                    
                        <h4><BiArrowBack onClick={() => setPage(2)}/>{t('select_position')}</h4>
                        <div className="cont_inputs">
                            <select className='cont_item' name='mPhone' {...register("mPhone", { required: true })}>
                                <option value="">--{t('select_position')}--</option>
                                {admins && admins.map(m => (
                                <option value={m.phone} key={m.id} style={{color: 'black'}}>{m.position}</option> 
                                ))}                                               
                            </select>                    
                        </div>                                         
                        <button 
                            className='btn_submit' 
                            onClick={() => setPage(8)} 
                            disabled={!isValid}
                            >{t('continue')}<BiRightArrowAlt/>
                        </button>
                    </motion.div>
                
            </div>
            )
        }else if(page === 8){
            return (
                <div className="cont_register">
                    <motion.div 
                    initial={{ x: -100}}
                    animate={{x: 1}} 
                    transition={{ ease: "easeOut", duration: 0.5 }}
                    className='cont_motion'>
                    
                        <h4><BiArrowBack onClick={() => setPage(5)}/>
                            Please Enter the Code that has been sent to 0{fdig}_ _ _ _{ldig}</h4>
                        <div className="cont_inputs">                            
                            <input 
                                type="number" 
                                placeholder='ENTER CODE' 
                                className='cont_item' 
                                name='code' 
                                {...register("code", { required: true })}
                            />
                        </div>                                         
                        <button 
                            className='btn_submit' 
                            onClick={() => setPage(8)} 
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
        > 
        {err && <span className='error'>{err}</span>}               
        {RenderPage()}        
    </motion.div>
   
    
  )
}

export default Register
