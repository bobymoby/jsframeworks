import styles from "./LoadingPage.module.css"

export default function LoadingPage() {
    return (
        <div className={styles.loadingContainer}>
            <p className={styles.loadingText}>
                Loading the app, please wait...
            </p>
        </div>
    )
}
