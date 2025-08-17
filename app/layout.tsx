import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, DM_Sans } from "next/font/google"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
})

export const metadata: Metadata = {
  title: "Carthage QuadHAMMAMET ADVENTURES - Premium Quad Biking in Tunisia",
  description:
    "Discover breathtaking landscapes of Tunisia with premium quad biking experiences in Hammamet. Book your unforgettable adventure today!",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${spaceGrotesk.style.fontFamily};
  --font-sans: ${spaceGrotesk.variable};
  --font-serif: ${dmSans.variable};
}
        `}</style>
      </head>
      <body className={`${spaceGrotesk.className} ${dmSans.variable}`}>{children}</body>
    </html>
  )
}
