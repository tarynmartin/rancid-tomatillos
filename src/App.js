import React, { Component } from 'react';
import './App.css';
import Header from './Header'
import Movies from './Movies'
// import MovieCard from './MovieCard'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      error: ''
    }
  }
  componentDidMount() {
    fetch("https:rancid-tomatillos.herokuapp.com/api/v2/movies")
      .then(response => response.json())
      .then(data => this.setState({movies: data.movies}))
      .catch(error => this.setState.error = 'STELLLLLLAAAAAA');
  }

  render() {
    return (
      <main className="App">
        <Header />
        <Movies movies={this.state.movies}/>
        {this.state.error && <h2>{this.state.error}</h2>}
      </main>
    )
  }
}

export default App;
