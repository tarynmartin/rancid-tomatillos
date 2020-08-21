import React from 'react';
import './MovieCard.css';

const MovieCard = (props) => {
  return (
    <div className="movie-card">
      <p>{props.movie.title}</p>
      <p>{props.movie.average_rating}</p>
    </div>
  )
}

export default MovieCard;
