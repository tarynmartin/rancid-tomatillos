import React from 'react';
import  MovieCard from './MovieCard';
  import { screen, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('MovieCard component', () => {
  it('should have the correct content on movie card', () => {
    render(<MovieCard
      movie={{"id":1,"poster_path":"https://image.tmdb.org.jpg","backdrop_path":"https://image.tmdb.org/.jpg","title":"Greenland","average_rating":9,"release_date":"2020-07-29"}}
      />);

    const title = screen.getByText('Greenland');
    const average_rating = screen.getByText("9.00");

    expect(title).toBeInTheDocument();
    expect(average_rating).toBeInTheDocument();
  })
})
