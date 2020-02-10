import React, {useState} from 'react'

import './Metric.css'

let Metric = (props) => {
    // const [metricClass, setMetricClass] = useState('metric-container')

    let rates = props.metrics.rates
    let ratesDisplay = props.selectedMetric === props.metrics.base ? Object.keys(rates).map(rate => {
        return <div key={rate}>
                    <p>{rate}: {rates[rate]}</p>
                </div>
    }) : null

    let metricClass = 'metric-container'
    if (props.selectedMetric === props.metrics.base) {
        metricClass = 'metric-container metric-container-active'
    }

    return (
        <div className='container'>
            <div id={props.metrics.base} className={metricClass} onClick={props.handleMetricClick}>
                <h3>{props.metrics.base}</h3>
                <p>{props.metrics.date}</p>
                <p>Last updated: {new Date(props.metrics.time_last_updated).toLocaleTimeString("en-US")}</p>
                {ratesDisplay}
            </div>
        </div>
    )
}

export default Metric