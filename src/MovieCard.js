import React, { Component } from 'react';
import './MovieCard.css';

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
      <div className="movie-card" onClick={this.showMovie}>
        <p>{this.props.movie.title}</p>
        <p>{this.props.movie.average_rating}</p>
        <img src={this.props.movie.poster_path} className="movie-poster"/>
      </div>
    )
  }
}

export default MovieCard;
