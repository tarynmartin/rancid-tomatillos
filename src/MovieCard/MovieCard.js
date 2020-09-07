import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MovieCard.css';
import { Link } from 'react-router-dom'

class MovieCard extends Component{
  constructor(props) {
    super(props);
    this.state = {
      movieId: this.props.movie.id
    }
  }

  showMovie = () => {
    const { showMovieInfo } = this.props;
    showMovieInfo(this.state.movieId);
  }
  render() {
    const { movie } = this.props;
    return (
      <Link to={'/' + movie.id}>
        <div className="movie-card" onClick={this.showMovie}>
          <p className='title'>{movie.title}</p>
          <img src={movie.poster_path} className="movie-poster" alt="movie poster"/>
          <p className='rating short-title'>Average Rating: {movie.average_rating.toFixed(2)}</p>
        </div>
      </Link>)
  }
}

MovieCard.propTypes = {
  movieId: PropTypes.string,
  showMovieInfo: PropTypes.func,
  movie: PropTypes.object
}

export default MovieCard;
