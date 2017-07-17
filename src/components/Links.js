import React, { Component } from 'react';
import '../App.css';
import {
  Link
} from 'react-router-dom';
class Links extends Component {
  render() {
    return (
      <div className="ui large menu purple inverted three item menu">
        <Link className="item" activeClassName="active" activeOnlyWhenExact to="/">Home</Link>
        <Link className="item" activeClassName="active" activeOnlyWhenExact to="/games">Games</Link>
        <Link className="item" activeClassName="active" activeOnlyWhenExact to="/addgames">Add New Game</Link>
      </div>
    )
  }
};

export default Links;