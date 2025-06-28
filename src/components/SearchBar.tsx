"use client"
import { FC, useCallback, useState } from "react"
import "./SearchBar.css"

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
        <form onSubmit={handleSubmit} className="search-form">
            <div className="search-container">
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    className="search-input"
                />
                <div className="search-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>
                <button type="submit" className="search-button">
                    Search
                </button>
            </div>
        </form>
    )
}
