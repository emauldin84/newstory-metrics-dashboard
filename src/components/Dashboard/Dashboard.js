import React, { useState, useEffect } from 'react';
import moment from 'moment'

import query from '../../Utils/query'

import './Dashboard.css';
import Metric from '../Metric/Metric'
import ComparisonFrequency from '../ComparisonFrequency/ComparisonFrequency'
// import Modal from '../Modal/Modal'
import Key from '../Key/Key'
import Spinner from '../Spinner/Spinner'

let Dashboard = () => {
    const [currentMetrics, setCurrentMetrics] = useState([])
    const [comparisonMetrics, setComparisonMetrics] = useState([])
    const [previousComparisonMetrics, setPreviousComparisonMetrics] = useState([])
    const [previousPeriodTotals, setPreviousPeriodTotals] = useState([])
    const [frequency, setFrequency] = useState(['month', 30])
    const [refresh, setRefresh] = useState(true)
    const [userToken, setUserToken] = useState(null)
    const [fetching, setFetching] = useState(true)
    // const [selectedMetric, setSelectedMetric] = useState(null)
    
    useEffect(() => {
        query.signInUser(setUserToken)
    }, [])

    useEffect(() => {
        if(userToken){
            query.setCompData(currentMetrics, frequency, setComparisonMetrics, setPreviousComparisonMetrics, setPreviousPeriodTotals)
        }
    }, [userToken, frequency])
    
    useEffect(() => {
        if(userToken){
            handleFetchData()
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
            setFrequency(freq)
        }
    }
    const handleRefresh = () => {
        setRefresh(!refresh)
    }

    const handleFetchData = () => {
        query.fetchData(userToken, frequency, setCurrentMetrics, setComparisonMetrics, setPreviousComparisonMetrics, setPreviousPeriodTotals, setFetching)
    }

    // builds out data structure to compare current to previous periods
    const nsData = {}
    let currentActiveUsers = []
    let prevActiveUsers = []
    let currentActiveOrgs = []
    let prevActiveOrgs = []
    Object.keys(currentMetrics).forEach(m => {
        let compDate = moment().subtract(frequency[1], 'days').format('YYYY-MM-DD')
        let prevDate = moment().subtract((frequency[1] * 2), 'days').format('YYYY-MM-DD')

        if (m === 'users') {
            currentActiveUsers = currentMetrics[m].filter(user => {
                let endex = user.lastSignInAt ? user.lastSignInAt.indexOf('T') : null
                let lastSignIn = user.lastSignInAt ? user.lastSignInAt.substring(0, endex) : null
                let comments = user.comments.filter(comment => {
                    let createdAtEndex = comment.createdAt ? comment.createdAt.indexOf('T') : null
                    let createdAt = comment.createdAt ? comment.createdAt.substring(0, createdAtEndex) : null
                    let updatedAtEndex = comment.updatedAt ? comment.updatedAt.indexOf('T') : null
                    let updatedAt = comment.updatedAt ? comment.updatedAt.substring(0, updatedAtEndex) : null
                    return createdAt > compDate || updatedAt > compDate
                })
                let createdTasks = user.createdTasks.filter(task => {
                    let createdAtEndex = task.createdAt ? task.createdAt.indexOf('T') : null
                    let createdAt = task.createdAt ? task.createdAt.substring(0, createdAtEndex) : null
                    let updatedAtEndex = task.updatedAt ? task.updatedAt.indexOf('T') : null
                    let updatedAt = task.updatedAt ? task.updatedAt.substring(0, updatedAtEndex) : null
                    return createdAt > compDate || updatedAt > compDate
                })
                return lastSignIn > compDate || comments.length > 0 || createdTasks.length > 0
            })
            prevActiveUsers = currentMetrics[m].filter(user => {
                let endex = user.lastSignInAt ? user.lastSignInAt.indexOf('T') : null
                let lastSignIn = user.lastSignInAt ? user.lastSignInAt.substring(0, endex) : null
                let comments = user.comments.filter(comment => {
                    let createdAtEndex = comment.createdAt ? comment.createdAt.indexOf('T') : null
                    let createdAt = comment.createdAt ? comment.createdAt.substring(0, createdAtEndex) : null
                    let updatedAtEndex = comment.updatedAt ? comment.updatedAt.indexOf('T') : null
                    let updatedAt = comment.updatedAt ? comment.updatedAt.substring(0, updatedAtEndex) : null
                    return (createdAt > prevDate && createdAt < compDate) || (updatedAt > prevDate && createdAt < compDate)
                })
                let createdTasks = user.createdTasks.filter(task => {
                    let createdAtEndex = task.createdAt ? task.createdAt.indexOf('T') : null
                    let createdAt = task.createdAt ? task.createdAt.substring(0, createdAtEndex) : null
                    let updatedAtEndex = task.updatedAt ? task.updatedAt.indexOf('T') : null
                    let updatedAt = task.updatedAt ? task.updatedAt.substring(0, updatedAtEndex) : null
                    return (createdAt > prevDate && createdAt < compDate) || (updatedAt > prevDate && createdAt < compDate)
                })
                console.log('currentUser COMMENTS', comments)
                console.log('currentUser TASKS', createdTasks)
                return (lastSignIn > prevDate && lastSignIn < compDate) || comments.length > 0 || createdTasks.length > 0
            })
        }

        if (m === 'organizations') {
            currentActiveOrgs = currentMetrics[m].map(org => {
                let activeOrgs = []
                let activeUsers = org.users.filter(user => {
                    let endex = user.lastSignInAt ? user.lastSignInAt.indexOf('T') : null
                    let lastSignIn = user.lastSignInAt ? user.lastSignInAt.substring(0, endex) : null
                    return lastSignIn > compDate
                })
                let activeComments = org.comments.filter(comment => {
                    let createdAtEndex = comment.createdAt ? comment.createdAt.indexOf('T') : null
                    let createdAt = comment.createdAt ? comment.createdAt.substring(0, createdAtEndex) : null
                    let updatedAtEndex = comment.updatedAt ? comment.updatedAt.indexOf('T') : null
                    let updatedAt = comment.updatedAt ? comment.updatedAt.substring(0, updatedAtEndex) : null
                    return createdAt > compDate || updatedAt > compDate
                })
                let activeQuestions = org.questions.filter(question => {
                    let createdAtEndex = question.createdAt ? question.createdAt.indexOf('T') : null
                    let createdAt = question.createdAt ? question.createdAt.substring(0, createdAtEndex) : null
                    let updatedAtEndex = question.updatedAt ? question.updatedAt.indexOf('T') : null
                    let updatedAt = question.updatedAt ? question.updatedAt.substring(0, updatedAtEndex) : null
                    return createdAt > compDate || updatedAt > compDate
                })
                let activeSurveys = org.surveys.filter(survey => {
                    let createdAtEndex = survey.createdAt ? survey.createdAt.indexOf('T') : null
                    let createdAt = survey.createdAt ? survey.createdAt.substring(0, createdAtEndex) : null
                    let updatedAtEndex = survey.updatedAt ? survey.updatedAt.indexOf('T') : null
                    let updatedAt = survey.updatedAt ? survey.updatedAt.substring(0, updatedAtEndex) : null
                    let changedAtEndex = survey.changedAt ? survey.changedAt.indexOf('T') : null
                    let changedAt = survey.changedAt ? survey.changedAt.substring(0, changedAtEndex) : null
                    return createdAt > compDate || updatedAt > compDate || changedAt > compDate
                })
                let activeTasks = org.tasks.filter(task => {
                    let createdAtEndex = task.createdAt ? task.createdAt.indexOf('T') : null
                    let createdAt = task.createdAt ? task.createdAt.substring(0, createdAtEndex) : null
                    let updatedAtEndex = task.updatedAt ? task.updatedAt.indexOf('T') : null
                    let updatedAt = task.updatedAt ? task.updatedAt.substring(0, updatedAtEndex) : null
                    let completedAtEndex = task.completedAt ? task.completedAt.indexOf('T') : null
                    let completedAt = task.completedAt ? task.completedAt.substring(0, completedAtEndex) : null
                    return createdAt > compDate || updatedAt > compDate || completedAt > compDate
                })

                activeOrgs = [...activeUsers, ...activeComments, ...activeQuestions, ...activeSurveys, ...activeTasks]
                return activeOrgs
            }).filter (org => {
                return org.length >= 1
            })

            prevActiveOrgs = currentMetrics[m].map(org => {
                let activeOrgs = []

                let activeUsers = org.users.filter(user => {
                    let endex = user.lastSignInAt ? user.lastSignInAt.indexOf('T') : null
                    let lastSignIn = user.lastSignInAt ? user.lastSignInAt.substring(0, endex) : null
                    return lastSignIn > prevDate && lastSignIn < compDate
                })
                let activeComments = org.comments.filter(comment => {
                    let createdAtEndex = comment.createdAt ? comment.createdAt.indexOf('T') : null
                    let createdAt = comment.createdAt ? comment.createdAt.substring(0, createdAtEndex) : null
                    let updatedAtEndex = comment.updatedAt ? comment.updatedAt.indexOf('T') : null
                    let updatedAt = comment.updatedAt ? comment.updatedAt.substring(0, updatedAtEndex) : null
                    return (createdAt > prevDate && createdAt < compDate) || (updatedAt > prevDate && updatedAt < compDate)
                })
                let activeQuestions = org.questions.filter(question => {
                    let createdAtEndex = question.createdAt ? question.createdAt.indexOf('T') : null
                    let createdAt = question.createdAt ? question.createdAt.substring(0, createdAtEndex) : null
                    let updatedAtEndex = question.updatedAt ? question.updatedAt.indexOf('T') : null
                    let updatedAt = question.updatedAt ? question.updatedAt.substring(0, updatedAtEndex) : null
                    return (createdAt > prevDate && createdAt < compDate) || (updatedAt > prevDate && updatedAt < compDate)

                })
                let activeSurveys = org.surveys.filter(survey => {
                    let createdAtEndex = survey.createdAt ? survey.createdAt.indexOf('T') : null
                    let createdAt = survey.createdAt ? survey.createdAt.substring(0, createdAtEndex) : null
                    let updatedAtEndex = survey.updatedAt ? survey.updatedAt.indexOf('T') : null
                    let updatedAt = survey.updatedAt ? survey.updatedAt.substring(0, updatedAtEndex) : null
                    let changedAtEndex = survey.changedAt ? survey.changedAt.indexOf('T') : null
                    let changedAt = survey.changedAt ? survey.changedAt.substring(0, changedAtEndex) : null
                    return (createdAt > prevDate && createdAt < compDate) || (updatedAt > prevDate && updatedAt < compDate) || (changedAt > prevDate && changedAt < compDate)

                })
                let activeTasks = org.tasks.filter(task => {
                    let createdAtEndex = task.createdAt ? task.createdAt.indexOf('T') : null
                    let createdAt = task.createdAt ? task.createdAt.substring(0, createdAtEndex) : null
                    let updatedAtEndex = task.updatedAt ? task.updatedAt.indexOf('T') : null
                    let updatedAt = task.updatedAt ? task.updatedAt.substring(0, updatedAtEndex) : null
                    let completedAtEndex = task.completedAt ? task.completedAt.indexOf('T') : null
                    let completedAt = task.completedAt ? task.completedAt.substring(0, completedAtEndex) : null
                    return (createdAt > prevDate && createdAt < compDate) || (updatedAt > prevDate && updatedAt < compDate) || (completedAt > prevDate && completedAt < compDate)
                })

                activeOrgs = [...activeUsers, ...activeComments, ...activeQuestions, ...activeSurveys, ...activeTasks]
                return activeOrgs
            }).filter (org => {
                return org.length >= 1
            })
        }

        nsData[m] = comparisonMetrics[m] && previousComparisonMetrics[m] && previousPeriodTotals[m] ? 
        m === 'organizations' || m === 'users' ? 
        {
            active: {
                current: m === 'organizations' ? currentActiveOrgs.length : currentActiveUsers.length,
                comparison: m === 'organizations' ? prevActiveOrgs.length : prevActiveUsers.length
            },
            new: {
                current: comparisonMetrics[m].length,
                comparison: previousComparisonMetrics[m].length
            },
            total: {
                current: currentMetrics[m].length,
                comparison: previousPeriodTotals[m].length
            },
        } 
        :
        {
            new: {
                current: comparisonMetrics[m].length,
                comparison: previousComparisonMetrics[m].length
            },
            total: {
                current: currentMetrics[m].length,
                comparison: previousPeriodTotals[m].length
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
            <ComparisonFrequency handleFrequencyClick={handleFrequencyClick} frequency={frequency} fetchData={handleFetchData} setFetching={setFetching}/>
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