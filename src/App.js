import React, { Component } from 'react';
import './App.css';
import Header from './Header'

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      error: '',
    }
  }
  componentDidMount() {
    fetch("https:rancid-tomatillos.herokuapp.com/api/v2/movie")
      .then(response => response.json())
      .then(data => this.setState({movies: data.movies}))
      .catch(error => this.setState({ error: "STELLLLAAAA"}));
  }

  render() {
    return (
      <main className="App">
        <Header />
        {this.state.error && <h2>Hello World!</h2>}
      </main>
    )
  }
}

export default App;
