import React, { Component } from 'react';

class Home extends Component {
  render() {
    const styles = {
      color:'violet',
    };
    return (
      <div>
       <h1 style={styles}>Project Summary</h1>
       <hr></hr>
        Welcome to my Game App. This is React-Redux Single Page Application (SPA). User can Create, Read, 
        Edit and Delete Games from the Game list.
        <h2 style={styles}>Project Features</h2>
        <hr></hr>
        <ul>
          <li> <b> React-Redux</b> - Client and Server-side </li>
          <li> <b> Sementic -Ui Bootstrap</b> - for Layout and Styling </li>
          <li> <b> CRUD Operation</b> - for Back-end Services </li>
          <li> <b> MongoDb</b> - for database management </li>
          <li> <b> Project Dependencies</b> Dependencies Are as follows: 
          <ol><li><b>React-Redux</b></li>
          <li><b>React-Router V4</b></li>
          <li><b>React-Thunk</b></li>
          <li><b>React-DevTools-Extension</b></li> </ol>
          </li>
         
          </ul>

        </div>
        
    )
  }
};

export default Home;