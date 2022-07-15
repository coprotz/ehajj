import React from 'react'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import { useForm } from "react-hook-form";


const NextOfKin = ({watch, register, setPage, isValid}) => {
  // const { register,  watch, formState: { errors } } = useForm({mode: 'all'});

// const marital = watch('marital')
const sex = watch('sex')
const harem = watch('harem')

console.log('marital', sex)
 

  return (
    <div className='personal'>
        <h3 className='page_label'><FaArrowLeft onClick={() => setPage(4)}/>Taarifa za Mtu wa Karibu</h3>        
        <div className="group_iputs">
          <label htmlFor="">Majina Kamili</label>
          <div className="inputs_items">
            <input 
                type="text" 
                placeholder='Jina la Kwanza' 
                className='reg_input'
                name='nFname'
                {...register("hPassDoi", { required:  true })}
                />
            <input 
                type="text" 
                placeholder='Jina la Kati' 
                className='reg_input'
                name='nMname'
                {...register("nMname", { required:  true })}
                />
            <input 
                type="text" 
                placeholder='Jina la Mwisho' 
                className='reg_input'
                name='nLname'
                {...register("nLname", { required:  true })}
                />
          </div>
        </div>
        <div className="group_iputs">
          <label htmlFor="">Mawasiliano</label>
          <div className="inputs_items">
            <input 
                type="text" 
                placeholder='Namba ya Simu' 
                className='reg_input'
                name='nPhone'
                {...register("nPhone", { required:  true })}
                />
            <input 
                type="text" 
                placeholder='Barua Pepe' 
                className='reg_input'
                name='nEmail'
                {...register("nEmail", { required:  true })}
                />  
            <select 
                className='reg_input'
                name='nRegion'
                {...register("nRegion", { required:  true })}
                >
                <option value="">Chagua Mkoa</option>
                <option value="Mwanza">Mwanza</option>
                <option value="Tabora">Tabora</option>
                <option value="Singida">Singida</option>
            </select>        
          </div>
        </div>
     
        <button
            type='button'
            onClick={() =>setPage(6)}
            className='btn_reg'
            disabled={!isValid}
            >
            Endelea<FaArrowRight/>
        </button>
     
        
    </div>
  )
}

export default NextOfKin