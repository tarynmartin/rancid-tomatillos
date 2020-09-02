import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    if (this.props.pageView === 'loggedIn'|| this.props.login === true) {
      return (
        <header className="App-header">
          <h1>Rancid Tomatillos</h1>
          <button className='login-out' onClick={this.props.logoutBtn}>Log Out</button>
        </header>
      )
    } else if (this.props.pageView === 'movie-show' && this.props.user !== '') {
      return (
        <header className="App-header">
          <h1>Rancid Tomatillos</h1>
          <button className='login-out' onClick={this.props.logoutBtn}>Log Out</button>
        </header>
      )
    } else if (this.props.pageView === 'login') {
      return (
        <header className="App-header">
          <h1>Rancid Tomatillos</h1>
        </header>
      )
    } else {
      return (
        <header className="App-header">
          <h1>Rancid Tomatillos</h1>
          <button className='login-out' onClick={this.props.loginBtn}>Login</button>
        </header>
      )
    }
  }
}

export default Header;
