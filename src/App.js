import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import SignIn from './SignIn';

function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signinportis" component={SignIn} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
