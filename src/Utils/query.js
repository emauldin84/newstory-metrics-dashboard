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
            console.log(res)
            setUserToken(res.data.data.signInUser.token)
        })
        .catch(err => {
            throw err
        })
}
const fetchComparisonData = (token, setComparisonMetrics, frequency, setFetching, prevFrequency) => {
    let compDate = moment().subtract(frequency, 'days').format('YYYY-MM-DD')
    axios.post("https://api-dev.newstory.io/graphql", 
    {
        query: `
            query {users(lastSyncedAt:"${compDate}"){
                uuid
                username
                firstName
                lastName
                createdAt
                }
                organizations(lastSyncedAt:"${compDate}"){
                    uuid
                    name
                }
                recipients(lastSyncedAt:"${compDate}"){
                    uuid
                    name
                    createdAt
                    updatedAt
                }
                submissions(lastSyncedAt:"${compDate}"){
                    uuid
                    surveyor {
                        firstName
                        lastName
                        username
                    }
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
        console.log('COMP DATA ', res.data.data)
        setComparisonMetrics(res.data.data)
        // if ( frequency !== prevFrequency ) setFetching(false)
    })
    .catch(err => {
        throw err
    })
}
const fetchPreviousComparisonData = (token, setComparisonMetrics, frequency, setFetching, prevFrequency) => {
    let prevFreq = frequency * 2
    let compDate = moment().subtract(prevFreq, 'days').format('YYYY-MM-DD')
    axios.post("https://api-dev.newstory.io/graphql", 
    {
        query: `
            query {users(lastSyncedAt:"${compDate}"){
                uuid
                username
                firstName
                lastName
                createdAt
                }
                organizations(lastSyncedAt:"${compDate}"){
                    uuid
                    name
                }
                recipients(lastSyncedAt:"${compDate}"){
                    uuid
                    name
                    createdAt
                    updatedAt
                }
                submissions(lastSyncedAt:"${compDate}"){
                    uuid
                    surveyor {
                        firstName
                        lastName
                        username
                    }
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
        console.log('PrevCOMP DATA ', res.data.data)
        setComparisonMetrics(res.data.data)
        if ( frequency !== prevFrequency ) setFetching(false)
    })
    .catch(err => {
        throw err
    })
}
const fetchCurrentData = (token, setCurrentMetrics, setFetching) => {
    axios.post("https://api-dev.newstory.io/graphql", 
    {
        query: `
            query {
                users {
                    uuid
                    username
                    createdAt
                    lastSignInAt
                    }
                organizations{
                    uuid
                    name
                    createdAt
                    users {
                        uuid
                    username
                        lastSignInAt
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
                    surveyor {
                        firstName
                        lastName
                        username
                    }
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
        console.log('CUR DATA ',res.data.data)
        setCurrentMetrics(res.data.data)
        setFetching(false)
    })
    .catch(err => {
        throw err
    })
}

export default {
    signInUser,
    fetchComparisonData,
    fetchPreviousComparisonData,
    fetchCurrentData
}