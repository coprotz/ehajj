import React, {useState} from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { BiMessageDetail, BiX } from "react-icons/bi";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import useData from '../../../hooks/useData';
import { db, useAuth } from '../../../hooks/useAuth';
import { addDoc, collection } from 'firebase/firestore';
import { BiDotsVerticalRounded } from "react-icons/bi";
import './navbar.css'
import Lang from '../../../components/lang/Lang';
import logo from '../../../components/images/logo1.png'

const Navbar = () => {

    const navigate = useNavigate()
    const { pilgrims, users } = useData();

    const {user, logOut} = useAuth();

    const pilgrimsRef = collection(db, 'pilgrims')
    const [loading, setLoading] = useState(null)
    const [err, setErr] = useState('')
    const cuUser = users && users.find(u => u.id === user.uid)
    const fname = cuUser && cuUser.fname
    const isPilgrim = users && users.find(u => u.id === user.uid)?.typeOf === 'pilgrim'
    const isAgent = users && users.find(u => u.id === user.uid)?.typeOf === 'agent'
    const isAdmin = users && users.find(u => u.id === user.uid)?.typeOf === 'admin'
    const isMission = users && users.find(u => u.id === user.uid)?.typeOf === 'mission'
 

    const addPilgrim = async(e) => {
        e.preventDefault()
    
        setLoading(true)
    
        const data = {
          userId: user.uid,
          status: 'still pending',
          fname: fname,
          gender: '',
          marital: '',
          dob: '',
          photo: '',
          lname: cuUser && cuUser.lname,
          email: cuUser && cuUser.email,
          region: '',
          district: '',
          phone: [],
          ibada: '',
          agent: '',
          passNo: '',
          passIssue: '',
          passExp: '',
          passCopy:'',
          maFname: '',
          maLname:'',
          maRel: '',
          maDob:'',
          maEmail:'',
          maPhone:'',
          maPassNo:'',
          maPassIssue:'',
          maPassExp:'',
          maPassCopy: '',
          nextFname:'',
          nextLname: '',
          nextDob: '',
          nextRel:'',
          nextEmail: '',
          nextPhone: '',
          payMode: '',
          payTime: '',
          payDate: '',
          isCompleted: false,
          isPaid: false,
          amout: '',
    
        }
        try {
          await addDoc(pilgrimsRef, data)
          setLoading(false)
          navigate('/account/application')
        } catch (error) {
          setErr(error.message)
        }
        
    
      }

    const pilgrim = pilgrims && pilgrims.find(p => p.userId === user.uid)

    const [items, setItems] = useState(null)

    // console.log('isAgent', isAgent)
    // console.log('isPli', isPilgrim)

    const [showMenu, setShowMenu] = useState(null)

  return (
    <div className="acc_top_wrapper">
        <div className="acc_left">
            <button className='btn_nav_menu' onClick={() => setShowMenu(true)}><BiDotsVerticalRounded/></button>
            <div className="acc_logo" onClick={() => navigate('/')}><img src={logo} alt=''/></div>
            <div className={showMenu ? 'acc_menu_toggle' : 'acc_menu'}>
                <NavLink to='main' className='nav_item' onClick={() =>setShowMenu(null)}> Dashboard</NavLink> 
                {isPilgrim && <>
                  <NavLink to='visa' className='nav_item' onClick={() =>setShowMenu(null)}>Visa</NavLink>
                  <NavLink to='ticket' className='nav_item' onClick={() =>setShowMenu(null)}>Ticket</NavLink>
                  <NavLink to='application' className='nav_item' onClick={() =>setShowMenu(null)}>Aplication</NavLink>
                  <NavLink to='payments' className='nav_item' onClick={() =>setShowMenu(null)}>Payments</NavLink>
                </>           
                }             
                {isAgent && <>
                  <NavLink to='users' className='nav_item' onClick={() =>setShowMenu(null)}>Users</NavLink>
                  <NavLink to='pilgrims' className='nav_item' onClick={() =>setShowMenu(null)}>Applicants</NavLink>
                  <NavLink to='payments' className='nav_item' onClick={() =>setShowMenu(null)}>Payments</NavLink>
                </>}  
                {isMission && <>
                  <NavLink to='pilgrims' className='nav_item' onClick={() =>setShowMenu(null)}>Applicants</NavLink>
                  <NavLink to='blogs' className='nav_item' onClick={() =>setShowMenu(null)}>Blogs</NavLink>
                  <NavLink to='agents' className='nav_item' onClick={() =>setShowMenu(null)}>Agents</NavLink>
                </>}   
                {isAdmin && <>
                  <NavLink to='pilgrims' className='nav_item' onClick={() =>setShowMenu(null)}>Applicants</NavLink>
                  <NavLink to='blogs' className='nav_item' onClick={() =>setShowMenu(null)}>Blogs</NavLink>
                  <NavLink to='agents' className='nav_item' onClick={() =>setShowMenu(null)}>Agents</NavLink>
                  <NavLink to='reports' className='nav_item' onClick={() =>setShowMenu(null)}>Reports</NavLink>
                </>}        
                <NavLink to='messages' className='nav_item' onClick={() =>setShowMenu(null)}>Messages</NavLink>                
              
                <div className="btn_show">
                  <h4>Talbiyah</h4>
                  <button  onClick={() => setShowMenu(null)}><BiX/></button>
                </div>
                
               
            </div>
        </div>
        <div className="acc_right">
            <div className="not_msg">
              <button><BiMessageDetail/></button>
              <span></span>
            </div>
            <Lang />
            <div className="cuUser_wrapper">
              <span className='cuUser' onClick={()=> setItems(!items)}>{cuUser?.fname} {cuUser?.lname[0]}{!items? <AiFillCaretDown/> : <AiFillCaretUp/>}</span>
              {items &&
              <div className="cuUser_items">
                <span onClick={() => navigate('/')}>Home</span>
                <span>Settings</span>
                <span onClick={() => logOut()}>Log Out</span>
              </div>}
            </div>
            
            {/* {isPilgrim &&
            <button className='btn_navi' onClick={addPilgrim}>Create Hijja</button>} */}
        </div>
    </div>
  )
}

export default Navbar
