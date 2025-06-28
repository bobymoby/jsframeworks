"use client"

import { MovieGrid } from "@/components/MovieGrid"
import { SearchBar } from "@/components/SearchBar"
import { MovieDetailsShort } from "@/omdb/movieDetails"
import { getPopularMoviesConst } from "@/omdb/omdb-client-requests"
import { searchMovie } from "@/omdb/omdb-server-requests"
import { useCallback, useMemo, useState } from "react"
import "./page.css"

export default function HomePage() {
    const initialMovies = useMemo(() => getPopularMoviesConst(), [])

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
    }, [initialMovies])

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
        <div className="page-container">
            <div className="page-content">
                <div className="page-header">
                    <h1 className="page-title">Movie Explorer</h1>
                    <p className="page-subtitle">
                        Discover and search for your favorite movies
                    </p>
                </div>

                <SearchBar onSearch={handleSearch} />

                {showSearchResults && (
                    <div className="search-results">
                        <div className="search-results-badge">
                            <span className="search-results-text">
                                {searchResultsText}
                            </span>
                            <button
                                onClick={handleClearSearch}
                                className="clear-search-button"
                            >
                                Clear search
                            </button>
                        </div>
                    </div>
                )}

                {showPopularSection && (
                    <div className="popular-section">
                        <h2 className="popular-title">Popular Movies</h2>
                        <p className="popular-subtitle">
                            Trending movies you might like
                        </p>
                    </div>
                )}

                <MovieGrid movies={movies} loading={loading} />
            </div>
        </div>
    )
}
