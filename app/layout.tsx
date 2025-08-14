import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Carthage Quad Hammamet - Aventures Quad, Catamaran & Dromadaire",
  description:
    "Vivez l'aventure ultime à Hammamet ! Quad au coucher du soleil, excursions catamaran et balades dromadaire. Réservation facile, guides experts, souvenirs inoubliables.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${playfair.variable} ${inter.variable} antialiased`}>
      <body>{children}</body>
    </html>
  )
}
