import React from 'react'
import NewChat from '../message/NewChat';
import ChangeStatus from '../../../components/changeStatus/ChangeStatus';
import ViewProfile from '../../../components/viewProfile/ViewProfile';
import moment from 'moment'
import useData from '../../../hooks/useData';
import { useAuth } from '../../../hooks/useAuth';

const AgentCard = ({s, index}) => {

    const { pilgrims, users, admins, mission } = useData();
    const { user } = useAuth()
    const agentAdmin = users && users.find(u =>u.id === s?.createdBy)
    // const isAdmin = admins?.find(a =>a.userId === user.uid)
    const isMission = mission?.find(a =>a.userId === user.uid)
    // const isAgent = agents?.find(a => a?.users?.includes(`${user.uid}`)) || agents?.find(a => a?.createdBy === user?.uid)
    const pilgrimsTot = pilgrims && pilgrims.filter(p =>p?.agentId === s.id)?.length
    const agentUsers = s?.users?.length

  return (
    <tr key={s.id}>
        <td data-label='SN'>{index+1}</td>     
        <td data-label='Logo'>{s?.logo? <img src={s?.logo} alt="" />: 
          <span className='agent_logo2'>{s?.name || s?.coName}</span>}
        </td>    
        <td data-label='Name'>{s?.name || s?.coName}</td>   
        {/* <td data-label='Email'>{s?.email}</td>              */}
        <td data-label='Phone'>{s?.phone}</td>
        <td data-label='Website'>{s?.website}</td>
        <td data-label='Joined'>{moment(s?.createdAt?.toDate()).fromNow(true)}</td>
        <td data-label='Createdby'>{agentAdmin?.fname+" "+agentAdmin?.lname}</td>
        <td data-label='Pilgrims'>{pilgrimsTot}</td>
        <td data-label='Users'>{agentUsers}</td> 
        <td data-label='Status'>{s?.status}</td>
        <td data-label='Action'>
        <div className="actions_btns">
          
            {isMission && <ChangeStatus id={s?.id}/>}
            <ViewProfile id={s?.id}/>
            <span className='profile_span '>
              <NewChat s={s?.id} name={s?.name || s?.coName}/> 
            </span>
                           
        </div>
        
        </td>
    </tr>
  )
}

export default AgentCard
