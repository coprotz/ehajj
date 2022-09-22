import React, { useEffect } from 'react'
// import Sheikh from '../../components/images/sheikh.jpg'
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaArrowLeft,FaArrowRight } from "react-icons/fa";
import { useNavigate, useParams, NavLink } from 'react-router-dom'
// import { agents } from '../../database';
import Main from '../main/Main';
import UserTopbar from '../../components/userTopbar/UserTopbar';
import useData from '../../hooks/useData';
import Navbar from '../../components/navbar/Navbar';
import landing from '../../components/images/hajj2.webp'
import { motion } from 'framer-motion';
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
import { TiTick } from "react-icons/ti";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { BsGlobe } from "react-icons/bs";
import LiveChat from './livechat/LiveChat';





const ViewAgent = () => {

    const navigate = useNavigate()
    const { agents } = useData()
    const { id } = useParams();
    const agent = agents?.find((a) => a.id === id)

    // console.log('id', id)

    // console.log('agents', agent?.region[0])

    useEffect(() => {
        window.scrollTo(0,0);
    },[id])

    const phoneNumber = '+255767157057'

    const simulateCall = phoneNumber => window.open(`tel:${phoneNumber}`, '_self');

    const callHandler = phoneNumber => () => {
        // I want to do something here then make a call
        simulateCall(phoneNumber);
      };

  return (
        <div className='view_agent'>
            <Navbar/>
            <div className="view_landing_top">
                <button onClick={() => navigate(-1)} className='btn_agent_view'><FaArrowLeft/></button>
                <div className="view_landing_menu">
                    {/* <a href='#home'>Home</a>
                    <a href='#about'>About</a>
                    <a href='#packages'>Packages</a>                  
                    <a href='#contacts'>Contacts</a> */}
                    <h4 className='view_land_menu'>{agent?.coName}</h4>
                </div>
                <div></div>
            </div>
            <div className="sections_container">
                <LiveChat id={id}/>

            
            <section className="view_home" id='home'>
                <div className="view_landing_img">
                    <img src={landing} alt="" />
                </div>
                <motion.div 
                        initial={{ x: '100vw'}}
                        animate={{x: 1}} 
                        transition={{ ease: "easeOut", duration: 0.5 }}
                    className="view_agent_top">
                    <h1 className='view_agent_title'>{agent?.coName || agent?.name}</h1>
                </motion.div>
            </section>
            <section className='view_about' id='about'>
                <h3 className='sec_title'>About Us</h3>
                <p><RiDoubleQuotesL/>{agent?.desc}<RiDoubleQuotesR/></p>
            </section>
            <section className='view_container_2'  id='packages'>
                <h3 className='sec_title'>Our Packages</h3>
                <div className="view_packages">
                    <div className="packages_wrapper">
                        <h1 className='start_journey'>Start your journey with us.</h1>
                        <div className="packg_contact">
                            For  more information about our packages, please contact us!
                        </div>
                    </div>
                    <div className="packages_inners">
                        {/* <h1>Our Packages</h1>
                        <h4>Something to show here</h4> */}
                        <div className="packages_container">
                            <div className="package_hijja">
                                <h1 className='pack_name'>Hijjah Package</h1>
                                <h1 className='pack_cost' style={{color: '#36668d'}}>$ {agent?.cost}</h1>
                                <div className="package_items">
                                    {agent && agent?.services.map((a, index) => (
                                    <div className="pack_items_inner" key={index}>
                                        <span><TiTick/></span>
                                        <h4>{a}</h4>
                                    </div>
                                    ))}
                             
                                </div>
                                

                            </div>
                            <div className="package_umrah">
                            <h1 className='pack_name' style={{color: 'white'}}>Umrah Package</h1>
                                <h1 className='pack_cost' >$ {agent?.cost}</h1>
                                <div className="package_items">
                                    {agent && agent?.services.map((a, index) => (
                                    <div className="pack_items_inner" key={index}>
                                        <span style={{border:'1px solid white'}}><TiTick/></span>
                                        <h4 style={{color:'white'}}>{a}</h4>
                                    </div>
                                    ))}
                             
                                </div>            
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='view_contacts' id='contacts'>
                <h1 className='contact_view_title'>Contact Us</h1>
                <div className="contact_items_media">
                    <a href='tel:+255767157057' target='_top' className='contact_link'><FiPhoneCall/></a>
                    <a href='mailto:qsallya@gmail.com?Subject=Need%20Help' target='_top' className='contact_link'><MdOutlineAlternateEmail/></a>
                    <a href='https://tabibuchat.netlify.app' target='_blank' className='contact_link'><BsGlobe/></a>
                </div>
                <div className="contact_items_social">

                </div>

            </section>
            </div>
          
        </div>
        
     
    
  )
}

export default ViewAgent