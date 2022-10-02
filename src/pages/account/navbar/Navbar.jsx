import React, {useState} from 'react'
import { useNavigate, NavLink } from 'react-router-dom'

import useData from '../../../hooks/useData';

import { db, useAuth } from '../../../hooks/useAuth';

import './navbar.css'

import { BsFillCaretDownFill, BsBell } from "react-icons/bs";
import { doc, updateDoc } from 'firebase/firestore';

const Navbar = () => {

    const navigate = useNavigate()
    const { pilgrims, users, agents, mission, admins } = useData();

    const {user, logOut} = useAuth();
    const cuUser = users && users.find(u => u.id === user.uid)
    const agent = agents?.find(a => a.id === cuUser?.agentId)  
    const pilgrim = pilgrims && pilgrims.find(a => a.id ===user.uid)
    const isMission = mission?.find(m => m.userId === user.uid)
    const admin = admins?.find(a => a.userId === user?.uid)

    const companyId = 
      cuUser? cuUser?.agentId : 
      pilgrim? pilgrim?.agentId : null

    const userId = 
      cuUser? cuUser?.id :
      pilgrim? pilgrim?.id :
      isMission? isMission?.id :
      admin? admin?.id : null

    

    // console.log('pilgrim', pilgrim)
    // console.log('agent', agent)
    // console.log('cuUser', cuUser)

    const pilgrimRef = doc(db, 'pilgrims', `${pilgrim?.id}`)
    const userRef = doc(db, 'users', `${cuUser?.id}`)
    const adminRef = doc(db, 'admins', `${admin?.id}`)
    const missionRef = doc(db, 'mission', `${isMission?.id}`)

  
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
      }else if(admin){
        await updateDoc(adminRef, {
          isOnline: false
        })
      }else if(isMission){
        await updateDoc(missionRef, {
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
                agent? agent?.logo? <img src={agent?.logo} alt="" /> : <span className='pil_photo'>{agent?.name[0] || agent?.coName[0]}</span>:
                isMission? <h4 className='mission_logo'>{isMission?.name[0]}</h4> : 
                admin? <h4 className='mission_logo'>{admin?.name[0]}</h4>:
              null}
            </div>
            <h1>{
              agent? agent?.name || agent?.coName : 
              pilgrim? pilgrim?.fname+" "+pilgrim?.lname :
              isMission? isMission?.name : 
              admin? admin?.name : 
              cuUser? cuUser?.fname+" "+cuUser?.lname :
              null}
            </h1>
          </div>
          <div className="agent_top_right">
            <div className="user_notification">
              <button className='btn_notific'><BsBell/></button>   
            </div>
                     
            <h4 className='account_name'>{
              isMission? isMission?.fname+" "+isMission?.lname : 
              pilgrim? pilgrim?.fname+" "+pilgrim?.lname :
              cuUser? cuUser?.fname+" "+cuUser?.lname : 
              admin? admin?.fname+" "+admin?.lname :  
              null}
            </h4>           
            <div className="user_profile_acc" onMouseEnter={() =>setUserMenu(true)} onMouseLeave={() =>setUserMenu(null)}>
              <button className='btn_user'><BsFillCaretDownFill/></button>
              {userMenu &&
              <div className="user_profile_action">
                <span onClick={() =>navigate(`/profile/${userId}`)}>My Profile</span>
                {cuUser &&
                <span onClick={() =>navigate(`/profile/${companyId}`)}>Company Profile</span>
                }
                 {pilgrim &&
                <span onClick={() =>navigate(`/profile/${companyId}`)}>Company Profile</span>
                }
                <span>Settings</span>
                <span onClick={handleLogout}>Log Out</span>
              </div>
              
              }
              
            </div>
            
          </div>
        </div>
  )
}

export default Navbar
