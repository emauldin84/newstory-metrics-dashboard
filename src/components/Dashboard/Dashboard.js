import React, { useState, useEffect } from 'react';
// import axios from 'axios'

import './Dashboard.css';
import Metric from '../Metric/Metric'
import ComparisonFrequency from '../ComparisonFrequency/ComparisonFrequency'
// import Modal from '../Modal/Modal'
import Key from '../Key/Key'

let Dashboard = () => {
    // const [metrics, setMetrics] = useState([])
    const [frequency, setFrequency] = useState(['currentMonth','lastMonth'])
    const [refresh, setRefresh] = useState(true)
    // const [fetching, setFetching] = useState(false)
    // const [selectedMetric, setSelectedMetric] = useState(null)
    let nsMetrics = {
        users: {
            active: {
                currentMonth: 39,
                currentQuarter: 55,
                currentYear: 92,
                lastMonth: 39,
                lastQuarter: 50,
                lastYear: 90,
            },
            new: {
                currentMonth: 8,
                currentQuarter: 20,
                currentYear: 100,
                lastMonth: 6,
                lastQuarter: 12,
                lastYear: 40,
            },
            total: {
                currentMonth: 812,
                currentQuarter: 812,
                currentYear: 812,
                lastMonth: 804,
                lastQuarter: 792,
                lastYear: 712,
            },
        },
        organizations: {
            active: {
                currentMonth: 39,
                currentQuarter: 55,
                currentYear: 92,
                lastMonth: 32,
                lastQuarter: 50,
                lastYear: 90,
            },
            new: {
                currentMonth: 8,
                currentQuarter: 20,
                currentYear: 100,
                lastMonth: 6,
                lastQuarter: 12,
                lastYear: 40,
            },
            total: {
                currentMonth: 812,
                currentQuarter: 812,
                currentYear: 812,
                lastMonth: 804,
                lastQuarter: 792,
                lastYear: 712,
            },
        },
        recipients: {
            new: {
                currentMonth: 3,
                currentQuarter: 4,
                currentYear: 5,
                lastMonth: 1,
                lastQuarter: 0,
                lastYear: 7,
            },
            total: {
                currentMonth: 483,
                currentQuarter: 483,
                currentYear: 483,
                lastMonth: 480,
                lastQuarter: 479,
                lastYear: 478,
            },
        },
        submissions: {
            new: {
                currentMonth: 3,
                currentQuarter: 4,
                currentYear: 5,
                lastMonth: 1,
                lastQuarter: 0,
                lastYear: 7,
            },
            total: {
                currentMonth: 483,
                currentQuarter: 483,
                currentYear: 483,
                lastMonth: 480,
                lastQuarter: 479,
                lastYear: 478,
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

    // const handleMetricClick = (e) => {
    //     let selected = metrics.filter(metric => {
    //         return metric.base === e.target.id
    //     })
    //     setSelectedMetric(...selected)
    // }

    // const handleBackgroundClick = () => {
    //     setSelectedMetric(null)
    // }
    const handleFrequencyClick = (freq) => {
        setFrequency(freq)
    }
    const handleRefresh = () => {
        setRefresh(!refresh)
        console.log('refreshing page!')
    }
    
    let metricsDisplay = Object.keys(nsMetrics).map(m => {
        return <Metric 
                    key={m} 
                    metrics={m}
                    metricsData={nsMetrics[m]}
                    frequency={frequency}
                    // selectedMetric={selectedMetric} 
                    // handleMetricClick={handleMetricClick}
                    />
    })

    // let modal = selectedMetric ? <Modal selectedMetric={selectedMetric} handleBackgroundClick={handleBackgroundClick}/> : null

    return (
        <div className="dashboard-container" >
            <div className='logo-container'>
                <img className='logo' alt='New Story Logo' src='https://360kk73nf60j1amgkj11crnq-wpengine.netdna-ssl.com/wp-content/themes/newstory/src/img/logo.png' onClick={handleRefresh}/>
            </div>
            <ComparisonFrequency handleFrequencyClick={handleFrequencyClick} frequency={frequency}/>
            <div className='title-display'>
                <p className='titles' id='title-metric'><b>Metric</b></p>
                <p className='titles' id='title-value'><b>Value</b></p>
                <p className='titles' id='title-comparison'><b>Comparison</b></p>
            </div>
            {metricsDisplay}
            {/* {modal} */}
            <Key />
        </div>
    );
}

export default Dashboard;
