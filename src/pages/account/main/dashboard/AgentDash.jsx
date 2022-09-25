import React from 'react'
import { useAuth } from '../../../../hooks/useAuth';
import useData from '../../../../hooks/useData'
import moment from 'moment'
import {  BsChatLeftText, BsEye, BsPencil } from "react-icons/bs";
import AgentSidebar from '../../sidebar/AgentSidebar';
import { useState } from 'react';
import ChangeStatus from '../../../../components/changeStatus/ChangeStatus';
import NewChat from '../../message/NewChat';
import ViewProfile from '../../../../components/viewProfile/ViewProfile';

const AgentDash = () => {

    const { pilgrims, users, agents } = useData();
    const { user } = useAuth();
    const cuUser = users && users.find(u => u.id === user.uid)
    const ageId = cuUser?.agentId
    const agent = agents?.find(a => a?.users?.includes(`${user.uid}`)) || agents?.find(a => a?.createdBy === user?.uid)
    const agentUsers = users && users.filter(u => u.agentId === agent?.id)
    // const agentPils = pilgrims && pilgrims.filter(a => a.agent === ageId)
    const agentPilgrims = pilgrims && pilgrims.filter(u => u.agent === agent?.id)
    const adminId = agent?.createdBy
    const admin = users && users.find(u => u.id === adminId)
    // const agentUsers = users && users.filter(u => u.typeOf === 'agent')?.filter(a => a.agentId === ageId)

    console.log('agent', agent)

    const [action, setAction] = useState(null)

  return (
    <div className="agent_body">  
    <div className="agent_main_body">
      <div className="agent_body_top">
        <div className="agent_b_top_left">
          <div className="agent_t_b_card">
            Users
            <h1>{agentUsers?.length}</h1>
          </div>
          <div className="agent_t_b_card">
            Maombi Mahujaji wa Hijja 2023
            <h1>{agentPilgrims?.length}</h1>
          </div>
          <div className="agent_t_b_card">
            Tickets
            <div className="agent_viza">
              <div className="agent_viza_inner">
                <span></span>
                <h4>Weye Tiketi</h4>
                <h5>5</h5>
              </div>
              <div className="agent_viza_inner">
                <span></span>
                <h4>Wasio na Tikets</h4>
                <h5>5</h5>
              </div>                  
            </div>
          </div>
          <div className="agent_t_b_card">
            Visa
            <div className="agent_viza">
              <div className="agent_viza_inner">
                <span></span>
                <h4>Maombi Mapya</h4>
                <h5>5</h5>
              </div>
              <div className="agent_viza_inner">
                <span></span>
                <h4>Maombi Yaloyokubaliwa</h4>
                <h5>5</h5>
              </div>
              <div className="agent_viza_inner">
                <span></span>
                <h4>Maombi Yaliyokataliwa</h4>
                <h5>5</h5>
              </div>
              <div className="agent_viza_inner">
                <span></span>
                <h4>Maombi Yanayoshughuliwa</h4>
                <h5>5</h5>
              </div>
            </div>
          </div>
        </div>
        <div className="agent_b_top_right">
          Recent users
          <div className="agent_recent_users">
            {agentUsers && agentUsers.slice(0,3).map(a => (
               <div className="agent_rec_user_card">
              <span className='user_span'>{a?.fname[0]}</span>
              <div className="agent_user_details">
                <h3>{a?.fname} {a?.lname}</h3>
                <small>Joined {moment(a?.createdAt?.toDate()).fromNow()}</small>
                <h4>{a.status}</h4>
              </div>
              
            </div>
            ))}
         
            <button className='btn_send'>View all</button>
          </div>
        </div>
      </div>
      <div className="agent_applicants">
        Recent Pilgrims
        <div className="agent_rec_applicants">
          <table className='table'>
            <thead>
              <th>Photo</th>
              <th>Name</th>
              <th>Sex</th>
              <th>Age</th>
              <th>Ana Passpoti?</th>
              <th>Hali ya Ndoa</th>
              <th>Kajiunga</th>
              <th>Ameshalipa?</th>
              <th>Hatua Iliyofikia</th>
              <th>Action</th>
            </thead>
            <tbody>
              {agentPilgrims && agentPilgrims.slice(0,2).map(pil => (
                 <tr>
                  <td data-label='Picha'><img src={pil?.photo} alt="" /></td>
                  <td data-label='Jina'>{pil?.fname} {pil?.fname}</td>
                  <td data-label='Jinsia'>{pil?.gender}</td>
                  <td data-label='Umri'>{pil?.dob}</td>
                  <td data-label='Ana Pasipoti?'>{pil?.passNo !== ''? 'Ndio' : 'Hapana'}</td>
                  <td data-label='Hali ya Ndoa'>{pil?.marital}</td>
                  <td data-label='Kajiunga'>{moment(pil?.createdAt?.toDate()).fromNow(true)}</td>
                  <td data-label='Ameshalipa?'>{pil?.isPaid? 'Ndio' : 'Hapana'}</td>
                  <td data-label='Hatua Iliyofikia'>{pil?.status}</td>
                  <td data-label='Chukua Hatua'>
                    <div className="actions_btns">
                      <ChangeStatus id={pil?.id}/>
                      <ViewProfile id={pil?.id}/>
                      <NewChat s={pil?.id} name={pil?.fname+" "+pil?.lname}/>                  
                    </div>
                  </td>
                  
                </tr>
                ))}
            
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div className="agent_right_action">
      <div className="agent_ri_ac_card">
        Admin
        <div className="admin_profile">
            <span className='admin_agent'>{admin?.fname[0]}</span>
            <h4>{admin?.fname} {admin?.lname}</h4>
            {cuUser?.id !== admin?.id &&
            <NewChat s={admin?.id} name={admin?.fname+" "+admin?.lname}/>
            }
        </div>
        
      </div>
      <div className="agent_ri_ac_card">
        Approval Status
        <h2>{agent?.status}</h2>
        {agent?.status === "Not Approved" &&
        <button className='btn_send'>Make a Reminder</button>}
      </div>
      <div className="agent_ri_ac_card">
        Payment Status
        <h1>{agent?.isPaid? 'Completed': 'Not Paid'}</h1>
        <div className="pay_actions">
          <button className='btn_pay'>Pay Now</button>
          <button>Download Invoice</button>
        </div>
        
      </div>
    </div>
  </div>
  )
}

export default AgentDash
