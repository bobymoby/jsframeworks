"use client"

import { useRecentlyViewed } from "@/hooks/useRecentlyViewed"
import { MovieDetailsShort } from "@/omdb/DTOs/movieDetails"

interface MovieDetailsClientProps {
    movie: MovieDetailsShort
}

export function MovieDetailsClient({ movie }: MovieDetailsClientProps) {
    useRecentlyViewed(movie)
    return null
}
