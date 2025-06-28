import { findMovieByImdbID } from "@/omdb/omdb-server-requests"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { HiArrowLeft } from "react-icons/hi2"
import { FaStar } from "react-icons/fa"
import { MovieDetailsTracker } from "@/components/MovieDetailsTracker"
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
        <MovieDetailsTracker movie={movie}>
            <div className="movie-details-container">
                <div className="movie-details-content">
                    <Link href="/" className="back-link">
                        <HiArrowLeft className="back-icon" />
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
                                                : ""
                                        }
                                        alt={`${movie.Title} poster`}
                                        fill
                                        className="movie-poster"
                                        sizes="33vw"
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
                                        <FaStar className="movie-rating-icon" />
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
        </MovieDetailsTracker>
    )
}
