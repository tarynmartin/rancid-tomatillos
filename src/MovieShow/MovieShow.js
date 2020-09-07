import React, { Component } from 'react';
import { retrieveMovieInfo, submitUserRating, deleteUserRating } from '../helpers/apiCalls';
import Comments from '../Comments/Comments';
import './MovieShow.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class MovieShow extends Component{
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      poster: '',
      backdrop: '',
      releaseDate: '',
      overview: '',
      genres: null,
      budget: null,
      revenue: null,
      runtime: null,
      tagline: '',
      avgRating: null,
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

  componentDidMount() {
    const { movieId } = this.props;
    this.getMovieInfo(movieId);
  }

  getMovieInfo = (movieId) => {
    retrieveMovieInfo(movieId)
      .then(data => this.setState({
        title: data.movie.title,
        poster: data.movie.poster_path,
        backdrop: data.movie.backdrop_path,
        releaseDate: data.movie.release_date,
        overview: data.movie.overview,
        genres: data.movie.genres.join(', '),
        budget: data.movie.budget.toLocaleString(),
        revenue: data.movie.revenue.toLocaleString(),
        runtime: data.movie.runtime,
        tagline: data.movie.tagline,
        avgRating: data.movie.average_rating.toFixed(2),}))
      .catch(error => this.setState({ pageView: 'home', error: "Sorry, we couldn't find that movie"}));
  }

  submitRating = (event) => {
    const { movieId } = this.props;
    event.preventDefault();
    if (this.state.checkedInput === false) {
      return alert('Please enter a valid number from 1 - 10, no decimals!')
    } else {
      const newRating = {
              movie_id: movieId,
              rating: parseInt(this.state.userRating)
            }
      this.setState({ratingSubmitted: true}, () => this.sendPostRequest(newRating));
    }
  }

  sendPostRequest = (userRating) => {
    const { movieId, userId, userRatings, getRatings } = this.props;
    submitUserRating(userId, userRating)
      .then(newRating => getRatings(userId))
      .then(getMovie => this.getMovieInfo(movieId))
      .then(newResponse => this.setState({inputVisible: 'hidden', deleteVisible: 'delete-button', userRatings: userRatings}))
      .then(finalResponse => this.setState({checkedInput: false}))
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
    const { userId, userRatings } = this.props;
    event.preventDefault();
    const ratingId = this.findRatingId(userRatings);
    this.setState({ratingDeleted: true, ratingId: ratingId}, () => this.sendDeleteRating(userId, this.state.ratingId))
  }

  sendDeleteRating= (userId, ratingId) => {
    const {movieId, userRatings, getRatings} = this.props;
    deleteUserRating(userId, ratingId)
      .then(response => getRatings(userId))
      .then(getMovie => this.getMovieInfo(movieId))
      .then(newResponse => this.setState((state, props) => ({ratingId: null, userRating: null, deleteVisible: 'hidden', inputVisible: '', userRatings: userRatings})))
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
    const { movieId, userId, changePage } = this.props;
      return (
        <div className='movies-comments'>
          <div className='movie-show'>
            <div className='btn-box'>
              <Link className='back-btn' onClick={changePage} exact to='/'>Back</Link>
              {this.state.error !== "" &&
              <div className='message-bar'>
                <h2>{this.state.error}</h2>
              </div>
              }
              <h1 className='movie-title'>{this.state.title}</h1>
            </div>
            <div className='poster-display'>
              <img src={this.state.poster} className="movie-poster" alt='movie poster'/>
              <h2>{this.state.tagline}</h2>
              <h3>Runtime: {this.state.runtime} minutes</h3>
            </div>
            <div className='movie-info'>
              <h3>Average Rating: {this.state.avgRating}</h3>
              {userId !== null &&
                <div>
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
                </div>
              }
              <h3>Release Date: {this.state.releaseDate}</h3>
              <p>Genres: {this.state.genres}</p>
              <p className='overview'>{this.state.overview}</p>
              <h4>Budget: ${this.state.budget}</h4>
              <h4>Revenue: ${this.state.revenue}</h4>
            </div>
          </div>
          <Comments />
        </div>
      )
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
  changePage: PropTypes.func
}

export default MovieShow;
