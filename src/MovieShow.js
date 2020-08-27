import React, { Component } from 'react';
import { submitUserRating } from './apiCalls';

class MovieShow extends Component{
  constructor(props) {
    super(props);
    this.state = {
      userRating: null,
    }
  }
  // make sure input is between 1-10
  submitRating = (event) => {
    event.preventDefault();
    const newRating = {
      movie_id: this.props.movieId,
      rating: this.state.userRating
    }
    //need to finish the POST and store the returned rating data in state to display
    // create a catch for it

    submitUserRating(this.props.userId, newRating);
    this.clearInputs();
  }

  clearInputs() {
    this.setState({userRating: null})
  }

  // submitRating = (id, userRating) => {
  //   this.submitUserRating(this.props.userId, newRating);
  //   this.clearInputs();
  // }
  //find movie id in user ratings, if found, return error message

  createRating = (event) => {
    const inputKey = event.target.name;
    const inputValue = event.target.value;
    this.setState({[inputKey]: inputValue})
  }

  render() {
    if (this.props.loggedIn === false) {
      return (
        <div>
          <h1>{this.props.title}</h1>
          <h3>Average Rating: {this.props.avgRating}</h3>
          <img src={this.props.poster} className="movie-poster"/>
          <h2>{this.props.tagline}</h2>
          <h3>Runtime: {this.props.runtime} minutes</h3>
          <h3>Release Date: {this.props.releaseDate}</h3>
          <p>Genres: {this.props.genres}</p>
          <p>{this.props.overview}</p>
          <h4>Budget: ${this.props.budget}</h4>
          <h4>Revenue: ${this.props.revenue}</h4>
        </div>
      )
    } else {
      return (
        <div>
          <h1>{this.props.title}</h1>
          <h3>Average Rating: {this.props.avgRating}</h3>
          <h3>Your Rating: {this.props.userRating}</h3>
          <h3>Rate This Movie from 1-10!
            <input
            type='number'
            name='userRating'
            value={this.state.userRating}
            onChange={this.createRating}
            />
            <button onClick={this.submitRating}>Submit</button>
          </h3>
          <img src={this.props.poster} className="movie-poster"/>
          <h2>{this.props.tagline}</h2>
          <h3>Runtime: {this.props.runtime} minutes</h3>
          <h3>Release Date: {this.props.releaseDate}</h3>
          <p>Genres: {this.props.genres}</p>
          <p>{this.props.overview}</p>
          <h4>Budget: ${this.props.budget}</h4>
          <h4>Revenue: ${this.props.revenue}</h4>
        </div>
      )
    }
  }
}



export default MovieShow;
