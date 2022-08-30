import React from 'react'
import { useAuth } from '../../../hooks/useAuth'
import useData from '../../../hooks/useData';
import ApplicationTrend from './ApplicationTrend';
import moment from 'moment'
import './main.css'

const Main = () => {

    const {  user } = useAuth();
    const { users, pilgrims, agents, dashAgents, dashPilgrims } = useData();
    const cuUser = users && users.find(u => u.id === user.uid)

    const ageId = agents && agents.find(a => a.id === cuUser.agentId)

    const agentId = pilgrims && pilgrims.find(p => p.userId === user.uid)?.agent
    const pilgrim = pilgrims && pilgrims.find(p => p.userId === user.uid)
    const agent = agents && agents.find(a => a.id === agentId)

    const isPilgrim = users && users.find(u => u.id === user.uid)?.typeOf === 'pilgrim'
    const isAgent = users && users.find(u => u.id === user.uid)?.typeOf === 'agent'
    const isAdmin = users && users.find(u => u.id === user.uid)?.typeOf === 'admin'
    const isMission = users && users.find(u => u.id === user.uid)?.typeOf === 'mission'
    const agentPilgrims = users && users.filter(a =>a.typeOf === 'pilgrim' )
    const activeAgentPilgrims = agentPilgrims && agentPilgrims.filter(a => a?.agentId === ageId?.id)

    console.log('isAgent', isAgent)
    console.log('isPligrim', isPilgrim)
    console.log('isMission', isMission)
    console.log('isAdmin', isAdmin)
    console.log('dashAgents', dashAgents)

    // const q = query(agents, limit(3))

    // console.log('q', q)

    const RenderDashboard = () => {
      if(isAdmin){
        return (
          <div className="main_body">
            <div className="main_top_wrapper">
              <div className="acc_main_top">
                <div className="acc_body_card">
                  <small>Assalaam Aleykum</small>
                  <h2>{cuUser?.fname} {cuUser?.lname}(Admin)</h2>
                </div>
                <div className="acc_body_card">
                  <small>Applicants</small>
                  <h2>{pilgrims?.length}</h2>
                </div>
                <div className="acc_body_card">
                  <small>Agents</small>
                  <h2>{agents.length}</h2>
                </div>             
              </div>          

            
              <div className="acc_main_top_2">
                <h3 className='acc_sub_title'>Recent Agents</h3>
                <div className="acc_inner_agents_1">                  
                    {dashAgents && dashAgents.map(a => (
                      <div className="Inner_agent_card" key={a.id}>
                        <span className="agent_logo">{a.coName[0]}</span>                        
                          <div className="post_card_inner">
                            <h3>{a.coName}</h3>
                            <small>Created {moment(a.timeStamp?.toDate()).fromNow()}</small>
                          </div>                 
                      </div> 
                    ))}                     
                        
                </div>
              </div>
          </div>
          <div className="acc_main_body">
            <div className="acc_main_left">
              <h3 className='acc_sub_title'>Recent Applicants</h3>
              <div className="main_pilgrims_inner">              
                <table className='table'>
                  <thead>
                    <th>Name</th>
                    <th>Sex</th>
                    <th>Age</th>
                    <th>Ibada Type</th>
                    <th>Created At</th>
                    <th>Application Status</th>
                    <th>Agent Name</th>
                  </thead>
                  <tbody>
                    {dashPilgrims && dashPilgrims.map(d=> (
                      <tr key={d.id}>
                        <td data-label='Name'>{d.fname} {d.lname}</td>
                        <td data-label='Sex'>{d.gender}</td>
                        <td data-label='Age'>32</td>
                        <td data-label='Ibada Type'>{d.ibada}</td>
                        <td data-label='Created At'>{moment(d.createdAt?.toDate()).fromNow()}</td>
                        <td data-label='Application Status'>{d.status}</td>
                        <td data-label='Agent'>{d.agentName}</td>
                      </tr>
                    ))}               
                  </tbody>
                </table>
              </div>
            </div>
            <div className="acc_main_right">
              {/* <h3>Application trend in a week</h3> */}
              <ApplicationTrend/>
            </div>
            
          </div> 
        </div>
        )
      }else if(isPilgrim){
        return (
          <div className="acc_body">
          <div className="acc_body_top">
            <div className="acc_body_card">
              <small>Assalaam Aleykum</small>
              <h2>{cuUser?.fname} {cuUser?.lname}</h2>
            </div>
            <div className="acc_body_card">
                <small>Role</small>
                <h2>{isAgent? 'Agent': isAdmin ?'Admin': isMission? 'Mission' : 'Pilgrim'}</h2>
              </div> 
            {isPilgrim && 
             <>            
              <div className="acc_body_card">
                <small>Ibada Selected</small>
                <h2>{pilgrim? pilgrim.ibada : 'No application'}</h2>
              </div>
              <div className="acc_body_card">
                <small>Agent</small>
                <h2>{agent? agent.coName : 'No application'}</h2>
              </div>
              <div className="acc_body_card">
                <small>Application Status</small>
                <h2>{pilgrim? pilgrim.status : 'No application'}</h2>
              </div>            
            </>
            }
            {isAgent && 
              <div className="acc_body_card">
                <small>Applicants</small>
                <h2>{activeAgentPilgrims?.length}</h2>
              </div> 
            
            }
             { isMission && <>
              <div className="acc_body_card">
                <small>Applicants</small>
                <h2>{pilgrims?.length}</h2>
              </div>
              <div className="acc_body_card">
                <small>Agents</small>
                <h2>{agents.length}</h2>
              </div>
             
             </>
              
            
            }
                      
            
          </div>
          <div className="acc_body_middle">
            <div className="acc_body_middle_left">
              <h3 className='acc_sub_title'>Recent Topics</h3>
              <div className="acc_inner_items">
                <div className="Inner_post_card">
                {/* <div className="home_blog_card"> */}
                    <h1 className='post_index'>01</h1>
                    <div className="post_card_inner">
                      <h2>Namna ya kyfanya Umrah - Hatua kwa Hatua</h2>
                      <p>Kufanya Umrah kunahitaji uratatibu mzuri wa kuonesha kufanya umara</p>
                      <button  className='btn_index'>Soma Zaidi</button>
                    </div>
                 
                </div>
                {/* <div className="Inner_post_card">
               
                    <h1  className='post_index'>02</h1>
                    <div className="post_card_inner">
                      <h2>Namna ya kyfanya Umrah - Hatua kwa Hatua</h2>
                      <p>Kufanya Umrah kunahitaji uratatibu mzuri wa kuonesha kufanya umara</p>
                      <button className='btn_index'>Soma Zaidi</button>
                    </div>
                 
                </div> */}
                <div className="Inner_post_card">
                {/* <div className="home_blog_card"> */}
                    <h1  className='post_index'>03</h1>
                    <div className="post_card_inner">
                      <h2>Namna ya kyfanya Umrah - Hatua kwa Hatua</h2>
                      <p>Kufanya Umrah kunahitaji uratatibu mzuri wa kuonesha kufanya umara</p>
                      <button  className='btn_index'>Soma Zaidi</button>
                    </div>
                 
                </div>
              </div>
              <div className="view_all">
                 <button className='btn_all'>View All</button>
              </div>
             
            </div>
            <div className="acc_middle_right">
              <h3 className='acc_sub_title'>Questions and Answers</h3>
              <h4>Kufanya ibada ya hijja na ukapatwa na hedhi, hapo utafanayeje?</h4>
              <h4>Kufanya ibada ya hijja na ukapatwa na hedhi, hapo utafanayeje?</h4>
              <h4>Kufanya ibada ya hijja na ukapatwa na hedhi, hapo utafanayeje?</h4>
              <h4>Kufanya ibada ya hijja na ukapatwa na hedhi, hapo utafanayeje?</h4>
            
              <button className='btn_all'>View all</button>
            </div>
            
          </div>
          
        </div>
        )
      }
    }
  

  return (
   <>
   {RenderDashboard()}
   </>
  )
}

export default Main
