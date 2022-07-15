import React, {useState} from 'react'
// import { useForm } from "react-hook-form";

import { FaArrowLeft, FaArrowRight, FaDownload } from "react-icons/fa";


const Harem = ({backPage, watch, register, setPage, isValid}) => {

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
  
    const hPass = watch('hPass')
    const hHelp = watch('hHelp')
    // const { register,  watch, formState: { errors } } = useForm({mode: 'all'});

  return (
    <div className='personal'>
        <h3 className='page_label'><FaArrowLeft onClick={() => setPage(1)}/>Taarifa Maharimu</h3>        
        <div className="group_iputs">
          <label htmlFor="">Majina Kamili</label>
          <div className="inputs_items">
            <input 
                type="text" 
                placeholder='Jina la Kwanza' 
                className='reg_input'
                name='hfname'
                  {...register("hfname", { required: true })}
                />
            <input 
                type="text" 
                placeholder='Jina la Kati' 
                className='reg_input'
                name='hmname'
                  {...register("hmname", { required: true })}
                />
            <input 
                type="text" 
                placeholder='Jina la Mwisho' 
                className='reg_input'
                name='hlname'
                  {...register("hlname", { required: true })}
                />
          </div>
        </div>
        <div className="group_iputs">
          <label htmlFor="">Mawasiliano</label>
          <div className="inputs_items">
            <input 
                type="tel" 
                placeholder='Namba ya Simu' 
                className='reg_input'
                name='hphone'
                  {...register("hphone", { required: true })}
                />
            <input 
                type="email" placeholder='Barua Pepe' 
                className='reg_input'
                name='hemail'
                  {...register("hemail", { required: true })}
                />          
          </div>
        </div>
        <div className="group_iputs">
            <div className="inputs_items">           
            <div className="other_info">
              <label htmlFor="">Uhusiano</label>
                <select 
                    className='reg_input'
                    name='herelation'
                  {...register("herelation", { required: true })}
                    >
                <option value="">Chagua Uhusiano</option>
                <option value="Baba">Baba</option>
                <option value="Kaka">Kaka</option>
                <option value="Mtoto wa Kiume">Mtoto wa Kiume</option>
                </select>
            </div> 
            <div className="other_info">
              <label htmlFor="">Tarehe ya Kuzaliwa</label>
              <input 
                type="date" 
                className='reg_input'
                name='hdob'
                {...register("hdob", { required: true })}
                />
            </div>       
          </div>
        </div>
      
        <div className="group_iputs">
      <h3 className='passport_title'>Ana Pasipoti iliyohai?</h3>
      <div className="checks_container">
        <input type="radio" name='hPass' value='ndio' id='hyes' {...register("hPass", { required: true })}/>
        <label htmlFor="hyes"><span className='check_span'></span>Ndio</label>
        <input type="radio" name='hPass' value='hapana' id='hno' {...register("hPass", { required: true })}/>
        <label htmlFor="hno"><span className='check_span'></span>Hapana</label>
             
      </div>
      {hPass === 'ndio' &&
      <>
      <div className="passport_details">
        <div className="group_pass">
          <label htmlFor="">Pasipoti Namba</label>
          <div className="inputs_items">
            <input 
                type="text" 
                placeholder='Namba ya Pasipoti'
                 className='reg_input'
                 name='hPassNo'
                {...register("hPassNo", { required: hPass === 'ndio'? true : null })}
                 />
          
          </div>
        </div>
        <div className="group_pass">
          <label htmlFor="">Mwanzo wa Matumizi</label>
          <div className="inputs_items">
            <input 
                type="date" 
                className='reg_input'
                name='hPassDoi'
                {...register("hPassDoi", { required: hPass === 'ndio'? true : null })}
                />
          
          </div>
        </div>
        <div className="group_pass">
          <label htmlFor="">Mwisho wa Matumizi</label>
          <div className="inputs_items">
            <input 
                type="date"  
                className='reg_input'
                name='hPassExp'
                {...register("hPassExp", { required: hPass === 'ndio'? true : null })}
                />
          
          </div>
        </div>
      </div>
      <div className="passport_details">
        <div className="group_pass">
          <label htmlFor="">Sehemu iliyotolewa</label>
          <div className="inputs_items">
          <select className='reg_input' name='hPlaceOfIssue' {...register("hPlaceOfIssue", { required: hPass === 'ndio'? true : null })}>
              <option value="">--Chagua Mkoa--</option>
              <option value="married">Nina Ndoa</option>
              <option value="not married">Sina Ndoa</option>                      
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
      {hPass === 'hapana' &&
      <div className="passport_no">
        <h3 className='passport_title'>Anahitaji Msaada wa Wakala kupatiwa Pasipoti?</h3>
        <div className="checks_container">
          <input type="radio" name='hHelp' value='ndio' id='yes_help' {...register("hHelp", { required: hPass === 'hapana'? true : null })}/>
          <label htmlFor="yes_help"><span className='check_span'></span>Ndio</label>
          <input type="radio" name='hHelp' value='Hapana' id='no_help' {...register("hHelp", { required: hPass === 'hapana'? true : null })}/>
          <label htmlFor="no_help"><span className='check_span'></span>Hapana</label>
              
        </div>
        {hHelp === 'ndio' &&
        <small className='hey_help'>Utahitajika Kuongeza $ 50 kama ghalama za kupata pasipoti!</small>}
      </div>
      }
     
     
      
    </div>
        <button
            type='button'
            onClick={() =>setPage(3)}
            className='btn_reg'
            disabled={!isValid}
            >
            Endelea<FaArrowRight/>
        </button>
     
        
    </div>
  )
}

export default Harem