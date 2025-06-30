import { MovieDetailsShort } from "./movieDetails"

export type MovieSearchResponse = {
    Search: MovieDetailsShort[]
    totalResults: string
    Response: "True" | "False"
    Error?: string
}
