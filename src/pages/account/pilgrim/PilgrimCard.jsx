import React from 'react'
import ChangeStatus from '../../../components/changeStatus/ChangeStatus'
import ViewProfile from '../../../components/viewProfile/ViewProfile'
import NewChat from '../message/NewChat'
import moment from 'moment'
import useData from '../../../hooks/useData'
import { useAuth } from '../../../hooks/useAuth'


const PilgrimCard = ({pil}) => {
  const { agents } = useData();
  const { user } = useAuth()
  const agent = agents?.find(a =>a.id === pil?.agentId)
  const isAgent = agents?.find(a => a?.users?.includes(`${user.uid}`)) || agents?.find(a => a?.createdBy === user?.uid)

  console.log('pil', pil)
  return (
    <tr>
      <td data-label='Picha' className='pil_icon'>
        {pil?.photo? <img src={pil?.photo} alt="" /> : <h4 className='agent_logo2'>{pil?.fname[0]+""+pil?.lname[0]}</h4>}
      </td>
      <td data-label='Jina'>{pil?.fname+" "+pil?.lname}</td>
      <td data-label='Umri'>32</td>
      <td data-label='Jinsia'>{pil?.gender}</td>      
      <td data-label='Ibada'>{pil?.ibada}</td>    
      <td data-label='Kajiunga'>{moment(pil?.createdAt?.toDate()).fromNow(true)}</td>      
      <td data-label='Hatua Iliyofikia'>{pil?.status}</td>
      <td data-label='Wakala'>{agent?.name || agent?.coName}</td>
      <td data-label='Chukua Hatua'>
        <div className="actions_btns">
          {isAgent && 
          <ChangeStatus id={pil?.id}/>}
          <ViewProfile id={pil?.id}/>
          <span className='profile_span '>
             <NewChat s={pil?.id} name={pil?.fname+" "+pil?.lname}/>   
          </span>
                      
        </div>
      </td>
      
    </tr>
  )
}

export default PilgrimCard
