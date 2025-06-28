import { FC, useMemo } from "react"
import { MovieCard } from "./MovieCard"
import "./MovieGrid.css"

interface Movie {
    imdbID: string
    Title: string
    Year: string
    Poster: string
    imdbRating?: string
}

interface MovieGridProps {
    movies: Movie[]
    loading?: boolean
}

export const MovieGrid: FC<MovieGridProps> = ({ movies, loading = false }) => {
    const skeletonItems = useMemo(() => {
        return Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="skeleton-item">
                <div className="skeleton-poster"></div>
                <div className="skeleton-title"></div>
                <div className="skeleton-subtitle"></div>
            </div>
        ))
    }, [])

    const movieCards = useMemo(() => {
        return movies.map((movie) => (
            <MovieCard
                key={movie.imdbID}
                title={movie.Title}
                rating={movie.imdbRating ? parseFloat(movie.imdbRating) : 0}
                releaseDate={movie.Year}
                posterUrl={movie.Poster !== "N/A" ? movie.Poster : ""}
                imdbID={movie.imdbID}
            />
        ))
    }, [movies])

    if (loading) {
        return <div className="movie-grid">{skeletonItems}</div>
    }

    if (movies.length === 0) {
        return (
            <div className="no-results">
                <div className="no-results-text">
                    No movies found. Try searching for something else!
                </div>
            </div>
        )
    }

    return <div className="movie-grid">{movieCards}</div>
}
