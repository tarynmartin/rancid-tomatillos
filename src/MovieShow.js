import React from 'react';

const MovieShow = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      <h3>Average Rating: {props.average_rating}</h3>
      <img src={props.poster} className="movie-poster"/>
      <h2>{props.tagline}</h2>
      <h3>Runtime: {props.runtime} minutes</h3>
      <h3>Release Date: {props.release_date}</h3>
      <p>Genres: {props.genres}</p>
      <p>{props.overview}</p>
      <h4>Budget: ${props.budget}</h4>
      <h4>Revenue: ${props.revenue}</h4>
    </div>
  )
}

export default MovieShow;