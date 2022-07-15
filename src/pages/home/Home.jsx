import React from 'react'
import { AiOutlineMenu, AiOutlineTwitter, AiFillInstagram, AiOutlineYoutube, AiFillFacebook } from "react-icons/ai";
import './home.css'
import { CgArrowLongRight } from "react-icons/cg";
import Main from '../main/Main';

const Home = () => {
  return (
    <div className='home'>
        <Main />
        <div className="home_right">
            <div className="home_right_1">
            <AiOutlineMenu/>
            </div>
            <div className="home_right_2">
                <AiOutlineTwitter/>
                <AiFillInstagram/>
                <AiOutlineYoutube/>
                <AiFillFacebook/>
            </div>
            <div className="home_right_3">
                <div className="home_blog">
                    <div className="home_blog_card">
                        <h1>01</h1>
                        <div className="blog_card_inner">
                            <h3>Namna ya kyfanya Umrah - Hatua kwa Hatua</h3>
                            <p>Kufanya Umrah kunahitaji uratatibu mzuri wa kuonesha kufanya umara</p>
                            <button>Soma Zaidi</button>
                        </div>
                    </div>
                    <div className="home_blog_card">
                        <h1>02</h1>
                        <div className="blog_card_inner">
                            <h3>Namna ya kyfanya Umrah - Hatua kwa Hatua</h3>
                            <p>Kufanya Umrah kunahitaji uratatibu mzuri wa kuonesha kufanya umara</p>
                            <button>Soma Zaidi</button>
                        </div>
                    </div>
                </div>
                <div className="to_blog">
                    <CgArrowLongRight/>
                </div>
                
            
            </div>
        </div>
    </div>
  )
}

export default Home