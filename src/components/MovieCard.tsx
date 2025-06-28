import { FC, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { FaStar } from "react-icons/fa"
import "./MovieCard.css"

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
        <Link href={`/movieDetails/${imdbID}`} className="movie-card-link">
            <div className="movie-card">
                <div className="movie-card-poster">
                    <Image
                        src={posterUrl}
                        alt={imageAlt}
                        fill
                        className="movie-poster"
                        sizes="25vw"
                    />
                </div>
                <div className="movie-card-content">
                    <h2 className="movie-title">{title}</h2>
                    <div className="movie-info">
                        <span className="movie-rating">
                            <FaStar className="movie-rating-icon" />
                            {formattedRating}
                        </span>
                        <span>{releaseDate}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}
