import React from 'react'

import './Metric.css'

let Metric = (props) => {

    return (
        <div className='container'>
            <div id={props.metrics.base} className='metric-container' onClick={props.handleMetricClick}>
                <h3 id={props.metrics.base}>{props.metrics.base}</h3>
            </div>
        </div>
    )
}

export default Metric