import React from 'react'
import './Modal.css'
let Modal = (props) => {

    let rates = props.selectedMetric[0].rates
    let ratesDisplay = Object.keys(rates).map(rate => {
        return <div key={rate}>
                    <p id={props.selectedMetric[0].base}><b>{rate}</b>: {rates[rate]}</p>
                </div>
    })
    
    return(
        <div className='container'>
            <div className='backdrop' onClick={props.handleBackgroundClick}></div>
            <div className='modal'>
                <h3 className='title'>{props.selectedMetric[0].base}</h3>
                <p id={props.selectedMetric[0].base}>Last updated: {props.selectedMetric[0].date} {new Date(props.selectedMetric[0].time_last_updated).toLocaleTimeString("en-US")}</p>
                {ratesDisplay}
            </div>
        </div>
    )
}

export default Modal