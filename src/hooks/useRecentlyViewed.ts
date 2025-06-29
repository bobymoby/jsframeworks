import { useEffect } from "react"
import { useAppDispatch } from "@/store/hooks"
import { addMovie } from "@/store/recentlyViewedSlice"

export const useRecentlyViewed = (movie: {
    imdbID: string
    Title: string
    Year: string
    Poster: string
    imdbRating?: string
}) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (movie.imdbID) {
            dispatch(addMovie(movie))
        }
    }, [dispatch, movie])
}
