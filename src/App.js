import React from 'react';
import './App.css';
import NavigationTabs from './containers/NavigationTabs/NavigationTabs';
import Login from './containers/Login/Login';

function App() {

  return (
    <div className="App">
      <h1>Mobile Scheduler App</h1>
      <Login />
      {/* <NavigationTabs /> */}
    </div>
  );
}

export default App;