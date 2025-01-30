import React, { useState, useEffect } from 'react';
import { fetchMovies } from './components/api';  // Import the fetchMovies function
import { Movie, WatchListItem } from './components/interfaces';  // Import types

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [watchList, setWatchList] = useState<WatchListItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [rating, setRating] = useState('');

  // Fetch movies based on search query
  const handleSearch = async () => {
    const fetchedMovies = await fetchMovies(searchQuery);
    setMovies(fetchedMovies);
  };

  // Add movie to watchlist
  const handleAddToWatchList = (movie: Movie) => {
    setWatchList([...watchList, { ...movie }]);
  };

  // Remove movie from watchlist
  const handleRemoveFromWatchList = (imdbID: string) => {
    setWatchList(watchList.filter((movie) => movie.imdbID !== imdbID));
  };

  // Update rating for a movie
  const handleUpdateRating = (imdbID: string, newRating: string) => {
    const updatedWatchList = watchList.map((movie) =>
      movie.imdbID === imdbID ? { ...movie, userRating: newRating } : movie
    );
    setWatchList(updatedWatchList);
  };

  return (
    <div className="container">
      <div className="search-bar">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a movie"
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      <div className='main-container'>
        <div className="watchlist">
          <h2>Watchlist</h2>
          {watchList.length === 0 ? (
            <p>Your watchlist is empty.</p>
          ) : (
            watchList.map((movie) => (
              <div key={movie.imdbID} className="movie-card">
                <img src={movie.Poster} alt={movie.Title} />
                <div className="movie-info">
                  <h3>{movie.Title}</h3>
                  <p>Your rating: {movie.userRating || 'Not rated'}</p>
                  <button onClick={() => handleRemoveFromWatchList(movie.imdbID)}>
                    Remove from Watchlist
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className={movies.length ? "movie-list" : "hidden" }>
          <h2>Movie Results</h2>
          {movies.map((movie) => (
            <div key={movie.imdbID} className="movie-card">
              <img src={movie.Poster} alt={movie.Title} />
              <div className="movie-info">
                <h3>{movie.Title} ({movie.Year})</h3>
                <p>{movie.Plot}</p>
                <div className="movie-ratings">
                  {movie.Ratings.length > 0 ? (
                    movie.Ratings.map((rating) => (
                      <div key={rating.Source}>
                        {rating.Source}: {rating.Value}
                      </div>
                    ))
                  ) : (
                    <p>No ratings available</p>
                  )}
                </div>
                <input
                  type="text"
                  placeholder="Your rating"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                />
                <button onClick={() => handleUpdateRating(movie.imdbID, rating)}>
                  Update Rating
                </button>
                <button onClick={() => handleAddToWatchList(movie)}>Add to Watchlist</button>
              </div>
            </div>
          ))}
        </div>     
      </div>
       
    </div>
  );
};

export default App;