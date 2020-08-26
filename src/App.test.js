import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import { getMovies } from './apiCalls';
jest.mock('./apiCalls.js');

describe('App', () => {
  it('displays movies from the server when App loads', async () => {
    getMovies.mockResolvedValueOnce([
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
    ]);
    render(<App />);

    // const movieContainer = screen.getByRole('section', {role: 'movies-container'})
    //
    // expect(movieContainer).toBeInTheDocument();

    const movieOne = await waitFor( () => screen.getByText('Greenland'));
    const movieTwo = await waitFor( () => screen.getByText('Archive'));
    screen.debug();
    expect(movieOne).toBeInTheDocument();
    expect(movieTwo).toBeInTheDocument();
  });
  // it('displays the login button & Movies Screen', () => {
  //   render(<App />);
  //
  //
  // });
  // it('displays the login screen on click', () => {
  //   render(<App />);
  //
  //
  // });
  // it('displays the logout button & Movies Screen on login', () => {
  //   render(<App />);
  //
  //
  // });
  // it('displays movie information when card is clicked', () => {
  //   render(<App />);
  //
  //
  // });
});
