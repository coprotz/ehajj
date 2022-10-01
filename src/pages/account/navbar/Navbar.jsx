import React, {useState} from 'react'
import { useNavigate, NavLink } from 'react-router-dom'

import useData from '../../../hooks/useData';

import { db, useAuth } from '../../../hooks/useAuth';

import './navbar.css'

import { 
 
  BsFillCaretDownFill,
  BsBell
  } from "react-icons/bs";
import { doc, updateDoc } from 'firebase/firestore';

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

    const pilgrimRef = doc(db, 'pilgrims', `${pilgrim?.id}`)
    const userRef = doc(db, 'users', `${cuUser?.id}`)

  
    const [userMenu, setUserMenu] = useState(null)

    const handleLogout = async (e) => {
      e.preventDefault()

      try {
        if(pilgrim){
          await updateDoc(pilgrimRef, {
        isOnline: false
      })
      }else if(cuUser){
        await updateDoc(userRef, {
          isOnline: false
        })
      }
      } catch (error) {
        console.log(error.message)
      }

    
        logOut();
    

      

      


    }
  

  return (
    <div className="agent_top">
          <div className="agent_top_left">
            <div className="agent_logo1">
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
              null}
            </h1>
          </div>
          <div className="agent_top_right">
            <div className="user_notification">
              <button className='btn_notific'><BsBell/></button>   
            </div>
                     
            <h4 className='account_name'>{
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
                <span onClick={() =>navigate(`/profile/${pilgrim?.agentId}`)}>Company Profile</span>
                <span>Settings</span>
                <span onClick={handleLogout}>Log Out</span>
              </div>}
            </div>
            
          </div>
        </div>
  )
}

export default Navbar
