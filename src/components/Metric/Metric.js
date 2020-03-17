import React from 'react'

import './Metric.css'

let Metric = (props) => {
    // console.log('metricsData', props.metricsData)
    let metricsDataDisplay = Object.keys(props.metricsData).map(key => {
        // console.log(props.metrics.toUpperCase())
        // console.log('key',key)
        // console.log('current', props.metricsData[key].current)
        // console.log('comparison', props.metricsData[key].comparison)
        let currentValue = props.metricsData[key].current
        let pastValue = props.metricsData[key].comparison
        let comparison = currentValue - pastValue
        let compClass = comparison > 0 ? 'comparison positive' : comparison < 0 ? 'comparison negative' : 'comparison'
        let compArrow = comparison > 0 ? '↑' : comparison < 0 ? '↓' : null
        let compPerc = ((Math.abs(comparison) / Math.abs(pastValue)) * 100).toFixed(2)
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