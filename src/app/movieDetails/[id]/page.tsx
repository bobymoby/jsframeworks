import { findMovieByImdbID } from "@/omdb/omdb-server-requests"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

export default async function MovieDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const movie = await findMovieByImdbID(id)

    if (!movie) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4 py-8">
                <Link
                    href="/"
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6"
                >
                    <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                    Back to Movies
                </Link>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                    <div className="md:flex">
                        <div className="md:w-1/3">
                            <div className="relative h-96 md:h-full">
                                <Image
                                    src={
                                        movie.Poster !== "N/A"
                                            ? movie.Poster
                                            : "/placeholder-poster.svg"
                                    }
                                    alt={`${movie.Title} poster`}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                            </div>
                        </div>
                        <div className="md:w-2/3 p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                        {movie.Title}
                                    </h1>
                                    <p className="text-lg text-gray-600 dark:text-gray-300">
                                        {movie.Year} • {movie.Runtime} •{" "}
                                        {movie.Rated}
                                    </p>
                                </div>
                                <div className="flex items-center bg-yellow-100 dark:bg-yellow-900 px-3 py-2 rounded-lg">
                                    <svg
                                        className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-1"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span className="text-yellow-800 dark:text-yellow-200 font-semibold">
                                        {movie.imdbRating}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                        Plot
                                    </h3>
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                        {movie.Plot}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                            Director
                                        </h3>
                                        <p className="text-gray-700 dark:text-gray-300">
                                            {movie.Director}
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                            Genre
                                        </h3>
                                        <p className="text-gray-700 dark:text-gray-300">
                                            {movie.Genre}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                        Cast
                                    </h3>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        {movie.Actors}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
