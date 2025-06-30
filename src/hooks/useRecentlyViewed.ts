import { MovieDetailsShort } from "@/omdb/DTOs/movieDetails"
import { useAppDispatch } from "@/store/hooks"
import { addMovie } from "@/store/recentlyViewedSlice"
import { useEffect } from "react"

export const useRecentlyViewed = (movie: MovieDetailsShort) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (movie.imdbID) {
            dispatch(addMovie(movie))
        }
    }, [dispatch, movie])
}
