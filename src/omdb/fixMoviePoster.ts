import { MovieDetailsShort } from "./DTOs/movieDetails"

export const fixMoviePoster = <T extends MovieDetailsShort>(movie: T): T => ({
    ...movie,
    Poster: movie.Poster === "N/A" ? "" : movie.Poster,
})
