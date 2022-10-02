import React from 'react'
import ChangeStatus from '../../../components/changeStatus/ChangeStatus'
import ViewProfile from '../../../components/viewProfile/ViewProfile'
import useData from '../../../hooks/useData'
import NewChat from '../message/NewChat'
import moment from 'moment'


const UserCard = ({user, index}) => {
    const { users, agents } = useData()
    const agent = agents && agents.find(u => u.id === user?.agentId)
  return (
    <tr >
        <td data-label='SN'>{index+1}</td>   
        <td data-label='Photo'>{user?.photo? <img src={user?.photo} alt="" />: 
          <span className='agent_logo2'>{user?.fname[0]+""+user?.lname[0]}</span>}
        </td>   
        <td data-label='Name'>{user?.fname+" "+user?.lname}</td>         
        <td data-label='Firm'>{agent?.name || agent?.coName}</td>   
        <td data-label='Status Line' className='user_line'>
          {user?.isOnline? <span className='online1'></span> : <span className='offline1'></span>}
        </td>             
        <td data-label='Phone'>{user?.phone}</td>
        <td data-label='Email'>{user?.email}</td>
        <td data-label='Created At'>{moment(user?.createdAt?.toDate()).fromNow()}</td>
        <td data-label='Status'>{user?.status}</td>
        <td data-label='Action'>
        <div className="actions_btns">
            {/* <ChangeStatus id={agent?.id}/> */}
            <ViewProfile id={user?.id}/>
            <NewChat s={user?.id} name={user?.fname+" "+user?.lname}/>                
        </div>
        
        </td>
  </tr>
  )
}

export default UserCard
