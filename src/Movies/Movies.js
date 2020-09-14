import React from 'react';
import './Movies.css';
import PropTypes from 'prop-types';
import MovieCard from '../MovieCard/MovieCard';

const Movies = ({user, movies, error, showMovieInfo}) => {
  let allMovies = movies.map(movie => {
      return (<MovieCard
        movie={movie}
        showMovieInfo={showMovieInfo}
        key={movie.id}
        />)
    });

  return (
    <div>
      {error !== '' &&
        <h2 className='message-bar'>{error}</h2>
      }
      {user !== '' &&
        <h2 className='message-bar'>Hello {user}!</h2>
      }
      <section className="movies-container">
        {allMovies}
      </section>
    </div>
  )
}

Movies.propTypes = {
  user: PropTypes.string,
  movies: PropTypes.arrayOf(PropTypes.object),
  error: PropTypes.string,
  showMovieInfo: PropTypes.func
}

export default Movies;
