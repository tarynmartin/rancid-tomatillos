import React from 'react';
import  Header from './Header';
import { screen, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Header component', () => {
  it('should display main header on load', () => {
    render(<Header
      loginBtn={jest.fn()}
      logoutBtn={jest.fn()}
      pageView={'home'}
    />);

    const title = screen.getByText('Rancid Tomatillos');
    const button = screen.getByText('Login');

    expect(title).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
  it('should display no button on login page', () => {
    render(<Header
      loginBtn={jest.fn()}
      logoutBtn={jest.fn()}
      pageView={'login'}
    />);

    const title = screen.getByText('Rancid Tomatillos');

    expect(title).toBeInTheDocument();
  });
  it('should display log out button when user is logged in', () => {
    render(<Header
      loginBtn={jest.fn()}
      logoutBtn={jest.fn()}
      pageView={'loggedIn'}
    />);

    const title = screen.getByText('Rancid Tomatillos');
    const button = screen.getByText('Log Out');

    expect(title).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
})
