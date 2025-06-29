"use client"

import { useRecentlyViewed } from "@/hooks/useRecentlyViewed"

interface MovieDetailsClientProps {
    movie: {
        imdbID: string
        Title: string
        Year: string
        Poster: string
        imdbRating?: string
    }
}

export function MovieDetailsClient({ movie }: MovieDetailsClientProps) {
    useRecentlyViewed(movie)
    return null
}
