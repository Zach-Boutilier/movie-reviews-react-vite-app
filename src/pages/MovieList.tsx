import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMovies } from "../api";
import type { Movie } from "../types";

export default function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getMovies()
      .then(setMovies)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-10">Loading movies…</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Movies</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <Link
            key={movie.id}
            to={`/movies/${movie.id}`}
            className="group rounded-lg overflow-hidden shadow hover:shadow-lg transition"
          >
            <img
              src={movie.imageUrl ?? "/placeholder.png"}
              alt={movie.title}
              className="w-full aspect-[2/3] object-cover"
            />
            <div className="p-3">
              <h2 className="font-semibold group-hover:text-blue-600 truncate">
                {movie.title}
              </h2>
              {movie.averageScore != null && (
                <p className="text-sm text-gray-500">
                  ⭐ {movie.averageScore} / 5
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
