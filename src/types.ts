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
  title: string;
  content: string;
  score: number;
  createdDate: string;
  isPublished: boolean;
  createdBy: string;
}
