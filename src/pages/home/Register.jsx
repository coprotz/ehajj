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
import AgentOffices from './register/AgentOffices';
import AgentServices from './register/AgentServices';
import AgentLogo from './register/AgentLogo';
import useStorage from '../../hooks/useStorage';


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
    const coName = watch('coName')
    const coEmail = watch('coEmail')
    const coPhone = watch('coPhone')
    const website = watch('website')
    const ibada = watch('ibada')
    const coLicence = watch('coLicence')
    const a_services = watch('services')
    const cost = watch('cost')
    const desc = watch('desc')
    const [file, setFile] = useState(null)
    const { perc, url } = useStorage(file)
    const [services, setServices] = useState(null)

    const [offices, setOffices] = useState([
        {street: '', building: '', district: '', region: ''}
    ])

    const selectedAgent = agents && agents.find(a => a.id === agentId)
    const usersRef = collection(db, 'users')

    const navigate = useNavigate()
    const [err, setErr] = useState('')
    const [loading, setLoading] = useState(null)

    const agent = agents?.find(a => a.id === agentId)

    // console.log('agent', agent)

    const fdig = mPhone?.slice(4,7)
    const ldig = mPhone?.slice(10,13)

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

    // console.log('code', code)

    const getRandomId = (min = 0, max = 500000) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        const num =  Math.floor(Math.random() * (max - min + 1)) + min;
        return num.toString().padStart(6, "0")
      };
      

    const [page, setPage] = useState(1)

    const agentRef = collection(db, 'agents')
    //  const userRef = doc(db, 'users', `${user.uid}`)

    const handleCreate = async(e) => {
        e.preventDefault();

        setLoading(true)

        const data = {
            coName,
            coEmail,
            coLicence,
            password,
            invoiceNo: 1026+getRandomId(),
            coPhone,            
            status: 'Not Approved',           
            website,
            services, 
            cost,
            desc,
            logo:url,     
            offices,      
            createdAt: serverTimestamp(),

        }

        // console.log('data', data)

        try {
            const newUser = await signUp(email, password)            
            await setDoc(doc(db, 'users', `${newUser.user.uid}`), {
                fname, 
                lname, 
                gender,
                email,
                isOnline: true,
                status: 'Approved', 
                createdAt: serverTimestamp(),
            }) 
                await addDoc(agentRef, {
                ...data,
                createdBy: newUser.user.uid
            })
            // await updateDoc(doc(db, 'users', `${newUser.user.uid}`), {
            //     agentId: newAgent?.id
            // })
            // const agent = agents?.find(a =>a.id === newAgent?.id)
            // await updateDoc(doc(db, 'agents', `${agent?.id}`), {
            //     users: [...agent?.users, `${newUser.user.uid}`],
            // })  
            setLoading(null)
            navigate('/account/main')         
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
            phone,
            status:'Not Approved',
            typeOf,           
            office: office || '',
            isOnline: true,
            isAdmin: false,
            isApproved: false,
            // phone:code + phone,
            // country,
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

    const invoicesRef = collection(db, 'invoices')

   



    const handlePilgrim = async(e) => {
        e.preventDefault()

        setLoading(true)

        const data = {
            fname,
            lname,
            invoiceNo: 1026+getRandomId(),
            ibada,
            photo:'',          
            gender,
            agentId,
            cost: selectedAgent?.cost,
            email,
            status:'Pending',
            payment: 'Not Paid',              
            isOnline: true,     
            isApproved: false,
            phone,
            // country,
            createdAt: serverTimestamp(),
            
        }

        const invoiceData = {
            desc: 'Hijjah Costs',
            name: fname+" "+lname,
            amount: selectedAgent?.cost,
            status: 'Not Paid',
            agentId,

        }

        

        try {
            const newUser = await signUp(email, password)

            const newInvoice = await addDoc(invoicesRef, {
                ...invoiceData,
                creatorId: newUser.user.uid,
                no: 1026+getRandomId(),            
                createdAt: serverTimestamp(),
                agentId,
                
                
            })


            await setDoc(doc(db, 'pilgrims', `${newUser.user.uid}`), {
                ...data, 
                invoiceId: newInvoice.id,              
                createdAt: serverTimestamp(),
            }) 

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
                             <div className="create_group">                            
                                <input 
                                    type="text" 
                                    className="create_input" 
                                   
                                    name='fname' 
                                    {...register("fname", { required: true })}
                                    required/>
                                <span className='create_span_1'>{`${t('fname')}`}</span>
                            </div>
                            <div className="create_group">                            
                                <input 
                                    type="text" 
                                    className="create_input" 
                                   
                                    name='lname' 
                                    {...register("lname", { required: true })}
                                    required/>
                                <span className='create_span_1'>{`${t('lname')}`}</span>
                            </div>                          
                        </div>
                        <div className="cont_inputs">                        
                             <div className="create_group">                            
                                <input 
                                    type="email" 
                                    className="create_input" 
                                   
                                    name='email' 
                                    {...register("email", { required: true })}
                                    required/>
                                <span className='create_span_1'>{`${t('email')}`}</span>
                            </div>
                            <div className="create_group">                            
                                <input 
                                    type="tel" 
                                    className="create_input" 
                                   
                                    name='phone' 
                                    {...register("phone", { required: true })}
                                    required/>
                                <span className='create_span_1'>{`${t('phone')}`}</span>
                            </div>
                                           
                        </div>
                        <div className="cont_inputs">                        
                          
                            <div className="create_group">  
                                <select 
                                    name="gender" 
                                    {...register("gender", { required: true })} 
                                    className='create_input'                                    
                                >
                                    <option value="" style={{color:'black'}}>--{t('select_gender')}--</option>
                                    <option value="Male" style={{color:'black'}}>{t('male')}</option>
                                    <option value="Female" style={{color:'black'}}>{t('female')}</option>
                                </select>                          
                              
                                <span className='create_span_1'>{`${t('gender')}`}</span>
                            </div> 
                                                     
                        </div>
                      
                        <div className="cont_inputs">
                            <div className="create_group">                            
                                <input 
                                    type="password" 
                                    className="create_input" 
                                   
                                    name='password' 
                                    {...register("password", { required: true })}
                                    required/>
                                <span className='create_span_1'>{`${t('password')}`}</span>
                            </div>                           
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
                            <div className="create_group">  
                                <select 
                                    name="agent" 
                                    {...register("agent", { required: true })} 
                                    className='create_input'                                    
                                    >
                                    <option value="" style={{color:'black'}}>--{t('select_agent')}--</option>
                                    {agents && agents.filter(a => a.status==='Approved').map(agent => (
                                    <option value={agent.id} key={agent.id} style={{color:'black'}}                         
                                    >{agent?.coName || agent?.name}</option> 
                                ))}                                 
                                </select>                       
                                <span className='create_span_1' >{`${t('select_agent')}`}</span>
                            </div>
                          
                        </div>
                        <div className="cont_inputs">
                            <div className="create_group">  
                                <select 
                                    name="office" 
                                    {...register("office", { required: true })} 
                                    className='create_input'                                    
                                    >
                                     <option value="" style={{color:'black'}}>--{t('select_office')}--</option>
                                    {selectedAgent && selectedAgent?.office?.map((district, index) => (
                                    <option value="Wazo Agent" key={index} style={{color:'black'}}>{district}</option> 
                                    ))}  
                                    <option value="For now" style={{color:'black'}}>For Now</option>                                
                                </select>                       
                                <span className='create_span_1' >{`${t('select_office')}`}</span>
                            </div>                                           
                        </div> 
                        {!agentId &&
                        <div className="create_agent">
                            <span style={{color:'black'}}>{t('find_agent')}</span>
                            <button onClick={() =>setPage(9)} className='btn_create_agent'>{loading? <Loading/> : 'Create New Agent'}</button>
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
                            <div className="create_group">  
                                <select 
                                    name="agent" 
                                    {...register("agent", { required: true })} 
                                    className='create_input'                                    
                                    >
                                    <option value="" style={{color:'black'}}>--{t('select_agent')}--</option>
                                    {agents && agents.filter(a => a.status==='Approved').map(agent => (
                                    <option value={agent.id} key={agent.id} style={{color:'black'}}>{agent?.coName || agent?.name}</option> 
                                ))}                                 
                                </select>                       
                                <span className='create_span_1'>{`${t('select_agent')}`}</span>
                            </div>                    
                        </div>  
                        {!agentId &&                     
                        <div className="create_agent">
                            <span>{t('find_agent')}</span>
                            <button onClick={()=>navigate('/contact')} className='btn_create_agent'>{t('contact_us')}</button>
                        </div>  }
                        <div className="cont_inputs">
                            <div className="create_group">  
                                <select 
                                    name="ibada" 
                                    {...register("ibada", { required: true })} 
                                    className='create_input'                                    
                                    >
                                    <option value="" style={{color:'black'}}>--{t('ibada_type')}--</option>
                                    <option value="Umrah" style={{color:'black'}}>--{t('umrah')}--</option>
                                    <option value="Hijjah" style={{color:'black'}}>--{t('hijjah')}--</option>
                                   
                                                               
                                </select>                       
                                <span className='create_span_1'>{`${t('ibada_type')}`}</span>
                            </div>                            
                          
                        </div>                    
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
                            <div className="create_group">  
                                <select 
                                    name="mPhone" 
                                    {...register("mPhone", { required: true })}
                                    className='create_input'                                    
                                    >
                                    <option value="" style={{color:'black'}}>--{t('select_position')}--</option>
                                    {mission && mission.map(m => (
                                    <option value={m.phone} key={m.id} style={{color: 'black'}}
                                    >{m.position}</option> 
                                    ))}                                 
                                </select>                       
                                <span className='create_span_1'>{`${t('select_position')}`}</span>
                            </div>                                              
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
                    
                        <h4><BiArrowBack onClick={() => setPage(5)}/>{t('enter_code')} 0{fdig}_ _ _ _{ldig}</h4>
                            
                        <div className="cont_inputs"> 
                            <div className="create_group">                            
                                <input 
                                    type="number" 
                                    className="create_input" 
                                   
                                    name='code' 
                                    {...register("code", { required: true })}
                                    required/>
                                <span className='create_span_1'>{`${t('code')}`}</span>
                            </div>                             
                          
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
                        <div className="create_group">  
                                <select 
                                    name="mPhone" 
                                    {...register("mPhone", { required: true })}
                                    className='create_input'                                    
                                    >
                                    <option value="" style={{color:'black'}}>--{t('select_position')}--</option>
                                    {admins && admins.map(m => (
                                    <option value={m.phone} key={m.id} style={{color: 'black'}}
                                    >{m.position}</option> 
                                    ))}                                 
                                </select>                       
                                <span className='create_span_1'>{`${t('select_position')}`}</span>
                            </div> 
                          
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
                    
                        <h4><BiArrowBack onClick={() => setPage(6)}/>{t('enter_code')} 0{fdig}_ _ _ _{ldig}</h4>                          
                        <div className="cont_inputs">
                            <div className="create_group">                            
                                <input 
                                    type="number" 
                                    className="create_input" 
                                   
                                    name='code' 
                                    {...register("code", { required: true })}
                                    required/>
                                <span className='create_span_1'>{`${t('code')}`}</span>
                            </div>                            
                          
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
        }else if(page === 9){
            return (
                <div className="cont_register">
                    <motion.div 
                    initial={{ x: -100}}
                    animate={{x: 1}} 
                    transition={{ ease: "easeOut", duration: 0.5 }}
                    className='cont_motion'>                    
                        <h4><BiArrowBack onClick={() => setPage(3)}/>{t('create_agent')}</h4>                            
                            <div className="cont_radios">                          
                            <label htmlFor="yes" className='cont_label' onClick={() =>setPage(10)}><span>{t('yes_i_do')}</span></label>                         
                            <label htmlFor="no" className='cont_label' onClick={() =>setPage(3)}><span>{t('no')}</span></label>  
                        </div>                                       
                    </motion.div>
                
            </div>
            )
        }else if(page === 10){
            return (
                <div className="cont_register">
                    <motion.div 
                    initial={{ x: -100}}
                    animate={{x: 1}} 
                    transition={{ ease: "easeOut", duration: 0.5 }}
                    className='cont_motion'>                    
                        <h4><BiArrowBack onClick={() => setPage(9)}/>{t('are_you_owner')}</h4>
                            <div className="cont_radios">                            
                            <label htmlFor="yes1" className='cont_label' onClick={() =>setPage(11)}><span>{t('yes_I_am')}</span></label>                            
                            <label htmlFor="no1" className='cont_label' onClick={() =>setPage(3)}><span>{t('no')}</span></label>  
                        </div>                                          
                       
                    </motion.div>
                
            </div>
            )
        }else if(page === 11){
            return (
                <div className="cont_register">
                    <motion.div 
                    initial={{ x: -100}}
                    animate={{x: 1}} 
                    transition={{ ease: "easeOut", duration: 0.5 }}
                    className='cont_motion'>                    
                        <h4><BiArrowBack onClick={() => setPage(10)}/>{t('registered_with_Mission')}</h4>
                            <div className="cont_radios">                          
                                <label htmlFor="yes1" className='cont_label' onClick={() =>setPage(12)}><span>{t('have_license')}</span></label>                          
                                <label htmlFor="no1" className='cont_label' onClick={() =>setPage(3)}><span>{t('no')}</span></label>  
                            </div>                                         
                       
                    </motion.div>
                
            </div>
            )
        }else if(page === 12){
            return (
                <div className="cont_register">
                    <motion.div 
                    initial={{ x: -100}}
                    animate={{x: 1}} 
                    transition={{ ease: "easeOut", duration: 0.5 }}
                    className='cont_motion'>                    
                        <h4><BiArrowBack onClick={() => setPage(11)}/>{t('general_info')}</h4>
                        <div className="cont_inputs"> 
                            <div className="create_group">                            
                                <input 
                                    type="text" 
                                    className="create_input" 
                                    name='coName' 
                                    {...register("coName", { required: true })}
                                    required/>
                                <span className='create_span_1'>Agent Name</span>
                            </div>                            
                     
                        </div>   
                        <div className="cont_inputs"> 
                            <div className="create_group">                            
                                <input 
                                    type="text" 
                                    className="create_input" 
                                    name='coEmail' 
                                    {...register("coEmail", { required: true })}
                                    required/>
                                <span className='create_span_1'>Company Email</span>
                            </div>                            
                      
                            <div className="create_group">                            
                                <input 
                                    type="text" 
                                    className="create_input" 
                                    name='coPhone' 
                                    {...register("coPhone", { required: true })}
                                    required/>
                                <span className='create_span_1'>Agent Phone</span>
                            </div> 
                       
                        </div>   
                        <div className="cont_inputs">  
                            <div className="create_group">                            
                                <input 
                                    type="text" 
                                    className="create_input" 
                                    name='website' 
                                    {...register("website")}
                                    required/>
                                <span className='create_span_1'>Agent Website if Any</span>
                            </div> 
                            <div className="create_group">                            
                                <input 
                                    type="text" 
                                    className="create_input" 
                                    name='coLicence' 
                                    {...register("coLicence", { required: true })}
                                    required/>
                                <span className='create_span_1'>Agent License</span>
                            </div>                           
                        
                        </div>                                      
                        <button 
                            className='btn_submit' 
                            onClick={() => setPage(13)} 
                            disabled={!isValid}
                            >{t('continue')}<BiRightArrowAlt/>
                        </button>
                    </motion.div>
                
            </div>
            )
        }else if(page === 13){
            return (
                <div className="cont_register">
                    <motion.div 
                    initial={{ x: -100}}
                    animate={{x: 1}} 
                    transition={{ ease: "easeOut", duration: 0.5 }}
                    className='cont_motion'>                    
                        <h4><BiArrowBack onClick={() => setPage(11)}/>Agent Offices</h4>
                          
                        <AgentOffices offices={offices} setOffices={setOffices}/>                                    
                        <button 
                            className='btn_submit' 
                            onClick={() => setPage(14)} 
                            disabled={!isValid}
                            >{t('continue')}<BiRightArrowAlt/>
                        </button>
                    </motion.div>
                
            </div>
            )
        }else if(page === 14){
            return (
                <div className="cont_register">
                    <motion.div 
                    initial={{ x: -100}}
                    animate={{x: 1}} 
                    transition={{ ease: "easeOut", duration: 0.5 }}
                    className='cont_motion'>                    
                        <h4><BiArrowBack onClick={() => setPage(13)}/>Agent Services</h4>
                          
                        <AgentServices setServices={setServices}/>                                   
                        <button 
                            className='btn_submit' 
                            onClick={() => setPage(15)} 
                            disabled={!isValid}
                            >{t('continue')}<BiRightArrowAlt/>
                        </button>
                    </motion.div>
                
            </div>
            )
        }else if(page === 15){
            return (
                <div className="cont_register">
                    <motion.div 
                    initial={{ x: -100}}
                    animate={{x: 1}} 
                    transition={{ ease: "easeOut", duration: 0.5 }}
                    className='cont_motion'>                    
                        <h4><BiArrowBack onClick={() => setPage(14)}/>Agent Package Cost</h4>                          
                        <div className="create_group">                            
                            <input 
                                type="text" 
                                className="create_input" 
                                name='cost'
                                {...register("cost", { required: true })}
                            />
                            <span className='create_span_1'>Hijja Cost in USD</span>
                        </div>                                
                        <button 
                            className='btn_submit' 
                            onClick={() => setPage(16)} 
                            disabled={!isValid}
                            >{t('continue')}<BiRightArrowAlt/>
                        </button>
                    </motion.div>
                
            </div>
            )
        }else if(page === 16){
            return (
                <div className="cont_register">
                    <motion.div 
                    initial={{ x: -100}}
                    animate={{x: 1}} 
                    transition={{ ease: "easeOut", duration: 0.5 }}
                    className='cont_motion'>                    
                        <h4><BiArrowBack onClick={() => setPage(15)}/>Agent Logo</h4>                          
                          <AgentLogo file={file} setFile={setFile} url={url} perc={perc}/>                            
                        <button 
                            className='btn_submit' 
                            onClick={() => setPage(17)} 
                            disabled={!isValid}
                            >{t('continue')}<BiRightArrowAlt/>
                        </button>
                    </motion.div>
                
            </div>
            )
        }else if(page === 17){
            return (
                <div className="cont_register">
                    <motion.div 
                    initial={{ x: -100}}
                    animate={{x: 1}} 
                    transition={{ ease: "easeOut", duration: 0.5 }}
                    className='cont_motion'>                    
                        <h4><BiArrowBack onClick={() => setPage(16)}/>Briefly About your Agent</h4>                          
                        <div className="create_group">                            
                            <textarea 
                                type="text" 
                                className="create_input textarea_input" 
                                name='desc'
                                {...register("desc", { required: true })}
                                required></textarea>
                            <span className='create_span_1'>Briefly about Agent</span>
                        </div>                          
                        <button 
                            className='btn_submit' 
                            onClick={handleCreate} 
                            disabled={!isValid}
                            >{loading? <Loading/> : 'CREATE AGENT'}<BiRightArrowAlt/>
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
