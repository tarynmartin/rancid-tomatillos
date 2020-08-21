import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';

import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Login', () => {
  it('can let a user put in login information', () => {
    render(<Login submitLogin={jest.fn()}/>);

    fireEvent.change(screen.getByPlaceholderText('Email'), {target: {value: 'ken@blah.com'}});
    fireEvent.change(screen.getByPlaceholderText('Password'), {target: {value: '67'}});

    screen.debug();

    expect(screen.getByPlaceholderText('Email').value).toEqual('ken@blah.com');
    expect(screen.getByPlaceholderText('Password').value).toEqual('67');
  });
  it('can let a user login', () => {
    const mockPostLogin = jest.fn();
    const mockNewLogin = {
      email: 'ken@blah.com',
      password: '67'
    }

    render(<Login submitLogin={mockPostLogin}/>);

    fireEvent.change(screen.getByPlaceholderText('Email'), {target: {value: 'ken@blah.com'}});
    fireEvent.change(screen.getByPlaceholderText('Password'), {target: {value: '67'}});
    fireEvent.click(screen.getByText('Submit'));


    expect(screen.getByPlaceholderText('Email').value).toEqual('');
    expect(screen.getByPlaceholderText('Password').value).toEqual('');

    expect(mockPostLogin).toBeCalledTimes(1);
    expect(mockPostLogin).toBeCalledWith(mockNewLogin);
  });
  // sad path for bad login attempt
});
