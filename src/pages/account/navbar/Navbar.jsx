import React, {useState} from 'react'
import { useNavigate, NavLink } from 'react-router-dom'

import useData from '../../../hooks/useData';

import { db, useAuth } from '../../../hooks/useAuth';

import './navbar.css'

import { 
 
  BsFillCaretDownFill,
  BsBell
  } from "react-icons/bs";

const Navbar = () => {

    const navigate = useNavigate()
    const { pilgrims, users, agents, mission } = useData();

    const {user, logOut} = useAuth();
    const cuUser = users && users.find(u => u.id === user.uid)
    const agent = agents && agents.find(a => a.id === cuUser.agentId)
    const pilgrim = pilgrims && pilgrims.find(a => a.userId === user.uid)
    const cuMission = mission && mission.find(m => m.userId === user.uid)

    // console.log('pilgrim', pilgrim)

    // const pilgrimsRef = collection(db, 'pilgrims')
    // const [loading, setLoading] = useState(null)
    // const [err, setErr] = useState('')
    
    // const fname = cuUser && cuUser.fname
    // const isPilgrim = users && users.find(u => u.id === user.uid)?.typeOf === 'pilgrim'
    // const isAgent = users && users.find(u => u.id === user.uid)?.typeOf === 'agent'
    // const isAdmin = users && users.find(u => u.id === user.uid)?.typeOf === 'admin'
    // const isMission = users && users.find(u => u.id === user.uid)?.typeOf === 'mission'
 

    // const addPilgrim = async(e) => {
    //     e.preventDefault()
    
    //     setLoading(true)
    
    //     const data = {
    //       userId: user.uid,
    //       status: 'still pending',
    //       fname: fname,
    //       gender: '',
    //       marital: '',
    //       dob: '',
    //       photo: '',
    //       lname: cuUser && cuUser.lname,
    //       email: cuUser && cuUser.email,
    //       region: '',
    //       district: '',
    //       phone: [],
    //       ibada: '',
    //       agent: '',
    //       passNo: '',
    //       passIssue: '',
    //       passExp: '',
    //       passCopy:'',
    //       maFname: '',
    //       maLname:'',
    //       maRel: '',
    //       maDob:'',
    //       maEmail:'',
    //       maPhone:'',
    //       maPassNo:'',
    //       maPassIssue:'',
    //       maPassExp:'',
    //       maPassCopy: '',
    //       nextFname:'',
    //       nextLname: '',
    //       nextDob: '',
    //       nextRel:'',
    //       nextEmail: '',
    //       nextPhone: '',
    //       payMode: '',
    //       payTime: '',
    //       payDate: '',
    //       isCompleted: false,
    //       isPaid: false,
    //       amout: '',
    
    //     }
    //     try {
    //       await addDoc(pilgrimsRef, data)
    //       setLoading(false)
    //       navigate('/account/application')
    //     } catch (error) {
    //       setErr(error.message)
    //     }
        
    
    //   }

    // const pilgrim = pilgrims && pilgrims.find(p => p.userId === user.uid)

    // const [items, setItems] = useState(null)

    // console.log('isAgent', isAgent)
    // console.log('isPli', isPilgrim)

    // const [showMenu, setShowMenu] = useState(null)
    const [userMenu, setUserMenu] = useState(null)
  

  return (
    <div className="agent_top">
          <div className="agent_top_left">
            <div className="agent_logo">
              {agent || pilgrim? <img src={agent?.logo || pilgrim?.photo} alt="" /> : <h4 className='mission_logo'>{cuMission?.name[0]}</h4>}
            </div>
            <h1>{agent?.name || agent?.coName || pilgrim?.fname} {pilgrim?.lname} {cuMission?.name}</h1>
          </div>
          <div className="agent_top_right">
            <div className="user_notification">
              <button className='btn_notific'><BsBell/></button>   
            </div>
                     
            <h4>{cuMission? cuMission?.fname+" "+cuMission?.lname : cuUser?.fname+" "+cuUser?.lname}</h4>           
            <div className="user_profile_acc" onMouseEnter={() =>setUserMenu(true)} onMouseLeave={() =>setUserMenu(null)}>
              <button className='btn_user'><BsFillCaretDownFill/></button>
              {userMenu &&
              <div className="user_profile_action">
                <span>My Profile</span>
                <span>Company Profile</span>
                <span>Settings</span>
                <span onClick={() => logOut()}>Log Out</span>
              </div>}
            </div>
            
          </div>
        </div>
  )
}

export default Navbar
