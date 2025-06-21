"use server"

import { jsonFetch } from "../utils/jsonFetch"
import {
    MovieDetails,
    MovieDetailsSearch,
    MovieDetailsShort,
} from "./movieDetails"
import { POPULAR_MOVIES } from "./popularMovies"

const OMDB_KEY = process.env.OMDB_API_KEY
const OMDB_BASE_URL = "https://www.omdbapi.com/"

type PlotType = "short" | "full"

export const findMovieByImdbID = async (
    imdbID: string,
    plot: PlotType = "short",
): Promise<MovieDetails | null> => {
    const data = await jsonFetch<MovieDetails>(
        `${OMDB_BASE_URL}?apikey=${OMDB_KEY}&i=${imdbID}&plot=${plot}`,
    )

    if (data.Response === "False") {
        console.error("Movie not found:", data.Error)
        return null
    }

    return data as MovieDetails
}

export const findMovieByName = async (
    movieName: string,
    plot: PlotType = "short",
): Promise<MovieDetails | null> => {
    const data = await jsonFetch<MovieDetails>(
        `${OMDB_BASE_URL}?apikey=${OMDB_KEY}&t=${encodeURIComponent(
            movieName,
        )}&plot=${plot}`,
    )

    if (data.Response === "False") {
        console.error("Movie not found:", data.Error)
        return null
    }

    return data as MovieDetails
}

export const searchMovie = async (
    searchTerm: string,
): Promise<MovieDetailsShort[]> => {
    const data = await jsonFetch<MovieDetailsSearch>(
        `${OMDB_BASE_URL}?apikey=${OMDB_KEY}&s=${encodeURIComponent(
            searchTerm,
        )}`,
    )
    if (data.Response === "False") {
        console.error("Search failed:", data.Error)
        return []
    }

    return data.Search
}

export const getPopularMoviesQuery = async (): Promise<MovieDetails[]> => {
    const movies = (
        await Promise.all(
            POPULAR_MOVIES.map((movieName) => findMovieByName(movieName)),
        )
    ).filter((movie) => movie !== null)

    return movies
}
