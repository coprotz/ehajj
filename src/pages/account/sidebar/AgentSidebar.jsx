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
    BsFillGearFill,
    BsQuestionSquareFill
    } from "react-icons/bs";
import { useAuth } from '../../../hooks/useAuth';
import { MdSupportAgent } from "react-icons/md";
import useData from '../../../hooks/useData';
import { useNavigate, NavLink } from 'react-router-dom'
    
  


const AgentSidebar = () => {

    const {  user } = useAuth();
    const { users, pilgrims, agents, admins, mission } = useData();
    const cuUser = users && users.find(u => u.id === user.uid)
    const isPilgrim = pilgrims && pilgrims.find(u => u.id === user.uid)
    const isAgent = agents?.find(a => a?.users?.includes(`${user.uid}`)) || agents?.find(a => a?.createdBy === user?.uid)
    const isAdmin = admins && admins.find(u => u.userId === user.uid)
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
      {isAdmin&&
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
      {isPilgrim &&<>
        <NavLink to='visa' className="agent_menu_item">
          <BsClipboardCheck/>
          <small>Visa</small>
        </NavLink>
        <NavLink to='ticket' className="agent_menu_item">
          <BsReverseLayoutSidebarInsetReverse/>
          <small>Tickets</small>
        </NavLink>   
      </>}
      {isAgent &&<>
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
      </NavLink>
      }
       <NavLink to='support' className="agent_menu_item">
        < BsQuestionSquareFill/>
        <small>Support</small>
      </NavLink>
      <NavLink to='authority' className="agent_menu_item">
        <BsFillGearFill/>
        <small>Authority</small>
      </NavLink>
    </div>
  )
}

export default AgentSidebar
