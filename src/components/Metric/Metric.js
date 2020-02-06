import React, {useState} from 'react'

import './Metric.css'

let Metric = (props) => {
    const [metricClass, setMetricClass] = useState('metric-container')
    const [backgroundClass, setBackgroundClass] = useState('background-off')
    let rates = props.metrics.rates
    let ratesDisplay = Object.keys(rates).map(rate => {
        return <div key={rate}>
                    <p>{rate}: {rates[rate]}</p>
                </div>
    })

    const handleMetricClick = () => {
        setMetricClass('metric-container metric-container-active')
        setBackgroundClass('background-on')
    }

    const handleBackgroundClick = () => {
        setMetricClass('metric-container')
        // setBackgroundClass('background-off')
    }

    return (
        <div className={backgroundClass} onClick={handleBackgroundClick}>
            <div className={metricClass} onClick={handleMetricClick}>
                <h3>{props.metrics.base}</h3>
                <p>{props.metrics.date}</p>
                <p>Last updated: {new Date(props.metrics.time_last_updated).toLocaleTimeString("en-US")}</p>
                {ratesDisplay}
            </div>
        </div>
    )
}

export default Metric