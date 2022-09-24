import React from 'react'
import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { services } from '../../../hooks/data';

const AgentServices = ({setServices}) => {
    const { register,  watch, formState: { isValid } } = useForm({mode: 'all'});

    const a_services = watch('services')

    useEffect(() => {
        setServices(a_services)
    },[a_services])

  return (
    <div className='agent_services_wrapper'>       
        <div className="agent_services"  >
        {services && services.map((item, index) => (
            <div className="services_choice" key={index}  >
                <input 
                    type="checkbox" 
                    id={index} 
                     value={item}
                    name='services' 
                    style={{display:'none'}}  
                    {...register("services", { required: true })}
                    />
                    <label htmlFor={index} className='services_label'>{item}</label>
                </div>
                ))}
                </div>
                
      
        </div>
  )
}

export default AgentServices
