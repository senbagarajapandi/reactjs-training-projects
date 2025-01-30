export interface Rating {
    Source: string;
    Value: string;
  }
  
  export interface Movie {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
    Type: string;
    Plot: string;
    Ratings: Rating[];
  }
  
  export interface WatchListItem extends Movie {
    userRating?: string;
  }