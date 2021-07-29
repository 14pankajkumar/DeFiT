import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SuperFluid from './pages/SuperFluid';

function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/superfluid" component={SuperFluid} />
          <Route path="/signinportis" component={SignIn} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
