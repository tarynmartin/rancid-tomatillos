import React, { Component } from 'react';
import './App.css';
import Header from './Header'
import Movies from './Movies'
import Login from './Login'
// import MovieCard from './MovieCard'

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
    }
  }
  componentDidMount() {
    fetch("https:rancid-tomatillos.herokuapp.com/api/v2/movies")
      .then(response => response.json())
      .then(data => this.setState({movies: data.movies}))
      .catch(error => this.setState({ error: "STELLLLAAAA"}));
  }

  submitPostRequest = (loginInfo) => {
    fetch('https://rancid-tomatillos.herokuapp.com/api/v2/login', {
      method: 'POST',
      headers: {
      	'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginInfo),
    })
      .then(response => response.json())
      .then(json => {
        this.setState({
          pageView: 'loggedIn',
          login: true,
          userId: json.user.id,
          userName: json.user.name,
          userEmail: json.user.email,
        });
      })
      // welcome for user and logout button once logged in?
      .catch(err => {
        this.setState({ error: 'Oh no! Please enter a valid email and password to login.'});
        console.log('it failed');
      });
  }

  showLogin = () => {
    this.setState({pageView: 'login'})
  }

  logoutUser = () => {
    this.setState({pageView: 'home', login: false, userId: null, userName: '', userEmail: ''})
  }

  render() {
    const page = this.state.pageView;
    return (
      <main className="App">
      {page === 'home' &&
        <div>
          <Header
            loginBtn={this.showLogin}
            pageView={page}
          />
          <Movies
            movies={this.state.movies}
            error={this.state.error}
            />
        </div>
      }
      {page === 'login' &&
        <div>
          <Header
            pageView={page}
          />
          <Login submitLogin={this.submitPostRequest}/>
        </div>
      }
      {page === 'loggedIn' &&
        <div>
          <Header
            logoutBtn={this.logoutUser}
            pageView={page}
          />
          <Movies
            user={this.state.userName}
            movies={this.state.movies}
            error={this.state.error}
          />
        </div>
      }
      </main>
    )
  }
}

export default App;
