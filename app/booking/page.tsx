"use client"

import { useState } from "react"
import { BookingHeader } from "@/components/booking/booking-header"
import { BookingHero } from "@/components/booking/booking-hero"
import { FiltersPanel } from "@/components/booking/filters-panel"
import { BookingResults } from "@/components/booking/booking-results"
import { PacksSection } from "@/components/booking/packs-section"
import { BookingCTA } from "@/components/booking/booking-cta"

export default function BookingPage() {
  const [searchFilters, setSearchFilters] = useState({
    destination: "",
    serviceType: "",
    date: "",
    guests: "",
  })

  const handleSearch = (filters: typeof searchFilters) => {
    setSearchFilters(filters)
  }

  return (
    <main className="min-h-screen bg-background">
      <BookingHeader />
      <BookingHero onSearch={handleSearch} />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-80">
            <FiltersPanel />
          </aside>
          <div className="flex-1 space-y-8">
            <BookingResults searchFilters={searchFilters} />

          </div>
        </div>
      </div>
      <BookingCTA />
    </main>
  )
}
