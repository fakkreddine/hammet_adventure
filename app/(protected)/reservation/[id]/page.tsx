"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { AccountSelectionStep } from "@/components/reservation/account-selection-step"
import { ReservationDetailsStep } from "@/components/reservation/reservation-details-step"
import { ReservationSummaryStep } from "@/components/reservation/reservation-summary-step"
import { PaymentStep } from "@/components/reservation/payment-step"
import { SuccessStep } from "@/components/reservation/success-step"
import { AuthWrapper } from "@/components/auth/auth-wrapper"
 import { useAuth } from "@/contexts/auth-context"
import { se } from "date-fns/locale"
import { redirect } from "next/navigation"
export interface ReservationData {
  account: {
    id: string
    name: string
    email: string
    avatar: string
  }
  persons: number
  date: Date | null
  paymentOption: "now" | "spot" | ""
  paymentMethod: string
  promoCode?: string
  discount?: number
}

const steps = [
  { id: 1, title: "Compte", description: "Sélection du compte" },
  { id: 2, title: "Détails", description: "Informations de réservation" },
  { id: 3, title: "Résumé", description: "Résumé de la réservation" },
]

export default function ReservationPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const { user, loading } = useAuth()
  const [reservationData, setReservationData] = useState<ReservationData>({
    account: {
      id: "",
      name: "",
      email: "",
      avatar: "",
    },
    persons: 0,
    date: null,
    paymentOption: "",
    paymentMethod: "",
  })

  const updateReservationData = (data: Partial<ReservationData>) => {
    setReservationData((prev) => ({ ...prev, ...data }))
  }


  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return !!reservationData.account
      case 2:
        return reservationData.persons > 0 && reservationData.date
      case 3:
        return true
      default:
        return false
    }
  }

  const progressPercentage = currentStep === 4 ? 100 : (currentStep / steps.length) * 100


  // No payment step, so no handlePaymentConfirm needed
  useEffect(() => {
    if (!loading && user) { 
      updateReservationData({
        account: {
          id: user?.id,
          name: user?.user_metadata?.last_name + " " + user?.user_metadata?.first_name || "Utilisateur",
          email: user?.user_metadata?.email || "Email Inconnu",
          avatar: user?.avatar || "Avatar Inconnu",
        }
      })
    }
  }, [loading, user]);
  

  return (
    <AuthWrapper requireAuth >
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-2 sm:py-4 md:py-6 lg:py-8 px-2 sm:px-4 lg:px-6">
      <div className="max-w-sm sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto">
        {/* Header - Enhanced responsiveness */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4 sm:mb-6 md:mb-8 px-2"
        >
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-1 sm:mb-2 leading-tight">
            {currentStep === 5 ? "Réservation Confirmée" : "Processus de Réservation"}
          </h1>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
            {currentStep === 5
              ? "Votre réservation a été confirmée avec succès"
              : "Complétez votre réservation en quelques étapes simples"}
          </p>
        </motion.div>

        {/* Progress Indicator - Hide on success page */}
        {currentStep !== 5 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-4 sm:mb-6 md:mb-8"
          >
            <Card className="backdrop-blur-sm bg-white/90 border-amber-200 shadow-lg">
              <CardContent className="p-2 sm:p-4 md:p-6">
                <div className="flex items-center justify-between mb-2 sm:mb-3 md:mb-4">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center flex-1">
                      <div className="flex flex-col items-center sm:flex-row sm:items-center">
                        <div
                          className={`
                          flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full border-2 transition-all duration-300
                          ${
                            currentStep >= step.id
                              ? "bg-amber-500 border-amber-500 text-white shadow-lg"
                              : "border-gray-300 text-gray-400 bg-white"
                          }
                        `}
                        >
                          {currentStep > step.id ? (
                            <Check className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
                          ) : (
                            <span className="font-semibold text-xs sm:text-sm md:text-base">{step.id}</span>
                          )}
                        </div>
                        <div className="mt-1 sm:mt-0 sm:ml-2 md:ml-3 text-center sm:text-left">
                          <p
                            className={`font-medium text-xs sm:text-sm md:text-base ${
                              currentStep >= step.id ? "text-amber-600" : "text-gray-400"
                            }`}
                          >
                            {step.title}
                          </p>
                          <p className="text-xs md:text-sm text-gray-500 hidden md:block leading-tight">
                            {step.description}
                          </p>
                        </div>
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className={`
                          flex-1 h-0.5 mx-1 sm:mx-2 md:mx-4 transition-all duration-300 rounded-full
                          ${currentStep > step.id ? "bg-amber-500" : "bg-gray-300"}
                        `}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <Progress value={progressPercentage} className="h-1 sm:h-1.5 md:h-2" />
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-4 sm:mb-6 md:mb-8"
          >
            {currentStep === 1 && <AccountSelectionStep data={reservationData} onUpdate={updateReservationData}  forward={nextStep}/>} 
            {currentStep === 2 && <ReservationDetailsStep data={reservationData} onUpdate={updateReservationData} />} 
            {currentStep === 3 && <ReservationSummaryStep data={reservationData} onUpdate={updateReservationData} />} 
            {currentStep === 4 && <SuccessStep data={reservationData} />}
          </motion.div>
        </AnimatePresence>

        {/* Navigation - Hide on success page */}
  {currentStep !== 4 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between space-y-2 sm:space-y-0 sm:space-x-4 px-2 sm:px-0"
          >
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="bg-transparent order-2 sm:order-1 w-full sm:w-auto h-10 sm:h-11 md:h-12 text-sm sm:text-base"
            >
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Précédent
            </Button>

            {currentStep < 4 ? (
              <Button
                onClick={nextStep}
                disabled={!canProceed()}
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 order-1 sm:order-2 w-full sm:w-auto h-10 sm:h-11 md:h-12 text-sm sm:text-base font-semibold shadow-lg"
              >
                Suivant
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
              </Button>
            ) : (
              <div className="order-1 sm:order-2 w-full sm:w-auto">
                {/* Payment step handles its own confirmation button */}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
    </AuthWrapper>
  )
}
