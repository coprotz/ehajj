import React from 'react'
import {motion} from 'framer-motion'
import { useNavigate } from 'react-router-dom';
import { BiArrowBack} from "react-icons/bi";
import useData from '../../../hooks/useData';
import moment from 'moment'
import { useAuth } from '../../../hooks/useAuth';
import {  BsChatLeftText, BsEye, BsPencil } from "react-icons/bs";
import './pilgrims.css'


import Search from '../../../components/search/Search';
import { GoGraph } from "react-icons/go";
import { useTranslation } from "react-i18next";
import { useState } from 'react';
// import Reports from '../reports/Reports';
import { GrClose } from "react-icons/gr";
import PilgrimCard from './PilgrimCard';
import ChangeStatus from '../../../components/changeStatus/ChangeStatus';
import NewChat from '../message/NewChat';
import ViewProfile from '../../../components/viewProfile/ViewProfile';

const Pilgrims = () => {
    const { t } = useTranslation();

    const { users, pilgrims, agents } = useData()
    const navigate = useNavigate();
    const { user } = useAuth();
    const cuUser = users && users.find(u => u.id === user.uid)
    const isAgent = users && users.find(u => u.id === user.uid)?.typeOf === 'agent'
    const agentPilgrims = pilgrims && pilgrims.filter(a =>a.agent === cuUser.agentId)


    const [report, setReport] = useState(null)
    const [action, setAction] = useState(null)

    const RenderRole = () => {
      if(isAgent){
        return (
          <div className="users_inner">
          <span className='page_heading_1'>List of Pilgrims applied with this Firm</span>
          <table className='table'>
            <thead>
              <th>Photo</th>
              <th>Name</th>
              <th>Sex</th>
              <th>Age</th>
              <th>Ana Passpoti?</th>
              <th>Hali ya Ndoa</th>
              <th>Kajiunga</th>
              <th>Ameshalipa?</th>
              <th>Hatua Iliyofikia</th>
              <th>Action</th>
            </thead>
            <tbody>
              {agentPilgrims && agentPilgrims.map(pil => (
                 <tr>
                  <td data-label='Picha'><img src={pil?.photo} alt="" /></td>
                  <td data-label='Jina'>{pil?.fname} {pil?.lname}</td>
                  <td data-label='Jinsia'>{pil?.gender}</td>
                  <td data-label='Umri'>{pil?.dob}</td>
                  <td data-label='Ana Pasipoti?'>{pil?.passNo !== ''? 'Ndio' : 'Hapana'}</td>
                  <td data-label='Hali ya Ndoa'>{pil?.marital}</td>
                  <td data-label='Kajiunga'>{moment(pil?.createdAt?.toDate()).fromNow(true)}</td>
                  <td data-label='Ameshalipa?'>{pil?.isPaid? 'Ndio' : 'Hapana'}</td>
                  <td data-label='Hatua Iliyofikia'>{pil?.status}</td>
                  <td data-label='Chukua Hatua'>
                    <div className="actions_btns">
                      <ChangeStatus id={pil?.id}/>
                      <ViewProfile id={pil?.id}/>
                      <NewChat s={pil?.userId} name={pil?.fname+" "+pil?.lname}/>                
                    </div>
                  </td>
                  
                </tr>
                ))}
            
            </tbody>
          </table>
        </div>
        )
      }else{
        return (
          <div className="users_inner">
          {/* <span className='page_heading_1'>List of Applicants</span> */}
          <div className="appli_layout">
            <div className="appli_search">
              <Search/>
            </div>
            {/* <div className="appli_report" onClick={() => setReport(!report)}>
              {report? <GrClose/>: <><GoGraph/>{t('report')}</>}
            </div> */}
          </div>
        
          <div className={report? 'grid_hide' : "applicants_grid"} >
            {pilgrims && pilgrims.map(s=> (              
              <PilgrimCard s={s} key={s.id}/>
           
           
            ))}
        </div>
        {/* <div className={report? 'show_report' : "hide_report"} >
          <Reports agents={agents}/>
        </div> */}
         </div>
        )
      }
    }

  return (
    <motion.div 
      initial={{ opacity: 0}}
      animate={{opacity: 1}} 
      transition={{ ease: "easeOut", duration: 0.5 }}
      className="users_wrapper"> 
        <h3 className='message_head'><BiArrowBack onClick={() =>navigate('/account/main')}/>Pilgrims</h3>
        {RenderRole()}
             
      </motion.div>
  )
}

export default Pilgrims
