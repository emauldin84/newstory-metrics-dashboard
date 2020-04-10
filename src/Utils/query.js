import axios from 'axios'
import moment from 'moment'

const signInUser = async (setUserToken) => {
    await axios.post("https://api-dev.newstory.io/graphql", 
        {
            query: `
                mutation { signInUser(email: "emauldin84@gmail.com", password:"thrivenotsurvive"){
                token
                viewer { 
                    uuid 
                    email 
                    firstName 
                    lastName 
                } 
            } 
        }
        `
        },
        {
            headers: {
            "X-Api-Key": "54125abed83236f363b8330eefe6f4e3",
            'Content-Type': 'application/json'
            }
        })
        .then(res => {
            // console.log(res)
            setUserToken(res.data.data.signInUser.token)
        })
        .catch(err => {
            throw err
        })
}


const fetchData = (token, frequency, setCurrentMetrics, setComparisonMetrics, setPreviousComparisonMetrics, setPreviousPeriodTotals, setFetching) => {
    axios.post("https://api-dev.newstory.io/graphql", 
    {
        query: `
        query {
            users {
                uuid
                username
                createdAt
                lastSignInAt
                comments {
                    createdAt
                    updatedAt
                }
                createdTasks {
                    createdAt
                    updatedAt
                }
            }
            organizations{
                name
                createdAt
                users {
                    uuid
                    username
                    lastSignInAt
                }
                comments {
                    createdAt
                    updatedAt
                }
                questions {
                    createdAt
                    updatedAt
                }
                surveys {
                    createdAt
                    updatedAt
                    changedAt
                }
                tasks{
                    createdAt
                    updatedAt
                    completedAt
                    }
            }
            recipients{
                uuid
                name
                createdAt
                updatedAt
            }
            submissions {
                uuid
                createdAt 
            }
        }
        `
    },
    {
        headers: {
        "Authorization": token,
        "X-Api-Key": "54125abed83236f363b8330eefe6f4e3",
        'Content-Type': 'application/json'
        }
    })
    .then(res => {
        // console.log('CUR DATA ',res.data.data)
        // setting current data
        setCurrentMetrics(res.data.data)
        setCompData(res.data.data, frequency, setComparisonMetrics, setPreviousComparisonMetrics, setPreviousPeriodTotals)
        setFetching(false)
    })
    .catch(err => {
        throw err
    })
}

const setCompData = (data, frequency, setCompMetrics, setPrevCompMetrics, setPrevPeriodTotals) => {
    // setting comparison data based on set frequency
    let compDate = moment().subtract(frequency[1], 'days').format('YYYY-MM-DD')
    let filteredCompData = {}
    Object.keys(data).forEach(category => {
        let result  = data[category].filter(item => {
            let endex = item.createdAt.indexOf('T')
            let createdAt = item.createdAt.substring(0, endex)
            return createdAt > compDate
        })
        filteredCompData[category] = result
    })
    setCompMetrics(filteredCompData)

    // setting previous comparison data based on set frequency to determine 'new' users/orgs rate.
    let prevFreq = frequency[1] * 2
    let prevCompDate = moment().subtract(prevFreq, 'days').format('YYYY-MM-DD')
    let filteredPrevCompData = {}
    Object.keys(data).forEach(category => {
        let result  = data[category].filter(item => {
            let endex = item.createdAt.indexOf('T')
            let createdAt = item.createdAt.substring(0, endex)
            return createdAt > prevCompDate && createdAt < compDate
        })
        filteredPrevCompData[category] = result
    })
    setPrevCompMetrics(filteredPrevCompData)

    // setting previous period totals for comparison to current period total
    let previousPeriodTotals = {}
    Object.keys(data).forEach(category => {
        let result  = data[category].filter(item => {
            let endex = item.createdAt.indexOf('T')
            let createdAt = item.createdAt.substring(0, endex)
            return createdAt < compDate
        })
        previousPeriodTotals[category] = result
    })
    setPrevPeriodTotals(previousPeriodTotals)
}

export default {
    signInUser,
    setCompData,
    fetchData,
}