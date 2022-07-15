import React, {useState} from 'react'
// import { FaArrowRight } from "react-icons/fa";
import {  FaArrowRight,  FaCamera } from "react-icons/fa";
// import { useForm } from "react-hook-form";


const Personal = ({watch, register, setPage, isValid}) => {
  // const { register,  watch, formState: { errors } } = useForm({mode: 'all'});

// const marital = watch('marital')
const sex = watch('sex')
const harem = watch('harem')

console.log('marital', sex)

const [file, setFile] = useState(null);
  const [error, setError] = useState('')
  const types = ['image/jpeg', 'image/png']

  const selectedFile = (e) => {
    let selected = e.target.files[0]
    if (selected && types.includes(selected.type)){
      setFile(selected)
      setError('')
    }else {
      setFile(null);
      setError('Tafadhari chagua picha sahihi!')
    }
  }
 

  return (
    <div className='personal'>
        <h3 className='page_label'>Taarifa Binafsi</h3>
       
          <div className="personal_actions">
            <div className='personal_inner'>
              <label htmlFor="">Majina Kamili</label>
              <div className="inputs_items down_staires">
                <input 
                  type="text" 
                  placeholder='Jina la Kwanza' 
                  className='reg_input'
                  name='fname'
                  {...register("fname", { required: true })}
                  />
                <input 
                  type="text" 
                  placeholder='Jina la Kati' 
                  className='reg_input'
                  name='mname'
                  {...register("mname", { required: true })}
                  />
                <input 
                  type="text" 
                  placeholder='Jina la Mwisho' 
                  className='reg_input'
                  name='lname'
                  {...register("lname", { required: true })}
                  />
                
              </div>
            </div>
         
           
              {!file ? 
              <div className='photo_wrapper'>
              {error &&<span className='error'>{error}</span>}
              <div className="passport_photo">
                <label htmlFor="file" className='photo_actions'><FaCamera/>Weka Picha</label>
                <input 
                  type="file" 
                  id='file' 
                  style={{display: 'none'}} 
                  onChange={selectedFile}
                  // name='photo'
                  // {...register("photo", { required: true })}
                   />
                
              </div> 
              </div>
              :
            
              <div className="photo_selected">
                <img src={URL.createObjectURL(file)} alt="" />
                <div className="btn_actions">
                   <button onClick={() => setFile(null)} className='photo_save'>Hifadhi</button>
                   <button onClick={() => setFile(null)}>Ondoa</button>
                </div>
               
              </div>
             
              }
            
        </div>        
       
        <div className="group_iputs">
          <label htmlFor="">Mawasiliano</label>
          <div className="inputs_items">
            <input 
              type="tel" 
              placeholder='Namba ya Simu' 
              className='reg_input'
              name='phone'
                  {...register("phone", { required: true })}
              />
            <input 
              type="email" 
              placeholder='Barua Pepe' 
              className='reg_input'
              name='email'
              {...register("email", { required: true })}
              />          
          </div>
        </div>
        <div className="group_iputs">
          <label htmlFor="">Makazi</label>
          <div className="inputs_items">
            <select 
              className='reg_input'
              name='region'
              {...register("region", { required: true })}
              >
              <option value="">Chagua Mkoa</option>
              <option value="Dar es Salaam">Dar es Salaam</option>
              <option value="Arusha">Arusha</option>
              <option value="Zanzibar">Zanzibar</option>
            </select>
            <select 
              className='reg_input'
              name='district'
              {...register("district", { required: true })}
              >
              <option value="">Chagua Wilaya</option>
              <option value="Chunya">Chunya</option>
              <option value="Masasi">Masasi</option>
              <option value="Chalinze">Chalinze</option>
            </select>        
          </div>
        </div>
        <div className="group_iputs">
          <div className="others_wrapper">
            <div className="other_info">
              <label htmlFor="">Tarehe ya Kuzaliwa</label>
              <input 
                type="date" 
                className='reg_input'
                name='dob'
              {...register("dob", { required: true })}
                />
            </div>
            <div className="other_info">
              <label htmlFor="">Jinsia</label>
              <select className='reg_input' name='sex' {...register("sex", { required: true })}>
                <option value="">--Chagua --</option>
                <option value="Mume">Mume</option>
                <option value="Mke">Mke</option>            
              </select>
            </div>
            <div className="other_info">
              <label htmlFor="">Hali ya Ndoa</label>
              <select className='reg_input' name='marital' {...register("marital", { required: true })}>
                <option value="">--Chagua--</option>
                <option value="married">Nina Ndoa</option>
                <option value="not married">Sina Ndoa</option>                      
              </select>
            </div> 
          </div>      
          {/* <div className="marital_action">
              <span>Mwanamke ni lazima afatane na Maharimu Wake</span>
          </div> */}
          {sex === 'Mke' &&
          <div className='harem_container'>
            <label htmlFor="">Taarifa za Maharimu</label>
            <div className="checks_container" >
              <input type="radio" name='harem' value='now' id='now' {...register("harem", { required: true })}/>
              <label htmlFor="now"><span className='check_span'></span>Naambatanisha Sasa </label>
              <input type="radio" name='harem' value='later' id='later' {...register("harem", { required: true })}/>
              <label htmlFor="later"><span className='check_span'></span>Nitaambanisha baadae</label>
                  
            </div>
          </div>
          }
        </div>
        <button
            type='button'
            onClick={() =>setPage(harem === 'now'? 2 : 3 )}
            className='btn_reg'
            disabled={!isValid}
            >
            Endelea<FaArrowRight/>
        </button>
     
        
    </div>
  )
}

export default Personal