import { FC, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
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

    // const imageSizes = useMemo(() => {
    //     return "(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
    // }, [])

    return (
        <Link href={`/movieDetails/${imdbID}`} className="movie-card-link">
            <div className="movie-card">
                <div className="movie-card-poster">
                    <Image
                        src={posterUrl}
                        alt={imageAlt}
                        fill
                        className="movie-poster"
                        // sizes={imageSizes}
                    />
                </div>
                <div className="movie-card-content">
                    <h2 className="movie-title">{title}</h2>
                    <div className="movie-info">
                        <span className="movie-rating">
                            <svg
                                className="movie-rating-icon"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            {formattedRating}
                        </span>
                        <span>{releaseDate}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}
