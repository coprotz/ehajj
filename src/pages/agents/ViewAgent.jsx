import React, { useEffect } from 'react'
// import Sheikh from '../../components/images/sheikh.jpg'
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaArrowLeft,FaArrowRight } from "react-icons/fa";
import image1 from '../../components/images/imag1.jpg'
import image2 from '../../components/images/image2.jpg'
import image3 from '../../components/images/image3.jpg'
import image4 from '../../components/images/image4.jpg'
import image5 from '../../components/images/image5.jpg'
import { useNavigate, useParams } from 'react-router-dom'
import { agents } from '../../database';
import Main from '../main/Main';



const ViewAgent = ({ setCurrentAgent }) => {

    const navigate = useNavigate()
    const { id } = useParams();
    const agent = agents?.find((a) => a.id === id)

    console.log('id', id)

    // console.log('agents', agent?.region[0])

    useEffect(() => {
        window.scrollTo(0,0);
    },[id])

  return (
    <div className='home'>
        <Main/>
        <div className='agents_wrapper'>
        <div className="agents_inner">
            <div className="page_title_wrapper agent_top">
                <h1 className='page_title'><FaArrowLeft onClick={() => navigate('/agents')}/>Mawakala</h1>
                <button className='page_next' onClick={() => navigate('/teachings')}><FaArrowRight /></button>
            </div>
            <div className="agent_body_wrapper">
                <div className='view_agent'>
                    <div className="view_agent_top">
                    <small>{agent?.name}</small> 
                    <button onClick={() => navigate('/agents')} className='btn_close'>Close</button> 
                    </div>
                    <div className="view_body">
                        <div className="view_agent_details">
                            <div className="view_agent_name_inner">
                                <h1 className='view_agent_title'>{agent?.name}</h1>
                                <small>Tokea: {agent?.since}</small>
                                <div className="agent_social">
                                    <FaFacebook/>
                                    <FaTwitter/>
                                    <FaInstagram/>
                                    <FaYoutube/>
                                </div>
                            </div>
                            <div className="view_agnet_2">
                                <div className="agent_other">
                                    <small>Kuhusu Sisi</small>
                                    <p>{agent?.other}</p>
                                    <div className="agent_view_exp">
                                        <div className="agent_view_exp_card">
                                            <h1>{agent?.cost}</h1>
                                            <small>Ghalama Zetu</small>
                                        </div>
                                        <div className="agent_view_exp_card">
                                        <ul>{agent?.services.map((r, index) => (
                                                <li key={index}>{r}</li>
                                                ))}
                                            </ul>
                                            <small>Huduma</small>
                                        </div>
                                        <div className="agent_view_exp_card">
                                            <h1>{agent?.region.length}</h1>
                                            <small>Tupo Mikoa</small>
                                        </div>
                                        {/* <div className="agent_view_exp_card">
                                            <h1>4 Stars</h1>
                                            <small>Tunakubalika</small>
                                        </div> */}
                                    </div>
                                </div>
                            
                            </div>
                    
                        </div>
                    
                        
                    </div>
                    <div className="agent_other new_back1">
                        <small>Mahujaji wetu katika Picha</small>
                        <div className="view_agent_photo_garries">
                            <div className="agent_photo_garrey">
                                <img src={image1} alt="" />
                                <div className="image_desc">
                                    <span>Mahujaji 2022</span>
                                </div>
                            </div>
                            <div className="agent_photo_garrey">
                                <img src={image2} alt="" />
                                <div className="image_desc">
                                    <span>Mahujaji 2022</span>
                                </div>
                            </div>
                            <div className="agent_photo_garrey">
                                <img src={image3} alt="" />
                                <div className="image_desc">
                                    <span>Mahujaji 2022</span>
                                </div>
                            </div>
                            <div className="agent_photo_garrey">
                                <img src={image4} alt="" />
                                <div className="image_desc">
                                    <span>Mahujaji 2022</span>
                                </div>
                            </div>
                            <div className="agent_photo_garrey">
                                <img src={image5} alt="" />
                                <div className="image_desc">
                                    <span>Mahujaji 2022</span>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="agent_other new_back">
                        <small>Wasisliana Nasi</small>
                        <div className="agent_locations">
                            <div className="view_agent_location">
                                {agent?.office && agent.office.map((item, index) => (
                                <div className="agent_view_location_card" key={index}>
                                    <span>{item.building}, {item.street}</span>
                                    <span>{item.district}, {item.region}</span>
                                    <div>{item?.mobile.map((m, i) => (
                                        <small key={i}>{m}</small>
                                        ))}
                                    </div>
                                </div> 
                                ))}
                                
                                {/* <div className="agent_view_location_card">
                                    <span>Ground Floor, Central Building, Mapeo Street</span>
                                    <span>Manzese, Arusha</span>
                                    <div>{agent?.mobile.map((m, index) => (
                                        <small key={index}>{m}</small>
                                            ))}
                                    </div>
                                </div>
                                <div className="agent_view_location_card">
                                    <span>Ground Floor, Central Building, Mapeo Street</span>
                                    <span>Manzese, Arusha</span>
                                    <div>{agent?.mobile.map((m, index) => (
                                        <small>{m}</small>
                                        ))}
                                    </div>
                                </div> */}
                            </div>
                            <div className="form_contact_agent">
                                <div className="agent_inputs">
                                    <label htmlFor="">Jina Kamili</label>
                                    <input type="text" placeholder='Jina Kamili' className='agent_single_input'/>
                                </div>
                                <div className="agent_inputs">
                                    <label htmlFor="">Barua Pepe</label>
                                    <input type="text" placeholder='Barua Pepe' className='agent_single_input' />
                                </div>
                                <div className="agent_inputs">
                                    <label htmlFor="">Namba ya Simu</label>
                                    <input type="text" placeholder='Namba ya Simu' className='agent_single_input'/>
                                </div>
                                <div className="agent_inputs">
                                    <label htmlFor="">Ujumbe</label>
                                    <textarea type="text" placeholder='Ujumbe' className='agent_single_input'></textarea>
                                </div>
                                <div className="agent_inputs">
                                    <button className='btn_home'>Tuma Ujumbe</button>
                                </div>
                            </div>
                                
                        </div>
                            
                    </div>
                    <div className="agent_other">
                        <small>Taasisi zilizo mkoa mmoja na {agent?.name}</small>
                        <div className="agents_lists">
                            {agents && agents.filter((a) =>a.region.includes(agent.region[0])).filter(s => s.id !== agent.id).map((item) => (
                            <div className="agent_card new_back" key={item.id}>
                                <div className="agent_logo">
                                LOGO
                                </div>
                                <h4 className='agent_name' onClick={() => navigate(`/agents/${item.id}`)}>{item.name}</h4>
                                <div>{item.region.map((r, index) => (
                                <span key={index}>{r} </span>
                                ))}</div>
                                <small>{item.cost}</small>
                            </div>
                            ))}
                
                    </div>
                    </div>
                
                    
                </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default ViewAgent