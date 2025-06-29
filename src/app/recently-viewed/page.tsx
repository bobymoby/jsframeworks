"use client"

import { MovieGrid } from "@/components/MovieGrid/MovieGrid"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import { clearMovies, RecentlyViewedMovie } from "@/store/recentlyViewedSlice"
import Link from "next/link"
import { HiArrowLeft } from "react-icons/hi2"
import { HiTrash } from "react-icons/hi2"
import styles from "./RecentlyViewedPage.module.css"

export default function RecentlyViewedPage() {
    const recentlyViewed = useAppSelector(
        (state) => state.recentlyViewed.movies,
    )
    const dispatch = useAppDispatch()

    const handleClearHistory = () => {
        dispatch(clearMovies())
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
        <div className={styles.pageContainer}>
            <div className={styles.pageContent}>
                <div className={styles.pageHeader}>
                    <div className={styles.headerTop}>
                        <Link href="/" className={styles.backLink}>
                            <HiArrowLeft className={styles.backIcon} />
                            Back to Movies
                        </Link>
                        {recentlyViewed.length > 0 && (
                            <button
                                onClick={handleClearHistory}
                                className={styles.clearHistoryButton}
                                title="Clear viewing history"
                            >
                                <HiTrash className={styles.clearIcon} />
                                Clear History
                            </button>
                        )}
                    </div>
                    <h1 className={styles.pageTitle}>Recently Viewed Movies</h1>
                    <p className={styles.pageSubtitle}>
                        Your recently viewed movies and shows
                    </p>
                </div>

                {recentlyViewed.length === 0 ? (
                    <div className={styles.noRecentMovies}>
                        <div className={styles.noRecentMoviesContent}>
                            <h2 className={styles.noRecentTitle}>
                                No recently viewed movies
                            </h2>
                            <p className={styles.noRecentText}>
                                Start exploring movies to see them here!
                            </p>
                            <Link
                                href="/"
                                className={styles.browseMoviesButton}
                            >
                                Browse Movies
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className={styles.recentMoviesSection}>
                        <div className={styles.recentMoviesHeader}>
                            <h2 className={styles.recentMoviesTitle}>
                                Recently Viewed ({recentlyViewed.length})
                            </h2>
                            <p className={styles.recentMoviesSubtitle}>
                                Last viewed:{" "}
                                {formatTimeAgo(
                                    recentlyViewed[0]?.viewedAt || 0,
                                )}
                            </p>
                        </div>
                        <MovieGrid
                            movies={recentlyViewed.map(
                                (movie: RecentlyViewedMovie) => ({
                                    imdbID: movie.imdbID,
                                    Title: movie.Title,
                                    Year: movie.Year,
                                    Poster: movie.Poster,
                                    imdbRating: movie.imdbRating,
                                }),
                            )}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
