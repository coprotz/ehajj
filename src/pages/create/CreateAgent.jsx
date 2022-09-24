import React from 'react'
import { db, useAuth } from '../../hooks/useAuth'
import useData from '../../hooks/useData'
import './create.css'
import logo from '../../components/images/ehajj.png'
import { useState } from 'react'
import { motion } from 'framer-motion';
import { regions, services } from '../../hooks/data'
import { FaPlus, FaMinus, FaTimes } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import { BiChevronsLeft } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { useRef } from 'react'
import { useEffect } from 'react'
import useStorage from '../../hooks/useStorage'
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
 
const CreateAgent = () => {
    const { user, logOut } = useAuth()
    const { users } = useData()
    const navigate = useNavigate()
    const cuUser = users && users.find(u => u.id === user.uid)
    const [createPage, setCreatePage] = useState(null)
    const { register,  watch, formState: { isValid } } = useForm({mode: 'all'});

    const a_services = watch('services')

    const [file, setFile] = useState(null)

    const { perc, url } = useStorage(file)
    const [offices, setOffices] = useState([
        {street: '', building: '', district: '', region: ''}
    ])

    const [region, setRegion] = useState('')
    const [districts, setDistricts] = useState([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [website, setWebsite] = useState('')
    const [cost, setCost] = useState('')
    const [desc, setDesc] = useState('')
    const [sending, setSending] = useState(null)

    // const reg = useRef();
    // const title = document.getElementById(`${item.id}`).value

    

    // console.log('reg', reg)

    // const dist = regions.find(r =>r.name === region)

    const handleChange = (index, event) => {
        const values = [...offices];
        values[index][event.target.name] = event.target.value;
        setOffices(values)
        setRegion(values[index].region)
        
        // console.log('index',index)
        
        
    }

   
    // console.log('districts',districts)

    const handleAdd = (e) => {
        e.preventDefault()
        setOffices([...offices, {street: '', building: '', district: '', region: ''}])
    }

    const handleRemove = (e,index) => {
        e.preventDefault();
        const values = [...offices]
        values.splice(index, 1);
        setOffices(values)
    }

    useEffect(() => {
        const dists = regions.find(r=>r.name === region)?.districts
        setDistricts(dists)
    },[region])
   
    // console.log('services', a_services)

    
    const [error, setError] = useState('')

    const types = ['image/png', 'image/jpeg']

    const selectedFile = (e) => {
    let selected = e.target.files[0]


    if (selected && types.includes(selected.type)){
        setFile(selected)
        setError('')
    }else {
        setFile(null);
        setError('Please select image file (jpg or png)')
    }
    }

     const agentRef = collection(db, 'agents')
    //  const userRef = collection(db, 'users')

     const userRef = doc(db, 'users', `${user.uid}`)


    const handleCreate = async (e) => {
        e.preventDefault()
        setSending(true)

        const data = {
            name,
            phone,            
            isApproved: false,
            email,
            status:'Not Approved',
            website,
            services: a_services,
            offices,
            logo: url,
            users: [],
            pilgrims: [],
            desc,
            cost,
            isPaid: false,            
            createdBy: cuUser.id,
            createdAt: serverTimestamp(),
        }

        try {
            const newAgent = await addDoc(agentRef, data)
            await updateDoc(userRef, {
                agentId : newAgent.id
            })
            setSending(false) 
            console.log('newagent', newAgent.id)
            navigate('/account/main')
        } catch (error) {
            console.log(error.message)
        }



        // console.log('data', data)
    }

  return (
    <div className="create_container">   
        <div className={createPage? 'page_create_agent': 'create_wrapper'}>
            <div className="create_logo">
                <img src={logo} alt="" />
            </div>
            <div className="create_welcome">
            <h1 className='create_title'>Welcome {cuUser?.fname} {cuUser?.lname} to the Agent Creation Page</h1> 
            <div className={createPage? 'page_none': "create_features"}>
                <div className="create_grop">
                    <span className='create_span'>1</span>
                    <h3>You must be the Owner of the Agent or an Authorised Officer</h3>
                </div>
                <div className="create_grop">
                    <span className='create_span'>2</span>
                    <h3>Your Agent must acquire valid licence with Tanzania Hajj Mission</h3>
                </div>
                <div className="create_grop">
                    <span className='create_span'>3</span>
                    <h3 className='create_body'>To make you account active you will be required to pay the Agent creation fee of $150, so make sure you have a valid payment card of Mastercard or Visa</h3>
                </div>
            </div>          
            <div className={createPage? 'page_none': "create_actions"}>
                <button className='btn_proceed' onClick={() => setCreatePage(!createPage)}>Proceed</button>
                <button className='btn_cancel' onClick={() =>logOut()}>CANCEL</button>
            </div>
            </div>
            <div className="create_footer">
                <span>Help</span>
                <span>Terms</span>
                <span>Privacy</span>
            </div>
            

        </div>
        <div 
            className={createPage?"create_page" :'page_none'}>
                <motion.div 
                    initial={{ x: '100vw'}}
                    animate={{x:0}} 
                    transition={{ ease: "easeOut", duration: 0.5 }}
                    className="create_inner">
                        <div className="create_top">
                            <div className="page_back">
                                <button className='btn_btn_back' onClick={() =>setCreatePage(null)}><BiChevronsLeft/></button> Create Agent
                            </div>
                        </div>
                    
                    <form action="" className="create_form">                        
                        <div className="create_group">                            
                            <input 
                                type="text" 
                                className="create_input" 
                                name='name'
                                onChange={e => setName(e.target.value)}
                                required/>
                            <span className='create_span_1'>Agent Name</span>
                        </div>                     
                         <div className="form_inputs_wrapper">
                            <div className="create_group">                            
                                <input 
                                    type="text" 
                                    className="create_input" 
                                    name='email'
                                    onChange={e => setEmail(e.target.value)}
                                    required/>
                                <span className='create_span_1'>Agent Email</span>
                            </div>
                            <div className="create_group">                            
                                <input 
                                    type="text" 
                                    className="create_input"
                                    name='phone'
                                    onChange={e => setPhone(e.target.value)} 
                                    required/>
                                <span className='create_span_1'>Agent Mobile no.</span>
                            </div>
                            <div className="create_group">                            
                                <input 
                                    type="text" 
                                    className="create_input" 
                                    name='website'
                                    onChange={e => setWebsite(e.target.value)}
                                    required/>
                                <span className='create_span_1'>Agent Website</span>
                            </div>
                        </div>
                        {/* <div className="subscript_fee">
                            <div className="fee_details">
                                <small>Subscription Fee</small>
                                <h1>$ 150</h1>
                            </div>
                            <button className='btn_pay'>Pay Now</button>
                        </div> */}
                        <div className="aggent_offices">
                           <h4>AGENT OFFICES</h4> 
                           <button className='btn_add' onClick={handleAdd}><FaPlus/></button>
                        </div>
                        
                         {offices?.map((item, index) => (
          
                        <div className="form_inputs_wrapper">
                            <div style={{width: '100%'}} >
                                <div className="create_group" style={{marginBottom:'10px'}}>                            
                                    <select 
                                        type="text" 
                                        className="create_input" 
                                        value={item.name}                                    
                                        onChange={(event) =>handleChange(index, event)}
                                        name='region'
                                        // {...register("region", { required: true })}
                                        >
                                        <option value='' style={{color: 'black'}}>SELECT REGION</option>
                                        {regions.map(item => (
                                            <option 
                                                value={item.name} 
                                                key={item.id} 
                                                style={{color: 'black'}} 
                                                // id={item.id}
                                                // ref={reg}
                                                >{item.name}
                                            </option>
                                        ))}
                                        
                                    </select>
                                    <span className='create_span_1'>Region</span>
                                </div>
                                <div className="create_group" > 
                                    <select 
                                        type="text" 
                                        className="create_input" 
                                        value={item.district}                                    
                                        onChange={(event) =>handleChange(index, event)}
                                        name='district'
                                        required>
                                            {/* <option value='' style={{color: 'black'}}>SELECT</option> */}
                                        {districts?.map((district, index) => (
                                            <option 
                                                value={district} 
                                                key={index} 
                                                style={{color: 'black'}}
                                                >{district}
                                            </option>
                                        ))}
                                        
                                    </select>                        
                                    <span className='create_span_1'>District</span>
                                </div>
                            </div>
                            <div style={{width: '100%'}}>
                                <div className="create_group" style={{marginBottom:'10px'}}>                            
                                    <input 
                                    type="text" 
                                    className="create_input"
                                    value={item.street}
                                    name='street'
                                    onChange={(event) =>handleChange(index, event)} 
                                    required/>
                                    <span className='create_span_1'>Street</span>
                                </div>
                                <div className="create_group">                            
                                    <input 
                                        type="text" 
                                        className="create_input" 
                                        value={item.building}
                                        name='building'
                                        onChange={(event) =>handleChange(index, event)}
                                        required/>
                                    <span className='create_span_1'>Building</span>
                                </div> 
                            </div>                        
                            <button className='btn_add' onClick={handleRemove}><FaMinus/></button>
                        </div> 
                        ))}
                        <div className="aggent_offices">
                           <h4>AGENT SERVICES (You may Select Many)</h4>                           
                        </div>
                        <div className="agent_services"  >
                            {services && services.map((item, index) => (
                                <div className="service_choice" key={index}  >
                                    <input 
                                        type="checkbox" 
                                        id={index} 
                                        value={item}
                                        name='services'  
                                        {...register("services", { required: true })}/>
                                    <label htmlFor={index}>{item}</label>
                                </div>
                            ))}
                        </div>
                        <div className="create_group">                            
                            <input 
                                type="text" 
                                className="create_input" 
                                name='cost'
                                onChange={e => setCost(e.target.value)}
                                required/>
                            <span className='create_span_1'>Hijja Cost in USD</span>
                        </div>
                        <div className="logo_agent">
                            {error && <small className='error'>{error}</small>}
                            {file && (
                            <div className="shareImgContainer">
                                <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
                                <div className="progress-bar"  style={{width: perc + '%'}}></div>
                                <button className="btn_file" onClick={() => setFile(null)}><FaTimes/></button>
                            </div>
                            )}
                            
                            <label htmlFor="file">
                                <span>Attach Agent Logo</span>
                                <input 
                                    type="file" 
                                    name='file'
                                    style={{display:'none'}}
                                    onChange={selectedFile}
                                    id='file'/>
                            </label>
                        </div>
                        {/* <div className="create_group">                            
                            <input type="text" className="create_input" required/>
                            <span className='create_span_1'>AGENT LOGO</span>
                        </div> */}
                        <div className="create_group">                            
                            <textarea 
                                type="text" 
                                className="create_input textarea_input" 
                                name='desc'
                                onChange={e => setDesc(e.target.value)}
                                required></textarea>
                            <span className='create_span_1'>Briefly about Agent</span>
                        </div>                        
                        <button 
                            className='btn_creates'
                            onClick={handleCreate}
                            disabled={name==='' && email==='' && phone==='' && file===''}
                            >{sending? 'Creating': 'CREATE AGENT'}</button>
                        
                    </form>
                   
                </motion.div>
                
        </div>
    </div>
  )
}

export default CreateAgent
