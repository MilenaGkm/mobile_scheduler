import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Login from './containers/Login/Login';
import NavigationTabs from './containers/NavigationTabs/NavigationTabs';

function App() {

  return (
    <Router>
      <div className="App">
        <h1>Mobile Scheduler App</h1>
        <Route path="/" render={() => <Login />} />
        <Route path="/dashboard" render={() => <NavigationTabs /> } />
        {/* <Login /> */}
        {/* <NavigationTabs /> */}
      </div>
    </Router>
  );
}

export default App;