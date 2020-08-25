import React from 'react';

const MovieShow = (props) => {
  return (
    <div>
      <h1>{props.movie.title}</h1>
      <h3>Average Rating: {props.movie.average_rating}</h3>
      <img src={props.movie.poster} className="movie-poster"/>
      <h2>{props.movie.tagline}</h2>
      <h3>Runtime: {props.movie.runtime} minutes</h3>
      <h3>Release Date: {props.movie.release_date}</h3>
      <p>Genres: {props.movie.genres}</p>
      <p>{props.movie.overview}</p>
      <h4>Budget: ${props.movie.budget}</h4>
      <h4>Revenue: ${props.movie.revenue}</h4>
    </div>
  )
}

export default MovieShow;
