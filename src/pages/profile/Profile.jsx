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
                        <button className='btn_save_btn' onClick={handlePhoto}>{loading? <Loading/> : 'Save Changes'}</button>
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
                        <button className='btn_edit_pass' onClick={handlePassport}>Save</button>
                        <button className='btn_edit_pass' onClick={() => setFile(null)}>Cancel</button>                        
                         </>}
                    </div>
                     
                </div>
            </div>
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
                                className='pass_input1'
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
                                className='pass_input1'
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
                                className='pass_input1'
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
                                type='text' 
                                className='pass_input1'
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
                                type='text' 
                                className='pass_input1'
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
                                className='pass_input1'
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
                        <h4>Pilgrim's Maharem Passport Details</h4>
                        <button className='btn_edit' onClick={() =>setChange(3)}><BsPencil/></button>
                        {change === 3 && <> 
                            <button className='btn_save_btn'>Save Changes</button>
                            <button className='btn_cancel' onClick={() =>setChange(null)}>CANCEL</button>
                        </>}
                    </div>
                    <div className='pass_group'>
                        <span>Passport #</span>
                        <h4>1252253</h4>
                    </div>
                    <div className='pass_group'>
                        <span>Date of Issue</span>
                        <h4>1252253</h4>
                    </div>
                    <div className='pass_group'>
                        <span>Expiring Date</span>
                        <h4>1252253</h4>
                    </div>
                    <div className='pass_group'>
                        <span>Place of Issue</span>
                        <h4>1252253</h4>
                    </div>
                </div>
                <div className="pass_copy_doc">
                    <div className="pass_card">
                        attach Passport
                    </div>
                     
                </div>
            </div>
            <div className="profile_passport">
                
                <div className="next_kin_detail">
                 
                    <div className="profile_card_title">
                        <h4>Pilgrim's Next of Kin Info</h4>
                        <button className='btn_edit' onClick={() =>setChange(4)}><BsPencil/></button>
                        {change === 4 && <> 
                            <button className='btn_save_btn'>Save Changes</button>
                            <button className='btn_cancel' onClick={() =>setChange(null)}>CANCEL</button>
                        </>}
                    </div>
                    <div className="next_details_wrapper">
                        <div className='pass_group'>
                            <span>Name</span>
                            <h4>1252253</h4>
                        </div>
                        <div className='pass_group'>
                            <span>Gender</span>
                            <h4>1252253</h4>
                        </div>
                        <div className='pass_group'>
                            <span>Age</span>
                            <h4>1252253</h4>
                        </div>
                        <div className='pass_group'>
                            <span>Phone</span>
                            <h4>1252253</h4>
                        </div> 
                        <div className='pass_group'>
                            <span>Email</span>
                            <h4>1252253</h4>
                        </div>
                        <div className='pass_group'>
                            <span>Relation</span>
                            <h4>1252253</h4>
                        </div> 
                    </div>
                </div>
               
            </div>
            <div className="profile_payment">                
                <div className="next_kin_detail">
                 
                    <div className="profile_card_title">
                        <h4>Payment Details</h4>
                        <button className='btn_edit' onClick={() =>setChange(5)}><BsPencil/></button>
                        {change === 5 && <> 
                            <button className='btn_save_btn'>Save Changes</button>
                            <button className='btn_cancel' onClick={() =>setChange(null)}>CANCEL</button>
                        </>}
                        
                    </div>
                    <div className="next_details_wrapper">
                        <div className="pay_hija_cost">
                            <span>Hijja Cost</span>
                            <h1>$ 5254</h1>
                        </div> 
                    </div>
                </div>
                <div className="payment_actions">
                    <div className="payment_method">
                        <span>Payment Method</span>
                        <h3>Bank Tranfer</h3>
                    </div>
                    <div className="payment_method">
                        <span>Due date</span>
                        <h3>12 July 2023</h3>
                    </div>
                    <button className='btn_view_invo'>View Invoice</button>
                </div>
               
            </div>
        </div>
    </div>
  )
}

export default Profile
