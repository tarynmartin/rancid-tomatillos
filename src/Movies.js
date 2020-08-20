import React from 'react';
import './Movies.css';
import MovieCard from './MovieCard.js';

const Movies = (props) => {
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

export default Movies;
