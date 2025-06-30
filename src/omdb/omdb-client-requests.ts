import { MovieDetailsFull } from "./DTOs/movieDetails"
import POPULAR_MOVIES_PREFETCHED from "./popularMoviesPrefetch.json"

export const getPopularMovies = (): MovieDetailsFull[] =>
    POPULAR_MOVIES_PREFETCHED as MovieDetailsFull[]
