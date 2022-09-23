import React from 'react'
import NewChat from '../message/NewChat';
import ChangeStatus from '../../../components/changeStatus/ChangeStatus';
import ViewProfile from '../../../components/viewProfile/ViewProfile';
import moment from 'moment'
import useData from '../../../hooks/useData';
import { useAuth } from '../../../hooks/useAuth';

const AgentCard = ({s, index}) => {

    const { pilgrims, users } = useData();
    const user = users && users.find(u =>u.id === s?.createdBy)
    const pilgrimsTot = pilgrims && pilgrims.filter(p =>p?.agent === s.id)?.length
  return (
    <tr key={s.id}>
        <td data-label='SN'>{index+1}</td>     
        <td data-label='Logo'><img src={s?.logo} alt="" /></td>    
        <td data-label='Name'>{s?.name || s?.coName}</td>   
        <td data-label='Email'>{s?.email}</td>             
        <td data-label='Phone'>{s?.phone}</td>
        <td data-label='Website'>{s?.website}</td>
        <td data-label='Joined'>{moment(s?.createdAt?.toDate()).fromNow(true)}</td>
        <td data-label='Createdby'>{user?.fname+" "+user?.lname}</td>
        <td data-label='Pilgrims'>{pilgrimsTot}</td>
        <td data-label='Status'>{s?.status}</td>
        <td data-label='Action'>
        <div className="actions_btns">
            <ChangeStatus id={s?.id}/>
            <ViewProfile id={s?.id}/>
            <NewChat s={s?.id} name={s?.name || s?.coName}/>                
        </div>
        
        </td>
    </tr>
  )
}

export default AgentCard
