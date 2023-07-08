import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
// import NotFound from './components/NotFound'; // Import the NotFound component

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),


});


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Switch>
            {/* Use "exact" for the home route */}
            <Route path='/' element={<SearchBooks />} />
            <Route path='/saved' element={<SavedBooks />} />
            {/* <Route render={() => <h1 className='display-2'>Wrong page!</h1>} /> */}
            {/* Use "*" to match all routes */}
            {/* <Route
              path="*" element={<NotFound />}
            /> */}
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
