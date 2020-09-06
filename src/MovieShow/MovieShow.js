import React, { Component } from 'react';
import { submitUserRating, deleteUserRating } from '../helpers/apiCalls';
import Comments from '../Comments/Comments';
import './MovieShow.css';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

class MovieShow extends Component{
  constructor(props) {
    super(props);
    this.state = {
      userRating: this.props.userRating || '',
      error: '',
      inputVisible: '' || this.props.ratingMatch,
      checkedInput: false,
      deleteVisible: this.props.deleteVisible || 'hidden',
      userRatings: this.props.userRatings,
      ratingDeleted: false,
      ratingSubmitted: false,
      ratingId: null
    }
  }
  componentDidUpdate(prevProps) {
    const { movieId, userId, userRatings } = this.props;
    if (userRatings !== prevProps) {
      if (this.state.ratingDeleted) {
        this.sendDeleteRating(userId, this.state.ratingId)
      } else if(this.state.ratingSubmitted) {
        const newRating = {
          movie_id: movieId,
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
    const { movieId, userId, userRatings, changeAfterSubmit } = this.props;
    submitUserRating(userId, userRating)
      .then(newRating => changeAfterSubmit(userId, movieId))
      .then(newResponse => this.setState({inputVisible: 'hidden', deleteVisible: 'delete-button', userRatings: userRatings}))
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
    const { userRatings } = this.props;
    event.preventDefault();
    const ratingId = this.findRatingId(userRatings);
    this.setState({ratingDeleted: true, ratingId: ratingId})
  }

  sendDeleteRating= (userId, ratingId) => {
    const {movieId, userRatings, getRatings} = this.props;
    deleteUserRating(userId, ratingId)
      .then(response => getRatings(userId, movieId))
      .then(newResponse => this.setState((state, props) => ({ratingId: null,userRating: null, deleteVisible: 'hidden', inputVisible: '', userRatings: userRatings})))
      .then(finalResponse => this.setState({ratingDeleted: false}))
      .catch(error => {
        this.setState({error: 'Sorry, we were unable to remove your rating for this movie. Try again later!'})
      })
  }

  findRatingId(usersRatings) {
    const { movieId } = this.props;
    let matchedRating = usersRatings.find(rating => rating.movie_id === movieId);

    return matchedRating.id;
  }

  render() {
    const { movieId, loggedIn, title, poster, releaseDate, overview, genres, budget, revenue, runtime, tagline, avgRating, changePage } = this.props;
    if (this.state.error !== "") {
      return (
        <div className='message-bar'>
          <h2>{this.state.error}</h2>
        </div>
      )
    } else if (loggedIn === false) {
      return (
        <div className='movies-comments'>
          <div className='movie-show'>
            <div className='btn-box'>
              <NavLink className='back-btn' onClick={changePage} exact to='/'>Back</NavLink>
              <h1 className='movie-title'>{title}</h1>
            </div>
            <div className='poster-display'>
              <img src={poster} className="movie-poster" alt='movie poster'/>
              <h2>{tagline}</h2>
              <h3>Runtime: {runtime} minutes</h3>
            </div>
            <div className='movie-info'>
              <h3>Average Rating: {avgRating}</h3>
              <h3>Release Date: {releaseDate}</h3>
              <p>Genres: {genres}</p>
              <p className='overview'>{overview}</p>
              <h4>Budget: ${budget}</h4>
              <h4>Revenue: ${revenue}</h4>
            </div>
          </div>
          <Comments />
        </div>
      )
    } else {
      return (
        <div className='movies-comments'>
          <div className='movie-show'>
            <div className='btn-box'>
              <NavLink className='back-btn' onClick={changePage} exact to='/'>Back</NavLink>
              <h1 className='movie-title'>{title}</h1>
            </div>
            <div className='poster-display'>
              <img src={poster} className="movie-poster" alt='movie poster'/>
              <h2>{tagline}</h2>
              <h3>Runtime: {runtime} minutes</h3>
            </div>
            <div className='movie-info'>
              <h3 className='avg-rating'>Average Rating: {avgRating}</h3>
              <h3>Your Rating: {this.state.userRating}<button className={this.state.deleteVisible} onClick={this.deleteRating}>Delete Your Rating</button></h3>
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
              <h3>Release Date: {releaseDate}</h3>
              <p>Genres: {genres}</p>
              <p className='overview'>{overview}</p>
              <h4>Budget: ${budget}</h4>
              <h4>Revenue: ${revenue}</h4>
            </div>
          </div>
          <Comments
            login={loggedIn}
            movieId={movieId}
          />
        </div>
      )
    }
  }
}

MovieShow.propTypes = {
  error: PropTypes.string,
  inputVisible: PropTypes.string,
  checkedInput: PropTypes.bool,
  ratingDeleted: PropTypes.bool,
  ratingSubmitted: PropTypes.bool,
  ratingId: PropTypes.number,
  movieId: PropTypes.number,
  userId: PropTypes.number,
  loggedIn: PropTypes.bool,
  title: PropTypes.string,
  poster: PropTypes.string,
  releaseDate: PropTypes.string,
  overview: PropTypes.string,
  genres: PropTypes.string,
  budget: PropTypes.string,
  revenue: PropTypes.string,
  runtime: PropTypes.number,
  tagline: PropTypes.string,
  avgRating: PropTypes.string,
  userRatings: PropTypes.arrayOf(PropTypes.object),
  ratingMatch: PropTypes.string,
  userRating: PropTypes.string,
  deleteVisible: PropTypes.string,
  getRatings: PropTypes.func,
  changeAfterSubmit: PropTypes.func,
  changePage: PropTypes.func
}

export default MovieShow;
