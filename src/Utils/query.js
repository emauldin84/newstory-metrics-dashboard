import axios from 'axios'

export const signInUser = (setUserToken) => {
    axios.post("https://api-dev.newstory.io/graphql", 
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

export const fetchData = (token) => {
    console.log('token', token)
    axios.post("https://api-dev.newstory.io/graphql", 
    {
        query: `
            query {users(lastSyncedAt:"2020-02-26"){
                uuid
                username
                firstName
                lastName
                createdAt
                }
                organizations(lastSyncedAt:"2020-02-26"){
                    uuid
                    name
                }
                recipients(lastSyncedAt:"2020-02-26"){
                    uuid
                    name
                    createdAt
                    updatedAt
                }
                submissions(lastSyncedAt:"2020-02-26"){
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
        console.log(res.data)
    })
    .catch(err => {
        throw err
    })
}