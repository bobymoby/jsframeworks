export type MovieDetailsShort = {
    Title: string
    Year: string
    imdbID: string
    Type: string
    Poster: string
}

export type MovieDetailsFull = MovieDetailsShort & {
    Rated: string
    Released: string
    Runtime: string
    Genre: string
    Director: string
    Writer: string
    Actors: string
    Plot: string
    Language: string
    Country: string
    Awards: string
    Ratings: {
        Source: string
        Value: string
    }[]
    Metascore: string
    imdbRating: string
    imdbVotes: string
    DVD: string
    BoxOffice: string
    Production: string
    Website: string
    Response: "True" | "False"
    Error?: string
}
