"use server"

import { MovieGrid } from "@/components/MovieGrid/MovieGrid"
import { SearchBar } from "@/components/SearchBar/SearchBar"
import { MovieDetailsShort } from "@/omdb/DTOs/movieDetails"
import styles from "./HomePage.module.css"
import { getPopularMovies } from "@/omdb/omdb-client-requests"
import { searchMovie } from "@/omdb/omdb-server-requests"
import Link from "next/link"

const initialMovies = getPopularMovies()

export default async function HomePage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const query = ((await searchParams).query as string) || ""
    let movies: MovieDetailsShort[] = initialMovies
    if (query) {
        movies = await searchMovie(query)
    }

    return (
        <div className={styles.pageContainer}>
            <div className={styles.pageContent}>
                <SearchBar />

                {query && (
                    <div className={styles.searchResults}>
                        <div className={styles.searchResultsBadge}>
                            <span className={styles.searchResultsText}>
                                {`Search results for: "${query}"`}
                            </span>
                            <div className={styles.clearSearchButton}>
                                <Link href="/">Clear search</Link>
                            </div>
                        </div>
                    </div>
                )}

                {!query && (
                    <div className={styles.popularSection}>
                        <h2 className={styles.popularTitle}>Popular Movies</h2>
                        <p className={styles.popularSubtitle}>
                            Trending movies you might like
                        </p>
                    </div>
                )}

                <MovieGrid movies={movies} />
            </div>
        </div>
    )
}
