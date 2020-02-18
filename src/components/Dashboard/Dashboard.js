import React, { useState, useEffect } from 'react';
import axios from 'axios'

import './Dashboard.css';
import Metric from '../Metric/Metric'
import ComparisonFrequency from '../ComparisonFrequency/ComparisonFrequency'
import Modal from '../Modal/Modal'

let Dashboard = () => {
    const [metrics, setMetrics] = useState([])
    const [frequency, setFrequency] = useState('lastMonth')
    // const [fetching, setFetching] = useState(false)
    const [selectedMetric, setSelectedMetric] = useState(null)
    let nsMetrics = {
        users: {
            active: {
                current: 39,
                lastMonth: 39,
                lastQuarter: 30,
                lastYear: 10,
            },
            new: {
                current: 8,
                lastMonth: 7,
                lastQuarter: 12,
                lastYear: 5,
            },
            total: {
                current: 812,
                lastMonth: 804,
                lastQuarter: 797,
                lastYear: 785,
            },
        },
        organizations: {
            active: {
                current: 39,
                lastMonth: 36,
                lastQuarter: 30,
                lastYear: 10,
            },
            new: {
                current: 8,
                lastMonth: 7,
                lastQuarter: 12,
                lastYear: 5,
            },
            total: {
                current: 812,
                lastMonth: 804,
                lastQuarter: 797,
                lastYear: 785,
            },
        },
        recipients: {
            new: {
                current: 3,
                lastMonth: 4,
                lastQuarter: 1,
                lastYear: 7,
            },
            total: {
                current: 483,
                lastMonth: 475,
                lastQuarter: 400,
                lastYear: 200,
            },
        },
        submissions: {
            new: {
                current: 3,
                lastMonth: 4,
                lastQuarter: 1,
                lastYear: 7,
            },
            total: {
                current: 483,
                lastMonth: 413,
                lastQuarter: 303,
                lastYear: 116,
            },
        },
    }

    
    // NOT NECESSARY UNTIL WE RECEIVE API INFO FROM MORGAN

    // useEffect(() => {
    //     setFetching(true)
    //     currencies.forEach(currency => {
    //         fetchData(currency)
    //     })
    //     return () => setFetching(false)
    // },[fetching])
    
    // const fetchData = (cur) => {
    //     axios.get(`https://api.exchangerate-api.com/v4/latest/${cur}`)
    //     .then(res => {
    //         if (fetching){
    //             setMetrics(metrics => [...metrics, res.data])
    //         }
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
    // }

    const handleMetricClick = (e) => {
        let selected = metrics.filter(metric => {
            return metric.base === e.target.id
        })
        setSelectedMetric(...selected)
    }

    const handleBackgroundClick = () => {
        setSelectedMetric(null)
    }
    const handleFrequencyClick = (freq) => {
        setFrequency(freq)
    }
    
    let metricsDisplay = Object.keys(nsMetrics).map(m => {
        return <Metric 
                    key={m} 
                    metricsData={nsMetrics[m]}
                    metrics={m}
                    frequency={frequency}
                    selectedMetric={selectedMetric} 
                    handleMetricClick={handleMetricClick}/>
    })

    let modal = selectedMetric ? <Modal selectedMetric={selectedMetric} handleBackgroundClick={handleBackgroundClick}/> : null

    return (
        <div className="dashboard-container" >
            <ComparisonFrequency handleFrequencyClick={handleFrequencyClick} frequency={frequency}/>
            <div className='title-display'>
                <p className='titles' id='title-metric'><b>Metric</b></p>
                <p className='titles' id='title-value'><b>Value</b></p>
                <p className='titles' id='title-comparison'><b>Comparison</b></p>
            </div>
            {metricsDisplay}
            {modal}
        </div>
    );
}

export default Dashboard;
