import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovie, getReviews } from "../api";
import type { Movie, Review } from "../types";

export default function MovieDetails() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const movieId = Number(id);
    Promise.all([getMovie(movieId), getReviews(movieId)])
      .then(([movieData, reviewsData]) => {
        setMovie(movieData);
        setReviews(reviewsData);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading…</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!movie) return <p className="text-center mt-10">Movie not found.</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to movies
      </Link>

      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={movie.imageUrl ?? "/placeholder.png"}
          alt={movie.title}
          className="w-64 rounded-lg shadow"
        />
        <div>
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="text-gray-500 mt-1">
            {new Date(movie.releaseDate).getFullYear()} &middot; {movie.runTime}{" "}
            min
          </p>
          <p className="mt-4">{movie.synopsis}</p>
        </div>
      </div>

      {reviews.length > 0 && (
        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Critic Reviews</h2>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="border rounded-lg p-4 shadow-sm"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium"> {review.criticName} </span>
                  <span className="text-sm text-gray-500"> ⭐ {review.score} / 5 </span>
                </div>
                <p className="text-gray-700">{review.body}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
