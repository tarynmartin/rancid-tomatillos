import React from 'react';
import './Movies.css';
import MovieCard from './MovieCard.js';

const Movies = (props) => {
  if (props.error !== '') {
    return <h2>{props.error}</h2>
  } else {
    return (
      <section className="movies-container">
        {
          props.movies.map(movie => {
            return <MovieCard movie = {movie} />
          })
        }
      </section>
    )
  }
}

export default Movies;
