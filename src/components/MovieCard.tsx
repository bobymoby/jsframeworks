import { FC } from "react"
import Image from "next/image"
import Link from "next/link"

interface MovieCardProps {
    title: string
    rating: number
    releaseDate: string
    posterUrl: string
    imdbID: string
}

export const MovieCard: FC<MovieCardProps> = ({
    title,
    rating,
    releaseDate,
    posterUrl,
    imdbID,
}) => {
    return (
        <Link href={`/movieDetails/${imdbID}`} className="block">
            <div className="movie-card bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                <div className="relative h-80 w-full">
                    <Image
                        src={posterUrl}
                        alt={`${title} poster`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                    />
                </div>
                <div className="p-4">
                    <h2 className="movie-title text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                        {title}
                    </h2>
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                        <span className="flex items-center">
                            <svg
                                className="w-4 h-4 text-yellow-500 mr-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            {rating > 0 ? rating.toFixed(1) : "N/A"}
                        </span>
                        <span>{releaseDate}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}
