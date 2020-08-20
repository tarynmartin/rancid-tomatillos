import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <header className="App-header">
        <h1>Rancid Tomatillos</h1>
        <button>Login</button>
      </header>
    )
  }
}

export default Header;
