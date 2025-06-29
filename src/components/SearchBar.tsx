"use client"
import { FC, useCallback, useState } from "react"
import { HiMagnifyingGlass } from "react-icons/hi2"
import styles from "./SearchBar.module.css"

interface SearchBarProps {
    onSearch: (query: string) => void
    placeholder?: string
}

export const SearchBar: FC<SearchBarProps> = ({
    onSearch,
    placeholder = "Search for movies...",
}) => {
    const [query, setQuery] = useState("")

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault()
            if (query.trim()) {
                onSearch(query.trim())
            }
        },
        [query, onSearch],
    )

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setQuery(e.target.value)
        },
        [],
    )

    return (
        <form onSubmit={handleSubmit} className={styles.searchForm}>
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    className={styles.searchInput}
                />
                <div className={styles.searchIcon}>
                    <HiMagnifyingGlass className="w-6 h-6" />
                </div>
                <button type="submit" className={styles.searchButton}>
                    Search
                </button>
            </div>
        </form>
    )
}
