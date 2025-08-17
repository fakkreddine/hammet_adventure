"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Calendar, Users, Search, Filter, Star, Clock, Heart, Grid3X3, List } from "lucide-react"
import { Header } from "@/components/header"

const adventures = [
  {
    id: 1,
    title: "Safari Quad dans le Désert",
    location: "Douz, Tunisie",
    duration: "3 heures",
    price: 120,
    rating: 4.8,
    reviews: 247,
    image: "/tunisian-desert-quad-bikes.png",
    category: "Adventure Sports",
    features: ["Guide Expert", "Équipement Inclus", "Transport"],
    difficulty: "Intermédiaire",
    groupSize: "2-8 personnes",
  },
  {
    id: 2,
    title: "Excursion Quad au Coucher du Soleil",
    location: "Hammamet, Tunisie",
    duration: "2 heures",
    price: 85,
    rating: 4.9,
    reviews: 189,
    image: "/tunisian-desert-quad-bikes-sunset.png",
    category: "Adventure Sports",
    features: ["Coucher de Soleil", "Photos Incluses", "Rafraîchissements"],
    difficulty: "Débutant",
    groupSize: "2-6 personnes",
  },
  {
    id: 3,
    title: "Aventure Quad dans l'Oasis",
    location: "Tozeur, Tunisie",
    duration: "4 heures",
    price: 150,
    rating: 4.7,
    reviews: 156,
    image: "/quad-bikes-tunisian-oasis.png",
    category: "Adventure Sports",
    features: ["Visite Oasis", "Déjeuner Inclus", "Guide Local"],
    difficulty: "Avancé",
    groupSize: "4-10 personnes",
  },
  {
    id: 4,
    title: "Circuit Quad Panoramique",
    location: "Sidi Bou Said, Tunisie",
    duration: "2.5 heures",
    price: 95,
    rating: 4.6,
    reviews: 203,
    image: "/tunisia-quad-bikes.png",
    category: "Adventure Sports",
    features: ["Vues Panoramiques", "Arrêts Photos", "Équipement Premium"],
    difficulty: "Intermédiaire",
    groupSize: "2-8 personnes",
  },
  {
    id: 5,
    title: "Expédition Quad Nocturne",
    location: "Hammamet, Tunisie",
    duration: "2 heures",
    price: 110,
    rating: 4.8,
    reviews: 134,
    image: "/tunisian-quad-bike-adventure.png",
    category: "Adventure Sports",
    features: ["Éclairage LED", "Expérience Unique", "Sécurité Renforcée"],
    difficulty: "Avancé",
    groupSize: "2-6 personnes",
  },
  {
    id: 6,
    title: "Découverte Quad Familiale",
    location: "Nabeul, Tunisie",
    duration: "1.5 heures",
    price: 65,
    rating: 4.5,
    reviews: 298,
    image: "/placeholder-52c9w.png",
    category: "Adventure Sports",
    features: ["Adapté Familles", "Formation Incluse", "Parcours Sécurisé"],
    difficulty: "Débutant",
    groupSize: "2-12 personnes",
  },
]

export default function BookingPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [location, setLocation] = useState("")
  const [date, setDate] = useState("")
  const [guests, setGuests] = useState("2")
  const [priceRange, setPriceRange] = useState([50, 200])
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([])
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("recommended")
  const [showFilters, setShowFilters] = useState(false)

  const filteredAdventures = adventures.filter((adventure) => {
    const matchesSearch = adventure.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLocation = !location || adventure.location.toLowerCase().includes(location.toLowerCase())
    const matchesPrice = adventure.price >= priceRange[0] && adventure.price <= priceRange[1]
    const matchesDifficulty = selectedDifficulty.length === 0 || selectedDifficulty.includes(adventure.difficulty)
    const matchesFeatures =
      selectedFeatures.length === 0 || selectedFeatures.some((feature) => adventure.features.includes(feature))

    return matchesSearch && matchesLocation && matchesPrice && matchesDifficulty && matchesFeatures
  })

  const handleDifficultyChange = (difficulty: string, checked: boolean) => {
    if (checked) {
      setSelectedDifficulty([...selectedDifficulty, difficulty])
    } else {
      setSelectedDifficulty(selectedDifficulty.filter((d) => d !== difficulty))
    }
  }

  const handleFeatureChange = (feature: string, checked: boolean) => {
    if (checked) {
      setSelectedFeatures([...selectedFeatures, feature])
    } else {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== feature))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <Header />

      {/* Hero Search Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-[url('/tunisian-desert-quad-bikes.png')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Découvrez Votre Prochaine{" "}
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Aventure
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Réservez des excursions quad, trouvez des guides experts et vivez des aventures inoubliables
            </p>

            {/* Search Bar */}
            <Card className="max-w-4xl mx-auto p-6 backdrop-blur-sm bg-white/90 border-amber-200 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                    Où?
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="location"
                      placeholder="Destination"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="pl-10 h-12 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date" className="text-sm font-medium text-gray-700">
                    Quand?
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="pl-10 h-12 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guests" className="text-sm font-medium text-gray-700">
                    Participants
                  </Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Select value={guests} onValueChange={setGuests}>
                      <SelectTrigger className="pl-10 h-12 border-gray-300 focus:border-amber-500 focus:ring-amber-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 personne</SelectItem>
                        <SelectItem value="2">2 personnes</SelectItem>
                        <SelectItem value="3">3 personnes</SelectItem>
                        <SelectItem value="4">4 personnes</SelectItem>
                        <SelectItem value="5+">5+ personnes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button className="h-12 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold">
                  <Search className="w-4 h-4 mr-2" />
                  Rechercher
                </Button>
              </div>
            </Card>

            {/* Category Pills */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {["Quad", "Aventure", "Désert", "Coucher de Soleil"].map((category) => (
                <Button
                  key={category}
                  variant="outline"
                  className="rounded-full border-amber-300 text-amber-700 hover:bg-amber-100 bg-transparent"
                >
                  {category}
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results Section */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className={`lg:w-80 ${showFilters ? "block" : "hidden lg:block"}`}
          >
            <Card className="p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Filtres</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setPriceRange([50, 200])
                    setSelectedDifficulty([])
                    setSelectedFeatures([])
                  }}
                  className="text-amber-600 hover:text-amber-700"
                >
                  Réinitialiser
                </Button>
              </div>

              <div className="space-y-6">
                {/* Price Range */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">
                    Gamme de prix: {priceRange[0]}€ - {priceRange[1]}€
                  </Label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={300}
                    min={30}
                    step={10}
                    className="w-full"
                  />
                </div>

                <Separator />

                {/* Difficulty */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">Difficulté</Label>
                  <div className="space-y-2">
                    {["Débutant", "Intermédiaire", "Avancé"].map((difficulty) => (
                      <div key={difficulty} className="flex items-center space-x-2">
                        <Checkbox
                          id={difficulty}
                          checked={selectedDifficulty.includes(difficulty)}
                          onCheckedChange={(checked) => handleDifficultyChange(difficulty, checked as boolean)}
                        />
                        <Label htmlFor={difficulty} className="text-sm text-gray-600">
                          {difficulty}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Features */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">Caractéristiques</Label>
                  <div className="space-y-2">
                    {["Guide Expert", "Équipement Inclus", "Transport", "Photos Incluses", "Déjeuner Inclus"].map(
                      (feature) => (
                        <div key={feature} className="flex items-center space-x-2">
                          <Checkbox
                            id={feature}
                            checked={selectedFeatures.includes(feature)}
                            onCheckedChange={(checked) => handleFeatureChange(feature, checked as boolean)}
                          />
                          <Label htmlFor={feature} className="text-sm text-gray-600">
                            {feature}
                          </Label>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Results */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{filteredAdventures.length} Aventures trouvées</h2>
                <p className="text-gray-600">Découvrez des expériences quad exceptionnelles</p>
              </div>

              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtres
                </Button>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recommended">Recommandé</SelectItem>
                    <SelectItem value="price-low">Prix croissant</SelectItem>
                    <SelectItem value="price-high">Prix décroissant</SelectItem>
                    <SelectItem value="rating">Mieux notés</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Adventure Cards */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}
            >
              {filteredAdventures.map((adventure, index) => (
                <motion.div
                  key={adventure.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                    <div className="relative">
                      <img
                        src={adventure.image || "/placeholder.svg"}
                        alt={adventure.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-amber-500 text-white">{adventure.category}</Badge>
                      </div>
                      <Button variant="ghost" size="sm" className="absolute top-4 right-4 bg-white/80 hover:bg-white">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <div className="absolute bottom-4 left-4">
                        <Badge variant="secondary" className="bg-white/90 text-gray-900">
                          {adventure.difficulty}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">
                          {adventure.title}
                        </h3>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-amber-600">{adventure.price}€</div>
                          <div className="text-sm text-gray-500">par personne</div>
                        </div>
                      </div>

                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <MapPin className="w-4 h-4 mr-1" />
                        {adventure.location}
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {adventure.duration}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {adventure.groupSize}
                        </div>
                      </div>

                      <div className="flex items-center mb-4">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="ml-1 text-sm font-medium">{adventure.rating}</span>
                          <span className="ml-1 text-sm text-gray-500">({adventure.reviews} avis)</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {adventure.features.slice(0, 3).map((feature) => (
                          <Badge key={feature} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>

                      <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white">
                        Réserver Maintenant
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {filteredAdventures.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucune aventure trouvée</h3>
                <p className="text-gray-600">Essayez d'ajuster vos filtres pour voir plus de résultats.</p>
              </div>
            )}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <Card className="max-w-2xl mx-auto p-8 bg-gradient-to-r from-amber-500 to-orange-600 text-white">
            <h3 className="text-2xl font-bold mb-4">Prêt pour Votre Prochaine Aventure?</h3>
            <p className="text-amber-100 mb-6">
              Rejoignez des milliers de voyageurs qui nous font confiance pour créer des expériences inoubliables.
              Réservez maintenant et commencez votre voyage vers des destinations extraordinaires.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" className="bg-white text-amber-600 hover:bg-amber-50">
                Commencer la Planification
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 bg-transparent">
                Parcourir Plus d'Options
              </Button>
            </div>
          </Card>
        </motion.div>
      </section>
    </div>
  )
}
