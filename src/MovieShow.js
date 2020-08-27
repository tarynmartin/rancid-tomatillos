import React, { Component } from 'react';
import { submitUserRating } from './apiCalls';
import './MovieShow.css'

class MovieShow extends Component{
  constructor(props) {
    super(props);
    this.state = {
      userRating: null || this.props.userRating,
      error: '',
      inputVisible: '' || this.props.ratingMatch
    }
  }

  submitRating = (event) => {
    event.preventDefault();
    const newRating = {
      movie_id: this.props.movieId,
      rating: parseInt(this.state.userRating)
    }

    this.sendPostRequest(newRating);
  }

  sendPostRequest = (userRating) => {
    submitUserRating(this.props.userId, userRating)
      .then(newRating => {
        this.setState({ userRating: newRating.rating.rating, inputVisible: 'hidden'});
      })
      .catch(error => {
        this.setState({error: 'You have already submitted a rating for this movie.'})
      })
  }

  // make sure input is between 1-10


  createRating = (event) => {
    const inputKey = event.target.name;
    const inputValue = event.target.value;
    this.setState({[inputKey]: inputValue})
  }

  render() {
    if (this.state.error !== "") {
      return (
        <div>
          <h2>{this.state.error}</h2>
        </div>
      )
    } else if (this.props.loggedIn === false) {
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
      const inputField = this.state.inputVisible;
      return (
        <div>
          <h1>{this.props.title}</h1>
          <h3>Average Rating: {this.props.avgRating}</h3>
          <h3>Your Rating: {this.state.userRating}</h3>
          <h3 className={this.state.inputVisible}>Rate This Movie from 1-10!
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
