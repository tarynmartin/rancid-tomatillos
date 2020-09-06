import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './Login'

import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
jest.mock('./apiCalls.js');
import { getMovies } from './apiCalls';

describe('App', () => {
  it('displays movies from the server when App loads', async () => {
    getMovies.mockResolvedValue({
      movies: [
        {
              id: 524047,
              poster_path: "https://image.tmdb.org/.jpg",
              backdrop_path: "https://image.tmdb.org/.jpg",
              title: "Greenland",
              average_rating: 4.833333333333333,
              release_date: "2020-07-29"
          },
          {
              id: 606234,
              poster_path: "https://image.tmdb.org/.jpg",
              backdrop_path: "https://image.tmdb.org/.jpg",
              title: "Archive",
              average_rating: 5.833333333333333,
              release_date: "2020-08-13"
          }
      ]
    });
    render(<App />);

    const movieOne = await waitFor( () => screen.getByText('Greenland'));
    const movieTwo = await waitFor( () => screen.getByText('Archive'));

    expect(movieOne).toBeInTheDocument();
    expect(movieTwo).toBeInTheDocument();
  });
  it('displays the login button', () => {
    render(<App />);

    const button = screen.getByRole('button', {name: 'Login'});

    expect(button).toBeInTheDocument();
  });
  // it('should POST user information when called', () => {
  //   render(<App />);
  //
  //
  // });
});
