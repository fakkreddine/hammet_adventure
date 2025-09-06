"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Users, Star, Clock, Heart, ArrowLeft, Check, Info, Camera, Shield, Award } from "lucide-react"
import { Header } from "@/components/header"
import { BookingForm } from "@/components/booking-form"
import Link from "next/link"

// Adventure data (in a real app, this would come from an API)
const adventures = [
  {
    id: 1,
    title: "Safari Quad dans le Désert",
    location: "Douz, Tunisie",
    duration: "3 heures",
    price: 120,
    rating: 4.8,
    reviews: 247,
    images: [
      "/tunisian-desert-quad-bikes.png",
      "/tunisian-desert-quad-adventure.png",
      "/tunisia-desert-quad.png",
      "/quad-bikes-tunisia-sunset.png",
    ],
    category: "Adventure Sports",
    features: ["Guide Expert", "Équipement Inclus", "Transport", "Assurance", "Photos Souvenir"],
    difficulty: "Intermédiaire",
    groupSize: "2-8 personnes",
    description:
      "Explorez les dunes dorées du désert tunisien lors de cette aventure quad inoubliable. Découvrez des paysages à couper le souffle et vivez une expérience authentique avec nos guides experts locaux.",
    longDescription:
      "Cette excursion quad de 3 heures vous emmène au cœur du désert tunisien, où vous découvrirez des paysages spectaculaires et une culture riche. Nos guides expérimentés vous feront découvrir des sites cachés et partageront avec vous l'histoire fascinante de cette région. L'aventure comprend une formation complète sur la conduite des quads, tout l'équipement de sécurité nécessaire, et des arrêts photos dans les plus beaux endroits du désert.",
    included: [
      "Guide expert local",
      "Quad 4x4 récent",
      "Équipement de sécurité complet",
      "Transport depuis/vers l'hôtel",
      "Assurance complète",
      "Photos professionnelles",
      "Rafraîchissements",
    ],
    notIncluded: ["Repas (disponible en option)", "Pourboires", "Dépenses personnelles"],
    schedule: [
      { time: "08:00", activity: "Prise en charge à l'hôtel" },
      { time: "08:30", activity: "Arrivée au centre quad et briefing sécurité" },
      { time: "09:00", activity: "Formation pratique et test des quads" },
      { time: "09:30", activity: "Départ pour l'aventure dans le désert" },
      { time: "11:00", activity: "Arrêt photos et découverte d'une oasis" },
      { time: "11:30", activity: "Continuation de l'exploration" },
      { time: "12:00", activity: "Retour au centre et rafraîchissements" },
      { time: "12:30", activity: "Retour à l'hôtel" },
    ],
    requirements: [
      "Âge minimum: 16 ans",
      "Permis de conduire valide",
      "Condition physique normale",
      "Vêtements adaptés recommandés",
    ],
    cancellation: "Annulation gratuite jusqu'à 24h avant le départ",
  },
  {
    id: 2,
    title: "Excursion Quad au Coucher du Soleil",
    location: "Hammamet, Tunisie",
    duration: "2 heures",
    price: 85,
    rating: 4.9,
    reviews: 189,
    images: [
      "/tunisian-desert-quad-bikes-sunset.png",
      "/tunisia-quad-sunset.png",
      "/placeholder-d81n5.png",
      "/tunisia-coastal-quad-adventure.png",
    ],
    category: "Adventure Sports",
    features: ["Coucher de Soleil", "Photos Incluses", "Rafraîchissements", "Guide Expert"],
    difficulty: "Débutant",
    groupSize: "2-6 personnes",
    description: "Admirez un coucher de soleil spectaculaire depuis votre quad dans les paysages tunisiens.",
    longDescription:
      "Une expérience magique qui combine l'adrénaline de la conduite quad avec la beauté d'un coucher de soleil tunisien. Cette excursion de 2 heures est parfaite pour les débutants et offre des vues panoramiques exceptionnelles sur la côte méditerranéenne.",
    included: [
      "Guide expert local",
      "Quad automatique facile",
      "Équipement de sécurité",
      "Photos professionnelles du coucher de soleil",
      "Rafraîchissements",
      "Transport local",
    ],
    notIncluded: ["Transport depuis l'hôtel (disponible en option)", "Repas", "Pourboires"],
    schedule: [
      { time: "16:30", activity: "Accueil et briefing sécurité" },
      { time: "17:00", activity: "Formation et test des quads" },
      { time: "17:30", activity: "Départ pour l'aventure" },
      { time: "18:15", activity: "Arrêt au point de vue panoramique" },
      { time: "18:45", activity: "Observation du coucher de soleil" },
      { time: "19:15", activity: "Retour et rafraîchissements" },
    ],
    requirements: [
      "Âge minimum: 14 ans (avec accompagnant)",
      "Aucune expérience requise",
      "Condition physique normale",
    ],
    cancellation: "Annulation gratuite jusqu'à 12h avant le départ",
  },
  // Add more adventures as needed...
]

export default function AdventurePage() {
  const params = useParams()
  const router = useRouter()
  
  const [selectedImage, setSelectedImage] = useState(0)


  const adventureId = Number.parseInt(params.id as string)
  const adventure = adventures.find((a) => a.id === adventureId)

  if (!adventure) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Aventure non trouvée</h1>
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
                  onClick={() => router.replace(`/reservation/${adventure.id}`) }
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
