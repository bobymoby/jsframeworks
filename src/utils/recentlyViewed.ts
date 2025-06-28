export interface RecentlyViewedMovie {
    imdbID: string
    Title: string
    Year: string
    Poster: string
    imdbRating?: string
    viewedAt: number
}

const STORAGE_KEY = "recentlyViewedMovies"
const MAX_RECENT_MOVIES = 20

export const addRecentlyViewedMovie = (
    movie: Omit<RecentlyViewedMovie, "viewedAt">,
) => {
    try {
        const recentlyViewed = getRecentlyViewedMovies()

        // Remove if already exists to avoid duplicates
        const filtered = recentlyViewed.filter((m) => m.imdbID !== movie.imdbID)

        // Add new movie at the beginning
        const newRecentlyViewed = [
            { ...movie, viewedAt: Date.now() },
            ...filtered,
        ].slice(0, MAX_RECENT_MOVIES)

        localStorage.setItem(STORAGE_KEY, JSON.stringify(newRecentlyViewed))
    } catch (error) {
        console.error("Error saving recently viewed movie:", error)
    }
}

export const getRecentlyViewedMovies = (): RecentlyViewedMovie[] => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY)
        return stored ? JSON.parse(stored) : []
    } catch (error) {
        console.error("Error getting recently viewed movies:", error)
        return []
    }
}

export const clearRecentlyViewedMovies = () => {
    try {
        localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
        console.error("Error clearing recently viewed movies:", error)
    }
}
