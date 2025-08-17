"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Filter, X, MapPin, Star, Calendar } from "lucide-react"

export function FiltersPanel() {
  const [priceRange, setPriceRange] = useState([100, 500])
  const [selectedRating, setSelectedRating] = useState("any")
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [selectedDuration, setSelectedDuration] = useState("any")

  const handleTypeChange = (type: string, checked: boolean) => {
    setSelectedTypes((prev) => (checked ? [...prev, type] : prev.filter((t) => t !== type)))
  }

  const handleLocationChange = (location: string, checked: boolean) => {
    setSelectedLocations((prev) => (checked ? [...prev, location] : prev.filter((l) => l !== location)))
  }

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    setSelectedAmenities((prev) => (checked ? [...prev, amenity] : prev.filter((a) => a !== amenity)))
  }

  const clearAllFilters = () => {
    setPriceRange([100, 500])
    setSelectedRating("any")
    setSelectedTypes([])
    setSelectedLocations([])
    setSelectedAmenities([])
    setSelectedDuration("any")
  }

  const activeFiltersCount =
    selectedTypes.length +
    selectedLocations.length +
    selectedAmenities.length +
    (selectedRating !== "any" ? 1 : 0) +
    (selectedDuration !== "any" ? 1 : 0)

  return (
    <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
      <Card className="sticky top-4 shadow-lg border-0 bg-white">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-primary" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  <Badge className="bg-primary text-primary-foreground">{activeFiltersCount}</Badge>
                </motion.div>
              )}
            </div>
            {activeFiltersCount > 0 && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={clearAllFilters}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </motion.button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Price Range */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <span className="text-green-600">$</span>
              Price Range
            </h3>
            <Slider value={priceRange} onValueChange={setPriceRange} max={2000} min={0} step={25} className="mb-3" />
            <div className="flex justify-between text-sm">
              <Badge variant="outline">${priceRange[0]}</Badge>
              <Badge variant="outline">${priceRange[1]}</Badge>
            </div>
          </motion.div>

          {/* Duration */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-600" />
              Duration
            </h3>
            <Select value={selectedDuration} onValueChange={setSelectedDuration}>
              <SelectTrigger>
                <SelectValue placeholder="Any duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Duration</SelectItem>
                <SelectItem value="few-hours">Few Hours</SelectItem>
                <SelectItem value="half-day">Half Day</SelectItem>
                <SelectItem value="full-day">Full Day</SelectItem>
                <SelectItem value="multi-day">Multi Day</SelectItem>
                <SelectItem value="week-plus">Week+</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          {/* Rating */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              Rating
            </h3>
            <Select value={selectedRating} onValueChange={setSelectedRating}>
              <SelectTrigger>
                <SelectValue placeholder="Any rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Rating</SelectItem>
                <SelectItem value="4.5">4.5+ Stars</SelectItem>
                <SelectItem value="4">4+ Stars</SelectItem>
                <SelectItem value="3.5">3.5+ Stars</SelectItem>
                <SelectItem value="3">3+ Stars</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          {/* Service Type */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h3 className="font-semibold mb-3">Experience Type</h3>
            <div className="space-y-3">
              {[
                { id: "hotel", label: "Hotels & Resorts", count: 45 },
                { id: "trip", label: "Tours & Trips", count: 32 },
                { id: "entertainment", label: "Entertainment", count: 28 },
                { id: "adventure", label: "Adventure Sports", count: 15 },
                { id: "cultural", label: "Cultural Experiences", count: 22 },
              ].map((type) => (
                <motion.div key={type.id} className="flex items-center justify-between" whileHover={{ x: 4 }}>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={type.id}
                      checked={selectedTypes.includes(type.id)}
                      onCheckedChange={(checked) => handleTypeChange(type.id, checked as boolean)}
                    />
                    <label htmlFor={type.id} className="text-sm cursor-pointer font-medium">
                      {type.label}
                    </label>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {type.count}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Location */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-red-500" />
              Popular Destinations
            </h3>
            <div className="space-y-3">
              {[
                { id: "maldives", label: "Maldives", count: 12 },
                { id: "dubai", label: "Dubai, UAE", count: 18 },
                { id: "tuscany", label: "Tuscany, Italy", count: 8 },
                { id: "new-york", label: "New York City", count: 25 },
                { id: "los-angeles", label: "Los Angeles", count: 15 },
              ].map((location) => (
                <motion.div key={location.id} className="flex items-center justify-between" whileHover={{ x: 4 }}>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={location.id}
                      checked={selectedLocations.includes(location.id)}
                      onCheckedChange={(checked) => handleLocationChange(location.id, checked as boolean)}
                    />
                    <label htmlFor={location.id} className="text-sm cursor-pointer font-medium">
                      {location.label}
                    </label>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {location.count}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Amenities */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <h3 className="font-semibold mb-3">Amenities</h3>
            <div className="space-y-2">
              {["Free WiFi", "Pool", "Spa", "Gym", "Pet Friendly"].map((amenity) => (
                <motion.div key={amenity} className="flex items-center space-x-2" whileHover={{ x: 4 }}>
                  <Checkbox
                    id={amenity}
                    checked={selectedAmenities.includes(amenity)}
                    onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
                  />
                  <label htmlFor={amenity} className="text-sm cursor-pointer">
                    {amenity}
                  </label>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-md">
              Apply Filters ({activeFiltersCount})
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
