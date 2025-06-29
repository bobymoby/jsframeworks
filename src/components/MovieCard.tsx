import { FC, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { FaStar } from "react-icons/fa"
import styles from "./MovieCard.module.css"

interface MovieCardProps {
    title: string
    rating: number
    releaseDate: string
    posterUrl: string
    imdbID: string
}

export const MovieCard: FC<MovieCardProps> = ({
    title,
    rating,
    releaseDate,
    posterUrl,
    imdbID,
}) => {
    const formattedRating = useMemo(() => {
        return rating > 0 ? rating.toFixed(1) : "N/A"
    }, [rating])

    const imageAlt = useMemo(() => {
        return `${title} poster`
    }, [title])

    return (
        <Link href={`/movieDetails/${imdbID}`} className={styles.movieCardLink}>
            <div className={styles.movieCard}>
                <div className={styles.movieCardPoster}>
                    <Image
                        src={posterUrl}
                        alt={imageAlt}
                        fill
                        className={styles.moviePoster}
                        sizes="25vw"
                    />
                </div>
                <div className={styles.movieCardContent}>
                    <h2 className={styles.movieTitle}>{title}</h2>
                    <div className={styles.movieInfo}>
                        <span className={styles.movieRating}>
                            <FaStar className={styles.movieRatingIcon} />
                            {formattedRating}
                        </span>
                        <span>{releaseDate}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}
