import React, { Component } from 'react';
import './Header.css';
import Login from './Login';

class Header extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <header className="App-header">
        <h1>Rancid Tomatillos</h1>
        <button onClick={this.props.loginBtn}>Login</button>
      </header>
    )
  }
}

export default Header;
