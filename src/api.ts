import type { Movie, Review } from "./types";

const BASE_URL = "/api/movies";

export async function getMovies(): Promise<Movie[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch movies");
  return res.json();
}

export async function getMovie(id: number): Promise<Movie> {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch movie");
  return res.json();
}

export async function getReviews(movieId: number): Promise<Review[]> {
  const res = await fetch(`${BASE_URL}/${movieId}/reviews`);
  if (!res.ok) throw new Error("Failed to fetch reviews");
  return res.json();
}
