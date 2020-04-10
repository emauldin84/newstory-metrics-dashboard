import React from 'react'
import './Spinner.css'

let Spinner = () => {
    return (
        <div className='loader-backdrop'>
            <div className="loader"></div>
            <div className="loader-text">Fetching...</div>
        </div>

        // <div className='loader-backdrop'>
        //     <div className="progress-bar">
        //         <div className="progress" style={{width: `${props.progressWidth}%`}}></div>
        //     </div>
        //     <div className="progress-text">{props.progressText}</div>
        // </div>

    )
}

export default Spinner