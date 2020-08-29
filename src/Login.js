import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: '',
      userPassword: '',
    }
  }

  createLoginEvent = (event) => {
    const inputKey = event.target.name;
    const inputValue = event.target.value;
    this.setState({[inputKey]: inputValue});
  }

  submitUser = (event) => {
    event.preventDefault();
    const newLogin = {
      email: this.state.userEmail,
      password: this.state.userPassword
    }

    this.props.submitLogin(newLogin);
    this.clearInputs();
  }

  clearInputs() {
    this.setState({userEmail: '', userPassword: ''})
  }

  render() {
    return (
      <div className='login'>
        <input
          className='login-input'
          type='text'
          placeholder='Email'
          name='userEmail'
          value={this.state.userEmail}
          onChange={this.createLoginEvent}
        />
        <input
          className='login-input'
          type='password'
          placeholder='Password'
          name='userPassword'
          value={this.state.userPassword}
          onChange={this.createLoginEvent}
        />
        <button className='submit-btn' onClick={this.submitUser}>Submit</button>
      </div>
    )
  }
}

export default Login;
