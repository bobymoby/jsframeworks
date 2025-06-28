"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { HiClock } from "react-icons/hi2"
import "./Navigation.css"

export const Navigation: React.FC = () => {
    const pathname = usePathname()

    // Don't show navigation on the main page
    if (pathname === "/") return null

    return (
        <nav className="navigation">
            <div className="nav-container">
                <Link href="/" className="nav-home-link">
                    Movie Explorer
                </Link>
                <Link href="/recently-viewed" className="nav-recent-link">
                    <HiClock className="nav-icon" />
                    Recently Viewed
                </Link>
            </div>
        </nav>
    )
}
