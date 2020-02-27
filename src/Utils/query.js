import axios from 'axios'
import moment from 'moment'

export const signInUser = async (setUserToken) => {
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

export const fetchComparisonData = (token, setComparisonMetrics, frequency) => {
    console.log('token', token)
    let compDate = moment().subtract(frequency, 'days').format('YYYY-MM-DD')
    console.log(compDate)
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
        console.log(res.data.data)
        setComparisonMetrics(res.data.data)
    })
    .catch(err => {
        throw err
    })
}