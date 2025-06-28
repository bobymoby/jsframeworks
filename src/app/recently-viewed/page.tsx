"use client"

import { useEffect, useState } from "react"
import { MovieGrid } from "@/components/MovieGrid"
import {
    RecentlyViewedMovie,
    getRecentlyViewedMovies,
    clearRecentlyViewedMovies,
} from "@/utils/recentlyViewed"
import Link from "next/link"
import { HiArrowLeft } from "react-icons/hi2"
import { HiTrash } from "react-icons/hi2"
import "./page.css"

export default function RecentlyViewedPage() {
    const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedMovie[]>(
        [],
    )

    useEffect(() => {
        const movies = getRecentlyViewedMovies()
        setRecentlyViewed(movies)
    }, [])

    const handleClearHistory = () => {
        clearRecentlyViewedMovies()
        setRecentlyViewed([])
    }

    const formatTimeAgo = (timestamp: number) => {
        const now = Date.now()
        const diff = now - timestamp
        const minutes = Math.floor(diff / (1000 * 60))
        const hours = Math.floor(diff / (1000 * 60 * 60))
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))

        if (minutes < 1) return "Just now"
        if (minutes < 60) return `${minutes}m ago`
        if (hours < 24) return `${hours}h ago`
        return `${days}d ago`
    }

    return (
        <div className="page-container">
            <div className="page-content">
                <div className="page-header">
                    <div className="header-top">
                        <Link href="/" className="back-link">
                            <HiArrowLeft className="back-icon" />
                            Back to Movies
                        </Link>
                        {recentlyViewed.length > 0 && (
                            <button
                                onClick={handleClearHistory}
                                className="clear-history-button"
                                title="Clear viewing history"
                            >
                                <HiTrash className="clear-icon" />
                                Clear History
                            </button>
                        )}
                    </div>
                    <h1 className="page-title">Recently Viewed Movies</h1>
                    <p className="page-subtitle">
                        Your recently viewed movies and shows
                    </p>
                </div>

                {recentlyViewed.length === 0 ? (
                    <div className="no-recent-movies">
                        <div className="no-recent-movies-content">
                            <h2 className="no-recent-title">
                                No recently viewed movies
                            </h2>
                            <p className="no-recent-text">
                                Start exploring movies to see them here!
                            </p>
                            <Link href="/" className="browse-movies-button">
                                Browse Movies
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="recent-movies-section">
                        <div className="recent-movies-header">
                            <h2 className="recent-movies-title">
                                Recently Viewed ({recentlyViewed.length})
                            </h2>
                            <p className="recent-movies-subtitle">
                                Last viewed:{" "}
                                {formatTimeAgo(
                                    recentlyViewed[0]?.viewedAt || 0,
                                )}
                            </p>
                        </div>
                        <MovieGrid
                            movies={recentlyViewed.map((movie) => ({
                                imdbID: movie.imdbID,
                                Title: movie.Title,
                                Year: movie.Year,
                                Poster: movie.Poster,
                                imdbRating: movie.imdbRating,
                            }))}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
