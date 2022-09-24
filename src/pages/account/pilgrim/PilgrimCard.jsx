import React from 'react'
import ChangeStatus from '../../../components/changeStatus/ChangeStatus'
import ViewProfile from '../../../components/viewProfile/ViewProfile'
import NewChat from '../message/NewChat'
import moment from 'moment'
import useData from '../../../hooks/useData'


const PilgrimCard = ({pil}) => {
  const { agents } = useData();
  const agent = agents?.find(a =>a.id === pil?.agentId)
  return (
    <tr>
      <td data-label='Picha'><img src={pil?.photo} alt="" /></td>
      <td data-label='Jina'>{pil?.fname} {pil?.lname}</td>
      <td data-label='Jinsia'>{pil?.gender}</td>
      <td data-label='Umri'>{pil?.dob}</td>
      <td data-label='Email'>{pil?.email}</td>
      <td data-label='Wakala'>{agent?.name || agent?.coName}</td>
   
      <td data-label='Kajiunga'>{moment(pil?.createdAt?.toDate()).fromNow(true)}</td>
      <td data-label='Ameshalipa?'>{pil?.isPaid? 'Ndio' : 'Hapana'}</td>
      <td data-label='Hatua Iliyofikia'>{pil?.status}</td>
      <td data-label='Chukua Hatua'>
        <div className="actions_btns">
          <ChangeStatus id={pil?.id}/>
          <ViewProfile id={pil?.id}/>
          <NewChat s={pil?.userId} name={pil?.fname+" "+pil?.lname}/>                
        </div>
      </td>
      
    </tr>
  )
}

export default PilgrimCard
