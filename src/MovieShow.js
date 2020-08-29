import React, { Component } from 'react';
import { submitUserRating, deleteUserRating } from './apiCalls';
import './MovieShow.css'

class MovieShow extends Component{
  constructor(props) {
    super(props);
    this.state = {
      userRating: this.props.userRating || null,
      error: '',
      inputVisible: '' || this.props.ratingMatch,
      checkedInput: false,
      deleteVisible: this.props.deleteVisible || 'hidden',
      ratingId: null,
      userRatings: this.props.userRatings,
      ratingDeleted: false,
      ratingSubmitted: false,
      ratingId: null
    }
  }
  // componentDidUpdate - update usersRatings
  // need conditional logic to only run logic when needed
  // compare previous and current props to see if there was a change
  // react docs for componentDidUpdate for current and previous props
  componentDidUpdate(prevProps) {
    if (this.props.userRatings != prevProps) {
      if (this.state.ratingDeleted) {
        this.sendDeleteRating(this.props.userId, this.state.ratingId)
      } else if(this.state.ratingSubmitted) {
        const newRating = {
          movie_id: this.props.movieId,
          rating: parseInt(this.state.userRating)
        }

        this.sendPostRequest(newRating);
      }
    }
  }

  submitRating = (event) => {
    event.preventDefault();
    if (this.state.checkedInput === false) {
      return alert('Please enter a valid number from 1 - 10, no decimals!')
    } else {
      this.setState({ratingSubmitted: true});
    }
  }

  sendPostRequest = (userRating) => {
    submitUserRating(this.props.userId, userRating)
      .then(newRating => this.props.changeAfterSubmit(this.props.userId, this.props.movieId))
      .then(newResponse => this.setState({inputVisible: 'hidden', deleteVisible: 'delete-button', userRatings: this.props.userRatings}))
      .then(finalResponse => this.setState({ratingSubmitted: false, checkedInput: false}))
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
    if (inputValue < 1 || inputValue > 10) {
      return false;
    } else if (this.state.checkedInput === '') {
      return false;
    } else if (Number.isInteger(userInput)) {
      return true;
    } else {
      return false;
    }
  }

  deleteRating = (event) => {
    event.preventDefault();
    const ratingId = this.findRatingId(this.props.userRatings);
    this.setState({ratingDeleted: true, ratingId: ratingId})
  }

  sendDeleteRating= (userId, ratingId) => {
    deleteUserRating(userId, ratingId)
      .then(response => this.props.getRatings(this.props.userId, this.props.movieId))
      .then(newResponse => this.setState((state, props) => ({ratingId: null,userRating: null, deleteVisible: 'hidden', inputVisible: '', userRatings: this.props.userRatings})))
      .then(finalResponse => this.setState({ratingDeleted: false}))
      .catch(error => {
        this.setState({error: 'Sorry, we were unable to remove your rating for this movie. Try again later!'})
      })
  }

  findRatingId(usersRatings) {
    let matchedRating = usersRatings.find(rating => rating.movie_id === this.props.movieId);

    return matchedRating.id;
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
      return (
        <div>
          <h1>{this.props.title}</h1>
          <h3>Average Rating: {this.props.avgRating}</h3>
          <h3>Your Rating: {this.state.userRating}<button className={this.state.deleteVisible} onClick={this.deleteRating}>Delete Your Rating</button></h3>
          <h3 className={this.state.inputVisible}>Rate This Movie from 1-10!
            <input
            type='number'
            name='userRating'
            placeholder='1 - 10'
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
