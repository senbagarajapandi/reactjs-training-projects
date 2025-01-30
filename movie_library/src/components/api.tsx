import axios from 'axios';
import { Movie } from './interfaces';

const API_URL = 'https://www.omdbapi.com/?i=tt3896198&apikey=149079eb';

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  try {
    const response = await axios.get(`${API_URL}&s=${query}`);
    if (response.data.Response === 'True') {
      return response.data.Search.map((movie: any) => ({
        ...movie,
        Ratings: movie.Ratings || [],
      }));
    } else {
      console.error('Error fetching movies:', response.data.Error);
      return [];
    }
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
}