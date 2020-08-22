import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('App', () => {
  it('displays the login button & Movies Screen', () => {
    render(<App />);


  });
  it('displays the login screen on click', () => {
    render(<App />);


  });
  it('displays the logout button & Movies Screen on login', () => {
    render(<App />);


  });
  // it('displays movie information when card is clicked', () => {
  //   render(<App />);
  //
  //
  // });
});
