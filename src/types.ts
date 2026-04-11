export interface Movie {
  id: number;
  title: string;
  synopsis: string;
  runTime: number;
  releaseDate: string;
  imageUrl?: string;
  genreId: number;
  ratingId: number;
  averageScore?: number;
  reviews?: Review[];
}

export interface Review {
  id: number;
  movieId: number;
  criticName: string;
  score: number;
  body: string;
}
