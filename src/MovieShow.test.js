import React from 'react';
import  MovieShow from './MovieShow';
import { screen, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('MovieShow component', () => {
  it('should have the correct content of a specified movie', () => {
    render(<MovieShow
      title={"Greenland"}
      poster={"http://www.image.url.org"}
      backdrop={"http://www.backdrop.url.org"}
      releaseDate={"2020/08/24"}
      overview={"Lots of words here"}
      genres={['war, action, drama']}
      budget={200000}
      revenue={5}
      runtime={95}
      tagline={'Fancy words'}
      avgRating={2}
      />);

    const title = screen.getByText('Greenland');
    const poster = screen.getByRole('img', {class:'movie-poster'});
    const releaseDate = screen.getByText('Release Date: 2020/08/24');
    const overview = screen.getByText('Lots of words here');
    const genres = screen.getByText('Genres: war, action, drama');
    const budget = screen.getByText("Budget: $200000");
    const revenue = screen.getByText("Revenue: $5");
    const runtime = screen.getByText("Runtime: 95 minutes");
    const tagline = screen.getByText('Fancy words');
    const average_rating = screen.getByText("Average Rating: 2");

    expect(title).toBeInTheDocument();
    expect(poster).toBeInTheDocument();
    expect(releaseDate).toBeInTheDocument();
    expect(overview).toBeInTheDocument();
    expect(budget).toBeInTheDocument();
    expect(revenue).toBeInTheDocument();
    expect(runtime).toBeInTheDocument();
    expect(tagline).toBeInTheDocument();
    expect(genres).toBeInTheDocument();
    expect(average_rating).toBeInTheDocument();
  })
})
