import { MovieDetailsShort } from "@/omdb/DTOs/movieDetails"
import Image from "next/image"
import Link from "next/link"
import { FC, useMemo } from "react"
import { FaStar } from "react-icons/fa"
import styles from "./MovieCard.module.css"

interface MovieCardProps {
    movie: MovieDetailsShort & { imdbRating?: string }
}

export const MovieCard: FC<MovieCardProps> = ({ movie }) => {
    const formattedRating = useMemo(() => {
        return movie.imdbRating ?? "N/A"
    }, [movie.imdbRating])

    const imageAlt = useMemo(() => {
        return `${movie.Title} poster`
    }, [movie.Title])

    return (
        <Link
            href={`/movieDetails/${movie.imdbID}`}
            className={styles.movieCardLink}
        >
            <div className={styles.movieCard}>
                <div className={styles.movieCardPoster}>
                    <Image
                        src={movie.Poster}
                        alt={imageAlt}
                        fill
                        className={styles.moviePoster}
                        sizes="25vw"
                    />
                </div>
                <div className={styles.movieCardContent}>
                    <h2 className={styles.movieTitle}>{movie.Title}</h2>
                    <div className={styles.movieInfo}>
                        <span className={styles.movieRating}>
                            <FaStar className={styles.movieRatingIcon} />
                            {formattedRating}
                        </span>
                        <span>{movie.Year}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}
