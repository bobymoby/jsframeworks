"use client"

import { MovieDetails } from "./movieDetails"
import POPULAR_MOVIES_PREFETCHED from "./popularMoviesPrefetch.json"

export const getPopularMoviesConst = (): MovieDetails[] =>
    POPULAR_MOVIES_PREFETCHED as MovieDetails[]
