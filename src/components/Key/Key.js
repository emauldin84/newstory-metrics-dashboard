import React from 'react'

import './Key.css'
let Key = () => {
    return(
        <div className='key-container'>
            <div className='demo-container'>
                <p><span role='img' aria-label='pointer finger'>👉 </span>You are viewing a demo environment. All data is strictly for testing purposes.</p>
            </div>
            <div className='percent-change-container'>
                <p>* Percent change from zero</p>
            </div>

        </div>
    )
}

export default Key