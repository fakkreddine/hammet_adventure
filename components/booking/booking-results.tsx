"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, MapPin, Heart, Grid3X3, List, Clock } from "lucide-react"

const mockResults = [
  {
    id: 1,
    type: "hotel",
    title: "Luxury Ocean Resort",
    location: "Maldives",
    rating: 4.9,
    reviews: 1247,
    price: 450,
    originalPrice: 520,
    image: "/maldives-resort-oceanview.png",
    features: ["Ocean View", "Spa", "All Inclusive"],
    duration: "3 nights",
    featured: true,
  },
  {
    id: 2,
    type: "trip",
    title: "European Adventure Tour",
    location: "Multiple Cities",
    rating: 4.7,
    reviews: 892,
    price: 1200,
    originalPrice: 1350,
    image: "/european-cities-adventure.png",
    features: ["14 Days", "Guide Included", "5 Countries"],
    duration: "14 days",
    featured: false,
  },
  {
    id: 3,
    type: "entertainment",
    title: "Broadway Show Experience",
    location: "New York City",
    rating: 4.8,
    reviews: 2156,
    price: 120,
    originalPrice: 150,
    image: "/broadway-theater-new-york.png",
    features: ["Premium Seats", "Dinner Included", "VIP Access"],
    duration: "4 hours",
    featured: false,
  },
  {
    id: 4,
    type: "hotel",
    title: "Desert Safari Adventure",
    location: "Dubai, UAE",
    rating: 4.6,
    reviews: 634,
    price: 280,
    originalPrice: 320,
    image: "/dubai-desert-safari.png",
    features: ["Desert Safari", "BBQ Dinner", "Camel Ride"],
    duration: "1 day",
    featured: false,
  },
  {
    id: 5,
    type: "entertainment",
    title: "Wine Tasting Experience",
    location: "Tuscany, Italy",
    rating: 4.9,
    reviews: 445,
    price: 85,
    originalPrice: 95,
    image: "/tuscany-vineyard-tasting.png",
    features: ["Expert Guide", "Lunch Included", "Transportation"],
    duration: "6 hours",
    featured: false,
  },
  {
    id: 6,
    type: "trip",
    title: "Helicopter City Tour",
    location: "Los Angeles",
    rating: 4.8,
    reviews: 723,
    price: 350,
    originalPrice: 400,
    image: "/los-angeles-helicopter-tour.png",
    features: ["Aerial Views", "Professional Pilot", "Photo Stops"],
    duration: "2 hours",
    featured: true,
  },
]

interface BookingResultsProps {
  searchFilters: {
    destination: string
    serviceType: string
    date: string
    guests: string
  }
}

export function BookingResults({ searchFilters }: BookingResultsProps) {
  const [sortBy, setSortBy] = useState("recommended")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [favorites, setFavorites] = useState<number[]>([])
  const [filteredResults, setFilteredResults] = useState(mockResults)

  useEffect(() => {
    let filtered = mockResults

    // Filter by service type
    if (searchFilters.serviceType && searchFilters.serviceType.toLowerCase() !== "tips") {
      const typeMap: { [key: string]: string } = {
        hotels: "hotel",
        trips: "trip",
        entertainment: "entertainment",
      }
      const filterType = typeMap[searchFilters.serviceType.toLowerCase()]
      if (filterType) {
        filtered = filtered.filter((result) => result.type === filterType)
      }
    }

    // Filter by destination
    if (searchFilters.destination) {
      filtered = filtered.filter(
        (result) =>
          result.location.toLowerCase().includes(searchFilters.destination.toLowerCase()) ||
          result.title.toLowerCase().includes(searchFilters.destination.toLowerCase()),
      )
    }

    setFilteredResults(filtered)
  }, [searchFilters])

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  const sortedResults = [...filteredResults].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "reviews":
        return b.reviews - a.reviews
      default:
        return b.featured ? 1 : -1
    }
  })

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-2xl font-bold">{filteredResults.length} Results found</h2>
          <p className="text-muted-foreground text-sm">
            {searchFilters.destination && `in ${searchFilters.destination} • `}
            {searchFilters.serviceType && `${searchFilters.serviceType} • `}
            Discover amazing experiences and destinations
          </p>
        </motion.div>

        <div className="flex items-center gap-3">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Recommended</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="reviews">Most Reviews</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          <div className="flex border rounded-lg p-1 bg-muted/50">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="h-8 w-8 p-0"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="h-8 w-8 p-0"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <motion.div layout className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "space-y-4"}>
        <AnimatePresence>
          {sortedResults.map((result, index) => (
            <motion.div
              key={result.id}
              layout
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{ y: viewMode === "grid" ? -8 : -2 }}
            >
              <Card
                className={`group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 ${
                  viewMode === "list" ? "flex flex-row h-48" : ""
                } bg-white`}
              >
                <div className={`relative overflow-hidden ${viewMode === "list" ? "w-80 flex-shrink-0" : ""}`}>
                  <motion.img
                    src={result.image || "/placeholder.svg"}
                    alt={result.title}
                    className={`object-cover ${viewMode === "list" ? "w-full h-full" : "w-full h-48"}`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute top-3 right-3 bg-white/90 hover:bg-white backdrop-blur-sm"
                      onClick={() => toggleFavorite(result.id)}
                    >
                      <Heart
                        className={`h-4 w-4 transition-colors ${
                          favorites.includes(result.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                        }`}
                      />
                    </Button>
                  </motion.div>

                  {result.featured && (
                    <Badge className="absolute top-3 left-3 bg-orange-500 text-white border-0">Featured</Badge>
                  )}
                  <Badge
                    className={`absolute ${result.featured ? "top-12" : "top-3"} left-3 ${
                      result.type === "hotel"
                        ? "bg-blue-500"
                        : result.type === "trip"
                          ? "bg-emerald-500"
                          : "bg-purple-500"
                    } text-white border-0 capitalize`}
                  >
                    {result.type}
                  </Badge>
                </div>

                <CardContent className={`p-4 flex-1 ${viewMode === "list" ? "flex flex-col justify-between" : ""}`}>
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <motion.h3
                        className="font-semibold text-lg group-hover:text-primary transition-colors"
                        whileHover={{ x: 4 }}
                      >
                        {result.title}
                      </motion.h3>
                      {viewMode === "grid" && (
                        <div className="text-right">
                          {result.originalPrice > result.price && (
                            <p className="text-sm text-muted-foreground line-through">${result.originalPrice}</p>
                          )}
                          <motion.p className="text-2xl font-bold text-primary" whileHover={{ scale: 1.05 }}>
                            ${result.price}
                          </motion.p>
                          <p className="text-sm text-muted-foreground">per person</p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{result.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{result.duration}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{result.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">({result.reviews} reviews)</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {result.features.slice(0, viewMode === "list" ? 2 : 3).map((feature, idx) => (
                        <motion.div
                          key={feature}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 * idx }}
                        >
                          <Badge
                            variant="secondary"
                            className="text-xs bg-slate-100 hover:bg-slate-200 transition-colors"
                          >
                            {feature}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className={`${viewMode === "list" ? "flex items-center justify-between" : ""}`}>
                    {viewMode === "list" && (
                      <div className="text-right">
                        {result.originalPrice > result.price && (
                          <p className="text-sm text-muted-foreground line-through">${result.originalPrice}</p>
                        )}
                        <motion.p className="text-2xl font-bold text-primary" whileHover={{ scale: 1.05 }}>
                          ${result.price}
                        </motion.p>
                        <p className="text-sm text-muted-foreground">per person</p>
                      </div>
                    )}

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        className={`bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-md ${
                          viewMode === "list" ? "px-8" : "w-full"
                        }`}
                      >
                        Explore
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredResults.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
          <p className="text-xl text-muted-foreground mb-2">No results found</p>
          <p className="text-sm text-muted-foreground">Try adjusting your search filters</p>
        </motion.div>
      )}
    </div>
  )
}
