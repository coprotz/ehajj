import React from 'react'
import ChangeStatus from '../../../components/changeStatus/ChangeStatus'
import ViewProfile from '../../../components/viewProfile/ViewProfile'
import useData from '../../../hooks/useData'
import NewChat from '../message/NewChat'


const UserCard = ({user, index}) => {
    const { users, agents } = useData()
    const agent = agents && agents.find(u => u.id === user?.agentId)
  return (
    <tr>
        <td data-label='SN'>{index+1}</td>     
        <td data-label='Name'>{user?.fname+" "+user?.lname}</td>    
        <td data-label='Firm'>{agent?.name || agent?.coName}</td>   
        <td data-label='Office'>{agent?.office}</td>             
        <td data-label='Phone'>{agent?.phone}</td>
        <td data-label='Email'>{agent?.email}</td>
        <td data-label='Status'>{agent?.status}</td>
        <td data-label='Action'>
        <div className="actions_btns">
            {/* <ChangeStatus id={agent?.id}/> */}
            <ViewProfile id={agent?.id}/>
            <NewChat s={agent?.id} name={user?.fname+" "+user?.lname}/>                
        </div>
        
        </td>
  </tr>
  )
}

export default UserCard