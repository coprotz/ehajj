import { updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { AiOutlinePlus,AiOutlineMinus } from "react-icons/ai";
import {motion} from 'framer-motion'
import { BiArrowBack } from "react-icons/bi";
import {  FaTimes } from "react-icons/fa";
import useStorage from '../../../hooks/useStorage';
import Loading from '../../../components/loading/Loading';
// import useStorage from '../../../components/useStorage';


const Personal = ({props}) => {

  const {pilgrim, pilgrimRef, setPage, setErr } = props
  const [loading, setLoading] = useState(null)
  const [dob, setDob] = useState(pilgrim.dob)
  // const [pob, setPob] = useState(pilgrim.pob)
  const [region, setRegion] = useState(pilgrim.region)
  const [district, setDistrict] = useState(pilgrim.district)
  const [marital, setMarital] = useState(pilgrim.marital)
  // const [phone, setPhone] = useState(pilgrim.phone)
  const [file, setFile] = useState(null)
  // const { progress, url } = useStorage(file)
  const { perc, url } = useStorage(file)
  const [error, setError] = useState('')

    
    const [form, setForm] = useState({
        phones: []
    })

    const [phones, setPhones] = useState([''])
    const handleAdd = () => {
        const add = [...phones, []]
        setPhones(add)
    }

    const handleDelete = (index) => {
        const deleteVal = [...phones]
        deleteVal.splice(index, 1)
        setPhones(deleteVal)
    }

    // const handleChange = (data, index) => {
    //     const inputs = [...phones]
    //     inputs[index] = data.target.value;
    //     setPhones(inputs)
    //     setForm({...form, phones: inputs})
    // }

    const types = ['image/png', 'image/jpeg']
    const handleSelect = (e) => {
        let selected = e.target.files[0];  
        if (selected && types.includes(selected.type)){
            setFile(selected)
            setError('')
        }else {
            setFile(null)
            setError('Please select an image file (png or jpeg)')
        }
    }
    

    const handlePersonal = async (e) => {
      e.preventDefault();

      setLoading(true)

      try {
        await updateDoc(pilgrimRef, {
        //  phone,
        //  gender,
         marital,
         dob,     
         region,
         district,  
         photo: url,     
       })
       setPage(4)
       setLoading(null)
     } catch (error) {
       setErr(error.message)
     }
    }
  return (
    <motion.form 
    initial={{ x: '-100vw'}}
    animate={{x:0}} 
    transition={{ ease: "easeOut", duration: 0.5 }} 
    className='appli_items' onSubmit={handlePersonal}>
        <div className="acc_back">
          <BiArrowBack onClick={() => setPage(2)} className='page_back'/>
          <span className='appli_title'>Personal Details</span>
        </div>
       
        <div className="passport_inner">  
          <div className="group_inner_inputs">
            <div className="input_inner">
              <small>Date of Birth</small>
              <input 
                type="date" 
                placeholder='Date of Birth'                 
                className='appli_input' 
                name='dob' 
                value={dob} 
                onChange={e => setDob(e.target.value)}
                />
            </div>
            <div className="input_inner">
              <small>Place of Birth</small>
              <div className="mult_inputs">         
                <select id="" className='appli_input' name='pob' onChange={e => setRegion(e.target.value)}>
                  <option value="">{region !== ''? region : '--Select Region--'}</option>
                  <option value='Tanga'>Tanga</option>
                  <option value='Mwanza'>Mwanza</option>         
                </select>
                <select name="district" id="" className='appli_input' onChange={e => setDistrict(e.target.value)}>
                  <option value="">{district !== ''? district : '--Select District--'}</option>
                  <option value='Kisarawe'>Kisarawe</option>
                  <option value='Handeni'>Handeni</option>         
                </select>
              </div>
            </div>
            {/* <div className="input_inner">
              <small>Gender</small>
              <select name="gender" className='appli_input' onChange={e => setGender(e.target.value)}>
                <option value="">{gender !== ''? gender : '--Select Gender--'}</option>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>         
              </select>
            </div> */}
            <div className="input_inner">
              <small>Marital Status</small>
              <select name="marital" id="" className='appli_input' onChange={e => setMarital(e.target.value)}>
                <option value="">{marital !== ''? marital : '--Select Marital Status--'}</option>
                <option value='Married'>Married</option>
                <option value='Single'>Single</option>   
                <option value='Divorced'>Divorced</option> 
                <option value='Separated'>Separated</option>         
              </select>
            </div>
            {/* <div className="input_inner">
              <small>Mobile Number</small>
              <input 
                type="tel" 
                placeholder='Phone'                 
                className='appli_input' 
                name='phone' 
                value={phone} 
                onChange={e => setPhone(e.target.value)}
                />
           
            </div> */}
          </div>
          <div className="photo_inner">
                {file && 
                <div className='photo_attach1'>
                  <img src={URL.createObjectURL(file)} alt="" />
                  <div className="progress-bar"  style={{width: perc + '%'}}></div>
                  <button onClick={() => setFile(null)} className="btn_file"><FaTimes/></button>
                </div>
                }
                <label htmlFor="image" className={file? 'photo_hide': 'photo_attach'}>
                    <input 
                      type="file" 
                      id='image' 
                      style={{display: 'none'}}
                      onChange={handleSelect}
                      />
                    <span><AiOutlinePlus/>Add Photo</span>
                </label>
               
            </div>
        </div>
        <button className='btn_appli' type='submit'>{loading ? <Loading/> : 'Continue'}</button>
    </motion.form>
  )
}

export default Personal
