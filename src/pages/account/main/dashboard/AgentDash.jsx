import React from 'react'
import { useAuth } from '../../../../hooks/useAuth';
import useData from '../../../../hooks/useData'
import moment from 'moment'
import PilgrimCard from '../../pilgrim/PilgrimCard';

const AgentDash = () => {

    const { pilgrims, users, agents } = useData();
    const { user } = useAuth();
    const cuUser = users && users.find(u => u.id === user.uid)
    const ageId = cuUser?.agentId
    const agent = agents && agents.find(p => p.id === ageId)
    const agentPils = pilgrims && pilgrims.filter(a => a.agent === ageId)
    const agentUsers = users && users.filter(u => u.typeOf === 'agent')?.filter(a => a.agentId === ageId)

    console.log('agentUser', agentUsers)

  return (
    <div className="main_body">
    <div className="main_top_wrapper">
      <div className="acc_main_top">
        <div className="acc_body_card">
          <small>Assalaam Aleykum</small>
          <h2>{cuUser?.fname} {cuUser?.lname}</h2>
          <small>{agent?.coName}</small>
        </div>
        <div className="acc_body_card">
          <small>Applicants</small>
          <h2>{agentPils?.length}</h2>
        </div>
        <div className="acc_body_card">
          <small>Users</small>
          <h2>{agentUsers.length}</h2>
        </div>             
      </div>          

    
      <div className="acc_main_top_2">
        <h3 className='acc_sub_title'>Recent Joined Users</h3>
        <div className="acc_inner_agents_1">                  
            {agentUsers && agentUsers.map(a => (
              <div className="Inner_agent_card" key={a.id}>
                <span className="agent_logo">{a?.fname[0]}</span>                        
                  <div className="post_card_inner">
                    <h4>{a.fname} {a.lname}</h4>
                    <span>{a.office}</span>
                    {/* <small>Created {moment(a.timeStamp?.toDate()).fromNow()}</small> */}
                  </div>                 
              </div> 
            ))}                     
                
        </div>
      </div>
  </div>
  <div className="acc_main_body">
    <div className="acc_main_left">
      <h3 className='acc_sub_title'>Recent Applicants</h3>
      {agentPils.length > 0 ?
      <div className="main_pilgrims_inner">           
            {agentPils && agentPils.map(s=> (
                <PilgrimCard s={s}/>         
            
            ))}               
        
      </div> : <span className='no_applicant'>No applicants</span>}
    </div>
    {/* <div className="acc_main_right">

      <ApplicationTrend/>
    </div> */}
    
  </div> 
</div>
  )
}

export default AgentDash
