import React from 'react'
import './spinner.css'

const Spinner = () => {
  return (
    <div className='spinner'>
      <div className="circle">
        <label htmlFor="">Loading...</label>
        <div className="circle-child"></div>
      </div>
    </div>
  )
}

export default Spinner
