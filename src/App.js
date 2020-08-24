import React, { Component } from 'react';
import './App.css';
import Header from './Header'
import Movies from './Movies'
import Login from './Login'
import MovieShow from './MovieShow'
import { getMovies, loginUser, getMovieInfo } from './apiCalls.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageView: 'home',
      movies: [],
      error: '',
      login: false,
      userId: null,
      userName: '',
      userEmail: '',
      movieId: null,
      movieTitle: '',
      poster_path: '',
      backdrop_path: '',
      release_date: '',
      overview: '',
      genres: null,
      budget: null,
      revenue: null,
      runtime: null,
      tagline: '',
      average_rating: null,
    }
  }
  componentDidMount() {
    getMovies()
      .then(data => this.setState({movies: data.movies}))
      .catch(error => this.setState({ error: "STELLLLAAAA"}));
  }

  submitPostRequest = (loginInfo) => {
    loginUser(loginInfo)
      .then(json => {
        this.setState({
          pageView: 'loggedIn',
          login: true,
          userId: json.user.id,
          userName: json.user.name,
          userEmail: json.user.email,
        });
      })
      .catch(err => {
        this.setState({ error: 'Oh no! Please enter a valid email and password to login.'});
        console.log('it failed');
      });
  }
  getMovieInfo = (movieId) => {
    getMovieInfo(movieId)
      .then(data => this.setState({
        movieTitle: data.movie.title,
        poster_path: data.movie.poster_path,
        backdrop_path: data.movie.backdrop_path,
        release_date: data.movie.release_date,
        overview: data.movie.overview,
        genres: data.movie.genres.join(', '),
        budget: data.movie.budget.toLocaleString(),
        revenue: data.movie.revenue.toLocaleString(),
        runtime: data.movie.runtime,
        tagline: data.movie.tagline,
        average_rating: data.movie.average_rating,}))
      .catch(error => this.setState({ error: "Sorry, we couldn't find that movie"}));
  }

  showLogin = () => {
    this.setState({pageView: 'login'})
  }

  logoutUser = () => {
    this.setState({pageView: 'home', login: false, userId: null, userName: '', userEmail: ''})
  }

  showMovieInfo = (movieID) => {
    this.setState({pageView: 'movie-show', movieId: movieID});
    this.getMovieInfo(movieID);
  }

  render() {
    const page = this.state.pageView;
    return (
      <main className="App">
      <Header
        loginBtn={this.showLogin}
        logoutBtn={this.logoutUser}
        pageView={page}
      />
      {page === 'home' &&
        <Movies
          movies={this.state.movies}
          error={this.state.error}
          showMovieInfo={this.showMovieInfo}
        />
      }
      {page === 'login' &&
        <Login submitLogin={this.submitPostRequest}/>
      }
      {page === 'loggedIn' &&
        <Movies
          user={this.state.userName}
          movies={this.state.movies}
          error={this.state.error}
          showMovieInfo={this.showMovieInfo}
        />
      }
      {page === 'movie-show' &&
        <MovieShow
          title={this.state.movieTitle}
          poster={this.state.poster_path}
          backdrop={this.state.backdrop_path}
          releaseDate={this.state.release_date}
          overview={this.state.overview}
          genres={this.state.genres}
          budget={this.state.budget}
          revenue={this.state.revenue}
          runtime={this.state.runtime}
          tagline={this.state.tagline}
          avgRating={this.state.average_rating}
        />
      }
      </main>
    )
  }
}

export default App;
