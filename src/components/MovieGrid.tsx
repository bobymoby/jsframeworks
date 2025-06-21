import { FC } from "react"
import { MovieCard } from "./MovieCard"

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
    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {Array.from({ length: 10 }).map((_, index) => (
                    <div key={index} className="animate-pulse">
                        <div className="bg-gray-300 dark:bg-gray-700 h-80 rounded-lg mb-4"></div>
                        <div className="bg-gray-300 dark:bg-gray-700 h-4 rounded mb-2"></div>
                        <div className="bg-gray-300 dark:bg-gray-700 h-4 rounded w-2/3"></div>
                    </div>
                ))}
            </div>
        )
    }

    if (movies.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-gray-500 dark:text-gray-400 text-lg">
                    No movies found. Try searching for something else!
                </div>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {movies.map((movie) => (
                <MovieCard
                    key={movie.imdbID}
                    title={movie.Title}
                    rating={movie.imdbRating ? parseFloat(movie.imdbRating) : 0}
                    releaseDate={movie.Year}
                    posterUrl={
                        movie.Poster !== "N/A"
                            ? movie.Poster
                            : "/placeholder-poster.svg"
                    }
                    imdbID={movie.imdbID}
                />
            ))}
        </div>
    )
}
