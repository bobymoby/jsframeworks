"use server"

import { jsonFetch } from "../utils/jsonFetch"
import { MovieDetailsFull, MovieDetailsShort } from "./DTOs/movieDetails"
import { MovieSearchResponse } from "./DTOs/searchResponse"
import { fixMoviePoster } from "./fixMoviePoster"

const OMDB_KEY = process.env.OMDB_API_KEY
const OMDB_BASE_URL = "https://www.omdbapi.com/"

type PlotType = "short" | "full"

export const findMovieByImdbID = async (
    imdbID: string,
    plot: PlotType = "short",
): Promise<MovieDetailsFull | null> => {
    const data = await jsonFetch<MovieDetailsFull>(
        `${OMDB_BASE_URL}?apikey=${OMDB_KEY}&i=${imdbID}&plot=${plot}`,
    )

    if (data.Response === "False") {
        console.error("Movie not found:", data.Error)
        return null
    }

    return fixMoviePoster(data)
}

export const findMovieByName = async (
    movieName: string,
    plot: PlotType = "short",
): Promise<MovieDetailsFull | null> => {
    const data = await jsonFetch<MovieDetailsFull>(
        `${OMDB_BASE_URL}?apikey=${OMDB_KEY}&t=${encodeURIComponent(
            movieName,
        )}&plot=${plot}`,
    )

    if (data.Response === "False") {
        console.error("Movie not found:", data.Error)
        return null
    }

    return fixMoviePoster(data)
}

export const searchMovie = async (
    searchTerm: string,
): Promise<MovieDetailsShort[]> => {
    const data = await jsonFetch<MovieSearchResponse>(
        `${OMDB_BASE_URL}?apikey=${OMDB_KEY}&s=${encodeURIComponent(
            searchTerm,
        )}`,
    )
    if (data.Response === "False") {
        console.error("Search failed:", data.Error)
        return []
    }

    return data.Search.map((movie) => fixMoviePoster(movie))
}
