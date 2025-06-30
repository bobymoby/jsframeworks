import { MovieDetailsClient } from "@/components/UtilityComponents/MovieDetailsClient"
import { findMovieByImdbID } from "@/omdb/omdb-server-requests"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { FaStar } from "react-icons/fa"
import { HiArrowLeft } from "react-icons/hi2"
import styles from "./MovieDetailsPage.module.css"

interface MovieDetailsPageProps {
    params: Promise<{ id: string }>
}

export default async function MovieDetailsPage({
    params,
}: MovieDetailsPageProps) {
    const { id } = await params
    const movie = await findMovieByImdbID(id)

    if (!movie) {
        notFound()
    }

    return (
        <div className={styles.movieDetailsContainer}>
            <div className={styles.movieDetailsContent}>
                <Link href="/" className={styles.backLink}>
                    <HiArrowLeft className={styles.backIcon} />
                    Back to Movies
                </Link>

                <div className={styles.movieDetailsCard}>
                    <div className={styles.movieDetailsLayout}>
                        <div className={styles.moviePosterSection}>
                            <div className={styles.moviePosterContainer}>
                                <Image
                                    src={
                                        movie.Poster !== "N/A"
                                            ? movie.Poster
                                            : ""
                                    }
                                    alt={`${movie.Title} poster`}
                                    fill
                                    className={styles.moviePoster}
                                    sizes="33vw"
                                />
                            </div>
                        </div>
                        <div className={styles.movieInfoSection}>
                            <div className={styles.movieHeader}>
                                <div className={styles.movieTitleSection}>
                                    <h1 className={styles.movieTitle}>
                                        {movie.Title}
                                    </h1>
                                    <p className={styles.movieMeta}>
                                        {movie.Year} • {movie.Runtime} •{" "}
                                        {movie.Rated}
                                    </p>
                                </div>
                                <div className={styles.movieRatingBadge}>
                                    <FaStar
                                        className={styles.movieRatingIcon}
                                    />
                                    <span className={styles.movieRatingText}>
                                        {movie.imdbRating}
                                    </span>
                                </div>
                            </div>

                            <div className={styles.movieDetailsContentSection}>
                                <div className={styles.movieSection}>
                                    <h3 className={styles.movieSectionTitle}>
                                        Plot
                                    </h3>
                                    <p className={styles.movieSectionText}>
                                        {movie.Plot}
                                    </p>
                                </div>

                                <div className={styles.movieDetailsGrid}>
                                    <div className={styles.movieSection}>
                                        <h3
                                            className={styles.movieSectionTitle}
                                        >
                                            Director
                                        </h3>
                                        <p className={styles.movieSectionText}>
                                            {movie.Director}
                                        </p>
                                    </div>
                                    <div className={styles.movieSection}>
                                        <h3
                                            className={styles.movieSectionTitle}
                                        >
                                            Genre
                                        </h3>
                                        <p className={styles.movieSectionText}>
                                            {movie.Genre}
                                        </p>
                                    </div>
                                </div>

                                <div className={styles.movieSection}>
                                    <h3 className={styles.movieSectionTitle}>
                                        Cast
                                    </h3>
                                    <p className={styles.movieSectionText}>
                                        {movie.Actors}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <MovieDetailsClient movie={movie} />
        </div>
    )
}
