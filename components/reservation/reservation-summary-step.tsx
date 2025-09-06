"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, Users, MapPin, Clock, Tag, Percent } from "lucide-react"
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
          <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
            {/* Adventure Details */}
            <div className="space-y-3 sm:space-y-4">
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
