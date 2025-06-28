"use client"
import { FC, useCallback, useState } from "react"
import { HiMagnifyingGlass } from "react-icons/hi2"
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
                    <HiMagnifyingGlass className="w-6 h-6" />
                </div>
                <button type="submit" className="search-button">
                    Search
                </button>
            </div>
        </form>
    )
}
