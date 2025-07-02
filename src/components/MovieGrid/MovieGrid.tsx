// "use client"

import { MovieDetailsShort } from "@/omdb/DTOs/movieDetails"
import { FC, useMemo } from "react"
import { MovieCard } from "../MovieCard/MovieCard"
import styles from "./MovieGrid.module.css"

interface MovieGridProps {
    movies: MovieDetailsShort[]
    loading?: boolean
}

export const MovieGrid: FC<MovieGridProps> = ({ movies, loading = false }) => {
    const skeletonItems = useMemo(() => {
        return Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className={styles.skeletonItem}>
                <div className={styles.skeletonPoster}></div>
                <div className={styles.skeletonTitle}></div>
                <div className={styles.skeletonSubtitle}></div>
            </div>
        ))
    }, [])

    const movieCards = useMemo(() => {
        return movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
        ))
    }, [movies])

    if (loading) {
        return <div className={styles.movieGrid}>{skeletonItems}</div>
    }

    if (movies.length === 0) {
        return (
            <div className={styles.noResults}>
                <div className={styles.noResultsText}>
                    No movies found. Try searching for something else!
                </div>
            </div>
        )
    }

    return <div className={styles.movieGrid}>{movieCards}</div>
}
