"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { MapPin, Calendar, Users, Search, Filter, Star, Clock, Heart, Grid3X3, List, AlertCircle } from "lucide-react"
import { Header } from "@/components/header"
import { searchFormSchema, type SearchFormData, type Adventure } from "@/lib/validations"
import { searchAdventures, initializeSearchIndex } from "@/lib/meilisearch"
import { useDebounce } from "@/hooks/use-debounce"
import Link from "next/link"

const adventures: Adventure[] = [
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
    description: "Explorez les dunes dorées du désert tunisien lors de cette aventure quad inoubliable.",
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
    description: "Admirez un coucher de soleil spectaculaire depuis votre quad dans les paysages tunisiens.",
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
    description: "Découvrez les oasis cachées et la culture locale lors de cette excursion quad complète.",
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
    description: "Profitez de vues panoramiques exceptionnelles sur la côte méditerranéenne.",
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
    description: "Vivez une expérience nocturne unique avec un éclairage LED professionnel.",
  },
  {
    id: 6,
    title: "Découverte Quad Familiale",
    location: "Nabeul, Tunisie",
    duration: "1.5 heures",
    price: 65,
    rating: 4.5,
    reviews: 298,
    image: "/family-quad-adventure-tunisia.png",
    category: "Adventure Sports",
    features: ["Adapté Familles", "Formation Incluse", "Parcours Sécurisé"],
    difficulty: "Débutant",
    groupSize: "2-12 personnes",
    description: "Une aventure quad parfaite pour toute la famille avec un parcours adapté et sécurisé.",
  },
]

export default function BookingPage() {
  const [searchResults, setSearchResults] = useState<Adventure[]>(adventures)
  const [isSearching, setIsSearching] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState([50, 200])
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([])
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("recommended")
  const [showFilters, setShowFilters] = useState(false)

  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  const form = useForm<SearchFormData>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      location: "",
      date: "",
      guests: "2",
      searchQuery: "",
    },
  })

  // Initialize search index on component mount
  useEffect(() => {
    initializeSearchIndex(adventures)
  }, [])

  // Enhanced search with Meilisearch
  const performSearch = useCallback(async () => {
    if (!debouncedSearchQuery.trim() && selectedDifficulty.length === 0 && selectedFeatures.length === 0) {
      setSearchResults(adventures)
      return
    }

    setIsSearching(true)
    try {
      const results = await searchAdventures(debouncedSearchQuery, {
        priceRange: [priceRange[0], priceRange[1]],
        difficulty: selectedDifficulty,
        features: selectedFeatures,
        location: form.getValues("location"),
      })

      // Fallback to local filtering if Meilisearch fails
      if (results.length === 0 && debouncedSearchQuery.trim()) {
        const localResults = adventures.filter((adventure) => {
          const matchesSearch =
            adventure.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
            adventure.location.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
            adventure.features.some((f) => f.toLowerCase().includes(debouncedSearchQuery.toLowerCase()))
          const matchesPrice = adventure.price >= priceRange[0] && adventure.price <= priceRange[1]
          const matchesDifficulty = selectedDifficulty.length === 0 || selectedDifficulty.includes(adventure.difficulty)
          const matchesFeatures =
            selectedFeatures.length === 0 || selectedFeatures.some((f) => adventure.features.includes(f))

          return matchesSearch && matchesPrice && matchesDifficulty && matchesFeatures
        })
        setSearchResults(localResults)
      } else {
        setSearchResults(results.length > 0 ? results : adventures)
      }
    } catch (error) {
      console.error("Search failed:", error)
      setSearchResults(adventures)
    } finally {
      setIsSearching(false)
    }
  }, [debouncedSearchQuery, priceRange, selectedDifficulty, selectedFeatures, form])

  useEffect(() => {
    performSearch()
  }, [performSearch])

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

  const onSubmit = (data: SearchFormData) => {
    console.log("Search submitted:", data)
    performSearch()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <Header />

      {/* Enhanced Hero Search Section */}
      <section className="relative py-16 lg:py-24 px-4 lg:px-6">
        <div className="absolute inset-0 bg-[url('/tunisian-desert-quad-bikes.png')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 lg:mb-6">
              Découvrez Votre Prochaine{" "}
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Aventure
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 mb-8 lg:mb-12 max-w-3xl mx-auto">
              Réservez des excursions quad, trouvez des guides experts et vivez des aventures inoubliables en Tunisie
            </p>

            {/* Enhanced Search Form */}
            <Card className="max-w-5xl mx-auto p-4 lg:p-8 backdrop-blur-sm bg-white/95 border-amber-200 shadow-2xl">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">Où?</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input
                                placeholder="Destination"
                                className="pl-10 h-12 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">Quand?</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input
                                type="date"
                                className="pl-10 h-12 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="guests"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">Participants</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Select value={field.value} onValueChange={field.onChange}>
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
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex items-end">
                      <Button
                        type="submit"
                        className="w-full h-12 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold"
                        disabled={isSearching}
                      >
                        <Search className="w-4 h-4 mr-2" />
                        {isSearching ? "Recherche..." : "Rechercher"}
                      </Button>
                    </div>
                  </div>

                  {/* Enhanced Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Rechercher par titre, lieu, ou caractéristiques..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 h-14 text-lg border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                    />
                  </div>
                </form>
              </Form>
            </Card>

            {/* Category Pills */}
            <div className="flex flex-wrap justify-center gap-3 mt-8 lg:mt-12">
              {["Quad", "Aventure", "Désert", "Coucher de Soleil", "Famille", "Expert"].map((category) => (
                <Button
                  key={category}
                  variant="outline"
                  className="rounded-full border-amber-300 text-amber-700 hover:bg-amber-100 bg-white/80 backdrop-blur-sm"
                  onClick={() => setSearchQuery(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Results Section */}
      <section className="max-w-7xl mx-auto px-4 lg:px-6 pb-16 lg:pb-24">
        <div className="flex flex-col xl:flex-row gap-8 lg:gap-12">
          {/* Enhanced Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className={`xl:w-80 ${showFilters ? "block" : "hidden xl:block"}`}
          >
            <Card className="p-6 lg:p-8 sticky top-4 shadow-lg">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-semibold text-gray-900">Filtres</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setPriceRange([50, 200])
                    setSelectedDifficulty([])
                    setSelectedFeatures([])
                    setSearchQuery("")
                  }}
                  className="text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                >
                  Réinitialiser
                </Button>
              </div>

              <div className="space-y-8">
                {/* Price Range */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-4 block">
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
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>30€</span>
                    <span>300€</span>
                  </div>
                </div>

                <Separator />

                {/* Difficulty */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-4 block">Niveau de difficulté</Label>
                  <div className="space-y-3">
                    {["Débutant", "Intermédiaire", "Avancé"].map((difficulty) => (
                      <div key={difficulty} className="flex items-center space-x-3">
                        <Checkbox
                          id={difficulty}
                          checked={selectedDifficulty.includes(difficulty)}
                          onCheckedChange={(checked) => handleDifficultyChange(difficulty, checked as boolean)}
                        />
                        <Label htmlFor={difficulty} className="text-sm text-gray-600 cursor-pointer">
                          {difficulty}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Features */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-4 block">Caractéristiques incluses</Label>
                  <div className="space-y-3">
                    {[
                      "Guide Expert",
                      "Équipement Inclus",
                      "Transport",
                      "Photos Incluses",
                      "Déjeuner Inclus",
                      "Rafraîchissements",
                    ].map((feature) => (
                      <div key={feature} className="flex items-center space-x-3">
                        <Checkbox
                          id={feature}
                          checked={selectedFeatures.includes(feature)}
                          onCheckedChange={(checked) => handleFeatureChange(feature, checked as boolean)}
                        />
                        <Label htmlFor={feature} className="text-sm text-gray-600 cursor-pointer">
                          {feature}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Results */}
          <div className="flex-1">
            {/* Enhanced Results Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 lg:mb-12 gap-4 lg:gap-6">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  {searchResults.length} Aventure{searchResults.length !== 1 ? "s" : ""} trouvée
                  {searchResults.length !== 1 ? "s" : ""}
                </h2>
                <p className="text-gray-600 text-lg">Découvrez des expériences quad exceptionnelles en Tunisie</p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="xl:hidden border-amber-200 hover:bg-amber-50"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filtres
                </Button>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48 border-amber-200 focus:border-amber-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recommended">Recommandé</SelectItem>
                    <SelectItem value="price-low">Prix croissant</SelectItem>
                    <SelectItem value="price-high">Prix décroissant</SelectItem>
                    <SelectItem value="rating">Mieux notés</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border rounded-lg border-amber-200">
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

            {/* Enhanced Adventure Cards */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className={
                viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6 lg:gap-8" : "space-y-6"
              }
            >
              {searchResults.map((adventure, index) => (
                <motion.div
                  key={adventure.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-0 shadow-lg">
                    <div className="relative">
                      <img
                        src={adventure.image || "/placeholder.svg?height=240&width=400&query=quad adventure tunisia"}
                        alt={adventure.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-amber-500 text-white shadow-md text-xs px-2 py-1">
                          {adventure.difficulty}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-3 right-3 bg-white/90 hover:bg-white shadow-md h-8 w-8 p-0"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>

                    <CardContent className="p-5">
                      <div className="mb-3">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
                          {adventure.title}
                        </h3>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                          <span className="truncate">{adventure.location}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{adventure.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          <span className="font-medium">{adventure.rating}</span>
                          <span className="text-gray-500 ml-1">({adventure.reviews})</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {adventure.features.slice(0, 2).map((feature:any) => (
                          <Badge
                            key={feature}
                            variant="outline"
                            className="text-xs border-amber-200 text-amber-700 px-2 py-0.5"
                          >
                            {feature}
                          </Badge>
                        ))}
                        {adventure.features.length > 2 && (
                          <Badge variant="outline" className="text-xs border-gray-200 text-gray-500 px-2 py-0.5">
                            +{adventure.features.length - 2}
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-amber-600">{adventure.price}€</div>
                          <div className="text-xs text-gray-500">par personne</div>
                        </div>
                        <Button
                          className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-medium px-4 py-2"
                          asChild
                        >
                          <Link href={`/booking/${adventure.id}`}>Voir Détails</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced Empty State */}
            {searchResults.length === 0 && (
              <motion.div
                className="text-center py-16 lg:py-24"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-gray-400 mb-6">
                  <AlertCircle className="w-20 h-20 mx-auto" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Aucune aventure trouvée</h3>
                <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                  Essayez d'ajuster vos filtres ou votre recherche pour découvrir plus d'options.
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setPriceRange([50, 200])
                    setSelectedDifficulty([])
                    setSelectedFeatures([])
                  }}
                  className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
                >
                  Réinitialiser les filtres
                </Button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Enhanced Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16 lg:mt-24"
        >
          <Card className="max-w-4xl mx-auto p-8 lg:p-12 bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-2xl">
            <h3 className="text-2xl lg:text-3xl font-bold mb-6">Prêt pour Votre Prochaine Aventure?</h3>
            <p className="text-amber-100 mb-8 text-lg max-w-2xl mx-auto">
              Rejoignez des milliers de voyageurs qui nous font confiance pour créer des expériences inoubliables.
              Réservez maintenant et commencez votre voyage vers des destinations extraordinaires en Tunisie.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center">
              <Button variant="secondary" size="lg" className="bg-white text-amber-600 hover:bg-amber-50 font-semibold">
                Commencer la Planification
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10 bg-transparent font-semibold"
              >
                Parcourir Plus d'Options
              </Button>
            </div>
          </Card>
        </motion.div>
      </section>
    </div>
  )
}
