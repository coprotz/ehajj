import React from 'react'
import { useState } from 'react';
import { BiRightArrowAlt, BiArrowBack } from "react-icons/bi";
import { useForm } from "react-hook-form";
import useData from '../../hooks/useData';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { signInWithPopup } from 'firebase/auth';
import SignupAdmin from './SignupAdmin';
import { doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db, useAuth } from '../../hooks/useAuth';
import Loading from '../../components/loading/Loading';



const AdminDeg = () => {

    const { t } = useTranslation();

    const { signUp } = useAuth()

    const { register,  watch, formState: { isValid } } = useForm({mode: 'all'});


    const { mission, admins } = useData();

    const typeOf = watch('typeOf')
    const mPhone = watch('mPhone')

    const navigate = useNavigate()
    const [err, setErr] = useState('')
    const [loading, setLoading] = useState(null)



    const fdig = mPhone?.slice(4,7)
    const ldig = mPhone?.slice(10,13)


    const [page, setPage] = useState(1)

    const RenderButton = () => {
        if(typeOf === 'mission'){
            return (
                <button 
                    className='btn_submit' 
                    type='button' 
                    onClick={() => setPage(2)} 
                    disabled={!isValid}>{t('continue')}<BiRightArrowAlt/>
                    </button>
            )
        }else if(typeOf === 'admin'){
            return (
                <button 
                    className='btn_submit' 
                    type='button' 
                    onClick={() => setPage(3)} 
                    disabled={!isValid}>{t('continue')}<BiRightArrowAlt/>
                    </button>
            )
        }
   
    }

    const password = watch('password')

    const isMission = mission?.find(m => m.phone === mPhone)
    const isAdmin = admins?.find(a => a.phone=== mPhone)

    const email = isAdmin?.email
    const id = isAdmin?.id

    console.log('admin', email, id)



    const handleAdmin = async(e) => {
        e.preventDefault()

        setLoading(true)

        // const email = isAdmin?.email
        // const id = isAdmin?.id
      
        try {
            const newUser = await signUp(email, password)
            await updateDoc(doc(db, 'admins', `${id}`), {
                userId: newUser?.user.uid,
                createdAt: serverTimestamp()
            })
            navigate('/account/main')

            console.log('admin', email, id)
            
        } catch (error) {
            setErr(error.message)
        }
        setLoading(false)


    }

    const handleMission = async(e) => {
        e.preventDefault()

        setLoading(true)

        const email = isMission?.email
        const id = isMission?.id
      
        try {
            const newUser = await signUp(email, password)
            await updateDoc(doc(db, 'mission', `${id}`), {
                userId: newUser?.user.uid,
                createdAt: serverTimestamp()
            })
            navigate('/account/main')
            
        } catch (error) {
            setErr(error.message)
        }
        setLoading(false)


    }

    const RenderPage = () => {
       if(page === 1){
            return (               
                <div className="cont_register"> 
                 <motion.div 
                    initial={{ x: '-100vw'}}
                    animate={{x: 1}} 
                    transition={{ ease: "easeOut", duration: 0.5 }}
                    className='cont_motion'>                  
                    <h4><BiArrowBack onClick={() =>navigate('/register')}/>{t('select_role')}</h4>
                        <div className="cont_radios">                            
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
          
        }else if(page === 2){
            return (
                <div className="cont_register">
                    <motion.div 
                    initial={{ x: -100}}
                    animate={{x: 1}} 
                    transition={{ ease: "easeOut", duration: 0.5 }}
                    className='cont_motion'>
                    
                        <h4><BiArrowBack onClick={() => setPage(1)}/>{t('select_position')}</h4>
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
                            onClick={() => setPage(4)} 
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
                    
                        <h4><BiArrowBack onClick={() => setPage(2)}/>Welcome {isMission?.fname+" "+isMission?.lname}</h4>
                        <h3 className='page_admin_1'>{t('enter_code')} 0{fdig}_ _ _ _{ldig}</h3>
                        <div className="cont_inputs"> 
                            <div className="create_group admin_reg">                            
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
                            onClick={() => alert('Sorry the code is invalid or expired')} 
                            disabled={!isValid}
                            >{t('continue')}<BiRightArrowAlt/>
                        </button>
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
                            onClick={() => setPage(5)} 
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
                        <h4><BiArrowBack onClick={() => setPage(3)}/>Welcome {isAdmin?.fname+" "+isAdmin?.lname}</h4>
                        <h3 className='page_admin_1'>{t('enter_code')} 0{fdig}_ _ _ _{ldig}</h3>                                                
                        <div className="cont_inputs">
                            <div className="create_group admin_reg">                            
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
                            onClick={() => alert('Sorry the code is invalid or expired')}  
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
                        <h4><BiArrowBack onClick={() => setPage(4)}/>Welcome {isMission?.fname+" "+isMission?.lname}</h4>
                        <h3 className='page_admin_1'>{t('use_email')} - {isMission?.email}</h3>                                                
                        <div className="cont_inputs">
                            <div className="create_group admin_reg">                            
                                <input 
                                    type="password" 
                                    className="create_input" 
                                   
                                    name='password' 
                                    {...register("password", { required: true })}
                                    required/>
                                <span className='create_span_1'>{`${t('password')}`}</span>
                            </div>                            
                          
                        </div>                                         
                        <button 
                            className='btn_submit' 
                            onClick={handleMission} 
                            disabled={!isValid}
                            >{loading? <Loading/> : t('continue')}<BiRightArrowAlt/>
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
                        <h4><BiArrowBack onClick={() => setPage(5)}/>Welcome {isAdmin?.fname+" "+isAdmin?.lname}</h4>
                        <h3 className='page_admin_1'>{t('use_email')} - {isAdmin?.email}</h3>                                                
                        <div className="cont_inputs">
                            <div className="create_group admin_reg">                            
                                <input 
                                    type="password" 
                                    className="create_input" 
                                   
                                    name='password' 
                                    {...register("password", { required: true })}
                                    required/>
                                <span className='create_span_1'>{`${t('password')}`}</span>
                            </div>                            
                          
                        </div>                                         
                        <button 
                            className='btn_submit' 
                            onClick={handleAdmin} 
                            disabled={!isValid}
                            >{loading? <Loading/> : t('continue')}<BiRightArrowAlt/>
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
export default AdminDeg
