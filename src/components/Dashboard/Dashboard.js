import React, { useState, useEffect } from 'react';
import axios from 'axios'

import './Dashboard.css';
import Metric from '../Metric/Metric'

let Dashboard = () => {
    const [metrics, setMetrics] = useState([])
    const [fetching, setFetching] = useState(false)
    const [selectedMetric, setSelectedMetric] = useState(null)
    const [backgroundClass, setBackgroundClass] = useState('background-off')
    let currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CNY', 'TRY']

    useEffect(() => {
        setFetching(true)
        currencies.forEach(currency => {
            fetchData(currency)
        })
        return () => setFetching(false)
    },[fetching])
    
    const fetchData = (cur) => {
        axios.get(`https://api.exchangerate-api.com/v4/latest/${cur}`)
        .then(res => {
            if (fetching){
                setMetrics(metrics => [...metrics, res.data])
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    const handleMetricClick = (e) => {
        console.log(e.target.id)
        setSelectedMetric(e.target.id)
        setBackgroundClass('background-on')
    }

    const handleBackgroundClick = () => {
        setBackgroundClass('background-off')
        setSelectedMetric(null)

    }
    
    let metricsDisplay = metrics ? metrics.map(m => {
        return <Metric 
                    key={m.base} 
                    metrics={m}
                    selectedMetric={selectedMetric} 
                    handleMetricClick={handleMetricClick}/>
    }) : null

    return (
        <div className="dashboard-container" >
            <div className={backgroundClass} onClick={handleBackgroundClick}></div>
            <p>Metrics</p>
            {metricsDisplay}
        </div>
    );
}

export default Dashboard;
