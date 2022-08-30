import {useState, useEffect}from 'react'
import { IoIosLogOut, IoMdSettings, IoMdArrowDropdown, IoMdMore, IoMdClose } from "react-icons/io";
import {motion} from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import logo from '../../components/images/ehajj.png'
import { HiChevronDown } from "react-icons/hi";
import Image from '../../components/images/sheikh.jpg'
import { useAuth } from '../../hooks/useAuth';
import { collection, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import useData from '../../hooks/useData';


const UserTopbar = ({props}) => {

  
    // const { cuPil} = props

    const {users, pilgrims} = useData()


    const { user, logOut, db } = useAuth();

    const cuUser = users.find((u) => u?.id === user?.uid)
    const cuPil = pilgrims.find((p) => p.id === user?.uid)

    // console.log('cuPil', cuPil)

    const navigate = useNavigate()
    const [showMainMenu, setShowMainMenu] = useState(null)
    const [showDrop, setShowDrop] = useState(null)

    const [page, setPage] = useState(1)
    const [showInnermenu, setShowInnerMenu] = useState(null)

    const handleLogout = async (e) => {
        e.preventDefault();

        alert('user', user.id)   
        
    }


  return (
    <div className='user_menu_5'>
         {showMainMenu &&
        <motion.div 
            initial={{ x: '-100vw'}}
            animate={{x:0}} 
            transition={{ ease: "easeOut", duration: 0.5 }}
            className="main_menu_1">
            <div className="main_menu_1_wrapper">
                <button className='btn_close_main_menu' onClick={() => setShowMainMenu(null)}><IoMdClose/></button>
                <h4 onClick={() =>navigate('/')}>Nyumbani</h4>
                <h4 onClick={() =>navigate('/about')}>Kuhusu</h4>
                <h4 onClick={() =>navigate('/services')}>Huduma</h4>
                <h4 onClick={() =>navigate('/agents')}>Wakala</h4>
                <h4 onClick={() =>navigate('/teachings')}>Mafunzo</h4>
                <h4 onClick={() =>navigate('/contact')}>Mawasiliano</h4>
                <h4 onClick={() =>navigate('/account')}>Akaunti Yangu</h4>
                <h4 onClick={() =>navigate('/login')}>Kuingia</h4>
                <h4 onClick={() =>navigate('/register')}>Kujisajiri</h4>
            </div>
            <small className='menu_terms'>Videzo na Masharti</small>
               
        </motion.div>}
        <div className="account_menu1">
            <div className="account_menu_top">
                <div className="image_wrapper">
                    <div className="account_logo" onClick={() =>navigate('/')}>
                        <img src={logo} alt="" /> 
                    </div>
                    <span>Talbiyah</span>
                </div> 
                <div className='user_menu_another'>
                    <div className='account_menu_5 user_side_menu'>
                        <div className="user_photo_img">
                                <img src={Image} alt="" />
                        </div>
                        <div 
                            className="dropShow" onMouseEnter={() => setShowDrop(true)} 
                            onMouseLeave={() => setShowDrop(null)}
                            >
                            <button className='btn_clear' >
                                <HiChevronDown/>                    
                            </button>
                            {showDrop &&
                            <div className="account_dropdown">
                                <span onClick={() => {setPage(8);setShowDrop(null)}} className='user_photo'>
                                    <div className="user_photo_img deopdown" onClick={() =>navigate('/account')}>
                                        <img src={Image} alt="" />
                                    </div >Taarifa Zangu
                                </span>
                                <span onClick={() => {setPage(7);setShowDrop(null)}}><IoMdSettings/>Mpangilio</span>
                                <span onClick={handleLogout}><IoIosLogOut/>Ondoka</span>
                            </div>} 
                        </div>
                    </div> 
                    <button className='btn_main_menu' onClick={() => setShowMainMenu(true)}><IoMdMore/></button>
                </div>
                
            </div>
        </div>
      
    </div>
  )
}

export default UserTopbar
