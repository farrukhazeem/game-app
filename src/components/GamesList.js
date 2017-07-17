import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';

const GamesList = ({ games, deleteGame }) => {
  const emptyMessage=(
      <p>There are no games yet in your collection</p>
  );

  const gamesList = (
      games.map(game => {
        if (game) {
          return <div className="ui card" key={game._id}>
            <div className="image">
              <img src={game.cover}/>
            </div>
            <div className="content">
              <p>{game.title}</p>
            </div>
            <div className="extra content">
              <div className="ui two buttons">
                <Link to={`/game/${game._id}`} className="ui basic button green">Edit</Link>
                <div className="ui basic button red" onClick={() => deleteGame(game._id)}>Delete</div>
              </div>
            </div>
          </div>
        }
      }
      )

  );
    return (
       <div className="ui four cards">
           {games.length === 0 ? emptyMessage : gamesList}
       </div>
    );
  }

export default GamesList;
