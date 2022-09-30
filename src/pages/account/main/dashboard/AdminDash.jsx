import React from 'react'
import { useAuth } from '../../../../hooks/useAuth';
import useData from '../../../../hooks/useData';
import moment from 'moment'
// import ApplicationTrend from '../ApplicationTrend';
// import PligrimCard from '../../../pilgrims/PligrimCard';
import PilgrimCard from '../../pilgrim/PilgrimCard';
import { Navigate, useNavigate } from 'react-router-dom';




const AdminDash = () => {
    const {  user } = useAuth();
    const { pilgrims, agents, admins } = useData();
    const isAdmin = admins?.find(a => a.userId === user.uid)
    const navigate = useNavigate()

  return (
    <div className="main_body">
    <div className="main_top_wrapper">
      <div className="acc_main_top">
        <div className="acc_body_card">
          <small>Assalaam Aleykum</small>
          <h2>{isAdmin?.fname+" "+isAdmin?.lname}, {isAdmin?.position}</h2>
        </div>
        <div className="acc_body_card">
          <small>Pilgrims Applicants</small>
          <h2>{pilgrims?.length}</h2>
        </div>
        <div className="acc_body_card">
          <small>Agents</small>
          <h2>{agents.length}</h2>
        </div>             
      </div>          

    
      <div className="admin_main_top_2">
        <h3 className='acc_sub_title'>Recent Agents</h3>
        <div className="acc_inner_agents_1">                  
            {agents && agents.reverse().slice(0,3).map(a => (
              <div className="Inner_agent_card" key={a.id} onClick={() =>navigate(`/profile/${a.id}`)}>
                <span className="agent_logo1"><img src={a?.logo} alt="" /></span>                        
                  <div className="post_card_inner">
                    <h3>{a.coName}</h3>
                    <small>Created {moment(a?.createdAt?.toDate()).fromNow()}</small>
                  </div>                 
              </div> 
            ))}                     
                
        </div>
      </div>
  </div>
  <div className="admin_main_body">
    <div className="acc_main_left">
      <h3 className='acc_sub_title'>Recent Pilgrims Applicants</h3>
      <div className="main_admin_inner">              
        <table className='table'>
          <thead>
            <th>Photo</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Ibada Type</th>
            <th>Created At</th>
            <th>Application Status</th>
            <th>Agent Name</th>
            <th>Action</th>
          </thead>
          <tbody>
            {pilgrims?.reverse().slice(0,3).map(d=> (
              <PilgrimCard pil={d} key={d.id}/>
            ))}               
          </tbody>
        </table>
      </div>
    </div>
    {/* <div className="acc_main_right">  
      <ApplicationTrend/>
    </div> */}
    
  </div> 
</div>
  )
}

export default AdminDash
