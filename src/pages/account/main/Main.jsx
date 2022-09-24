import React from 'react'
import { useAuth } from '../../../hooks/useAuth'
import useData from '../../../hooks/useData';
import './main.css'
import AgentDash from './dashboard/AgentDash';
import { questions, teachings } from '../../../hooks/data';
import { useNavigate } from 'react-router-dom'
import AdminDash from './dashboard/AdminDash';
import PilgrimDash from './dashboard/PilgrimDash';
import Navbar from '../navbar/Navbar';
import AgentSidebar from '../sidebar/AgentSidebar';
import MissionDash from './dashboard/MissionDash';

const Main = () => {

    const {  user } = useAuth();
    const { users, pilgrims, agents, dashAgents, dashPilgrims, mission } = useData();
    const cuUser = users && users.find(u => u.id === user.uid)
    const navigate = useNavigate()
    const ageId = cuUser?.agentId

    const agent = agents && agents.find(p => p.id === ageId)
    const pilgrim = pilgrims && pilgrims.find(p => p.userId === user.uid)
    // const agent = agents && agents.find(a => a.id === ageId)

    const isPilgrim = users && users.find(u => u.id === user.uid)?.typeOf === 'pilgrim'
    const isAgent = users && users.find(u => u.id === user.uid)?.typeOf === 'agent'
    const isAdmin = users && users.find(u => u.id === user.uid)?.typeOf === 'admin'
    const agentPilgrims = users && users.filter(a =>a.typeOf === 'pilgrim' )
    const activeAgentPilgrims = agentPilgrims && agentPilgrims.filter(a => a?.agentId === ageId)

    const cuMission = mission && mission.find(m => m?.userId === user.uid)

    // console.log('mission', cuMission)

   

    // console.log('agent', agent)
    // console.log('isPligrim', isPilgrim)
    // console.log('isMission', isMission)
    // console.log('isAdmin', isAdmin)
    // console.log('agentUsers', agentUsers)

    // const q = query(agents, limit(3))

    // console.log('q', q)

    const RenderDashboard = () => {
      if(isAdmin){
        return (
         <AdminDash/>
        )
      }else if(isPilgrim){
        return (
         <PilgrimDash/>
        )
      }else if(isAgent){
        return (
         <AgentDash />
        )
      }else if(cuMission){
        return (
          <MissionDash/>
        )
      }else{
        return (
          <h1>Error 404</h1>
        )
      }
    }
  

  return (
   <div className='account_main_wrapper'>     
      {RenderDashboard()}
   </div>
  )
}

export default Main
