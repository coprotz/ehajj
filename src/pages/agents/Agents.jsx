
import './agents.css'
import { FaArrowLeft,FaArrowRight } from "react-icons/fa";
import { agents } from '../../database';
import Ban from '../../components/images/ban2.webp'

import { useNavigate } from 'react-router-dom'
import Main from '../main/Main';

const Agents = () => {

  const navigate = useNavigate() 
  
  return (
    <div className='home'>
      <Main/>
      <div className='agents_wrapper'>
        <div className="agents_inner">
          <div className="page_title_wrapper agent_top">
              <h1 className='page_title'><FaArrowLeft onClick={() => navigate('/services')}/>Mawakala</h1>
              <button className='page_next' onClick={() => navigate('/teachings')}><FaArrowRight /></button>
          </div>
          <div className="agent_body_wrapper">
         
          <>
            <div className="agent_body_inner">
              <div className="agent_body_1">
                <p>Tumeshasajili mawakala zaidi 200 na namba inazidi kuongezeka kila siku. Mawakala hao ni kutoka karibu kila mkoa wa Tanzania, angalia orodha ya chini hapo.</p>
                <button className='btn_agent'>Wakala Tuma Maombi</button>
              </div>
              <div className="agent_img">
                <img src={Ban} alt="" />
              </div>
            </div>
          
            <div className="agents_lists">
              {agents && agents.map((item) => (
                <div className="agent_card" key={item.id}>
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
            </>
           

          </div>
        </div>
      </div>
    </div>
     
  )
}

export default Agents