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
import useData from '../../../hooks/useData';
import { useNavigate, NavLink } from 'react-router-dom'
    
  


const AgentSidebar = () => {

    const {  user } = useAuth();
    const { users, pilgrims, agents, dashAgents, dashPilgrims } = useData();
    const cuUser = users && users.find(u => u.id === user.uid)
    const isPilgrim = users && users.find(u => u.id === user.uid)?.typeOf === 'pilgrim'
    const isAgent = users && users.find(u => u.id === user.uid)?.typeOf === 'agent'
    const isAdmin = users && users.find(u => u.id === user.uid)?.typeOf === 'admin'
    const isMission = users && users.find(u => u.id === user.uid)?.typeOf === 'mission'
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
        <small>Applicants</small>
      </NavLink>}
      <NavLink to='payments' className="agent_menu_item">
        <BsFillCreditCard2BackFill/>
        <small>Payments</small>
      </NavLink>
      <NavLink to='messages' className="agent_menu_item">
        <BsChatSquareDotsFill/>
        <small>Messages</small>
      </NavLink>
      <NavLink to='visa' className="agent_menu_item">
        <BsClipboardCheck/>
        <small>Visa</small>
      </NavLink>
      <NavLink to='ticket' className="agent_menu_item">
        <BsReverseLayoutSidebarInsetReverse/>
        <small>Tickets</small>
      </NavLink>
      {!isPilgrim &&
      <NavLink to='reports' className="agent_menu_item">
        <BsBarChartLineFill/>
        <small>Reports</small>
      </NavLink>}
    </div>
  )
}

export default AgentSidebar
