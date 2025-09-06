"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  CheckCircle,
  Calendar,
  Users,
  MapPin,
  Clock,
  CreditCard,
  Mail,
  Download,
  Share2,
  Phone,
  Star,
} from "lucide-react"
import type { ReservationData } from "@/app/reservation/page"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

interface SuccessStepProps {
  data: ReservationData
}

export function SuccessStep({ data }: SuccessStepProps) {
  const basePrice = 120
  const totalPrice = basePrice * data.persons
  const discount = data.discount || 0
  const paymentDiscount = data.paymentOption === "now" ? 0.1 : 0
  const totalDiscount = discount + paymentDiscount
  const discountAmount = totalPrice * totalDiscount
  const finalPrice = totalPrice - discountAmount
  const amountPaid = data.paymentOption === "now" ? finalPrice * 0.5 : 0
  const remainingAmount = finalPrice - amountPaid

  const reservationNumber = `ADV-${Date.now().toString().slice(-6)}`

  const formatDate = (date: Date | null) => {
    if (!date) return "Non sélectionnée"
    return format(date, "EEEE d MMMM yyyy", { locale: fr })
  }

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 max-w-4xl mx-auto">
      {/* Success Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="text-center"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-green-100 rounded-full mb-4 sm:mb-6">
          <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-green-600" />
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-4">
          Réservation Confirmée !
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
          Félicitations ! Votre aventure quad est réservée avec succès.
        </p>
      </motion.div>

      {/* Reservation Details Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="backdrop-blur-sm bg-white/95 border-green-200 shadow-xl">
          <CardHeader className="bg-gradient-to-r  ">
            <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 flex items-center">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-green-600" />
              Détails de votre réservation
            </CardTitle>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <Badge className="bg-green-500 text-white text-sm sm:text-base px-3 py-1 self-start">
                Numéro: {reservationNumber}
              </Badge>
              <p className="text-sm sm:text-base text-gray-600">Confirmation envoyée à {data.account.email}</p>
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
            {/* Adventure Info */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-base sm:text-lg md:text-xl text-gray-900">Aventure Quad en Tunisie</h3>
                  <p className="text-sm sm:text-base text-gray-600">Désert de Douz, Tunisie</p>
                  <div className="flex items-center space-x-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-xs sm:text-sm text-gray-500 ml-2">(4.9/5 - 127 avis)</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                <div className="flex items-center space-x-2 sm:space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">Date</p>
                    <p className="font-medium text-sm sm:text-base text-gray-900">{formatDate(data.date)}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 sm:space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">Participants</p>
                    <p className="font-medium text-sm sm:text-base text-gray-900">
                      {data.persons} personne{data.persons > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 sm:space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">Durée</p>
                    <p className="font-medium text-sm sm:text-base text-gray-900">4 heures</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Payment Summary */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="font-semibold text-base sm:text-lg md:text-xl text-gray-900 flex items-center">
                <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-600" />
                Résumé du paiement
              </h3>

              <div className="bg-green-50 border border-green-200 p-3 sm:p-4 rounded-lg space-y-2 sm:space-y-3">
                <div className="flex justify-between items-center text-sm sm:text-base">
                  <span className="text-gray-600">Prix total</span>
                  <span className="font-medium">{totalPrice}€</span>
                </div>

                {totalDiscount > 0 && (
                  <div className="flex justify-between items-center text-sm sm:text-base text-green-600">
                    <span>Réductions appliquées</span>
                    <span className="font-medium">-{discountAmount.toFixed(2)}€</span>
                  </div>
                )}

                <Separator />

                <div className="flex justify-between items-center text-base sm:text-lg font-bold">
                  <span>Prix final</span>
                  <span className="text-green-600">{finalPrice.toFixed(2)}€</span>
                </div>

                {data.paymentOption === "now" && (
                  <>
                    <Separator />
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm sm:text-base">
                        <span className="text-gray-600">Acompte payé</span>
                        <span className="font-medium text-green-600">{amountPaid.toFixed(2)}€</span>
                      </div>
                      <div className="flex justify-between items-center text-sm sm:text-base">
                        <span className="text-gray-600">Reste à payer sur place</span>
                        <span className="font-medium text-amber-600">{remainingAmount.toFixed(2)}€</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <Separator />

            {/* Important Information */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="font-semibold text-base sm:text-lg md:text-xl text-gray-900">Informations importantes</h3>
              <div className="bg-amber-50 border border-amber-200 p-3 sm:p-4 rounded-lg space-y-2">
                <ul className="text-sm sm:text-base text-gray-700 space-y-1 sm:space-y-2">
                  <li>• Arrivée recommandée 30 minutes avant le départ</li>
                  <li>• Équipement de sécurité fourni (casque, lunettes)</li>
                  <li>• Permis de conduire requis</li>
                  <li>• Annulation gratuite jusqu'à 24h avant</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
      >
        <Button className="bg-green-500 hover:bg-green-600 text-white h-12 sm:h-14 text-sm sm:text-base">
          <Download className="w-4 h-4 mr-2" />
          Télécharger PDF
        </Button>

        <Button variant="outline" className="h-12 sm:h-14 text-sm sm:text-base bg-transparent">
          <Mail className="w-4 h-4 mr-2" />
          Envoyer par email
        </Button>

        <Button variant="outline" className="h-12 sm:h-14 text-sm sm:text-base bg-transparent">
          <Share2 className="w-4 h-4 mr-2" />
          Partager
        </Button>

        <Button variant="outline" className="h-12 sm:h-14 text-sm sm:text-base bg-transparent">
          <Phone className="w-4 h-4 mr-2" />
          Nous contacter
        </Button>
      </motion.div>

      {/* Next Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card className="backdrop-blur-sm bg-white/95 border-blue-200">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg md:text-xl text-gray-900">Prochaines étapes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm sm:text-base font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-medium text-sm sm:text-base text-gray-900">Confirmation par email</h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Vous recevrez un email de confirmation avec tous les détails
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm sm:text-base font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-medium text-sm sm:text-base text-gray-900">Rappel 24h avant</h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    SMS et email de rappel avec les informations pratiques
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
