import React, { useState } from 'react'
import {motion} from 'framer-motion'
import { FaArrowLeft} from "react-icons/fa";
import { useAuth } from '../../../hooks/useAuth';
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'

const CreateUser = ({agents}) => {

    const { signUp, db, auth } = useAuth();

    const confirmedAgents = agents && agents.filter((agent) => agent.isApproved === true)

    // const {cuAgent} = props

     const [data, setData] = useState({
        // fname: '',
        name: '',
        email: '',
        phone: '',
        error: null,
        password: '',
        groupId: '',
        confirmPassword: '',      
        isAdmin: false,      
        loading: false,
    })

    // const [error, setError] = useState(null)

    const navigate = useNavigate()

    const {name, email, phone, password, confirmPassword, groupId, error, loading} = data;

    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }

    const validatePassword = () => {
        let isValid = true
        if (password !== '' && confirmPassword !== ''){
          if (password !== confirmPassword) {
            isValid = false
            // setData({...data, error: 'Maneno ya Siri hayaendani'})
          }
        }
        return isValid
      }

    let isValid = name && email && password && phone && groupId

    const handleSubmit = async e => {
        e.preventDefault();
        setData({...data, err: null, loading: true})
        if(!validatePassword){
            setData({...data, error: 'Maneno ya siri hayaendani'})
        }
        try {
            const res = await signUp(email, password);
            await setDoc(doc(db, 'users', `${res.user.uid}`), {
                // fname: fname,
                name: name,
                phone: phone,
                email: email,
                groupId: groupId,
                ceratetdAt: serverTimestamp(),
                isAdmin: false,
                isApproved: false,
                isOnline: true,
            });
            
            navigate('/success')
        } catch (err) {
            setData({...data, error: err.message, loading: false})
        }

        
    }
  return (
    <div className='register_wrapper'>       
        <h1 className="register_title">Fungua Akaunti - Mtumiaji Mwingine</h1>
        {error  && <span className='error'>{error }</span>}
        <form className="personal_actions" onSubmit={handleSubmit}>
            <div className='personal_inner'>
                <h4>Taasisi</h4>
                <div className="inputs_items down_staires">
                    <select 
                        name="groupId"
                        value={groupId}
                        onChange={handleChange}
                        className='reg_input'
                        >   
                            <option value="">--Chagua Taasisi--</option>
                            {confirmedAgents && confirmedAgents.map(item => (                   
                                 <option 
                                    value={item?.id} 
                                    key={item.id}
                                    >{item.coName}</option>
                            ))}
                            

                    </select>
                                     
                </div>
            </div> 
            <div className='personal_inner'>
                <h4>Majina Kamili</h4>
                <div className="inputs_items down_staires">
                    <input 
                    type="text" 
                    placeholder='Jina Kamili' 
                    className='reg_input'
                    value={name}
                    name= 'name'
                    onChange={handleChange}        
                    />
                    {/* <input 
                    type="text" 
                    placeholder='Jina la Mwisho' 
                    className='reg_input'
                    name='lname'
                    value={lname}
                        onChange={handleChange} 
                    /> */}
                    
                </div>
            </div> 
            <div className='personal_inner'>
                <h4>Mawasiliano</h4>
                <div className="inputs_items down_staires">
                    <input 
                    type="email" 
                    placeholder='Barua Pepe' 
                    className='reg_input'
                    value={email}
                    name= 'email'
                    onChange={handleChange} 
                    />
                    <input 
                    type="tel" 
                    placeholder='Namba ya Simu' 
                    className='reg_input'
                    name='phone'
                    value={phone}
                    onChange={handleChange} 
                    />
                
                </div>
            </div>
            <div className='personal_inner'>
                <h4>Neno la Siri</h4>
                <div className="inputs_items down_staires">
                    <input 
                    type="password" 
                    placeholder='Neno la Siri' 
                    className='reg_input'
                    value={password}
                    name= 'password'
                    onChange={handleChange} 
                    />
                     <input 
                        type="password" 
                        placeholder='Thibitisha neno la Siri' 
                        className='reg_input'
                        name='confirmPassword'
                        onChange={handleChange} 
                    />            
                
                </div>
            </div>
            <div>

            
            <button
                // type='submit'
                // onClick={() =>setStep(harem === 'now'? 4 : 5 )}
                className='btn_reg'
                disabled={!isValid || loading}
                >
                {loading? 'Inatuma...': 'TUMA'}
            </button>
            </div>
        </form>
    </div>
  )
}

export default CreateUser
