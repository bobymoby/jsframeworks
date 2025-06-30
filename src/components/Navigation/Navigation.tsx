"use client"

import Link from "next/link"
import { HiClock } from "react-icons/hi2"
import styles from "./Navigation.module.css"

export const Navigation: React.FC = () => {
    return (
        <nav className={styles.navigation}>
            <div className={styles.navContainer}>
                <Link href="/" className={styles.navHomeLink}>
                    Movie Explorer
                </Link>
                <Link href="/recently-viewed" className={styles.navRecentLink}>
                    <HiClock className={styles.navIcon} />
                    Recently Viewed
                </Link>
            </div>
        </nav>
    )
}
