import type { Movie, Review } from "./types";

// Base URL for the movies API — proxied to localhost:5148 via vite.config.ts
const BASE_URL = "/api/movies";

// Fetches all movies from the API
export async function getMovies(): Promise<Movie[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch movies");
  return res.json();
}

// Fetches a single movie by its ID
export async function getMovie(id: number): Promise<Movie> {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch movie");
  return res.json();
}

// Fetches all reviews for a specific movie
export async function getReviews(movieId: number): Promise<Review[]> {
  const res = await fetch(`${BASE_URL}/${movieId}/reviews`);
  if (!res.ok) throw new Error("Failed to fetch reviews");
  return res.json();
}
