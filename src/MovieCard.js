import React from 'react';
import './MovieCard.css';

const MovieCard = (props) => {
  console.log(props)
  return (
    <div className="movie-card">
      <p>{props.movie.title}</p>
      <p>{props.movie.average_rating}</p>
      <img src={props.movie.poster_path} className="movie-poster"/>
    </div>
  )
}

export default MovieCard;
