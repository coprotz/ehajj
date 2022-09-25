import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import { BiChevronsLeft } from "react-icons/bi";
import { news, questions, teachings } from '../../hooks/data';
import {motion} from 'framer-motion'
import './blogs.css'
import { RiDeleteBin5Fill,RiEditFill, RiPencilFill, RiShareLine, RiWhatsappFill,RiFacebookCircleFill,RiMailFill } from "react-icons/ri";
import { useState } from 'react';
import Footer from '../account/footer/Footer';
import { useTranslation } from "react-i18next";
import { useEffect } from 'react';
import parser from 'html-react-parser'



const ViewBlog = ({showMenu, setShowMenu}) => {
    const { t } = useTranslation();
    const { id } = useParams();
    const navigate = useNavigate();
    const [showBtn, setShowBtn] = useState(null)
    const blog = teachings && teachings.find(c => c.id === id) || news && news.find(c => c.id === id) || questions && questions.find(c => c.id === id)
    const url = `https://ehajj-tz.netlify.app/blogs/${id}`

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

  return (
    <div className='view_blog'>
        <Navbar showMenu={showMenu} setShowMenu={setShowMenu}/>
        <motion.div 
          initial={{ x: '-100vw'}}
          animate={{x:0}} 
          transition={{ ease: "easeOut", duration: 0.5 }} 
            className="view_blog_body">
                <div className="blog_top">
                     <div className="page_back">
                        <button className='btn_btn_back' onClick={() =>navigate(-1)}><BiChevronsLeft/></button> {t('blogs')} - {t(`${blog.title}`)}
                    </div> 
                    <div className="blog_action">
                        <div className="btn_action" onMouseEnter={() =>setShowBtn(1)} onMouseLeave={() =>setShowBtn(null)}>
                            <button className='btn'><RiShareLine/></button>
                            {showBtn === 1 &&
                            <div className="btn_shares">
                                <small>share:</small>
                                <a href={`https://wa.me/?text=${url}`} target='_blanck' className='svg_what'><RiWhatsappFill/></a>
                                <a href={`https://wa.me/?text=${url}`} target='_blanck' className='svg_mail'><RiMailFill/></a>
                                <a href={`https://wa.me/?text=${url}`} target='_blanck' className='svg_face'><RiFacebookCircleFill/></a>
                            </div>}
                        </div>   
                        <div className="btn_action" onMouseEnter={() =>setShowBtn(2)} onMouseLeave={() =>setShowBtn(null)}>
                            <button className='btn btn_red'><RiDeleteBin5Fill/></button>
                            {showBtn === 2 &&
                            <div className="btn_shares">
                                <small>Delete</small>                                
                            </div>}
                        </div> 
                        <div className="btn_action" onMouseEnter={() =>setShowBtn(3)} onMouseLeave={() =>setShowBtn(null)}>
                        <button className='btn'><RiEditFill/></button>  
                            {showBtn === 3 &&
                            <div className="btn_shares">
                                <small>Edit</small>                                
                            </div>}
                        </div> 
                        <div className="btn_action" onMouseEnter={() =>setShowBtn(4)} onMouseLeave={() =>setShowBtn(null)}>
                            <button className='btn'><RiPencilFill/></button>
                            {showBtn === 4 &&
                            <div className="btn_shares">
                                <small>Create New</small>                                
                            </div>}
                        </div> 

                        
                                              
                        
                    </div>
                </div>
           
            <div className="blog_inner">
                <h1 className='blog_inner_title'> {t(`${blog.title}`)}</h1>
                <span>{t('posted')}</span>
            </div>
            <div className="blog_inner_img">
                <img src={blog.url} alt="" />
            </div>
            <div className="blog_inner_body">
                {parser(t(`${blog.body}`))}
            </div>
            
        </motion.div>
        <Footer/>
    </div>
  )
}

export default ViewBlog
