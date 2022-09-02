import React from 'react'
import profile from '../../../components/images/profile.png'
import hija from '../../../components/images/hijja2.jpg'
import { useAuth } from '../../../hooks/useAuth'
import useData from '../../../hooks/useData'

import NewChat from '../message/NewChat'

const PilgrimCard = ({s}) => {

  const { user } = useAuth();
  const { users } = useData()

  const isAgent = users && users.find(u => u.id === user.uid)?.typeOf === 'agent'
  
  return (
    <div className="applicant_card" key={s.id}>
                <div className="app_card_left">
                  <img src={hija} alt="" />
                </div>
                <div className="app_card_right"> 
                  <div className="app_card_top">
                    <span className='app_ibada_type'>{s.ibada? s.ibada : 'Not selected'}</span>
                    {isAgent?                    
                      <NewChat s={s.id} name={s.fname}/>                 
                    : <div className='app_ibada_status'> {s.isCompleted ? 'Yes Done' : 'Not Done'}</div>}
                  </div> 
                  <div className="app_card_profile">
                    <img src={profile} alt="" />
                  </div>             
                  <div className="card_app_body">
                    <h3 style={{color: '#555', fontWeight: '700', marginBottom:'5px'}}>{s.fname} {s.lname}</h3>
                    <div className="app_status">
                      <div className="app_status_1">
                        <small>Age</small>
                        <span>32</span>
                      </div>
                      <div className="app_status_1">
                        <small>Gender</small>
                        <span>{s.gender}</span>
                      </div>
                      <div className="app_status_1">
                        <small>Marital Status</small>
                        <span>{s.marital}</span>
                      </div>                   
                    </div>
                    {!isAgent &&
                    <small className='app_agent_n'>{s.agentName? s.agentName : 'Not Selected'}</small>}
                  </div>
                </div>
      
    </div>
  )
}

export default PilgrimCard
