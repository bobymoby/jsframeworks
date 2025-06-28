import { findMovieByImdbID } from "@/omdb/omdb-server-requests"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import "./page.css"

export default async function MovieDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const movie = await findMovieByImdbID(id)

    if (!movie) {
        notFound()
    }

    return (
        <div className="movie-details-container">
            <div className="movie-details-content">
                <Link href="/" className="back-link">
                    <svg
                        className="back-icon"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                    Back to Movies
                </Link>

                <div className="movie-details-card">
                    <div className="movie-details-layout">
                        <div className="movie-poster-section">
                            <div className="movie-poster-container">
                                <Image
                                    src={
                                        movie.Poster !== "N/A"
                                            ? movie.Poster
                                            : "/placeholder-poster.svg"
                                    }
                                    alt={`${movie.Title} poster`}
                                    fill
                                    className="movie-poster"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                            </div>
                        </div>
                        <div className="movie-info-section">
                            <div className="movie-header">
                                <div className="movie-title-section">
                                    <h1 className="movie-title">
                                        {movie.Title}
                                    </h1>
                                    <p className="movie-meta">
                                        {movie.Year} • {movie.Runtime} •{" "}
                                        {movie.Rated}
                                    </p>
                                </div>
                                <div className="movie-rating-badge">
                                    <svg
                                        className="movie-rating-icon"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span className="movie-rating-text">
                                        {movie.imdbRating}
                                    </span>
                                </div>
                            </div>

                            <div className="movie-details-content-section">
                                <div className="movie-section">
                                    <h3 className="movie-section-title">
                                        Plot
                                    </h3>
                                    <p className="movie-section-text">
                                        {movie.Plot}
                                    </p>
                                </div>

                                <div className="movie-details-grid">
                                    <div className="movie-section">
                                        <h3 className="movie-section-title">
                                            Director
                                        </h3>
                                        <p className="movie-section-text">
                                            {movie.Director}
                                        </p>
                                    </div>
                                    <div className="movie-section">
                                        <h3 className="movie-section-title">
                                            Genre
                                        </h3>
                                        <p className="movie-section-text">
                                            {movie.Genre}
                                        </p>
                                    </div>
                                </div>

                                <div className="movie-section">
                                    <h3 className="movie-section-title">
                                        Cast
                                    </h3>
                                    <p className="movie-section-text">
                                        {movie.Actors}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
