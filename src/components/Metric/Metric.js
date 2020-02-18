import React from 'react'

import './Metric.css'

let Metric = (props) => {
    let metricsDataDisplay = Object.keys(props.metricsData).map(key => {
        let comparison = props.metricsData[key].current - props.metricsData[key][props.frequency]
        let compClass = comparison > 0 ? 'comparison positive' : comparison < 0 ? 'comparison negative' : 'comparison'
        let compArrow = comparison > 0 ? '↑' : comparison < 0 ? '↓' : null
        let compPerc = ((Math.abs(comparison) / props.metricsData[key][props.frequency]) * 100).toFixed(2)

        return  <div key={key}className='metric-inline-display'>
                    <div className='metric-title-container'>
                        <p>{key[0].toUpperCase()+key.substring(1)} {props.metrics[0].toUpperCase()+props.metrics.substring(1)}</p>
                    </div>
                    <div className='metric-data-container'>
                        <p className='current'>{props.metricsData[key].current}</p>
                        <p className={compClass}>{compArrow}{compPerc}%</p>
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