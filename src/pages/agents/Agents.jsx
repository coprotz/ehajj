
import './agents.css'
import { FaArrowLeft,FaArrowRight } from "react-icons/fa";
// import { agents } from '../../database';
import Ban from '../../components/images/ban2.webp'
import {motion} from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Main from '../main/Main';
import UserTopbar from '../../components/userTopbar/UserTopbar';
import Navbar from '../../components/navbar/Navbar';
// import Footer from '../../components/footer/Footer'
import kaaba from '../../components/images/pil.webp'
import useData from '../../hooks/useData';
import Search from '../../components/search/Search'
import { useTranslation } from "react-i18next";
import Footer from '../account/footer/Footer';



const Agents = () => {

  const { t } = useTranslation();

  const navigate = useNavigate();
  const { agents } = useData()
  
  return (
       <motion.div 
        initial={{ x: '100vw'}}
        animate={{x:0}} 
        transition={{ ease: "easeOut", duration: 0.5 }}
        className="agent_body_wrapper"> 
          <Navbar/> 
          <div className="agents_container">
            <div className="agents_inner_1">
                <img src={kaaba} alt="" />
            </div>
            <div className="agents_inner_2">
              <div className="agents_heading">
                  <h1>{t('agent_welcome')}</h1>
              </div> 
              <div className="agent_serach">
                <Search />
              </div>
              <div className="agents_lists">
                
                {agents && agents.filter(a => a.status === 'Approved').map((item) => (
                  <div className="agent_card" key={item.id}>
                    <div className="agent_logo1">
                        {item?.logo? <img src={item.logo} alt=''/> : <span>Logo</span>}
                    </div>
                    <h4 className='agent_name' onClick={() => navigate(`/agents/${item.id}`)}>{item.coName || item.name}</h4>
                    {/* <div>{item.region.map((r, index) => (
                      <span key={index}>{r} </span>
                    ))}
                    </div> */}
                    {/* <small className='agent_cost'>$ {item?.cost}</small> */}
                  </div>
                ))}
              </div>
            </div>
            
          </div> 
                             
         
          <Footer/>
        </motion.div>
   
     
  )
}

export default Agents