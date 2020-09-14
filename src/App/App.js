import React, { Component } from 'react';
import './App.css';
import Header from '../Header/Header'
import Movies from '../Movies/Movies'
import Login from '../Login/Login'
import MovieShow from '../MovieShow/MovieShow'
import { Route, Redirect } from 'react-router-dom'
import { getMovies, loginUser, retrieveUserRatings } from '../helpers/apiCalls.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      error: '',
      userId: null,
      userName: '',
      userEmail: '',
      movieId: null,
      userRatings: [],
      ratingMatch: '',
      userRating: null,
      deleteVisible: ''
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

  logoutUser = () => {
    this.setState({userId: null, userName: '', userEmail: ''})
  }

  showMovieInfo = (movieID) => {
    this.setState({movieId: movieID});
    this.checkForUserRating(movieID);
  }

  checkForUserRating(movieId) {
    this.state.userRatings.find(movie => {
      if(movie.movie_id === movieId) {
        return this.setState({ userRating: movie.rating, ratingMatch: 'hidden', deleteVisible: 'delete-button'})
      }
    })
  }

  render() {
    return (
      <main className="App">
        <Header
          user={this.state.userName}
          loginBtn={this.showLogin}
          logoutBtn={this.logoutUser}
        />
        <Route exact path='/movies/login' render={() =>
          <Login submitLogin={this.submitPostRequest}/>
        }>
        </Route>
        <Route exact path="/movies/login" render={() => {
            return (
              (this.state.userName !== '') ?
                <Redirect to="/" />:
                <Redirect to="/movies/login" />
              )
          }}>
        </Route>
        <Route exact path='/:movie_id' render={ () =>
          <MovieShow
          movieId={this.state.movieId}
          userId={this.state.userId}
          userRatings={this.state.userRatings}
          ratingMatch={this.state.ratingMatch}
          userRating={this.state.userRating}
          deleteVisible={this.state.deleteVisible}
          getRatings={this.getUserRatings}
          />
        }>
        </Route>
        <Route exact path='/' render={ () =>
          <Movies
          user={this.state.userName}
          movies={this.state.movies}
          error={this.state.error}
          showMovieInfo={this.showMovieInfo}
          />
        }>
        </Route>
      </main>
    )
  }
}

export default App;
