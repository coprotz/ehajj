import React from 'react'
import profile from '../../../components/images/profile.png'
import hija from '../../../components/images/hijja2.jpg'

const PilgrimCard = ({s}) => {
  return (
    <div className="applicant_card" key={s.id}>
                <div className="app_card_left">
                  <img src={hija} alt="" />
                </div>
                <div className="app_card_right"> 
                  <div className="app_card_top">
                    <span className='app_ibada_type'>{s.ibada? s.ibada : 'Not selected'}</span>
                    <h5 className='app_ibada_status'>{s.isCompleted? 'Yes Done' : 'Not Done'}</h5>
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
                    <small className='app_agent_n'>{s.agentName? s.agentName : 'Not Selected'}</small>
                  </div>
                </div>
      
    </div>
  )
}

export default PilgrimCard
