import React from 'react'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import { useForm } from "react-hook-form";


const Preview = ({watch, register, setPage}) => {
  // const { register,  watch, formState: { errors } } = useForm({mode: 'all'});

// const marital = watch('marital')
const sex = watch('sex')
const harem = watch('harem')

console.log('marital', sex)
 

  return (
    <div className='personal'>
        <h3 className='page_label'><FaArrowLeft onClick={() => setPage(5)}/>Hakiki Taarifa</h3>        
        <div className="group_iputs">
          <label htmlFor="">Majina Kamili</label>
          <div className="inputs_items">
            <input type="text" placeholder='Jina la Kwanza' className='reg_input'/>
            <input type="text" placeholder='Jina la Kati' className='reg_input'/>
            <input type="text" placeholder='Jina la Mwisho' className='reg_input'/>
          </div>
        </div>
        <div className="group_iputs">
          <label htmlFor="">Taarifa zingine</label>
          <div className="inputs_items">
            <input type="text" placeholder='Namba ya Simu' className='reg_input'/>
            <input type="text" placeholder='Barua Pepe' className='reg_input'/>  
            <input type="text" placeholder='Uhusiano' className='reg_input'/> 
                 
          </div>
        </div>
     
        <button
            type='button'
            // onClick={() =>setPage(6)}
            className='btn_reg'
            >
            Tuma Maombi<FaArrowRight/>
        </button>
     
        
    </div>
  )
}



export default Preview