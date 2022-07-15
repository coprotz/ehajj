import React from 'react'
import './topbar.css'

const Topbar = () => {
  return (
    <div className='topbar'>
        <div className="topbar-container">
            <div className="topbar_left">ALHAJJ</div>
            <div className="topbar_middle">
                <span>WAKALA</span>
                <span>HUDUMA</span>
                <span>KUHUSU</span>
                <span>MAFUNZO</span>
                <span>MAWASILIANO</span>
            </div>
            <div className="topbar_right">
               <button>INGIA</button>
               <button>JISAJIRI</button>
            </div>
        </div>

    </div>
  )
}

export default Topbar