import React, { Component } from 'react';
import './MovieCard.css';
import { NavLink } from 'react-router-dom'

class MovieCard extends Component{
  constructor(props) {
    super(props);
    this.state = {
      movieId: this.props.movie.id
    }
  }

  showMovie = () => {
    this.props.showMovieInfo(this.state.movieId);
  }
  render() {
    return (
      <NavLink to={'/' + this.props.movie.id}>
        <div className="movie-card" onClick={this.showMovie}>
          <p className='title'>{this.props.movie.title}</p>
          <img src={this.props.movie.poster_path} className="movie-poster" alt="movie poster"/>
          <p className='rating short-title'>Average Rating: {this.props.movie.average_rating.toFixed(2)}</p>
        </div>
      </NavLink>)
  }
}

export default MovieCard;
