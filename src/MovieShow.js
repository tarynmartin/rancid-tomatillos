import React, { Component } from 'react';
import { submitUserRating } from './apiCalls';
import './MovieShow.css'
import { NavLink } from 'react-router-dom';

class MovieShow extends Component{
  constructor(props) {
    super(props);
    this.state = {
      userRating: null || this.props.userRating,
      error: '',
      inputVisible: '' || this.props.ratingMatch,
      checkedInput: ''
    }
  }

  submitRating = (event) => {
    event.preventDefault();
    if (this.state.checkedInput === false) {
      return alert('Please enter a valid number from 1 - 10, no decimals!')
    } else {
      const newRating = {
        movie_id: this.props.movieId,
        rating: parseInt(this.state.userRating)
      }

      this.sendPostRequest(newRating);
    }
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

  createRating = (event) => {
    const inputKey = event.target.name;
    const inputValue = event.target.value;
    this.setState({checkedInput: this.checkInput(inputValue), [inputKey]: inputValue});
  }

  checkInput(inputValue) {
    const userInput = +inputValue;
    console.log(typeof userInput);
    if (inputValue < 1 || inputValue > 10) {
      return false;
    } else if (Number.isInteger(userInput)) {
      return true
    } else {
      return false;
    }
  }

  render() {
    if (this.state.error !== "") {
      return (
        <div className='message-bar'>
          <h2>{this.state.error}</h2>
        </div>
      )
    } else if (this.props.loggedIn === false) {
      return (
        <div className='movie-show'>
          <div className='btn-box'>
            <NavLink className='back-btn' exact to='/'>Back</NavLink>
            <h1 className='movie-title'>{this.props.title}</h1>
          </div>
          <div className='poster-display'>
            <img src={this.props.poster} className="movie-poster"/>
            <h2>{this.props.tagline}</h2>
            <h3>Runtime: {this.props.runtime} minutes</h3>
          </div>
          <div className='movie-info'>
            <h3>Average Rating: {this.props.avgRating}</h3>
            <h3>Release Date: {this.props.releaseDate}</h3>
            <p>Genres: {this.props.genres}</p>
            <p className='overview'>{this.props.overview}</p>
            <h4>Budget: ${this.props.budget}</h4>
            <h4>Revenue: ${this.props.revenue}</h4>
          </div>
        </div>
      )
    } else {
      return (
        <div className='movie-show'>
          <div className='btn-box'>
            <NavLink className='back-btn' exact to='/'>Back</NavLink>
            <h1 className='movie-title'>{this.props.title}</h1>
          </div>
          <div className='poster-display'>
            <img src={this.props.poster} className="movie-poster"/>
            <h2>{this.props.tagline}</h2>
            <h3>Runtime: {this.props.runtime} minutes</h3>
          </div>
          <div className='movie-info'>
            <h3 className='avg-rating'>Average Rating: {this.props.avgRating}</h3>
            <h3>Your Rating: {this.state.userRating}</h3>
            <h3 className={this.state.inputVisible}>Rate This Movie from 1-10!</h3>
              <input
              className='rating-input'
              type='number'
              name='userRating'
              placeholder='1 - 10'
              value={this.state.userRating}
              onChange={this.createRating}
              />
              <button className='rating-btn' onClick={this.submitRating}>Submit</button>
            <h3>Release Date: {this.props.releaseDate}</h3>
            <p>Genres: {this.props.genres}</p>
            <p className='overview'>{this.props.overview}</p>
            <h4>Budget: ${this.props.budget}</h4>
            <h4>Revenue: ${this.props.revenue}</h4>
          </div>
        </div>
      )
    }
  }
}



export default MovieShow;
