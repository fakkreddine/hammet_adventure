"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Users, Star, Clock, Heart, ArrowLeft, Check, Info, Camera, Shield, Award, AlertCircle } from "lucide-react"
import { Header } from "@/components/header"
import Link from "next/link"

// Define the API response type
interface ApiActivity {
  id: number
  nom: string | null
  type: string | null
  prix: number
  images: string[]
  duree: number
  nbMinPersonne: number
  nbMaxPersonne: number
  trancheAge: string | null
  description: string | null
  included: string[]
}

// Define the Adventure type
interface Adventure {
  id: number
  title: string
  location: string
  duration: string
  price: number
  rating: number
  reviews: number
  images: string[]
  category: string
  features: string[]
  difficulty: string
  groupSize: string
  description: string
  longDescription: string
  included: string[]
  notIncluded: string[]
  schedule: { time: string; activity: string }[]
  requirements: string[]
  cancellation: string
}

// Utility function to sanitize image URLs
const sanitizeImageUrl = (url: string): string => {
  let sanitizedUrl = url.replace("localhost:3000", "localhost:8080")
  if (!sanitizedUrl.match(/\.(jpg|jpeg|png|gif)$/i)) {
    console.warn(`Malformed image URL detected: ${sanitizedUrl}. Using placeholder.`)
    return "/placeholder.svg?height=400&width=600&query=quad adventure"
  }
  if (!sanitizedUrl.startsWith("http://") && !sanitizedUrl.startsWith("https://")) {
    sanitizedUrl = `http://localhost:8080${sanitizedUrl.startsWith("/") ? "" : "/"}${sanitizedUrl}`
  }
  return sanitizedUrl
}

// Function to map API response to Adventure type
const mapApiToAdventure = (activity: ApiActivity): Adventure => {
  const sanitizedImages = activity.images.map(sanitizeImageUrl)
  // Check if the title is generic or placeholder-like (e.g., "aaaa")
  const isGenericTitle = activity.nom && (activity.nom.length <= 0 || activity.nom.match(/^[a-zA-Z]+$/))
  // Check if the description is generic (e.g., "bla bla")
  const isGenericDescription = activity.description && activity.description.toLowerCase().includes("bla bla")

  return {
    id: activity.id,
    title: isGenericTitle ? `Aventure en Quad ${activity.id}` : activity.nom || "Aventure Inconnue",
    location: activity.type || "Tunisie",
    duration: `${Math.floor(activity.duree / 60)} heure${activity.duree >= 120 ? "s" : ""} ${activity.duree % 60 ? `${activity.duree % 60} min` : ""}`,
    price: activity.prix,
    rating: 4.5, // Mocked since API doesn't provide
    reviews: Math.floor(Math.random() * 200) + 50, // Mocked
    images: sanitizedImages.length > 0 ? sanitizedImages : ["/placeholder.svg?height=400&width=600&query=quad adventure"],
    category: activity.type || "Aventure",
    features: activity.included.length > 0 ? activity.included : ["Guide Expert", "Équipement de Sécurité", "Assurance"],
    difficulty: activity.trancheAge
      ? activity.trancheAge.includes("10") || activity.trancheAge.includes("5")
        ? "Débutant"
        : activity.trancheAge.includes("18")
        ? "Avancé"
        : "Intermédiaire"
      : "Intermédiaire",
    groupSize: `${activity.nbMinPersonne}-${activity.nbMaxPersonne} personnes`,
    description: isGenericDescription 
      ? "Découvrez une aventure palpitante en quad à travers des paysages uniques en Tunisie." 
      : activity.description || "Aucune description fournie.",
    longDescription: isGenericDescription
      ? "Rejoignez-nous pour une expérience inoubliable en quad, adaptée à tous les niveaux. Parcourez des terrains variés avec nos guides experts et profitez de vues spectaculaires."
      : activity.description || "Découvrez une aventure unique avec nos guides experts en Tunisie.",
    included: activity.included.length > 0 ? activity.included : ["Guide expert local", "Équipement de sécurité", "Assurance"],
    notIncluded: ["Repas (optionnel)", "Pourboires", "Dépenses personnelles"],
    schedule: [
      { time: "08:00", activity: "Prise en charge à l'hôtel" },
      { time: "08:30", activity: "Briefing de sécurité" },
      { time: "09:00", activity: "Départ pour l'aventure en quad" },
      { time: "10:30", activity: "Pause photos et découverte" },
      { time: "11:30", activity: "Retour et rafraîchissements" },
    ],
    requirements: activity.trancheAge
      ? [`Âge: ${activity.trancheAge}`, "Condition physique normale", "Vêtements adaptés"]
      : ["Âge minimum: 10 ans", "Condition physique normale", "Vêtements adaptés"],
    cancellation: "Annulation gratuite jusqu'à 24h avant le départ",
  }
}

export default function AdventurePage() {
  const params = useParams()
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState(0)
  const [adventure, setAdventure] = useState<Adventure | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const adventureId = Number.parseInt(params.id as string)

  // Fetch adventure data from API
  useEffect(() => {
    const fetchAdventure = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch(`http://localhost:8080/activities/${adventureId}`)
        if (!response.ok) {
          throw new Error("Échec de la récupération de l'aventure")
        }
        const data: ApiActivity = await response.json()
        const mappedAdventure = mapApiToAdventure(data)
        setAdventure(mappedAdventure)
      } catch (err) {
        console.error("Erreur lors de la récupération de l'aventure:", err)
        setError("Une erreur est survenue lors du chargement de l'aventure. Veuillez réessayer.")
        setAdventure(null)
      } finally {
        setIsLoading(false)
      }
    }

    if (adventureId) {
      fetchAdventure()
    } else {
      setError("ID d'aventure invalide")
      setIsLoading(false)
    }
  }, [adventureId])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <Header />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-xl text-gray-700">Chargement de l'aventure...</p>
        </motion.div>
      </div>
    )
  }

  if (error || !adventure) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <AlertCircle className="w-20 h-20 mx-auto text-red-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{error || "Aventure non trouvée"}</h1>
          <Button asChild>
            <Link href="/booking">Retour aux aventures</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <Header />

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 pt-6">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6 hover:bg-amber-50">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour aux aventures
        </Button>
      </div>

      {/* Hero Section with Gallery */}
      <section className="max-w-7xl mx-auto px-4 lg:px-6 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <img
                src={adventure.images[selectedImage] || "/placeholder.svg"}
                alt={adventure.title}
                className="w-full h-96 object-cover rounded-xl shadow-lg"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg?height=400&width=600&query=quad adventure"
                }}
              />
              <Button variant="ghost" size="sm" className="absolute top-4 right-4 bg-white/90 hover:bg-white shadow-md">
                <Heart className="w-4 h-4" />
              </Button>
            </motion.div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-2">
              {adventure.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative h-20 rounded-lg overflow-hidden transition-all ${
                    selectedImage === index ? "ring-2 ring-amber-500" : "hover:opacity-80"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${adventure.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg?height=80&width=80&query=quad adventure"
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Adventure Info */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Badge className="bg-amber-500 text-white mb-3">{adventure.category}</Badge>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{adventure.title}</h1>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span className="text-lg">{adventure.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-amber-600">{adventure.price}€</div>
                  <div className="text-sm text-gray-500">par personne</div>
                </div>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-3 text-amber-600" />
                  <div>
                    <div className="font-medium">Durée</div>
                    <div className="text-sm text-gray-600">{adventure.duration}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-3 text-amber-600" />
                  <div>
                    <div className="font-medium">Groupe</div>
                    <div className="text-sm text-gray-600">{adventure.groupSize}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Award className="w-5 h-5 mr-3 text-amber-600" />
                  <div>
                    <div className="font-medium">Niveau</div>
                    <div className="text-sm text-gray-600">{adventure.difficulty}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 mr-3 text-yellow-400 fill-current" />
                  <div>
                    <div className="font-medium">{adventure.rating}/5</div>
                    <div className="text-sm text-gray-600">{adventure.reviews} avis</div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700 text-lg leading-relaxed mb-6">{adventure.description}</p>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-8">
                {adventure.features.map((feature) => (
                  <Badge key={feature} variant="outline" className="border-amber-200 text-amber-700">
                    <Check className="w-3 h-3 mr-1" />
                    {feature}
                  </Badge>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold h-12"
                  onClick={() => router.push(`/reservation/${adventure.id}`)}
                >
                  Réserver Maintenant
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-amber-300 text-amber-700 hover:bg-amber-50 h-12 bg-transparent"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Partager
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Detailed Information Tabs */}
      <section className="max-w-7xl mx-auto px-4 lg:px-6 pb-16">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="details">Détails</TabsTrigger>
            <TabsTrigger value="included">Inclus</TabsTrigger>
            <TabsTrigger value="schedule">Programme</TabsTrigger>
            <TabsTrigger value="requirements">Conditions</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Description complète</h3>
              <p className="text-gray-700 leading-relaxed">{adventure.longDescription}</p>
            </Card>
          </TabsContent>

          <TabsContent value="included" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-green-700">
                  <Check className="w-5 h-5 inline mr-2" />
                  Inclus dans le prix
                </h3>
                <ul className="space-y-2">
                  {adventure.included.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-red-700">
                  <Info className="w-5 h-5 inline mr-2" />
                  Non inclus
                </h3>
                <ul className="space-y-2">
                  {adventure.notIncluded.map((item, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <span className="w-4 h-4 mr-2 flex-shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6">Programme détaillé</h3>
              <div className="space-y-4">
                {adventure.schedule.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-amber-500 text-white rounded-full w-16 h-8 flex items-center justify-center text-sm font-medium mr-4 flex-shrink-0">
                      {item.time}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700">{item.activity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="requirements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">
                  <Shield className="w-5 h-5 inline mr-2" />
                  Conditions requises
                </h3>
                <ul className="space-y-2">
                  {adventure.requirements.map((req, index) => (
                    <li key={index} className="flex items-center">
                      <Info className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Politique d'annulation</h3>
                <p className="text-gray-700 mb-4">{adventure.cancellation}</p>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <p className="text-sm text-amber-800">
                    <Info className="w-4 h-4 inline mr-1" />
                    Les conditions météorologiques peuvent affecter cette activité. En cas d'annulation due au mauvais
                    temps, un remboursement complet ou une reprogrammation sera proposée.
                  </p>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  )
}