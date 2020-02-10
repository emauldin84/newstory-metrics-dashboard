import React from 'react'
import './Modal.css'
let Modal = (props) => {

    let rates = props.selectedMetric.rates
    let ratesDisplay = Object.keys(rates).map(rate => {
        return <div key={rate}>
                    <p id={props.selectedMetric.base}><b>{rate}</b>: {rates[rate]}</p>
                </div>
    })
    
    return(
        <div className='container'>
            <div className='backdrop' onClick={props.handleBackgroundClick}></div>
            <div className='modal'>
                <h3 className='title'>{props.selectedMetric.base}</h3>
                <p id={props.selectedMetric.base}>Last updated: {props.selectedMetric.date} | {new Date(props.selectedMetric.time_last_updated).toLocaleTimeString("en-US")}</p>
                {ratesDisplay}
            </div>
        </div>
    )
}

export default Modal