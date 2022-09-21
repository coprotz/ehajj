import React from 'react'
import { useNavigate } from 'react-router-dom'
import './footer.css'

const Footer = () => {
  const navigate = useNavigate()
  return (
    <div className="acc_footer">
        <div className="acc_footer_left">
            <small>Powered by BarruTech</small>
        </div>
        <div className="acc_footer_right">
            <small onClick={() =>navigate('/')}>Home</small>    
            <small onClick={() =>navigate('/about')}>About</small>          
            <small onClick={() =>navigate('/agents')}>Agents</small>
            <small onClick={() =>navigate('/blogs')}>Blogs</small>
            <small onClick={() =>navigate('/contact')}>Contact</small>         
            <small onClick={() =>navigate('/terms')}>Terms</small>
            <small onClick={() =>navigate('/help')}>Help</small>
            <small onClick={() =>navigate('/privacy')}>Privacy</small>
        </div>
    </div>
  )
}

export default Footer
