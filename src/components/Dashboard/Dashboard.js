import React, { useState, useEffect } from 'react';
import axios from 'axios'

import './Dashboard.css';
import Metric from '../Metric/Metric'

let Dashboard = () => {
    const [metrics, setMetrics] = useState([])
    const [fetching, setFetching] = useState(false)
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
            console.log('fetching', fetching)
            if (fetching){
                // setMetrics(metrics.push(res.data))
                setMetrics(metrics => [...metrics, res.data])
                console.log('metrics',metrics)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    let metricsDisplay = metrics ? metrics.map(m => {
        return <Metric key={m.base}metrics={m}/>
    }) : null

    return (
        <div className="dashboard-container">
            <p>Metrics</p>
            {metricsDisplay}
        </div>
    );
}

export default Dashboard;
