import React, { useState } from 'react'
import { FaArrowLeft, FaArrowRight, FaDownload } from "react-icons/fa";

const Passport = ({backPage, watch, register, nextPage, setPage, isValid}) => {

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
      setError('Tafadhari weka nakala ya picha tu!')
    }
  }

  const passport = watch('passport')
  const help = watch('help')


  return (
    <div className='personal'>
    <h3 className='page_label'><FaArrowLeft onClick={() => setPage(3)}/>Taarifa za Pasipoti</h3>    
   
    <div className="group_iputs">
      <h3 className='passport_title'>Una Pasipoti iliyohai?</h3>
      <div className="checks_container">
        <input type="radio" name='passport' value='ndio' id='yes' {...register("passport", { required: true })}/>
        <label htmlFor="yes"><span className='check_span'></span>Ndio</label>
        <input type="radio" name='passport' value='hapana' id='no' {...register("passport", { required: true })}/>
        <label htmlFor="no"><span className='check_span'></span>Hapana</label>
             
      </div>
      {passport === 'ndio' &&
      <>
      <div className="passport_details">
        <div className="group_pass">
          <label htmlFor="">Pasipoti Namba</label>
          <div className="inputs_items">
            <input 
              type="text" 
              placeholder='Namba ya Pasipoti' 
              className='reg_input'
              name='passNo'
              {...register("passNo", { required: passport === 'ndio'? true : null  })}
              />
          
          </div>
        </div>
        <div className="group_pass">
          <label htmlFor="">Mwanzo wa Matumizi</label>
          <div className="inputs_items">
            <input 
              type="date" 
              className='reg_input'
              name='passStart'
              {...register("passStart", { required: passport === 'ndio'? true : null  })}
              />
          
          </div>
        </div>
        <div className="group_pass">
          <label htmlFor="">Mwisho wa Matumizi</label>
          <div className="inputs_items">
            <input 
              type="date"  
              className='reg_input'
              name='passEnd'
              {...register("passEnd", { required: passport === 'ndio'? true : null  })}
              />
          
          </div>
        </div>
      </div>
      <div className="passport_details">
        <div className="group_pass">
          <label htmlFor="">Sehemu iliyotolewa</label>
          <div className="inputs_items">
          <select className='reg_input' name='placeOfIssue' {...register("placeOfIssue", { required: passport === 'ndio'? true : null })}>
              <option value="">--Chagua Mkoa--</option>
              <option value="Morogoro">Morogoro</option>
              <option value="Arusha">Arusha</option>                      
          </select>
          
          </div>
        </div>
        {!file ? 
        <div className="passport_copy">
          <label htmlFor="file"><FaDownload/>Weka Nakala ya Pasipoti</label>
          <input type="file" id='file' style={{display: 'none'}} onChange={selectedFile} />
        </div> :
       
        <div className="passport_copy_seleceted">
          <img src={URL.createObjectURL(file)} alt="" />
          <button onClick={() => setFile(null)}>Ondoa</button>
        </div>
        }
       
      </div>
      {error} 

      </>}
      {passport === 'hapana' &&
      <div className="passport_no">
        <h3 className='passport_title'>Unahitaji Msaada wa Wakala kupatiwa Pasipoti?</h3>
        <div className="checks_container">
          <input type="radio" name='help' value='ndio' id='yes_help' {...register("help", { required: passport === 'hapana'? true : null })}/>
          <label htmlFor="yes_help"><span className='check_span'></span>Ndio</label>
          <input type="radio" name='help' value='Hapana' id='no_help' {...register("help", { required: passport === 'hapana'? true : null })}/>
          <label htmlFor="no_help"><span className='check_span'></span>Hapana</label>
              
        </div>
        {help === 'ndio' &&
        <small className='hey_help'>Utahitajika Kuongeza $ 50 kama ghalama za kupata pasipoti!</small>}
      </div>
      }
     
     
      
    </div>
    <button
            type='button'
            onClick={() =>setPage(5)}
            className='btn_reg'
            disabled={!isValid}
            >
            Endelea<FaArrowRight/>
        </button>
    </div>
  )
}

export default Passport