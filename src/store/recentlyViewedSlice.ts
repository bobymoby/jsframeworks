import { MovieDetailsShort } from "@/omdb/DTOs/movieDetails"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type RecentlyViewedMovie = MovieDetailsShort & { viewedAt: number }

interface RecentlyViewedState {
    movies: RecentlyViewedMovie[]
}

const MAX_RECENT_MOVIES = 20
const STORAGE_KEY = "recentlyViewedMovies"

const loadInitialState = (): RecentlyViewedState => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
            return { movies: JSON.parse(stored) }
        }
        return { movies: [] }
    } catch (error) {
        console.error(
            "Error loading recently viewed movies from localStorage:",
            error,
        )
    }
    return { movies: [] }
}

const recentlyViewedSlice = createSlice({
    name: "recentlyViewed",
    initialState: loadInitialState(),
    reducers: {
        addMovie: (
            state,
            action: PayloadAction<Omit<RecentlyViewedMovie, "viewedAt">>,
        ) => {
            const newMovie = {
                ...action.payload,
                viewedAt: Date.now(),
            }

            const filtered = state.movies.filter(
                (m) => m.imdbID !== newMovie.imdbID,
            )

            state.movies = [newMovie, ...filtered].slice(0, MAX_RECENT_MOVIES)

            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(state.movies))
            } catch (error) {
                console.error(
                    "Error saving recently viewed movies to localStorage:",
                    error,
                )
            }
        },
        clearMovies: (state) => {
            state.movies = []

            try {
                localStorage.removeItem(STORAGE_KEY)
            } catch (error) {
                console.error(
                    "Error clearing recently viewed movies from localStorage:",
                    error,
                )
            }
        },
    },
})

export const { addMovie, clearMovies } = recentlyViewedSlice.actions
export default recentlyViewedSlice.reducer
