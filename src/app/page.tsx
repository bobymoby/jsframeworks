"use client"

import { MovieGrid } from "@/components/MovieGrid/MovieGrid"
import { SearchBar } from "@/components/SearchBar/SearchBar"
import { MovieDetailsShort } from "@/omdb/DTOs/movieDetails"
import Link from "next/link"
import { useCallback, useMemo, useState } from "react"
import { HiClock } from "react-icons/hi2"
import styles from "./HomePage.module.css"
import { getPopularMovies } from "@/omdb/omdb-client-requests"
import { searchMovie } from "@/omdb/omdb-server-requests"

const initialMovies = getPopularMovies()

export default function HomePage() {
    const [movies, setMovies] = useState<MovieDetailsShort[]>(initialMovies)
    const [loading, setLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")

    const handleSearch = useCallback(async (query: string) => {
        setSearchQuery(query)
        setLoading(true)
        try {
            const searchResults = await searchMovie(query)
            setMovies(searchResults)
        } catch (error) {
            console.error("Error searching movies:", error)
        } finally {
            setLoading(false)
        }
    }, [])

    const handleClearSearch = useCallback(() => {
        setSearchQuery("")
        setMovies(initialMovies)
    }, [])

    const showSearchResults = useMemo(() => {
        return searchQuery && !loading
    }, [searchQuery, loading])

    const showPopularSection = useMemo(() => {
        return !searchQuery && !loading
    }, [searchQuery, loading])

    const searchResultsText = useMemo(() => {
        return `Search results for: "${searchQuery}"`
    }, [searchQuery])

    return (
        <div className={styles.pageContainer}>
            <div className={styles.pageContent}>
                <div className={styles.pageHeader}>
                    <div className={styles.headerTop}>
                        <h1 className={styles.pageTitle}>Movie Explorer</h1>
                        <Link
                            href="/recently-viewed"
                            className={styles.recentLink}
                        >
                            <HiClock className={styles.recentIcon} />
                            Recently Viewed
                        </Link>
                    </div>
                    <p className={styles.pageSubtitle}>
                        Discover and search for your favorite movies
                    </p>
                </div>

                <SearchBar onSearch={handleSearch} />

                {showSearchResults && (
                    <div className={styles.searchResults}>
                        <div className={styles.searchResultsBadge}>
                            <span className={styles.searchResultsText}>
                                {searchResultsText}
                            </span>
                            <button
                                onClick={handleClearSearch}
                                className={styles.clearSearchButton}
                            >
                                Clear search
                            </button>
                        </div>
                    </div>
                )}

                {showPopularSection && (
                    <div className={styles.popularSection}>
                        <h2 className={styles.popularTitle}>Popular Movies</h2>
                        <p className={styles.popularSubtitle}>
                            Trending movies you might like
                        </p>
                    </div>
                )}

                <MovieGrid movies={movies} loading={loading} />
            </div>
        </div>
    )
}
