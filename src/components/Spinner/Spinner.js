import React from 'react'
import './Spinner.css'

let Spinner = () => {
    return (
        <div className='loader-backdrop'>
            <div className="loader"></div>
            <div className="loader-text">Fetching...</div>
        </div>
    )
}

export default Spinner