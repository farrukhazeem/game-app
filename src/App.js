import React, { Component } from 'react';
import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import Home from './components/Home';
import Games from './components/Games';
import Links from './components/Links';
import GameForm from './components/GameForm';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div className="ui container">
            <Links />
            <Route exact path="/" component={Home} />
            <Route path="/games" component={Games} />
            <Route path="/addgames" component={GameForm} />
            <Route path="/game/:_id" component={GameForm} />

          </div>
        </Router>
      </div>
   

    );
  }
}

export default App;
