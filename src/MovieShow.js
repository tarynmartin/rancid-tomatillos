import React, { Component } from 'react';

class MovieShow extends Component{
  constructor(props) {
    super(props);
    this.state = {
      userRating: null,
    }
  }

  render() {
    if (this.props.loggedIn === false) {
      return (
        <div>
          <h1>{this.props.title}</h1>
          <h3>Average Rating: {this.props.avgRating}</h3>
          <img src={this.props.poster} className="movie-poster"/>
          <h2>{this.props.tagline}</h2>
          <h3>Runtime: {this.props.runtime} minutes</h3>
          <h3>Release Date: {this.props.releaseDate}</h3>
          <p>Genres: {this.props.genres}</p>
          <p>{this.props.overview}</p>
          <h4>Budget: ${this.props.budget}</h4>
          <h4>Revenue: ${this.props.revenue}</h4>
        </div>
      )
    } else {
      return (
        <div>
          <h1>{this.props.title}</h1>
          <h3>Average Rating: {this.props.avgRating}</h3>
          <h3>Your Rating: {this.props.userRating}</h3>
          <h3>Rate This Movie from 1-10!<input type='number'/><button>Submit</button></h3>
          <img src={this.props.poster} className="movie-poster"/>
          <h2>{this.props.tagline}</h2>
          <h3>Runtime: {this.props.runtime} minutes</h3>
          <h3>Release Date: {this.props.releaseDate}</h3>
          <p>Genres: {this.props.genres}</p>
          <p>{this.props.overview}</p>
          <h4>Budget: ${this.props.budget}</h4>
          <h4>Revenue: ${this.props.revenue}</h4>
        </div>
      )
    }
  }
}



export default MovieShow;
