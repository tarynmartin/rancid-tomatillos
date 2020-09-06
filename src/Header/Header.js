import React, { Component } from 'react';
import './Header.css';
import PropTypes from 'prop-types';

const Header = ({user, loginBtn, logoutBtn, pageView, login}) => {
    if (pageView === 'loggedIn'|| login === true) {
      return (
        <header className="App-header">
          <h1>Rancid Tomatillos</h1>
          <button className='login-out' onClick={logoutBtn}>Log Out</button>
        </header>
      )
    } else if (pageView === 'movie-show' && user !== '') {
      return (
        <header className="App-header">
          <h1>Rancid Tomatillos</h1>
          <button className='login-out' onClick={logoutBtn}>Log Out</button>
        </header>
      )
    } else if (pageView === 'login') {
      return (
        <header className="App-header">
          <h1>Rancid Tomatillos</h1>
        </header>
      )
    } else {
      return (
        <header className="App-header">
          <h1>Rancid Tomatillos</h1>
          <button className='login-out' onClick={loginBtn}>Login</button>
        </header>
      )
    }
}

Header.propTypes = {
  user: PropTypes.string,
  loginBtn: PropTypes.func,
  logoutBtn: PropTypes.func,
  pageView: PropTypes.string,
  login: PropTypes.bool
};

export default Header;
