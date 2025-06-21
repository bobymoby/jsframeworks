"use client"

import { MovieGrid } from "@/components/MovieGrid"
import { SearchBar } from "@/components/SearchBar"
import { MovieDetailsShort } from "@/omdb/movieDetails"
import { getPopularMoviesConst } from "@/omdb/omdb-client-requests"
import { searchMovie } from "@/omdb/omdb-server-requests"
import { useState } from "react"

export default function HomePage() {
    const [movies, setMovies] = useState<MovieDetailsShort[]>(
        getPopularMoviesConst(),
    )
    const [loading, setLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")

    const handleSearch = async (query: string) => {
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
    }

    const handleClearSearch = () => {
        setSearchQuery("")
        setMovies(getPopularMoviesConst())
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Movie Explorer
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Discover and search for your favorite movies
                    </p>
                </div>

                <SearchBar onSearch={handleSearch} />

                {searchQuery && (
                    <div className="flex items-center justify-center mb-6">
                        <div className="bg-blue-100 dark:bg-blue-900 px-4 py-2 rounded-lg">
                            <span className="text-blue-800 dark:text-blue-200">
                                Search results for: {`"${searchQuery}"`}
                            </span>
                            <button
                                onClick={handleClearSearch}
                                className="ml-2 text-blue-600 dark:text-blue-300 hover:underline"
                            >
                                Clear search
                            </button>
                        </div>
                    </div>
                )}

                {!searchQuery && !loading && (
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                            Popular Movies
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Trending movies you might like
                        </p>
                    </div>
                )}

                <MovieGrid movies={movies} loading={loading} />
            </div>
        </div>
    )
}
