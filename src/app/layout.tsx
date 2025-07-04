import { Navigation } from "@/components/Navigation/Navigation"
import { ReduxProvider } from "@/components/UtilityComponents/ReduxProvider"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { PropsWithChildren } from "react"
import "./globals.css"

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
})

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
})

export const metadata: Metadata = {
    title: "Movie Explorer",
    description: "Discover and search for your favorite movies",
}

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <ReduxProvider>
                    <Navigation />
                    {children}
                </ReduxProvider>
            </body>
        </html>
    )
}
