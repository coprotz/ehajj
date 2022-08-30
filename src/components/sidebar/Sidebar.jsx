import React from 'react'
import { NavLink } from 'react-router-dom'
import './sidebar.css'

const Sidebar = () => {
    const navLinkStyles = ({ isActive }) => {
        return {
            className: isActive ? 'home_span_active' : 'home_span'
        }
    }
  return (
    <div className="home_menu_items">
        <NavLink className={navLinkStyles} to='/'>Nyumbani</NavLink>
        <NavLink className={navLinkStyles} to='/about'>Kuhusu</NavLink>
        <NavLink className={navLinkStyles} to='/services'>Huduma</NavLink>
        <NavLink className={navLinkStyles} to='/agents'>Mawakala</NavLink>
        <NavLink className={navLinkStyles} to='/teachings'>Mafunzo na Habari</NavLink>                  
        <NavLink className={navLinkStyles} to='/contact'>Mawasiliano</NavLink>
        <NavLink className={navLinkStyles} to='/account'>Akaunti Yangu</NavLink>
    </div>
  )
}

export default Sidebar