import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovie, getReviews } from "../api";
import type { Movie, Review } from "../types";
import { MovieDetailsSkeleton } from "../components/Skeleton";
import StarRating from "../components/StarRating";

export default function MovieDetails() {
  // Extract the movie ID from the URL parameter (e.g., /movies/3)
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch movie details and its reviews in parallel when the page loads
  useEffect(() => {
    if (!id) return;
    const movieId = Number(id);
    Promise.all([getMovie(movieId), getReviews(movieId)])
      .then(([movieData, reviewsData]) => {
        setMovie(movieData);
        // Only show published reviews to the public
        setReviews(reviewsData.filter((r) => r.isPublished));
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <MovieDetailsSkeleton />;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!movie) return <p className="text-center mt-10">Movie not found.</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link to="/" className="text-blue-400 hover:text-blue-300 transition mb-6 inline-flex items-center gap-1 text-sm">
        ← Back to movies
      </Link>

      <div className="flex flex-col md:flex-row gap-8 bg-gray-900 border border-gray-800 rounded-xl p-6">
        <img
          src={movie.imageUrl ?? "/placeholder.png"}
          alt={movie.title}
          className="w-56 md:w-64 rounded-lg shadow-lg self-start"
        />
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-white">{movie.title}</h1>
          <p className="text-gray-400 text-sm">
            {new Date(movie.releaseDate).getFullYear()} &middot; {movie.runTime}{" "}
            min
          </p>
          <p className="mt-2 text-gray-300 leading-relaxed">{movie.synopsis}</p>
        </div>
      </div>

      {reviews.length > 0 && (
        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-5 text-white">Critic Reviews</h2>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-gray-900 border border-gray-800 rounded-xl p-5"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium text-white">{review.createdBy}</span>
                  <StarRating score={review.score} />
                </div>
                <p className="text-gray-400 leading-relaxed">{review.content}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
