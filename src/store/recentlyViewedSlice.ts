import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface RecentlyViewedMovie {
    imdbID: string
    Title: string
    Year: string
    Poster: string
    imdbRating?: string
    viewedAt: number
}

interface RecentlyViewedState {
    movies: RecentlyViewedMovie[]
}

const MAX_RECENT_MOVIES = 20
const STORAGE_KEY = "recentlyViewedMovies"

// Load initial state from localStorage
const loadInitialState = (): RecentlyViewedState => {
    try {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem(STORAGE_KEY)
            return {
                movies: stored ? JSON.parse(stored) : [],
            }
        }
    } catch (error) {
        console.error(
            "Error loading recently viewed movies from localStorage:",
            error,
        )
    }
    return { movies: [] }
}

const initialState: RecentlyViewedState = loadInitialState()

const recentlyViewedSlice = createSlice({
    name: "recentlyViewed",
    initialState,
    reducers: {
        addMovie: (
            state,
            action: PayloadAction<Omit<RecentlyViewedMovie, "viewedAt">>,
        ) => {
            const newMovie = { ...action.payload, viewedAt: Date.now() }

            // Remove if already exists to avoid duplicates
            const filtered = state.movies.filter(
                (m) => m.imdbID !== newMovie.imdbID,
            )

            // Add new movie at the beginning and limit to MAX_RECENT_MOVIES
            state.movies = [newMovie, ...filtered].slice(0, MAX_RECENT_MOVIES)

            // Save to localStorage
            try {
                if (typeof window !== "undefined") {
                    localStorage.setItem(
                        STORAGE_KEY,
                        JSON.stringify(state.movies),
                    )
                }
            } catch (error) {
                console.error(
                    "Error saving recently viewed movies to localStorage:",
                    error,
                )
            }
        },
        clearMovies: (state) => {
            state.movies = []

            // Clear from localStorage
            try {
                if (typeof window !== "undefined") {
                    localStorage.removeItem(STORAGE_KEY)
                }
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
