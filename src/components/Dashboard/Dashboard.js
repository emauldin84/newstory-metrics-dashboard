import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment'

import query from '../../Utils/query'

import './Dashboard.css';
import Metric from '../Metric/Metric'
import ComparisonFrequency from '../ComparisonFrequency/ComparisonFrequency'
// import Modal from '../Modal/Modal'
import Key from '../Key/Key'
import Spinner from '../Spinner/Spinner'

let Dashboard = () => {
    const [comparisonMetrics, setComparisonMetrics] = useState([])
    const [previousComparisonMetrics, setPreviousComparisonMetrics] = useState([])
    const [currentMetrics, setCurrentMetrics] = useState([])
    const [frequency, setFrequency] = useState(['month', 30])
    const [refresh, setRefresh] = useState(true)
    const [userToken, setUserToken] = useState(null)
    const [fetching, setFetching] = useState(true)
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

    // const frequencyRef = useRef()
    
    useEffect(() => {
        query.signInUser(setUserToken)
    }, [])

    // useEffect(() => {
    //     frequencyRef.current = frequency
    // })

    // const prevFrequency = frequencyRef.current

    useEffect(() => {
        if(userToken){
            // query.fetchComparisonData(userToken, setComparisonMetrics, frequency[1], setFetching, prevFrequency[1])
            // query.fetchPreviousComparisonData(userToken, setPreviousComparisonMetrics, frequency[1], setFetching, prevFrequency[1])
            query.setCompData(currentMetrics, frequency, setComparisonMetrics, setPreviousComparisonMetrics)
        }
    }, [userToken, frequency])
    
    useEffect(() => {
        if(userToken){
            query.fetchData(userToken, frequency, setCurrentMetrics, setComparisonMetrics, setPreviousComparisonMetrics, setFetching)
        }
    }, [userToken])
    
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
        if (freq[1] !== frequency[1]){
            // setFetching(true)
            setFrequency(freq)
        }
    }
    const handleRefresh = () => {
        setRefresh(!refresh)
    }
    const nsData = {}
    let currentActiveUsers = []
    let prevActiveUsers = []
    let currentActiveOrgs = []
    let prevActiveOrgs = []
    Object.keys(currentMetrics).forEach(m => {
        let compDate = moment().subtract(frequency[1], 'days').format('YYYY-MM-DD')
        let prevDate = moment().subtract((frequency[1] * 2), 'days').format('YYYY-MM-DD')
        console.log('COMP', compDate)
        console.log('PREV', prevDate)

        if (m === 'users') {
            currentActiveUsers = currentMetrics[m].filter(active => {
                let endex = active.lastSignInAt ? active.lastSignInAt.indexOf('T') : null
                let lastSignIn = active.lastSignInAt ? active.lastSignInAt.substring(0, endex) : null
                return lastSignIn > compDate
            })
            prevActiveUsers = currentMetrics[m].filter(active => {
                let endex = active.lastSignInAt ? active.lastSignInAt.indexOf('T') : null
                let lastSignIn = active.lastSignInAt ? active.lastSignInAt.substring(0, endex) : null
                return lastSignIn > prevDate && lastSignIn < compDate
            })
        }

        
        if (m === 'organizations') {
            currentActiveOrgs = currentMetrics[m].map(org => {
                let activeUsers = org.users.filter(user => {
                    let endex = user.lastSignInAt ? user.lastSignInAt.indexOf('T') : null
                    let lastSignIn = user.lastSignInAt ? user.lastSignInAt.substring(0, endex) : null
                    if (lastSignIn <= compDate) return false
                    return lastSignIn > compDate
                })
                return activeUsers
            }).filter (org => {
                return org.length >= 1
            })

            prevActiveOrgs = currentMetrics[m].map(org => {
                let activeUsers = org.users.filter(user => {
                    let endex = user.lastSignInAt ? user.lastSignInAt.indexOf('T') : null
                    let lastSignIn = user.lastSignInAt ? user.lastSignInAt.substring(0, endex) : null
                    return lastSignIn > prevDate && lastSignIn < compDate
                })
                return activeUsers
            }).filter (org => {
                return org.length >= 1
            })
        }

        console.log('prevActiveUsers', prevActiveUsers)
        console.log('currentActiveUsers', currentActiveUsers)

        console.log('prevActiveOrgs', prevActiveOrgs)
        console.log('currentActiveOrgs', currentActiveOrgs)

        nsData[m] = comparisonMetrics[m] && previousComparisonMetrics[m] ? 
        m === 'organizations' || m === 'users' ? 
        {
            active: {
                current: m === 'organizations' ? currentActiveOrgs.length : currentActiveUsers.length,
                comparison: m === 'organizations' ? prevActiveOrgs.length : prevActiveUsers.length
            },
            new: {
                current: currentMetrics[m].length - comparisonMetrics[m].length,
                comparison: comparisonMetrics[m].length - previousComparisonMetrics[m].length
            },
            total: {
                current: currentMetrics[m].length,
                comparison: comparisonMetrics[m].length
            },
        } 
        :
        {
            new: {
                current: currentMetrics[m].length - comparisonMetrics[m].length,
                comparison: comparisonMetrics[m].length - previousComparisonMetrics[m].length
            },
            total: {
                current: currentMetrics[m].length,
                comparison: comparisonMetrics[m].length
            },
        }
        
        : null

    })
    let metricsDisplay = Object.keys(nsData).map(cM => {
        return <Metric 
                    key={cM} 
                    metrics={cM}
                    metricsData={nsData[cM]}
                    frequency={frequency}
                    // selectedMetric={selectedMetric} 
                    // handleMetricClick={handleMetricClick}
                    />
    })

    // let modal = selectedMetric ? <Modal selectedMetric={selectedMetric} handleBackgroundClick={handleBackgroundClick}/> : null
    let dashDisplay = fetching ? <Spinner /> : 
    <div>
        {metricsDisplay}
        <Key />
    </div>

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
            {dashDisplay}
        </div>
    );
}

export default Dashboard;