"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Check, Shield, Lock, Zap, Percent } from "lucide-react"
import type { ReservationData } from "@/app/reservation/page"

interface PaymentStepProps {
  data: ReservationData
  onUpdate: (data: Partial<ReservationData>) => void
  onConfirm: () => void
}

const paymentOptions = [
  {
    id: "online",
    title: "💳 Payer en ligne maintenant",
    subtitle: "Recommandé - Économisez 50%",
    discount: 50,
    description: "Paiement sécurisé avec réduction immédiate",
    benefits: ["✅ 50% de réduction", "✅ Réservation garantie", "✅ Paiement sécurisé", "✅ Confirmation instantanée"],
    badge: "MEILLEURE OFFRE",
    badgeColor: "bg-green-500",
    color: "border-green-500 bg-green-50",
  },
  {
    id: "onspot",
    title: "📍 Payer sur place",
    subtitle: "Prix standard",
    discount: 0,
    description: "Paiement intégral lors de votre arrivée",
    benefits: ["💰 Paiement différé", "🏪 Espèces ou carte acceptées", "📋 Réservation confirmée"],
    badge: "STANDARD",
    badgeColor: "bg-amber-500",
    color: "border-gray-300 bg-gray-50",
  },
]

const paymentMethods = [
  {
    id: "visa",
    name: "Visa",
    icon: "💳",
    color: "bg-blue-500",
    description: "Paiement sécurisé par Visa",
    processingTime: "Instantané",
  },
  {
    id: "mastercard",
    name: "MasterCard",
    icon: "💳",
    color: "bg-red-500",
    description: "Paiement sécurisé par MasterCard",
    processingTime: "Instantané",
  },
  {
    id: "paypal",
    name: "PayPal",
    icon: "🅿️",
    color: "bg-blue-600",
    description: "Paiement via votre compte PayPal",
    processingTime: "Instantané",
  },
  {
    id: "stripe",
    name: "Stripe",
    icon: "💜",
    color: "bg-purple-500",
    description: "Paiement sécurisé par Stripe",
    processingTime: "Instantané",
  },
  {
    id: "apple-pay",
    name: "Apple Pay",
    icon: "🍎",
    color: "bg-gray-800",
    description: "Paiement rapide avec Touch ID",
    processingTime: "Instantané",
  },
  {
    id: "google-pay",
    name: "Google Pay",
    icon: "🔵",
    color: "bg-green-500",
    description: "Paiement rapide avec Google",
    processingTime: "Instantané",
  },
]

export function PaymentStep({ data, onUpdate, onConfirm }: PaymentStepProps) {
  const basePrice = 120
  const totalPrice = basePrice * data.persons
  const promoDiscount = data.discount || 0

  const selectedPaymentOption =
    paymentOptions.find(
      (opt) =>
        (opt.id === "online" && data.paymentOption === "now") ||
        (opt.id === "onspot" && data.paymentOption === "later"),
    ) || paymentOptions[1]

  const paymentDiscount = selectedPaymentOption.discount / 100
  const totalDiscount = promoDiscount + paymentDiscount
  const discountAmount = totalPrice * totalDiscount
  const finalPrice = totalPrice - discountAmount
  const amountToPay = selectedPaymentOption.id === "online" ? finalPrice : 0

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8">
      {/* Payment Options Selection */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="backdrop-blur-sm bg-white/95 border-amber-200 shadow-xl">
          <CardHeader className="pb-4 sm:pb-6">
            <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 flex items-center">
              <Percent className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 mr-2 sm:mr-3 text-amber-600" />
              Choisissez votre option de paiement
            </CardTitle>
            <CardDescription className="text-sm sm:text-base md:text-lg text-gray-600">
              Économisez jusqu'à 50% en payant en ligne maintenant
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            <RadioGroup
              value={selectedPaymentOption.id}
              onValueChange={(value) => onUpdate({ paymentOption: value === "online" ? "now" : "later" })}
              className="space-y-3 sm:space-y-4"
            >
              {paymentOptions.map((option) => (
                <motion.div
                  key={option.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    border-2 rounded-xl p-4 sm:p-6 cursor-pointer transition-all duration-300 relative overflow-hidden
                    ${selectedPaymentOption.id === option.id ? option.color + " shadow-lg ring-2 ring-offset-2" : "border-gray-200 hover:border-amber-300 bg-white hover:shadow-md"}
                  `}
                >
                  {option.badge && (
                    <div
                      className={`absolute top-0 right-0 ${option.badgeColor} text-white px-3 py-1 text-xs font-bold rounded-bl-lg`}
                    >
                      {option.badge}
                    </div>
                  )}

                  <div className="flex items-start space-x-4">
                    <RadioGroupItem value={option.id} id={option.id} className="mt-2 flex-shrink-0" />
                    <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                      <div className="space-y-3">
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">{option.title}</h3>
                          <p className="text-sm sm:text-base text-gray-600 mb-2">{option.description}</p>
                          {option.discount > 0 && (
                            <div className="flex items-center space-x-2">
                              <Badge className="bg-green-100 text-green-700 text-sm font-semibold">
                                🎯 -{option.discount}% de réduction
                              </Badge>
                              <span className="text-lg font-bold text-green-600">
                                Économisez {((totalPrice * option.discount) / 100).toFixed(0)}€
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {option.benefits.map((benefit, index) => (
                            <div key={index} className="text-sm text-gray-700">
                              {benefit}
                            </div>
                          ))}
                        </div>

                        <div className="bg-white/50 backdrop-blur-sm p-3 rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">
                              Prix à payer {option.id === "online" ? "maintenant" : "sur place"}:
                            </span>
                            <div className="text-right">
                              {option.discount > 0 && (
                                <div className="text-sm text-gray-400 line-through">{totalPrice}€</div>
                              )}
                              <div className="text-xl font-bold text-gray-900">
                                {option.id === "online"
                                  ? (totalPrice - (totalPrice * option.discount) / 100).toFixed(0)
                                  : totalPrice}
                                €
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Label>
                  </div>
                </motion.div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      </motion.div>

      {/* Payment Methods - Only show if online payment is selected */}
      {selectedPaymentOption.id === "online" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="backdrop-blur-sm bg-white/95 border-green-200 shadow-xl">
            <CardHeader className="pb-4 sm:pb-6">
              <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 flex items-center">
                <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-green-600" />
                Méthode de Paiement
              </CardTitle>
              <CardDescription className="text-sm sm:text-base text-gray-600">
                Choisissez votre méthode de paiement sécurisée
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              {/* Payment Summary */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 sm:p-6 rounded-xl border-2 border-green-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
                  <div>
                    <h3 className="font-bold text-lg sm:text-xl text-gray-900">💳 Montant à payer maintenant</h3>
                    <p className="text-sm sm:text-base text-gray-600">Avec réduction de 50% appliquée</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl sm:text-3xl font-bold text-green-600">{amountToPay.toFixed(0)}€</div>
                    <div className="text-sm text-gray-400 line-through">{totalPrice}€</div>
                    <div className="text-sm text-green-600 font-medium">Économie: {discountAmount.toFixed(0)}€</div>
                  </div>
                </div>
              </div>

              {/* Payment Methods Grid */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-600" />
                  Sélectionnez votre méthode
                </h3>

                <RadioGroup
                  value={data.paymentMethod}
                  onValueChange={(value) => onUpdate({ paymentMethod: value })}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
                >
                  {paymentMethods.map((method) => (
                    <motion.div
                      key={method.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`
                        border-2 rounded-lg p-3 sm:p-4 cursor-pointer transition-all duration-300 relative
                        ${
                          data.paymentMethod === method.id
                            ? "border-green-500 bg-green-50 shadow-lg ring-2 ring-green-200"
                            : "border-gray-200 hover:border-green-300 bg-white hover:shadow-md"
                        }
                      `}
                    >
                      <div className="flex items-start space-x-3">
                        <RadioGroupItem value={method.id} id={method.id} className="mt-1 flex-shrink-0" />
                        <Label htmlFor={method.id} className="flex-1 cursor-pointer">
                          <div className="flex items-start space-x-3">
                            <div className="text-xl sm:text-2xl flex-shrink-0">{method.icon}</div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className="font-semibold text-sm sm:text-base text-gray-900">{method.name}</h4>
                                {data.paymentMethod === method.id && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center"
                                  >
                                    <Check className="w-2 h-2 text-white" />
                                  </motion.div>
                                )}
                              </div>
                              <p className="text-xs sm:text-sm text-gray-600 mb-1">{method.description}</p>
                              <div className="flex items-center space-x-1 text-xs text-green-600">
                                <Zap className="w-3 h-3" />
                                <span>{method.processingTime}</span>
                              </div>
                            </div>
                          </div>
                        </Label>
                      </div>
                    </motion.div>
                  ))}
                </RadioGroup>
              </div>

              {/* Security Notice */}
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Lock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm sm:text-base text-blue-900 mb-1">🔒 Paiement 100% sécurisé</h4>
                    <p className="text-xs sm:text-sm text-blue-700 leading-relaxed">
                      Vos informations de paiement sont protégées par un cryptage SSL 256 bits. Nous ne stockons aucune
                      donnée bancaire sur nos serveurs.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Confirm Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="pt-2 sm:pt-4"
      >
        <Button
          onClick={onConfirm}
          disabled={selectedPaymentOption.id === "online" && !data.paymentMethod}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold h-14 sm:h-16 md:h-18 text-base sm:text-lg md:text-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
        >
          <Lock className="w-5 h-5 sm:w-6 sm:h-6 mr-3" />
          {selectedPaymentOption.id === "online"
            ? `💳 Payer ${amountToPay.toFixed(0)}€ maintenant`
            : "📋 Confirmer la réservation (paiement sur place)"}
        </Button>
      </motion.div>
    </div>
  )
}
