import React from 'react'

import './Metric.css'

let Metric = (props) => {
    console.log(props.metrics)
    let rates = props.metrics.rates
    let ratesDisplay = Object.keys(rates).map(rate => {
        return <div>
            <p>{rate}: {rates[rate]}</p>
        </div>
    })
    console.log(rates)
    return (
        <div className='metric-container'>
            <h3>{props.metrics.base}</h3>
            <p>{props.metrics.date}</p>
            <p>Last updated: {new Date(props.metrics.time_last_updated).toLocaleTimeString("en-US")}</p>
            {ratesDisplay}
        </div>
    )

}

export default Metric