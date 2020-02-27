import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard'
// import ApolloClient from 'apollo-boost';
// import { ApolloProvider } from '@apollo/react-hooks'
// import { gql } from "apollo-boost";

// const client = new ApolloClient({
//   uri: 'https://api-dev.newstory.io/graphiql',
//   headers: {
//     'Content-Type': 'application/graphql',
//     'X-Api-Key': '{{54125abed83236f363b8330eefe6f4e3}}'
//   },
//   fetchOptions: {
//     mode: 'no-cors',
//   },
// });
// const signInUser = gql`
//                     mutation {
//                       signInUser(email: "emauldin84@gmail.com", password: "thrivenotsurvive"){
//                         token
//                       }
//                     }
//                   `

// client.mutate({
//       mutation: signInUser
//   })
//   .then(result => 
//     console.log('result', result)
//     )
//   .catch(err => {
//       throw err
//   })

let App = () => {

  return (
    <div className="App">
      {/* <ApolloProvider client={client}> */}
        <Dashboard />
      {/* </ApolloProvider> */}
    </div>
  );
}

export default App;
