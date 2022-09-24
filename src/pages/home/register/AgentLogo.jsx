import React, {useState} from 'react'
import useStorage from '../../../hooks/useStorage'
import { FaPlus, FaMinus, FaTimes } from "react-icons/fa";

const AgentLogo = ({file, setFile, perc }) => {
    

    const [error, setError] = useState('')

    const types = ['image/png', 'image/jpeg']

    const selectedFile = (e) => {
    let selected = e.target.files[0]


    if (selected && types.includes(selected.type)){
        setFile(selected)
        setError('')
    }else {
        setFile(null);
        setError('Please select image file (jpg or png)')
    }
    }

  return (
    <div className="logo_agent">
        {error && <small className='error'>{error}</small>}
        {file && (
        <div className="shareImgContainer">
            <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
            <div className="progress-bar"  style={{width: perc + '%'}}></div>
            <button className="btn_file" onClick={() => setFile(null)}><FaTimes/></button>
        </div>
        )}
        
        <label htmlFor="file">
            <span>Attach Agent Logo</span>
            <input 
                type="file" 
                name='file'
                // value={url}
                style={{display:'none'}}
                onChange={selectedFile}
                id='file'/>
        </label>
    </div>
  )
}

export default AgentLogo
