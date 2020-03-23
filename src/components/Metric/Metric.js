import React from 'react'

import './Metric.css'

let Metric = (props) => {
    console.log(props.metrics, 'metricsData', props.metricsData)
    let metricsDataDisplay = Object.keys(props.metricsData).map(key => {
        let currentValue = props.metricsData[key].current
        let pastValue = Math.abs(props.metricsData[key].comparison)
        let difference = currentValue - pastValue
        let compClass = difference > 0 ? 'comparison positive' : difference < 0 ? 'comparison negative' : 'comparison'
        let compArrow = difference > 0 ? '↑' : difference < 0 ? '↓' : null
        let compPerc = difference === 0 && pastValue === 0 ? (0).toFixed(2) : ((Math.abs(difference) / Math.abs(pastValue)) * 100).toFixed(2)
        console.log('compPerc', compPerc)
        let asterisk = Math.abs(currentValue) > 0 && pastValue === 0 ? '*' : null

        return  <div key={key}className='metric-inline-display'>
                    <div className='metric-title-container'>
                        <p>{key[0].toUpperCase()+key.substring(1)} {props.metrics[0].toUpperCase()+props.metrics.substring(1)}</p>
                    </div>
                    <div className='metric-data-container'>
                        <p className='current'>{currentValue}</p>
                        <p className={compClass}>{compArrow}{compPerc}%{asterisk}</p>
                    </div>
            
                </div>
    })
    return (
        <div className='container'>
            <div id={props.metrics} className={`metric-container ${props.metrics}-container`} onClick={props.handleMetricClick}>
                {metricsDataDisplay}
            </div>
        </div>
    )
}

export default Metric