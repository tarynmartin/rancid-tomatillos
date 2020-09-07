import React from 'react';
import './Movies.css';
import PropTypes from 'prop-types';
import MovieCard from '../MovieCard/MovieCard';

const Movies = ({user, movies, error, showMovieInfo}) => {

  if (error !== '') {
    return <h2 className='message-bar'>{error}</h2>
  } else if (user !== '') {
    return (
      <div>
        <h2 className='message-bar'>Hello {user}!</h2>
        <section className="movies-container">
          {
            movies.map(movie => {
              return (<MovieCard
                movie={movie} showMovieInfo={showMovieInfo}
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
          movies.map(movie => {
            return (<MovieCard
              movie = {movie}
              showMovieInfo={showMovieInfo}
              key={movie.id}
              />)
          })
        }
      </section>
    )
  }
}

Movies.propTypes = {
  user: PropTypes.string,
  movies: PropTypes.arrayOf(PropTypes.object),
  error: PropTypes.string,
  showMovieInfo: PropTypes.func
}

export default Movies;
