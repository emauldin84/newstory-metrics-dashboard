import React, { useState, useEffect } from 'react';
import axios from 'axios'

import './Dashboard.css';
import Metric from '../Metric/Metric'
import Modal from '../Modal/Modal'

let Dashboard = () => {
    const [metrics, setMetrics] = useState([])
    const [fetching, setFetching] = useState(false)
    const [selectedMetric, setSelectedMetric] = useState(null)
    let nsMetrics = {
        users: {
            activeUsers: 39,
            newUsers: 8,
            totalUsers: 812,
        },
        organizaions: {
            activeOrganizations: 39,
            newOrganizaions: 8,
            totalOrganizaions: 812,
        },
        recipients: {
            newRecipients: 3,
            totalRecipients: 483,
        },
        submissions: {
            newSubmissions: 3,
            totalSubmissions: 483,
        }
    }

    

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
        let selected = metrics.filter(metric => {
            return metric.base === e.target.id
        })
        setSelectedMetric(...selected)
    }

    const handleBackgroundClick = () => {
        setSelectedMetric(null)
    }
    
    let metricsDisplay = metrics ? metrics.map(m => {
        return <Metric 
                    key={m.base} 
                    metrics={m}
                    selectedMetric={selectedMetric} 
                    handleMetricClick={handleMetricClick}/>
    }) : null

    let modal = selectedMetric ? <Modal selectedMetric={selectedMetric} handleBackgroundClick={handleBackgroundClick}/> : null

    return (
        <div className="dashboard-container" >
            <p>World Currencies</p>
            {metricsDisplay}
            {modal}
        </div>
    );
}

export default Dashboard;
