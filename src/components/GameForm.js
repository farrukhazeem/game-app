import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { saveGame, fetchGame, updateGame } from '../actions';

class GameForm extends Component {
    state = {
        _id: this.props.game ? this.props.game._id :null,
        title: this.props.game ? this.props.game.title :'',
        cover: this.props.game ? this.props.game.cover :'',
        errors: {},
        loading: false,
        done: false
    }

    componentDidMount =()=>{
        if (this.props.match.params._id){
            this.props.fetchGame(this.props.match.params._id);
        }
    }

    handleChange = (e) => {
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({
                [e.target.name]: e.target.value,
                errors
            });
        } else {
            this.setState({ [e.target.name]: e.target.value });
        }


    }

    handleSubmit = (e) => {
        e.preventDefault();
        
        //validation .. Client-side Validation..
       let errors = {};
       if (this.state.title === '') errors.title = "Can't be Empty";
       if (this.state.cover === '') errors.cover = "Can't be Empty";
       this.setState({ errors });
       const isValid = Object.keys(errors).length === 0

        if (isValid) {
            const { _id,title, cover } = this.state;
            this.setState({ loading: true });
            if (_id){
                this.props.updateGame({_id, title, cover}).then(
                () => {this.setState({done: true})},
                (err) => err.response.json().then(({ errors }) => this.setState({ errors, loading: false }))
            );
            } else {
                this.props.saveGame({title, cover}).then(
                    ()=> {this.setState({done: true})},
                    (err) => err.response.json().then(({errors})=> this.setState({ errors,loading:false}))
                );
            }
        }

    }

    render() {
        let pageTitle = 'Add New Games';
        if (this.state._id) {
            pageTitle = 'Edit New Game';
        }
        const form =(
            <form className={classnames('ui', 'form', { loading: this.state.loading })} onSubmit={this.handleSubmit}>
                <h1 style={styles}>{pageTitle}</h1>

                {!!this.state.errors.global && <div className=" ui negative message"><p>{this.state.errors.global}</p></div> }
                <div className={classnames('field', { error: !!this.state.errors.title })}>
                    <label htmlFor="title">Title</label>
                    <input
                        name="title"
                        value={this.state.title}
                        onChange={this.handleChange}
                        id="title"
                    />
                    <span>{this.state.errors.title}</span>
                </div>
                <div className={classnames('field', { error: !!this.state.errors.cover })}>
                    <label htmlFor="cover">Cover URL</label>
                    <input
                        name="cover"
                        value={this.state.cover}
                        onChange={this.handleChange}
                        id="cover"
                    />
                    <span>{this.state.errors.cover}</span>
                </div>
                <div className="field">
                    {this.state.cover !== '' && <img src={this.state.cover} alt="cover" className="ui small bordered image" />}
                </div>
                <div className="field">
                    <button className="ui green button">Save</button>
                </div>
            </form>

        )

        const styles = {
      color:'Violet',
    };
        return (
          <div> 
            {this.state.done ? <Redirect to="/games"/> : form}

          </div>



        );
    }
}

function mapStateToProps(state, props) {
    if (props.match.params._id){
        return{
            game: state.games.find(item => item._id === props.match.params._id)
        }
    }
    return {game: null};
}

export default connect(mapStateToProps, { saveGame, fetchGame, updateGame })(GameForm);
