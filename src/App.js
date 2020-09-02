import React, { Component } from 'react';
import './App.css';
import Header from './Header'
import Movies from './Movies'
import Login from './Login'
import MovieShow from './MovieShow'
import { Route } from 'react-router-dom'
import { getMovies, loginUser, getMovieInfo, retrieveUserRatings } from './apiCalls.js'

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
      userRatings: [],
      ratingMatch: '',
      userRating: null
    }
  }
  componentDidMount() {
    getMovies()
      .then(data => this.setState({movies: data.movies}))
      .catch(error => this.setState({ error: "STELLLLAAAA"}));
  }

  getUserRatings = (userId) => {
    retrieveUserRatings(userId)
      .then(ratings => {
        this.setState({ userRatings: ratings.ratings })
      })
      .catch(error => {
        this.setState({
          pageView: 'movies',
          error: 'Looks like you haven\'t rated this movie yet!'
        })
      })
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
      .then(userData => {
        this.getUserRatings(this.state.userId);
      })
      .catch(err => {
        this.setState({ pageView: 'home', error: 'Oh no! Please enter a valid email and password to login.'});
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
        average_rating: data.movie.average_rating.toFixed(2),}))
      .catch(error => this.setState({ pageView: 'home', error: "Sorry, we couldn't find that movie"}));
  }

  showLogin = () => {
    this.setState({pageView: 'login'})
  }

  logoutUser = () => {
    this.setState({pageView: 'home', login: false, userId: null, userName: '', userEmail: ''})
  }

  showMovieInfoAfterDelete = (userId, movieId) => {
    this.getUserRatings(userId);
    this.getMovieInfo(movieId)
  }

  showMovieInfoAfterRating = (userId, movieId) => {
    this.getUserRatings(userId);
    this.showMovieInfo(movieId);
  }

  showMovieInfo = (movieID) => {
    this.setState({pageView: 'movie-show', movieId: movieID});
    this.checkForUserRating(movieID);
    this.getMovieInfo(movieID);
  }

  checkForUserRating(movieId) {
    this.state.userRatings.find(movie => {
      if(movie.movie_id === movieId) {
        return this.setState({ userRating: movie.rating, ratingMatch: 'hidden', deleteVisible: 'delete-button'})
      }
    })
  }

  changePageview = () => {
    if(this.state.login === false) {
      this.setState({pageView: 'home'})
    } else if (this.state.login === true) {
      this.setState({pageView: 'loggedIn'})
    }

  }

  render() {
    const page = this.state.pageView;
    return (
      <main className="App">
        <Header
          loginBtn={this.showLogin}
          logoutBtn={this.logoutUser}
          pageView={page}
          login={this.state.login}
        />
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
        <Route path='/:movie_id'>
         {page === 'movie-show' &&
          <MovieShow
          movieId={this.state.movieId}
          userId={this.state.userId}
          loggedIn={this.state.login}
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
          userRatings={this.state.userRatings}
          ratingMatch={this.state.ratingMatch}
          userRating={this.state.userRating}
          deleteVisible={this.state.deleteVisible}
          getRatings={this.showMovieInfoAfterDelete}
          changeAfterSubmit={this.showMovieInfoAfterRating}
          changePage={this.changePageview}
          />
         }
        </Route>
        <Route exact path='/'>
         {page === 'home' &&
          <Movies
          movies={this.state.movies}
          error={this.state.error}
          showMovieInfo={this.showMovieInfo}
          />
         }
        </Route>
      </main>
    )
  }
}

export default App;
