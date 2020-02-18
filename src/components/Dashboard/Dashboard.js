import React, { useState, useEffect } from 'react';
import axios from 'axios'

import './Dashboard.css';
import Metric from '../Metric/Metric'
import Modal from '../Modal/Modal'

let Dashboard = () => {
    const [metrics, setMetrics] = useState([])
    // const [fetching, setFetching] = useState(false)
    const [selectedMetric, setSelectedMetric] = useState(null)
    let nsMetrics = {
        users: {
            active: 39,
            new: 8,
            total: 812,
        },
        organizations: {
            active: 39,
            new: 8,
            total: 812,
        },
        recipients: {
            new: 3,
            total: 483,
        },
        submissions: {
            new: 3,
            total: 483,
        }
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
    
    let metricsDisplay = Object.keys(nsMetrics).map(m => {
        return <Metric 
                    key={m} 
                    metricsData={nsMetrics[m]}
                    metrics={m}
                    selectedMetric={selectedMetric} 
                    handleMetricClick={handleMetricClick}/>
    })

    let modal = selectedMetric ? <Modal selectedMetric={selectedMetric} handleBackgroundClick={handleBackgroundClick}/> : null

    return (
        <div className="dashboard-container" >
            <div className='title-display'>
                <p className='titles' id='title-metric'>Metric</p>
                <p className='titles' id='title-value'>Value</p>
                <p className='titles' id='title-comparison'>Comparison</p>
            </div>
            {metricsDisplay}
            {modal}
        </div>
    );
}

export default Dashboard;
