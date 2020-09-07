import React, { Component } from 'react';
import './Header.css';
import PropTypes from 'prop-types';

const Header = ({user, loginBtn, logoutBtn }) => {
  return (
    <header className="App-header">
      <h1>Rancid Tomatillos</h1>
      {user !== '' &&
        <button className='login-out' onClick={logoutBtn}>Log Out</button>
      }
      {user === '' &&
        <button className='login-out' onClick={loginBtn}>Login</button>
      }
    </header>
  )
}

Header.propTypes = {
  user: PropTypes.string,
  loginBtn: PropTypes.func,
  logoutBtn: PropTypes.func,
  pageView: PropTypes.string,
  login: PropTypes.bool
};

export default Header;
