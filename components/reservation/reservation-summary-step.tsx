"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, Users, MapPin, Clock, Tag, Percent,Shield,Camera } from "lucide-react"
import type { ReservationData } from "@/app/reservation/page"
import { useState } from "react"

interface ReservationSummaryStepProps {
  data: ReservationData
  onUpdate: (data: Partial<ReservationData>) => void
}

export function ReservationSummaryStep({ data, onUpdate }: ReservationSummaryStepProps) {
  const [promoCode, setPromoCode] = useState(data.promoCode || "")
  const [isApplyingPromo, setIsApplyingPromo] = useState(false)
  const [promoError, setPromoError] = useState("")

  const basePrice = 120 // Price per person
  const totalBasePrice = basePrice * data.persons

  // Calculate discount based on payment option
  const paymentDiscount = data.paymentOption === "now" ? 0.1 : 0
  const promoDiscount = data.discount || 0
  const totalDiscount = paymentDiscount + promoDiscount

  const discountAmount = totalBasePrice * totalDiscount
  const finalPrice = totalBasePrice - discountAmount

  const applyPromoCode = async () => {
    if (!promoCode.trim()) return

    setIsApplyingPromo(true)
    setPromoError("")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock promo code validation
    const validPromoCodes = {
      SUMMER20: 0.2,
      WELCOME10: 0.1,
      FAMILY15: 0.15,
      STUDENT5: 0.05,
    }

    if (validPromoCodes[promoCode.toUpperCase() as keyof typeof validPromoCodes]) {
      const discount = validPromoCodes[promoCode.toUpperCase() as keyof typeof validPromoCodes]
      onUpdate({
        promoCode: promoCode.toUpperCase(),
        discount,
      })
      setPromoError("")
    } else {
      setPromoError("Code promo invalide")
    }

    setIsApplyingPromo(false)
  }

  const removePromoCode = () => {
    setPromoCode("")
    onUpdate({ promoCode: "", discount: 0 })
    setPromoError("")
  }

  const formatDate = (date: Date | null) => {
    if (!date) return "Non sélectionnée"
    return new Intl.DateTimeFormat("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }
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

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="backdrop-blur-sm bg-white/95 border-amber-200 shadow-xl">
          <CardHeader className="pb-3 sm:pb-4 md:pb-6">
            <CardTitle className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 flex items-center">
              <Tag className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2 sm:mr-3 text-amber-600" />
              Résumé de la Réservation
            </CardTitle>
          </CardHeader>
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
                src={adventures[1].images[selectedImage] || "/placeholder.svg"}
                alt={adventures[1].title}
                className="w-full h-96 object-cover rounded-xl shadow-lg"
              />
              <Button variant="ghost" size="sm" className="absolute top-4 right-4 bg-white/90 hover:bg-white shadow-md">
                <Heart className="w-4 h-4" />
              </Button>
            </motion.div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-2">
              {adventures[1].images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative h-20 rounded-lg overflow-hidden transition-all ${
                    selectedImage === index ? "ring-2 ring-amber-500" : "hover:opacity-80"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${adventures[1].title} ${index + 1}`}
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

          <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
            {/* Adventure Details */}
            <div className="space-y-3 sm:space-y-4">
               <div className="space-y-4">
                  <h4 className="font-semibold text-lg text-gray-900 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-green-600" />
                    Inclus dans votre aventure
                  </h4>
                  <div className="space-y-2">
                    {[
                      "Quad professionnel et équipement de sécurité",
                      "Guide expérimenté parlant français",
                      "Casque et lunettes de protection",
                      "Briefing sécurité complet",
                      "Photos souvenirs de votre aventure",
                      "Thé traditionnel dans le désert",
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm sm:text-base md:text-lg text-gray-900">
                      Aventure Quad en Tunisie
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">Désert de Douz, Tunisie</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">Date</p>
                    <p className="font-medium text-sm sm:text-base text-gray-900">{formatDate(data.date)}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">Participants</p>
                    <p className="font-medium text-sm sm:text-base text-gray-900">
                      {data.persons} personne{data.persons > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">Durée</p>
                    <p className="font-medium text-sm sm:text-base text-gray-900">4 heures</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Badge variant="secondary" className="bg-amber-100 text-amber-800 text-xs sm:text-sm">
                    {data.paymentOption === "now" ? "Paiement immédiat" : "Paiement sur place"}
                  </Badge>
                </div>
              </div>
            </div>

            <Separator className="my-4 sm:my-6" />

            {/* Promo Code Section */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="font-semibold text-base sm:text-lg md:text-xl text-gray-900 flex items-center">
                <Percent className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-amber-600" />
                Code Promo
              </h3>

              {data.promoCode ? (
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg space-y-2 sm:space-y-0">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Badge className="bg-green-500 text-white text-xs sm:text-sm">{data.promoCode}</Badge>
                    <span className="text-sm sm:text-base text-green-700 font-medium">
                      -{(promoDiscount * 100).toFixed(0)}% de réduction appliquée
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={removePromoCode}
                    className="text-xs sm:text-sm border-green-300 text-green-700 hover:bg-green-100 w-full sm:w-auto bg-transparent"
                  >
                    Supprimer
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <Input
                    placeholder="Entrez votre code promo"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    className="flex-1 text-sm sm:text-base h-10 sm:h-11"
                    onKeyPress={(e) => e.key === "Enter" && applyPromoCode()}
                  />
                  <Button
                    onClick={applyPromoCode}
                    disabled={!promoCode.trim() || isApplyingPromo}
                    className="bg-amber-500 hover:bg-amber-600 text-white w-full sm:w-auto h-10 sm:h-11 text-sm sm:text-base"
                  >
                    {isApplyingPromo ? "Application..." : "Appliquer"}
                  </Button>
                </div>
              )}

              {promoError && <p className="text-red-500 text-xs sm:text-sm mt-1">{promoError}</p>}

              <div className="text-xs sm:text-sm text-gray-600 space-y-1">
                <p>Codes promo disponibles pour test :</p>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  <Badge variant="outline" className="text-xs">
                    SUMMER20 (-20%)
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    WELCOME10 (-10%)
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    FAMILY15 (-15%)
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    STUDENT5 (-5%)
                  </Badge>
                </div>
              </div>
            </div>

            <Separator className="my-4 sm:my-6" />

            {/* Price Breakdown */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="font-semibold text-base sm:text-lg md:text-xl text-gray-900">Détail des Prix</h3>

              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between items-center text-sm sm:text-base">
                  <span className="text-gray-600">
                    Prix de base ({data.persons} × {basePrice}€)
                  </span>
                  <span className="font-medium">{totalBasePrice}€</span>
                </div>

                {paymentDiscount > 0 && (
                  <div className="flex justify-between items-center text-sm sm:text-base text-green-600">
                    <span>Réduction paiement immédiat (-{paymentDiscount * 100}%)</span>
                    <span className="font-medium">-{(totalBasePrice * paymentDiscount).toFixed(2)}€</span>
                  </div>
                )}

                {promoDiscount > 0 && (
                  <div className="flex justify-between items-center text-sm sm:text-base text-green-600">
                    <span>
                      Code promo {data.promoCode} (-{promoDiscount * 100}%)
                    </span>
                    <span className="font-medium">-{(totalBasePrice * promoDiscount).toFixed(2)}€</span>
                  </div>
                )}

                <Separator />

                <div className="flex justify-between items-center text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-amber-600">{finalPrice.toFixed(2)}€</span>
                </div>

                {totalDiscount > 0 && (
                  <div className="text-center">
                    <Badge className="bg-green-500 text-white text-sm sm:text-base px-3 py-1">
                      Vous économisez {discountAmount.toFixed(2)}€ !
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
