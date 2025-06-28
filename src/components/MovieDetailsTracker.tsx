"use client"

import { useEffect } from "react"
import { addRecentlyViewedMovie } from "@/utils/recentlyViewed"

interface MovieDetailsTrackerProps {
    movie: {
        imdbID: string
        Title: string
        Year: string
        Poster: string
        imdbRating?: string
    }
    children: React.ReactNode
}

export const MovieDetailsTracker: React.FC<MovieDetailsTrackerProps> = ({
    movie,
    children,
}) => {
    useEffect(() => {
        // Track the movie as recently viewed
        addRecentlyViewedMovie(movie)
    }, [movie.imdbID])

    return <>{children}</>
}
