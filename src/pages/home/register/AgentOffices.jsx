import React from 'react'
import { useState } from 'react';
import { regions } from '../../../hooks/data';
import { useForm } from "react-hook-form";
import { FaPlus, FaMinus, FaTimes } from "react-icons/fa";
import { useEffect } from 'react';
import './register.css'


const AgentOffices = ({setOffices, offices}) => {

    const { register,  watch, formState: { isValid } } = useForm({mode: 'all'});

    // const [offices, setOffices] = useState([
    //     {street: '', building: '', district: '', region: ''}
    // ])


    const [region, setRegion] = useState('')

    const [districts, setDistricts] = useState([])

    const handleChange = (index, event) => {
        const values = [...offices];
        values[index][event.target.name] = event.target.value;
        setOffices(values)
        setRegion(values[index].region)      
 
    }

    const handleAdd = (e) => {
        e.preventDefault()
        setOffices([...offices, {street: '', building: '', district: '', region: ''}])
    }

    const handleRemove = (e,index) => {
        e.preventDefault();
        const values = [...offices]
        values.splice(index, 1);
        setOffices(values)
    }

    useEffect(() => {
        const dists = regions.find(r=>r.name === region)?.districts
        setDistricts(dists)
    },[region])
  return (
    <div className='agent_reg'>
        <div className="agent_reg_top">
            <h5>ADD OFFICE</h5><button className='btn_add' onClick={handleAdd}><FaPlus/></button>
        </div>
            
        {offices?.map((item, index) => (
          
          <div className="form_inputs_wrapper">
              <div style={{width: '100%'}} >
                  <div className="create_group" style={{marginBottom:'10px'}}>                            
                      <select 
                          type="text" 
                          className="create_input" 
                          value={item.name}                                    
                          onChange={(event) =>handleChange(index, event)}
                          name='region'
                          // {...register("region", { required: true })}
                          >
                          <option value='' style={{color: 'black'}}>SELECT REGION</option>
                          {regions.map(item => (
                              <option 
                                  value={item.name} 
                                  key={item.id} 
                                  style={{color: 'black'}} 
                                  // id={item.id}
                                  // ref={reg}
                                  >{item.name}
                              </option>
                          ))}
                          
                      </select>
                      <span className='create_span_1'>Region</span>
                  </div>
                  <div className="create_group" > 
                      <select 
                          type="text" 
                          className="create_input" 
                          value={item.district}                                    
                          onChange={(event) =>handleChange(index, event)}
                          name='district'
                          required>
                              {/* <option value='' style={{color: 'black'}}>SELECT</option> */}
                          {districts?.map((district, index) => (
                              <option 
                                  value={district} 
                                  key={index} 
                                  style={{color: 'black'}}
                                  >{district}
                              </option>
                          ))}
                          
                      </select>                        
                      <span className='create_span_1'>District</span>
                  </div>
              </div>
              <div style={{width: '100%'}}>
                  <div className="create_group" style={{marginBottom:'10px'}}>                            
                      <input 
                      type="text" 
                      className="create_input"
                      value={item.street}
                      name='street'
                      onChange={(event) =>handleChange(index, event)} 
                      required/>
                      <span className='create_span_1'>Street</span>
                  </div>
                  <div className="create_group">                            
                      <input 
                          type="text" 
                          className="create_input" 
                          value={item.building}
                          name='building'
                          onChange={(event) =>handleChange(index, event)}
                          required/>
                      <span className='create_span_1'>Building</span>
                  </div> 
              </div>                        
              <button className='btn_add' onClick={handleRemove}><FaMinus/></button>
          </div> 
          ))}
      
    </div>
  )
}

export default AgentOffices
