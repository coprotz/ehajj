import React from 'react'
import { 
    BsChatLeftText, 
    BsFillGridFill, 
    BsPeopleFill, 
    BsStack, 
    BsFillCreditCard2BackFill,
    BsChatSquareDotsFill, 
    BsClipboardCheck,
    BsReverseLayoutSidebarInsetReverse,
    BsBarChartLineFill,
    BsFillCaretDownFill,
    BsBell
    } from "react-icons/bs";
import { useAuth } from '../../../hooks/useAuth';
import { MdSupportAgent } from "react-icons/md";
import useData from '../../../hooks/useData';
import { useNavigate, NavLink } from 'react-router-dom'
    
  


const AgentSidebar = () => {

    const {  user } = useAuth();
    const { users, pilgrims, agents, dashAgents, dashPilgrims, mission } = useData();
    const cuUser = users && users.find(u => u.id === user.uid)
    const isPilgrim = users && users.find(u => u.id === user.uid)?.typeOf === 'pilgrim'
    const isAgent = users && users.find(u => u.id === user.uid)?.typeOf === 'agent'
    const isAdmin = users && users.find(u => u.id === user.uid)?.typeOf === 'admin'
    const isMission = mission && mission.find(u => u?.userId === user.uid)
  return (
    <div className="agent_menu">
      <NavLink exact to='main' className="agent_menu_item">
        <BsFillGridFill/>
        <small>Dashboard</small>
      </NavLink>
      {!isPilgrim &&
      <NavLink to='users' className="agent_menu_item">
        <BsPeopleFill/>
        <small>Users</small>
      </NavLink>}
      {isPilgrim &&
      <NavLink to='application' className="agent_menu_item">
        <BsStack/>
        <small>Application</small>
      </NavLink>}
      {!isPilgrim &&
      <NavLink to='pilgrims' className="agent_menu_item">
        <BsStack/>
        <small>Pligrims</small>
      </NavLink>}
      {isMission&&
      <NavLink to='agents' className="agent_menu_item">
        <MdSupportAgent/>
        <small>Agents</small>
      </NavLink>}
      <NavLink to='payments' className="agent_menu_item">
        <BsFillCreditCard2BackFill/>
        <small>Payments</small>
      </NavLink>
      <NavLink to='messages' className="agent_menu_item">
        <BsChatSquareDotsFill/>
        <small>Messages</small>
      </NavLink>
      {!isMission &&<>
        <NavLink to='visa' className="agent_menu_item">
          <BsClipboardCheck/>
          <small>Visa</small>
        </NavLink>
        <NavLink to='ticket' className="agent_menu_item">
          <BsReverseLayoutSidebarInsetReverse/>
          <small>Tickets</small>
        </NavLink>   
      </>}
      
      {!isPilgrim &&
      <NavLink to='reports' className="agent_menu_item">
        <BsBarChartLineFill/>
        <small>Reports</small>
      </NavLink>}
    </div>
  )
}

export default AgentSidebar
