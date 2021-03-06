import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({user, loginBtn, logoutBtn }) => {
  return (
    <header className="App-header">
      <h1>Rancid Tomatillos</h1>
      {user !== '' &&
        <button className='login-out' onClick={logoutBtn}>Log Out</button>
      }
      {user === '' &&
        <Link to={'/movies/login'}>
        <button className='login-out' onClick={loginBtn}>Login</button>
        </Link>
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
