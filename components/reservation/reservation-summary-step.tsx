"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, Users, MapPin, Clock, Tag, Percent, Shield, Camera, Heart, Award, Check, Star } from "lucide-react"
import type { ReservationData } from "@/app/reservation/page"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"

interface ActivityDetails {
  id: number
  nom: string
  type: string
  prix: number
  images: string[]
  duree: number
  nbMinPersonne: number
  nbMaxPersonne: number
  trancheAge: string
  description: string
  included: string[]
  maxBookingsPerDay: number
}

interface ReservationSummaryStepProps {
  data: ReservationData
  onUpdate: (data: Partial<ReservationData>) => void
}

export function ReservationSummaryStep({ data, onUpdate }: ReservationSummaryStepProps) {
  const params = useParams();
  const activityId = params?.id ? Number(params.id) : 1;
  const [activity, setActivity] = useState<ActivityDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)

  // Helper function to get full image URL
  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return "/placeholder.svg";
    if (imagePath.startsWith('http')) return imagePath;
    return `http://localhost:8080${imagePath}`;
  };

  // Fetch activity details from API
  useEffect(() => {
    const fetchActivityDetails = async () => {
      try {
        setLoading(true)
        console.log("Fetching activity details for ID:", activityId)
        
        const response = await fetch(`http://localhost:8080/activities/${activityId}`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const activityData = await response.json()
        console.log("Activity data received:", activityData)
        setActivity(activityData)
      } catch (error) {
        console.error('Error fetching activity details:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchActivityDetails()
  }, [activityId])

  // Function to make reservation API request
  const makeReservation = async () => {
    try {
      const userId = encodeURIComponent(data.account.id);
      
      // Format date properly
      const activityDate = data.date
        ? encodeURIComponent(
            typeof data.date === "string"
              ? data.date
              : data.date.toISOString().split("T")[0]
          )
        : "";

      const nbPersonnes = data.persons;
      const paymentPercent = 100;
      const timeSlot = data.timeSlot || "08:00";

      const url = `http://localhost:8080/bookings/book?userId=${userId}&activityId=${activityId}&activityDate=${activityDate}&nbPersonnes=${nbPersonnes}&paymentPercent=${paymentPercent}&timeSlot=${encodeURIComponent(timeSlot)}`;

      console.log("Making reservation with URL:", url);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Reservation API response:", result);
      
      alert("Réservation confirmée avec succès!");
      
    } catch (error) {
      console.error("Error making reservation:", error);
      alert("Erreur lors de la réservation. Veuillez réessayer.");
    }
  };

  const [promoCode, setPromoCode] = useState(data.promoCode || "")
  const [isApplyingPromo, setIsApplyingPromo] = useState(false)
  const [promoError, setPromoError] = useState("")

  // Use dynamic price from activity or fallback
  const basePrice = activity?.prix || 50
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

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0 && mins > 0) {
      return `${hours}h${mins.toString().padStart(2, '0')}`
    } else if (hours > 0) {
      return `${hours} heure${hours > 1 ? 's' : ''}`
    } else {
      return `${mins} minute${mins > 1 ? 's' : ''}`
    }
  }

  // Default included items since your API returns empty array
  const defaultIncludedItems = [
    "Quad professionnel et équipement de sécurité",
    "Guide expérimenté parlant français",
    "Casque et lunettes de protection",
    "Briefing sécurité complet",
    "Assurance activité"
  ]

  if (loading) {
    return (
      <div className="space-y-4 sm:space-y-6 md:space-y-8">
        <div className="flex justify-center">
          <div className="animate-pulse bg-gray-200 h-10 w-48 rounded"></div>
        </div>
        <Card className="backdrop-blur-sm bg-white/95 border-amber-200 shadow-xl">
          <CardContent className="p-6">
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">Chargement des détails de l'activité...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8">
      <div className="flex justify-end mt-4">
        <Button onClick={makeReservation} className="bg-amber-600 hover:bg-amber-700 text-white font-semibold">
          Confirmer la réservation (API)
        </Button>
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="backdrop-blur-sm bg-white/95 border-amber-200 shadow-xl">
          <CardHeader className="pb-3 sm:pb-4 md:pb-6">
            <CardTitle className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 flex items-center">
              <Tag className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2 sm:mr-3 text-amber-600" />
              Résumé de la Réservation
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
            {/* Adventure Details */}
            <div className="space-y-3 sm:space-y-4">
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
                      src={getImageUrl(activity?.images?.[selectedImage])}
                      alt={activity?.nom || "Activité"}
                      className="w-full h-96 object-cover rounded-xl shadow-lg"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-4 right-4 bg-white/90 hover:bg-white shadow-md"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </motion.div>

                  {/* Thumbnail Gallery */}
                  {activity?.images && activity.images.length > 0 && (
                    <div className="grid grid-cols-4 gap-2">
                      {activity.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`relative h-20 rounded-lg overflow-hidden transition-all ${
                            selectedImage === index ? "ring-2 ring-amber-500" : "hover:opacity-80"
                          }`}
                        >
                          <img
                            src={getImageUrl(image)}
                            alt={`${activity.nom} ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Adventure Info */}
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    {/* Adventure Title and Location */}
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-amber-600 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-lg text-gray-900">{activity?.nom || "Activité non trouvée"}</p>
                          <p className="text-sm text-gray-600">{activity?.type || "Localisation non spécifiée"}</p>
                        </div>
                      </div>
                    </div>

                    {/* Reservation Details Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-amber-600 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-gray-600">Date</p>
                          <p className="font-medium text-base text-gray-900">{formatDate(data.date)}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Clock className="w-5 h-5 text-amber-600 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-gray-600">Horaire</p>
                          <p className="font-medium text-base text-gray-900">{data.timeSlot || "Non sélectionné"}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Users className="w-5 h-5 text-amber-600 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-gray-600">Participants</p>
                          <p className="font-medium text-base text-gray-900">
                            {data.persons} personne{data.persons > 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Clock className="w-5 h-5 text-amber-600 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-gray-600">Durée</p>
                          <p className="font-medium text-base text-gray-900">
                            {activity?.duree ? formatDuration(activity.duree) : "Non spécifiée"}
                          </p>
                        </div>
                      </div>

                      {activity?.trancheAge && (
                        <div className="flex items-center space-x-3">
                          <Award className="w-5 h-5 text-amber-600 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-gray-600">Tranche d'âge</p>
                            <p className="font-medium text-base text-gray-900">{activity.trancheAge} ans</p>
                          </div>
                        </div>
                      )}

                      {activity?.nbMinPersonne && activity?.nbMaxPersonne && (
                        <div className="flex items-center space-x-3">
                          <Users className="w-5 h-5 text-amber-600 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-gray-600">Taille du groupe</p>
                            <p className="font-medium text-base text-gray-900">
                              {activity.nbMinPersonne}-{activity.nbMaxPersonne} personnes
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center space-x-3">
                        <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                          {data.paymentOption === "now" ? "Paiement immédiat" : "Paiement sur place"}
                        </Badge>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              <Separator className="my-8" />

              {/* Activity Description */}
              {activity?.description && (
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg text-gray-900">Description</h4>
                  <p className="text-gray-700 leading-relaxed">{activity.description}</p>
                </div>
              )}

              {/* Adventure Features Section */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg text-gray-900 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-green-600" />
                  Inclus dans votre aventure
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {activity?.included && activity.included.length > 0 ? (
                    activity.included.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </div>
                    ))
                  ) : (
                    defaultIncludedItems.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </div>
                    ))
                  )}
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