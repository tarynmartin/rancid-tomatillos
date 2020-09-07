import React, { Component } from 'react';
import './App.css';
import Header from '../Header/Header'
import Movies from '../Movies/Movies'
import Login from '../Login/Login'
import MovieShow from '../MovieShow/MovieShow'
import { Route } from 'react-router-dom'
import { getMovies, loginUser, retrieveUserRatings } from '../helpers/apiCalls.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageView: 'home',
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
          pageView: 'loggedIn',
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

  showLogin = () => {
    this.setState({pageView: 'login'})
  }

  logoutUser = () => {
    this.setState({pageView: 'home', login: false, userId: null, userName: '', userEmail: ''})
  }

  showMovieInfo = (movieID) => {
    this.setState({pageView: 'movie-show', movieId: movieID});
    this.checkForUserRating(movieID);
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
          user={this.state.userName}
          loginBtn={this.showLogin}
          logoutBtn={this.logoutUser}
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
          userRatings={this.state.userRatings}
          ratingMatch={this.state.ratingMatch}
          userRating={this.state.userRating}
          deleteVisible={this.state.deleteVisible}
          getRatings={this.getUserRatings}
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
