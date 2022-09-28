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
    const { pilgrims, users, agents, mission, admins } = useData();

    const {user, logOut} = useAuth();
    const cuUser = users && users.find(u => u.id === user.uid)
    const agent = agents?.find(a => a?.users?.includes(`${user.uid}`)) || agents?.find(a => a?.createdBy === user?.uid)
    const pilgrim = pilgrims && pilgrims.find(a => a.id ===user.uid)
    const cuMission = mission && mission.find(m => m.userId === user.uid)
    const isAdmin = admins?.find(a => a.userId === user?.uid)
    

    // console.log('pilgrim', pilgrim)
    // console.log('agent', agent)
    // console.log('cuUser', cuUser)

  
    const [userMenu, setUserMenu] = useState(null)
  

  return (
    <div className="agent_top">
          <div className="agent_top_left">
            <div className="agent_logo">
              { 
                pilgrim? pilgrim?.photo? <img src={pilgrim?.photo} alt="" /> : <span className='pil_photo'>{pilgrim?.fname[0]}</span> : 
                agent?  <img src={agent?.logo} alt="" /> : 
                cuMission? <h4 className='mission_logo'>{cuMission?.name[0]}</h4> : 
                isAdmin? <h4 className='mission_logo'>{isAdmin?.name[0]}</h4>:
              null}
            </div>
            <h1>{
              agent? agent?.name || agent?.coName : 
              pilgrim? pilgrim?.fname+" "+pilgrim?.lname :
              cuMission? cuMission?.name : 
              isAdmin? isAdmin?.name : 
              null}</h1>
          </div>
          <div className="agent_top_right">
            <div className="user_notification">
              <button className='btn_notific'><BsBell/></button>   
            </div>
                     
            <h4>{
              cuMission? cuMission?.fname+" "+cuMission?.lname : 
              pilgrim? pilgrim?.fname+" "+pilgrim?.lname :
              agent? cuUser?.fname+" "+cuUser?.lname : 
              isAdmin? isAdmin?.fname+" "+isAdmin?.lname :  
              null}
            </h4>           
            <div className="user_profile_acc" onMouseEnter={() =>setUserMenu(true)} onMouseLeave={() =>setUserMenu(null)}>
              <button className='btn_user'><BsFillCaretDownFill/></button>
              {userMenu &&
              <div className="user_profile_action">
                <span onClick={() =>navigate(`/profile/${pilgrim?.id}`)}>My Profile</span>
                <span onClick={() =>navigate(`/profile/${agent?.id}`)}>Company Profile</span>
                <span>Settings</span>
                <span onClick={() => logOut()}>Log Out</span>
              </div>}
            </div>
            
          </div>
        </div>
  )
}

export default Navbar
