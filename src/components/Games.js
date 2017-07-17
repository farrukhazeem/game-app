import React, { Component } from 'react';
import GamesList from './GamesList';
import { connect } from 'react-redux';
import { fetchGames, deleteGame } from '../actions';

class Games extends Component {
  
  componentDidMount(){
    this.props.fetchGames();
  }
  
  render() {
    const styles = {
      color:'violet',
    };
    return (
      <div>
        <h1 style={styles}>Games List</h1>
        <hr></hr>

        <GamesList games={this.props.games} deleteGame={this.props.deleteGame}/>
        </div>
    )
  }
};

Games.prototypes = {
  games: React.PropTypes.array.isRequired,
  fetchGames: React.PropTypes.func.isRequired,
}

function mapStateToProps(state){
  return {
    games: state.games
  }
}

export default connect(mapStateToProps, {fetchGames, deleteGame})(Games);