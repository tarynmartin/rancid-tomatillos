import React from 'react';
import './Movies.css';
import MovieCard from './MovieCard.js';

const Movies = (props) => {
  if (props.error !== '') {
    return <h2 className='message-bar'>{props.error}</h2>
  } else if (props.user) {
    return (
      <div>
        <h2 className='message-bar'>Hello {props.user}!</h2>
        <section className="movies-container">
          {
            props.movies.map(movie => {
              return (<MovieCard
                movie={movie} showMovieInfo={props.showMovieInfo}
                key={movie.id}
                />)
            })
          }
        </section>
      </div>
    )
  }else {
    return (
      <section className="movies-container">
        {
          props.movies.map(movie => {
            return (<MovieCard
              movie = {movie}
              showMovieInfo={props.showMovieInfo}
              key={movie.id}
              />)
          })
        }
      </section>
    )
  }
}

export default Movies;
