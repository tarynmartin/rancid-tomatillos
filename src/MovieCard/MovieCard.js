import React from 'react';
import PropTypes from 'prop-types';
import './MovieCard.css';
import { Link } from 'react-router-dom'

const MovieCard = ({movie, showMovieInfo}) => {
  return (
    <Link to={'/' + movie.id}>
      <div className="movie-card" onClick={() => showMovieInfo(movie.id)}>
        <p className='title'>{movie.title}</p>
        <img src={movie.poster_path} className="movie-poster" alt="movie poster"/>
        <p className='rating short-title'>Average Rating: {movie.average_rating.toFixed(2)}</p>
      </div>
    </Link>
  )
}


MovieCard.propTypes = {
  movieId: PropTypes.string,
  showMovieInfo: PropTypes.func,
  movie: PropTypes.object
}

export default MovieCard;
