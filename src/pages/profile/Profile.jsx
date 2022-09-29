import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useData from '../../hooks/useData'
import { BiArrowBack} from "react-icons/bi";
import { BsCamera, BsPencil, BsPlusLg} from "react-icons/bs";
import './profile.css'
import NewChat from '../account/message/NewChat';
import ChangeStatus from '../../components/changeStatus/ChangeStatus';
import { useState } from 'react';
import useStorage from '../../hooks/useStorage';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../hooks/useAuth';
import { update } from 'firebase/database';
import Loading from '../../components/loading/Loading';
import { useEffect } from 'react';


const Profile = () => {

    const { id } = useParams()
    const { pilgrims, agents } = useData()
    const pilgrim = pilgrims?.find(p => p.id === id)
    const agent = agents?.find(a => a.id === id)
    const myAgent = agents?.find(a => a.id === pilgrim?.agentId)
    const navigate = useNavigate()

    const [file, setFile] = useState(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { perc, url } = useStorage(file)

    const types = ['image/png', 'image/jpeg']

    const handleSelect = (e) => {
        let selected = e.target.files[0];  
        if (selected && types.includes(selected.type)){
            setFile(selected)
            setError('')
        }else {
            setFile(null)
            setError('Please select an image file (png or jpeg)')
        }
    }

    const today = new Date()
    // const age = today.getFullYear() - pilgrim?.dob?.getFullYear()

    // console.log('age', age)

    const [change, setChange] = useState(null)

    const pilgrimRef = doc(db, 'pilgrims', `${pilgrim?.id}`)
    const invoiceRef = doc(db, 'invoices', `${pilgrim?.invoiceId}`)

    const handlePhoto = async (e) => {
        e.preventDefault()

        setLoading(true)

        try {
            await updateDoc(pilgrimRef, {
            photo: url
        })
        setFile(null)

        } catch (error) {
            setError(error.message)
        }
        setLoading(false)

       
    }

    const handlePassport = async (e) => {
        e.preventDefault()

        setLoading(true)

        try {
            await updateDoc(pilgrimRef, {
            passport: url
        })
        setFile(null)

        } catch (error) {
            setError(error.message)
        }
        setLoading(false)

       
    }

    const [passNo, setPassNo] = useState(pilgrim?.passNo)
    const [passIssue, setPassIssue] = useState(pilgrim?.passIssue)
    const [passExpire, setPassExpire] = useState(pilgrim?.passExpire)
    const [passPlace, setPassPlace] = useState(pilgrim?.passPlace)


  



    const handlePassDetails = async (e) => {
        e.preventDefault()

        setLoading(true)

        try {
            await updateDoc(pilgrimRef, {
            passNo,
            passIssue,
            passExpire,
            passPlace
        })
        setChange(null)

        } catch (error) {
            setError(error.message)
        }
        setLoading(false)

       
    }

    const [mPassNo, setMPassNo] = useState(pilgrim?.mPassNo)
    const [mPassIssue, setMPassIssue] = useState(pilgrim?.mPassIssue)
    const [mPassExpire, setMPassExpire] = useState(pilgrim?.mPassExpire)
    const [mPassPlace, setMPassPlace] = useState(pilgrim?.mPassPlace)



    const handleMPassDetails = async (e) => {
        e.preventDefault()

        setLoading(true)

        try {
            await updateDoc(pilgrimRef, {
                mPassNo,
                mPassIssue,
                mPassExpire,
                mPassPlace
        })
        setChange(null)

        } catch (error) {
            setError(error.message)
        }
        setLoading(false)

       
    }

    const handleMPass = async (e) => {
        e.preventDefault()

        setLoading(true)

        try {
            await updateDoc(pilgrimRef, {
            mPass: url
        })
        setFile(null)

        } catch (error) {
            setError(error.message)
        }
        setLoading(false)

       
    }

    const [mName, setMName] = useState(pilgrim?.mName)
    const [mGender, setMGender] = useState(pilgrim?.mGender)
    const [mAge, setMAge] = useState(pilgrim?.mAge)
    const [mPhone, setMPhone] = useState(pilgrim?.mPhone)
    const [mEmail, setMEmail] = useState(pilgrim?.mEmail)
    const [mRel, setMRel] = useState(pilgrim?.mRel)

    const handleMahrem = async (e) => {
        e.preventDefault()

        setLoading(true)

        try {
            await updateDoc(pilgrimRef, {
                mName,
                mGender,
                mAge,
                mPhone,
                mEmail,
                mRel

        })
        setChange(null)

        } catch (error) {
            setError(error.message)
        }
        setLoading(false)

       
    }


    const [kinName, setKinName] = useState(pilgrim?.kinName)
    const [kinGender, setKinGender] = useState(pilgrim?.kinGender)
    const [kinAge, setKinAge] = useState(pilgrim?.kinAge)
    const [kinPhone, setKinPhone] = useState(pilgrim?.kinPhone)
    const [kinEmail, setKinEmail] = useState(pilgrim?.kinEmail)
    const [kinRel, setKinRel] = useState(pilgrim?.kinRel)

    const handleKin = async (e) => {
        e.preventDefault()

        setLoading(true)

        try {
            await updateDoc(pilgrimRef, {
                kinName,
                kinGender,
                kinAge,
                kinPhone,
                kinEmail,
                kinRel

        })
        setChange(null)

        } catch (error) {
            setError(error.message)
        }
        setLoading(false)

       
    }

    const [payMode, setPayMode] = useState(pilgrim?.payMode)
    const [dueDate, setDueDate] = useState(pilgrim?.dueDate)

    const handlePayment = async (e) => {
        e.preventDefault()

        setLoading(true)

        try {
            await updateDoc(pilgrimRef, {
                payMode,
                dueDate,      

        })

        await updateDoc(invoiceRef, {
            payMode,
            dueDate,
            amount: myAgent?.cost
        })
        setChange(null)

        } catch (error) {
            setError(error.message)
        }
        setLoading(false)

       
    }

    // useEffect(() => {
    //     // setDueDate(pilgrim?.dueDate || '')
    //     // setPayMode(pilgrim?.payMode)
    //     setKinName()
    //     setKinGender()
    //     setKinAge()
    //     setKinPhone()
    //     setKinEmail()
    //     setKinRel()
    //     // setMName('' || )
    //     setMGender()
    //     setMAge()
    //     setMPhone()
    //     setMEmail()
    //     setMRel()
    //     setMPassNo(pilgrim?.mPassNo)
    //     setMPassIssue(pilgrim?.mPassIssue)
    //     setMPassExpire(pilgrim?.mPassExpire)
    //     setMPassPlace(pilgrim?.mPassPlace)
    // })
    
    

    

  return (
    <div className='profile'>
        <div className="profile_wrapper">
            <div className="profile_inner">        
                <div className="profile_top">
                    <h3 className='profile_head'><BiArrowBack onClick={() =>navigate(-1)}/>Profile</h3>  
                    <div className="app_status">
                        <small>Applicaion Status</small>
                        <h2>{pilgrim?.status}</h2>
                    </div>           
                </div>
                <div className="profile_header">
                    <div className="profile_logo">
                    { file?                         
                        <img src={URL.createObjectURL(file)} alt="" />                                                 
                        :
                        pilgrim? pilgrim?.photo? <img src={pilgrim?.photo} alt="" /> : <span>{pilgrim?.fname[0]}</span> :
                        agent?  <img src={agent?.logo} alt="" />  
                        // cuMission? <h4 className='mission_logo'>{cuMission?.name[0]}</h4> : 
                        // isAdmin? <h4 className='mission_logo'>{isAdmin?.name[0]}</h4>:
                    : null}
                    {!file &&
                        <label htmlFor="photo" className='profile_photo'>
                            <input 
                                type="file" 
                                name='photo' 
                                id="photo" style={{display: 'none'}}
                                onChange={handleSelect}
                            />
                        <span className='attached_photo'><BsCamera/></span>
                        </label>}
                    </div>                  
                    {error && <span className='error error_profile'>{error}<button onClick={() =>setError('')} className='btn_error'>x</button></span>}                                     
                    {file && <>                                       
                    <div className="progress-bar"  style={{width: perc + '%'}}></div>  
                    <div className="profile_photo_edit">
                        <button className='btn_save_btn' onClick={handlePhoto} disabled={perc < '100'}>{loading? <Loading/>: 'Save Changes'}</button>
                        <button className='btn_cancel' onClick={() =>setFile(null)}>CANCEL</button>
                    </div>
                    </>
                    
                    }
                    
                    <h2>{
                    agent? agent?.name || agent?.coName : 
                    pilgrim? pilgrim?.fname+" "+pilgrim?.lname :
                    //   cuMission? cuMission?.name : 
                    //   isAdmin? isAdmin?.name : 
                    null}</h2>
                   
                  
                </div>
                <div className="profile_personal">
                    <span className='profile_span'>
                        <small>Gender</small>
                        <h4>{pilgrim?.gender}</h4>
                    </span>
                    <span className='profile_span'>
                        <small>Age</small>
                        <h4>25</h4>
                    </span>
                    <span className='profile_span'>
                        <small>Marital Status</small>
                        <h4>{pilgrim?.marrital}</h4>
                    </span>
                    <span className='profile_span'>
                        <small>Phone</small>
                        <h4>{pilgrim?.phone}</h4>
                    </span>
                    <span className='profile_span'>
                        <small>Email</small>
                        <h4>{pilgrim?.email}</h4>
                    </span>
                    <span className='profile_span '>
                        <NewChat/>
                    </span>
                    <span className='profile_span '>
                        <ChangeStatus/>
                    </span>
                </div>
            </div>
            <div className="profile_agent">
                <div className="p_agent_left">
                    <small>Agent Name</small>
                    <div className="profile_agent_name">
                        <h1>{myAgent?.name || myAgent?.coName}</h1>
                        <NewChat/>
                    </div>
                    <div className='ibada_type'>Umrah</div>
                    
                </div>
                <button className='btn_profile'>Change Agent</button> 
                
                
            </div>
            <div className="profile_passport">
                
                <div className="p_passport_left">                 
                    <div className="profile_card_title">
                        <h4>Passport Details</h4>
                        <button className='btn_edit' onClick={() =>setChange(1)}><BsPencil/></button>
                        {change === 1 && <>                      
                            <button className='btn_save_btn' onClick={handlePassDetails}>{loading? <Loading/> : 'Save Changes'}</button>
                            <button className='btn_cancel' onClick={() =>setChange(null)}>CANCEL</button>
                         </>}
                    </div>
                    
                    <div className='pass_group'>
                        <span>Passport #</span>
                        {change === 1? 
                            <input 
                                type='text' 
                                className='pass_input'
                                name='passNo'
                                value={passNo || ''}                            
                                onChange={(e) =>setPassNo(e.target.value)}
                                /> :
                        <h4>{pilgrim?.passNo? pilgrim?.passNo : 'No data' }</h4>}
                    </div>
                    <div className='pass_group'>
                        <span>Date of Issue</span>
                        {change === 1? 
                            <input 
                                type='date' 
                                name='passIssue'
                                value={passIssue || ''}
                                className='pass_input'
                                onChange={(e) =>setPassIssue(e.target.value)}
                                /> :
                        <h4>{pilgrim?.passIssue? pilgrim?.passIssue : 'No data' }</h4>}
                    </div>
                    <div className='pass_group'>
                        <span>Expiring Date</span>
                        {change === 1? 
                            <input type='date' 
                            className='pass_input'
                            name='passExpire'
                            value={passExpire || ''}                            
                            onChange={(e) =>setPassExpire(e.target.value)}
                            /> :
                        <h4>{pilgrim?.passExpire? pilgrim?.passExpire : 'No data' }</h4>}
                    </div>
                    <div className='pass_group'>
                        <span>Place of Issue</span>
                        {change === 1? 
                            <input 
                            type='text' 
                            className='pass_input'
                            name='passPlace'
                            value={passPlace || ''}                            
                            onChange={(e) =>setPassPlace(e.target.value)}
                            /> :
                        <h4>{pilgrim?.passPlace? pilgrim?.passPlace : 'No data' }</h4>}
                    </div>
                </div>
                <div className="pass_copy_doc">
                    <div className="pass_card">
                    { file?                         
                        <img src={URL.createObjectURL(file)} alt="" />                                                 
                        :
                         pilgrim?.passport? <img src={pilgrim?.passport} alt="" /> 
                        
                        // cuMission? <h4 className='mission_logo'>{cuMission?.name[0]}</h4> : 
                        // isAdmin? <h4 className='mission_logo'>{isAdmin?.name[0]}</h4>:
                    : null}
                    {!file || !pilgrim?.passport &&
                        <label htmlFor="passport" className='profile_photo'>
                            <input 
                                type="file" 
                                name='passport' 
                                id="passport" style={{display: 'none'}}
                                onChange={handleSelect}
                            />
                        <span className='attached_pass'><BsPlusLg/>Passport</span>
                        </label>
                        
                        }                      
                    </div>
                    <div className="pass_card_btns"> 
                     {error && <span className='error error_profile'>{error}<button onClick={() =>setError('')} className='btn_error'>x</button></span>}                      
                        <label htmlFor="passport" className='prof'>
                            <input 
                                type="file" 
                                name='passport' 
                                id="passport" style={{display: 'none'}}
                                onChange={handleSelect}
                            />
                        <span className='btn_edit_pass btn_change'>Change</span>
                        </label>
                        {!file && pilgrim?.passport &&
                        <button className='btn_edit_pass'>Download</button>}
                        {file && <>
                        <div className="progress-bar"  style={{width: perc + '%'}}></div> 
                        <div className='pay_btns_go'>
                            <button className='btn_edit_pass' onClick={handlePassport} disabled={perc < '100'}>{loading? <Loading/>: 'Save'}</button>
                            <button className='btn_edit_pass' onClick={() => setFile(null)}>Cancel</button>  
                        </div>
                                               
                         </>}
                    </div>
                     
                </div>
            </div>

            {pilgrim?.gender === 'Female' && <>
            
            
            <div className="profile_passport">
                
                <div className="next_kin_detail">
                   
                    <div className="profile_card_title">
                        <h4>Pilgrim's Mahrem Info</h4>
                        <button className='btn_edit' onClick={() =>setChange(2)}><BsPencil/></button>
                        {change === 2 && <> 
                            <button className='btn_save_btn' onClick={handleMahrem}>{loading? <Loading/> : 'Save Changes'}</button>
                            <button className='btn_cancel' onClick={() =>setChange(null)}>CANCEL</button>
                        </>}
                    </div>
                     
                    <div className="next_details_wrapper">
                        <div className='pass_group'>
                            <span>Name</span>                           
                            {change === 2? 
                                <input 
                                type='text' 
                                className='pass_input'
                                name='mName'
                                value={mName || ''}                            
                                onChange={(e) =>setMName(e.target.value)}
                                /> :
                            <h4>{pilgrim?.mName? pilgrim?.mName : 'No data' }</h4>}
                            
                        </div>
                        <div className='pass_group'>
                            <span>Gender</span>
                            {change === 2? 
                                <select                                
                                className='pass_input'
                                name='mGender'
                                value={mGender || ''}                            
                                onChange={(e) =>setMGender(e.target.value)}
                                >
                                   <option value="">Select</option>
                                   <option value="Male">Male</option>
                                   <option value="Female">Female</option> 
                                </select> :
                            <h4>{pilgrim?.mGender? pilgrim?.mGender : 'No data' }</h4>}
                        </div>
                        <div className='pass_group'>
                            <span>Age</span>
                            {change === 2? 
                                <input 
                                type='number' 
                                className='pass_input'
                                name='mAge'
                                value={mAge || ''}                            
                                onChange={(e) =>setMAge(e.target.value)}
                                /> :
                            <h4>{pilgrim?.mAge? pilgrim?.mAge : 'No data' }</h4>}
                        </div>
                        <div className='pass_group'>
                            <span>Phone</span>
                            {change === 2? 
                                <input 
                                type='tel' 
                                className='pass_input'
                                name='mPhone'
                                value={mPhone || ''}                            
                                onChange={(e) =>setMPhone(e.target.value)}
                                /> :
                            <h4>{pilgrim?.mPhone? pilgrim?.mPhone : 'No data' }</h4>}
                        </div> 
                        <div className='pass_group'>
                            <span>Email</span>
                            {change === 2? 
                                <input 
                                type='email' 
                                className='pass_input'
                                name='mEmail'
                                value={mEmail || ''}                            
                                onChange={(e) =>setMEmail(e.target.value)}
                                /> :
                            <h4>{pilgrim?.mEmail? pilgrim?.mEmail : 'No data' }</h4>}
                        </div>
                        <div className='pass_group'>
                            <span>Relation</span>
                            {change === 2? 
                                <select                                
                                className='pass_input'
                                name='mRel'
                                value={mRel || ''}                            
                                onChange={(e) =>setMRel(e.target.value)}
                                >
                                   <option value="">Select</option>
                                   <option value="Father">Father</option>
                                   <option value="Father">Father</option> 
                                   <option value="Brother">Brother</option> 
                                   <option value="Groundfather">Groundfather</option> 
                                </select> :
                            <h4>{pilgrim?.mRel? pilgrim?.mRel : 'No data' }</h4>}
                        </div> 
                    </div>
                </div>
               
            </div>
            <div className="profile_passport">
                
            <div className="p_passport_left">                 
                    <div className="profile_card_title">
                        <h4>Pilgrim Mahrem's Passport Details</h4>
                        <button className='btn_edit' onClick={() =>setChange(3)}><BsPencil/></button>
                        {change === 3 && <>                      
                            <button className='btn_save_btn' onClick={handleMPassDetails}>{loading? <Loading/> : 'Save Changes'}</button>
                            <button className='btn_cancel' onClick={() =>setChange(null)}>CANCEL</button>
                         </>}
                    </div>
                    
                    <div className='pass_group'>
                        <span>Passport #</span>
                        {change === 3? 
                            <input 
                                type='text' 
                                className='pass_input'
                                name='mPassNo'
                                value={mPassNo || ''}                            
                                onChange={(e) =>setMPassNo(e.target.value)}
                                /> :
                        <h4>{pilgrim?.mPassNo? pilgrim?.mPassNo : 'No data' }</h4>}
                    </div>
                    <div className='pass_group'>
                        <span>Date of Issue</span>
                        {change === 3? 
                            <input 
                                type='date' 
                                name='mPassIssue'
                                value={mPassIssue || ''}
                                className='pass_input'
                                onChange={(e) =>setMPassIssue(e.target.value)}
                                /> :
                        <h4>{pilgrim?.mPassIssue? pilgrim?.mPassIssue : 'No data' }</h4>}
                    </div>
                    <div className='pass_group'>
                        <span>Expiring Date</span>
                        {change === 3? 
                            <input type='date' 
                            className='pass_input'
                            name='mPassExpire'
                            value={mPassExpire || ''}                            
                            onChange={(e) =>setMPassExpire(e.target.value)}
                            /> :
                        <h4>{pilgrim?.mPassExpire? pilgrim?.mPassExpire : 'No data' }</h4>}
                    </div>
                    <div className='pass_group'>
                        <span>Place of Issue</span>
                        {change === 3? 
                            <input 
                            type='text' 
                            className='pass_input'
                            name='mPassPlace'
                            value={mPassPlace || ''}                            
                            onChange={(e) =>setMPassPlace(e.target.value)}
                            /> :
                        <h4>{pilgrim?.mPassPlace? pilgrim?.mPassPlace : 'No data' }</h4>}
                    </div>
                </div>
                <div className="pass_copy_doc">
                    <div className="pass_card">
                    { file?                         
                        <img src={URL.createObjectURL(file)} alt="" />                                                 
                        :
                         pilgrim?.mPass? <img src={pilgrim?.mPass} alt="" /> 
                        
                        // cuMission? <h4 className='mission_logo'>{cuMission?.name[0]}</h4> : 
                        // isAdmin? <h4 className='mission_logo'>{isAdmin?.name[0]}</h4>:
                    : null}
                    {!file || !pilgrim?.mPass &&
                        <label htmlFor="mPass" className='profile_photo'>
                            <input 
                                type="file" 
                                name='mPass' 
                                id="mPass" style={{display: 'none'}}
                                onChange={handleSelect}
                            />
                        <span className='attached_pass'><BsPlusLg/>Passport</span>
                        </label>
                        
                        }                      
                    </div>
                    <div className="pass_card_btns"> 
                     {error && <span className='error error_profile'>{error}<button onClick={() =>setError('')} className='btn_error'>x</button></span>}                      
                        <label htmlFor="mPass" className='prof'>
                            <input 
                                type="file" 
                                name='mPass' 
                                id="mPass" style={{display: 'none'}}
                                onChange={handleSelect}
                            />
                        <span className='btn_edit_pass btn_change'>Change</span>
                        </label>
                        {!file && pilgrim?.mPass &&
                        <button className='btn_edit_pass'>Download</button>}
                        {file && <>
                        <div className="progress-bar"  style={{width: perc + '%'}}></div> 
                        <div className='pay_btns_go'>
                            <button className='btn_edit_pass' onClick={handleMPass} disabled={perc < '100'}>{loading? <Loading/>: 'Save'}</button>
                            <button className='btn_edit_pass' onClick={() => setFile(null)}>Cancel</button>  
                        </div>                                              
                         </>}
                    </div>
                     
                </div>
            </div>
            </>}

            <div className="profile_passport">
                
                <div className="next_kin_detail">
                   
                    <div className="profile_card_title">
                        <h4>Pilgrim's Next of Kin Info</h4>
                        <button className='btn_edit' onClick={() =>setChange(4)}><BsPencil/></button>
                        {change === 4 && <> 
                            <button className='btn_save_btn' onClick={handleKin}>{loading? <Loading/> : 'Save Changes'}</button>
                            <button className='btn_cancel' onClick={() =>setChange(null)}>CANCEL</button>
                        </>}
                    </div>
                     
                    <div className="next_details_wrapper">
                        <div className='pass_group'>
                            <span>Name</span>                           
                            {change === 4? 
                                <input 
                                type='text' 
                                className='pass_input'
                                name='kinName'
                                value={kinName || ''}                            
                                onChange={(e) =>setKinName(e.target.value)}
                                /> :
                            <h4>{pilgrim?.kinName? pilgrim?.kinName : 'No data' }</h4>}
                            
                        </div>
                        <div className='pass_group'>
                            <span>Gender</span>
                            {change === 4? 
                                <select                                
                                className='pass_input'
                                name='kinGender'
                                value={kinGender || ''}                            
                                onChange={(e) =>setKinGender(e.target.value)}
                                >
                                   <option value="">Select</option>
                                   <option value="Male">Male</option>
                                   <option value="Female">Female</option> 
                                </select> :
                            <h4>{pilgrim?.kinGender? pilgrim?.kinGender : 'No data' }</h4>}
                        </div>
                        <div className='pass_group'>
                            <span>Age</span>
                            {change === 4? 
                                <input 
                                type='number' 
                                className='pass_input'
                                name='kinAge'
                                value={kinAge || ''}                            
                                onChange={(e) =>setKinAge(e.target.value)}
                                /> :
                            <h4>{pilgrim?.kinAge? pilgrim?.kinAge : 'No data' }</h4>}
                        </div>
                        <div className='pass_group'>
                            <span>Phone</span>
                            {change === 4? 
                                <input 
                                type='tel' 
                                className='pass_input'
                                name='kinPhone'
                                value={kinPhone || ''}                            
                                onChange={(e) =>setKinPhone(e.target.value)}
                                /> :
                            <h4>{pilgrim?.kinPhone? pilgrim?.kinPhone : 'No data' }</h4>}
                        </div> 
                        <div className='pass_group'>
                            <span>Email</span>
                            {change === 4? 
                                <input 
                                type='email' 
                                className='pass_input'
                                name='kinEmail'
                                value={kinEmail || ''}                            
                                onChange={(e) =>setKinEmail(e.target.value)}
                                /> :
                            <h4>{pilgrim?.kinEmail? pilgrim?.kinEmail : 'No data' }</h4>}
                        </div>
                        <div className='pass_group'>
                            <span>Relation</span>
                            {change === 4? 
                                <select                                
                                className='pass_input'
                                name='kinRel'
                                value={kinRel || ''}                            
                                onChange={(e) =>setKinRel(e.target.value)}
                                >
                                   <option value="">Select</option>
                                   <option value="Father">Father</option>
                                   <option value="Father">Father</option> 
                                   <option value="Brother">Brother</option> 
                                   <option value="Groundfather">Groundfather</option> 
                                   <option value="Sister">Sister</option> 
                                   <option value="Aunt">Aunt</option> 
                                   <option value="Mother">Mother</option> 
                                   <option value="Daughter">Daughter</option>
                                   <option value="Wife">Wife</option>
                                   <option value="Husband">Husband</option>
                                </select> :
                            <h4>{pilgrim?.kinRel? pilgrim?.kinRel : 'No data' }</h4>}
                        </div> 
                    </div>
                </div>
               
            </div>
           
            <div className="profile_payment">                
                <div className="next_kin_detail">
                 
                    <div className="profile_card_title">
                        <h4>Payment Details</h4>
                        <button className='btn_edit' onClick={() =>setChange(5)}><BsPencil/></button>
                       
                        
                    </div>                   
                    <div className="pay_hija_cost">
                        <span>Hijja Cost</span>
                        <h1>$ {myAgent?.cost}</h1>
                    </div> 
                   
                </div>
                <div className="payment_actions">
                    {change === 5 && <div className='pay_btns_go'> 
                        <button className='btn_save_btn' onClick={handlePayment}>{loading? <Loading/> : 'Save Changes'}</button>
                        <button className='btn_cancel' onClick={() =>setChange(null)}>CANCEL</button>
                    </div>}
                    <div className="payment_to_go">                    
                        <div className="payment_method">
                            <span>Payment Method</span>
                            {change === 5? 
                            <select                                
                                className='pass_input'
                                name='payMode'
                                value={payMode || ''}                            
                                onChange={(e) =>setPayMode(e.target.value)}
                                >
                                    <option value="">Select</option>
                                    <option value="Bank Transfer">Bank Transfer</option>
                                    <option value="Cash Deposit">Cash Deposit</option> 
                                    <option value="Cheque">Cheque</option> 
                                    <option value="GroundCredit or Debit Card">Credit or Debit Card</option> 
                                    <option value="Mobile Money">Mobile Money</option>                                
                                </select> :
                                <h4>{pilgrim?.payMode? pilgrim?.payMode : 'No data' }</h4>}
                        
                        </div>
                        <div className="payment_method">
                            <span>Due date</span>
                            {change === 5? 
                                    <input 
                                    type='date' 
                                    className='pass_input'
                                    name='dueDate'
                                    value={dueDate || ''}                            
                                    onChange={(e) =>setDueDate(e.target.value)}
                                    /> :
                                <h4>{pilgrim?.dueDate? pilgrim?.dueDate : 'No data' }</h4>}
                        </div>                       
                        <a href={`https://ehajj-tz.netlify.app/invoice/${pilgrim?.invoiceId}`} 
                            target="_blank" rel="noopener noreferrer"
                            > 
                            <button 
                                className='btn_view_invo'
                                disabled={!pilgrim?.dueDate || !pilgrim?.payMode}
                                >View Invoice
                            </button>
                        </a>
                        
                    </div>
                </div>
               
            </div>
        </div>
    </div>
  )
}

export default Profile
