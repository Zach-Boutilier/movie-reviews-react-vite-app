import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMovies, getReviews } from "../api";
import type { Movie } from "../types";

export default function MovieList() {
  const [movies, setMovies] = useState<(Movie & { averageScore?: number })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getMovies()
      .then(async (moviesData) => {
        const moviesWithScores = await Promise.all(
          moviesData.map(async (movie) => {
            const reviews = await getReviews(movie.id);
            const published = reviews.filter((r) => r.isPublished);
            const averageScore =
              published.length > 0
                ? Math.round(
                    (published.reduce((sum, r) => sum + r.score, 0) /
                      published.length) *
                      10
                  ) / 10
                : undefined;
            return { ...movie, averageScore };
          })
        );
        setMovies(moviesWithScores);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-10">Loading movies…</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-white">All Movies</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {movies.map((movie) => (
          <Link
            key={movie.id}
            to={`/movies/${movie.id}`}
            className="group flex gap-5 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-600 p-4 transition-all hover:scale-[1.02]"
          >
            <img
              src={movie.imageUrl ?? "/placeholder.png"}
              alt={movie.title}
              className="w-28 h-40 rounded-lg object-cover flex-shrink-0 shadow-md"
            />
            <div className="flex flex-col justify-center gap-1">
              <h2 className="text-lg font-semibold text-white group-hover:text-blue-400 transition">
                {movie.title}
              </h2>
              {movie.averageScore != null ? (
                <p className="text-sm text-gray-400">
                  ⭐ {movie.averageScore} / 5
                </p>
              ) : (
                <p className="text-sm text-gray-500">
                  ⭐ N/A
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
