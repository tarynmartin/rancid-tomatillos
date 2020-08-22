import React from 'react';
import ReactDOM from 'react-dom';
import Movies from './Movies';

import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Movies', () => {
  it('can display an error message', () => {
    const allMovies = [{"id":1,"poster_path":"https://image.tmdb.org.jpg","backdrop_path":"https://image.tmdb.org/.jpg","title":"Greenland","average_rating":9,"release_date":"2020-07-29"}, {"id":2,"poster_path":"https://image2.tmdb.org.jpg","backdrop_path":"https://image2.tmdb.org.jpg","title":"Temptations","average_rating":3,"release_date":"2020-07-31"}];
    const errorMsg = "STELLLLAAAA";
    render (<Movies
      movies={allMovies}
      error={errorMsg}
    />);

    const displayedError = screen.getByText("STELLLLAAAA");

    expect(displayedError).toBeInTheDocument();
  });
  it('should display MovieCards when given an array of objects', () => {
    const allMovies = [{"id":1,"poster_path":"https://image.tmdb.org.jpg","backdrop_path":"https://image.tmdb.org/.jpg","title":"Greenland","average_rating":9,"release_date":"2020-07-29"}, {"id":2,"poster_path":"https://image2.tmdb.org.jpg","backdrop_path":"https://image2.tmdb.org.jpg","title":"Temptations","average_rating":3,"release_date":"2020-07-31"}];
    const errorMsg = '';
    render (<Movies
      movies={allMovies}
      error={errorMsg}
    />);

    const title1 = screen.getByText('Greenland');
    const title2 = screen.getByText('Temptations');
    const rating1 = screen.getByText('9');
    const rating2 = screen.getByText('3');

    expect(title1).toBeInTheDocument();
    expect(title2).toBeInTheDocument();
    expect(rating1).toBeInTheDocument();
    expect(rating2).toBeInTheDocument();
  });
  it('can display a user\'s name & MovieCards on login', () => {
    const userName = 'Ken';
    const allMovies = [{"id":1,"poster_path":"https://image.tmdb.org.jpg","backdrop_path":"https://image.tmdb.org/.jpg","title":"Greenland","average_rating":9,"release_date":"2020-07-29"}, {"id":2,"poster_path":"https://image2.tmdb.org.jpg","backdrop_path":"https://image2.tmdb.org.jpg","title":"Temptations","average_rating":3,"release_date":"2020-07-31"}];
    const errorMsg = '';
    render (<Movies
      user={userName}
      movies={allMovies}
      error={errorMsg}
    />);

    const displayedUser = screen.getByText('Hello Ken!');
    const title1 = screen.getByText('Greenland');
    const title2 = screen.getByText('Temptations');
    const rating1 = screen.getByText('9');
    const rating2 = screen.getByText('3');

    expect(displayedUser).toBeInTheDocument();
    expect(title1).toBeInTheDocument();
    expect(title2).toBeInTheDocument();
    expect(rating1).toBeInTheDocument();
    expect(rating2).toBeInTheDocument();
  });
})
