import React from 'react'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { agents } from '../../database';

// import { useForm } from "react-hook-form";

const Agent = ({backPage, watch, register, nextPage, setPage, isValid}) => {
  // const { register,  watch, formState: { errors } } = useForm({mode: 'all'});

  const agent = watch('agent')
  const harem = watch('harem')

  const selected = agents?.find((a) => a.name === agent)

  console.log('selected', selected)

  return (
    <div className='personal'>
        <h3 className='page_label'><FaArrowLeft onClick={() => setPage(harem === 'now'? 2 : 1)}/>Taarifa za Wakala</h3>    
       
        <div className="group_iputs">
          <label htmlFor="">Wakala</label>
          <div className="inputs_items">
            <select name='agent' className='reg_input' {...register("agent", { required: true })}>
              <option value="">Chagua Wakala</option>
              {agents.map((agent)=> (
                <option value={agent.name} key={agent.id}>{agent.name}</option>
              ))}           
            </select>
                 
          </div>
        </div>
        {agent &&
        <div className="group_iputs">
          <div className="group_inputs_wrapper">
            <div className="inputs_cost">
              <small>Ghalama</small>
              <h2>{selected?.cost}</h2>
            </div>
            <div className="inputs_services">
              <small>Huduma utakazopata</small>
              <div className="selected_services">
                {selected?.services && selected.services.map((s, index) => (
                  <h4 key={index}>{s}</h4>
                ))}
              </div>
              
            </div>
          </div>
        </div>}
        <button
            type='button'
            onClick={() =>setPage(4)}
            className='btn_reg'
            disabled={!isValid}
            >
            Endelea<FaArrowRight/>
        </button>
        
    </div>
  )
}

export default Agent