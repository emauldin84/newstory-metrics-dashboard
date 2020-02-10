import React, {useState} from 'react'

import './Metric.css'

let Metric = (props) => {

    let rates = props.metrics.rates
    let ratesDisplay = props.selectedMetric === props.metrics.base ? Object.keys(rates).map(rate => {
        return <div key={rate}>
                    <p id={props.metrics.base}>{rate}: {rates[rate]}</p>
                </div>
    }) : null

    let metricClass = 'metric-container'
    if (props.selectedMetric === props.metrics.base) {
        metricClass = 'metric-container metric-container-active'
    }

    return (
        <div className='container'>
            <div id={props.metrics.base} className={metricClass} onClick={props.handleMetricClick}>
                <h3 id={props.metrics.base}>{props.metrics.base}</h3>
                <p id={props.metrics.base}>{props.metrics.date}</p>
                <p id={props.metrics.base}>Last updated: {new Date(props.metrics.time_last_updated).toLocaleTimeString("en-US")}</p>
                {ratesDisplay}
            </div>
        </div>
    )
}

export default Metric