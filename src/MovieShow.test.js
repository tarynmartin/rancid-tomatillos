import React from 'react';
import MovieShow from './MovieShow';
import { screen, fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
jest.mock('./apiCalls.js');
import { getMovieInfo } from './apiCalls';

describe('MovieShow component', () => {
  it.only('should display the correct data for a movie', () => {
    render(<MovieShow
      id='1'
      poster="https://image.tmdb.org.jpg"
      backdrop="https://image.tmdb.org/.jpg"
      title="Greenland"
      avgRating="9"
      releaseDate="2020-07-29"
      overview="A detached married couple must get their son and themselves to safety after being randomly selected to enter an underground bunker, as a massive object from space threatens to destroy the world in less than 48 hours."
      genres="Action, Science Fiction, Thriller"
      budget='0'
      revenue='0'
      runtime='119'
      tagline="Blah"
    />);

    const title = screen.getByText('Greenland');
    const average_rating = screen.getByText('Average Rating: 9');
    const releaseDate = screen.getByText('Release Date: 2020-07-29')
    const overview = screen.getByText('A detached married couple must get their son and themselves to safety after being randomly selected to enter an underground bunker, as a massive object from space threatens to destroy the world in less than 48 hours.')
    const genres = screen.getByText('Genres: Action, Science Fiction, Thriller')
    const budget = screen.getByText('Budget: $0')
    const revenue = screen.getByText('Revenue: $0')
    const runtime = screen.getByText('Runtime: 119 minutes')
    const tagline = screen.getByText('Blah')

    expect(title).toBeInTheDocument()
    expect(average_rating).toBeInTheDocument()
    expect(releaseDate).toBeInTheDocument()
    expect(overview).toBeInTheDocument()
    expect(genres).toBeInTheDocument()
    expect(budget).toBeInTheDocument()
    expect(revenue).toBeInTheDocument()
    expect(runtime).toBeInTheDocument()
    expect(tagline).toBeInTheDocument()
  });
  // not sure how to do the below one
  //where to put this test? Movies or App?
  // it('retrieve movie info for selected movie from the server when selected', async () => {
  //   getMovieInfo.mockResolvedValue({
  //     movie: {
  //       id: 606234,
  //       title: "Archive",
  //       poster_path: "https://image.tmdb.org/t/p/original//eDnHgozW8vfOaLHzfpHluf1GZCW.jpg",
  //       backdrop_path: "https://image.tmdb.org/t/p/original//u9YEh2xVAPVTKoaMNlB5tH6pXkm.jpg",
  //       release_date: "2020-08-13",
  //       overview: "2038: George Almore is working on a true human-equivalent AI, and his latest prototype is almost ready. This sensitive phase is also the riskiest as he has a goal that must be hidden at all costs—being reunited with his dead wife.",
  //       genres: [
  //           "Science Fiction"
  //       ],
  //       budget: 0,
  //       revenue: 0,
  //       runtime: 109,
  //       tagline: "Death is not the end",
  //       average_rating: 9
  //   }
  //   });
  //   render(<MovieShow
  //
  //    />);
  //
  //   const movieOne = await waitFor( () => screen.getByText('Greenland'));
  //   const movieTwo = await waitFor( () => screen.getByText('Archive'));
  //
  //   expect(movieOne).toBeInTheDocument();
  //   expect(movieTwo).toBeInTheDocument();
  // });
})
