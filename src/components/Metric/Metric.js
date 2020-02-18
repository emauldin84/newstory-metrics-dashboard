import React from 'react'

import './Metric.css'

let Metric = (props) => {
    console.log('METRICS',props.metrics)
    console.log('METRICSDATA',props.metricsData)
    let metricsDataDisplay = Object.keys(props.metricsData).map(key => {
        return  <div className='metric-inline-display'>
                    <div className='metric-title-container'>
                        <p>{key[0].toUpperCase()+key.substring(1)} {props.metrics[0].toUpperCase()+props.metrics.substring(1)}</p>
                    </div>
                    <div className='metric-data-container'>
                        <p>{props.metricsData[key]}</p>
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