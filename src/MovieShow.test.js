import React from 'react';
import MovieShow from './MovieShow';
import { screen, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('MovieShow component', () => {
  it.only('should display the correct data for a movie', () => {
    render(<MovieShow
      movie={{"id":1,
      "poster_path":"https://image.tmdb.org.jpg",
      "backdrop_path":"https://image.tmdb.org/.jpg",
      "title":"Greenland",
      "average_rating":"9",
      "release_date":"2020-07-29",
      "overview":"A detached married couple must get their son and themselves to safety after being randomly selected to enter an underground bunker, as a massive object from space threatens to destroy the world in less than 48 hours.",
      "genres":"Action, Science Fiction, Thriller",
      "budget":"0",
      "revenue":"0",
      "runtime":"119",
      "tagline":"Blah"
      }
    }/>);

    const title = screen.getByText('Greenland');
    const average_rating = screen.getByText("Average Rating: 9");
    const releaseDate = screen.getByText("Release Date: 2020-07-29")
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
})
