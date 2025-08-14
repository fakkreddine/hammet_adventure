"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar, Clock, CreditCard, Users, Check, ArrowLeft, ArrowRight } from "lucide-react"

const activities = [
  {
    id: "quad",
    title: "Aventure Quad",
    price: 120,
    duration: "2-3 heures",
    image: "/quad-adventure-hammamet.png",
  },
  {
    id: "catamaran",
    title: "Excursion Catamaran",
    price: 180,
    duration: "4-5 heures",
    image: "/catamaran-sunset-hammamet.png",
  },
  {
    id: "camel",
    title: "Balade Dromadaire",
    price: 80,
    duration: "1-2 heures",
    image: "/camel-ride-sunset-hammamet.png",
  },
]

const timeSlots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"]

export function BookingFlow() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedActivity, setSelectedActivity] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [participants, setParticipants] = useState(1)
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
  })

  const selectedActivityData = activities.find((a) => a.id === selectedActivity)
  const totalPrice = selectedActivityData ? selectedActivityData.price * participants : 0

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const canProceedStep1 = selectedActivity && participants > 0
  const canProceedStep2 = selectedDate && selectedTime
  const canProceedStep3 = customerInfo.name && customerInfo.email && customerInfo.phone

  return (
    <section id="booking" className="py-20 bg-gradient-to-b from-sand-beige/30 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-charcoal-gray mb-4">
            Réservez Votre <span className="text-coral-orange">Aventure</span>
          </h2>
          <p className="text-xl text-gray-600">Seulement 3 étapes pour vivre l'expérience de votre vie</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                    currentStep >= step ? "bg-coral-orange text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {currentStep > step ? <Check className="w-5 h-5" /> : step}
                </div>
                {step < 3 && (
                  <div
                    className={`h-1 w-24 sm:w-32 mx-2 transition-all duration-300 ${
                      currentStep > step ? "bg-coral-orange" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Choisir Activité</span>
            <span>Date & Heure</span>
            <span>Paiement</span>
          </div>
        </div>

        {/* Step Content */}
        <Card className="shadow-xl border-0">
          <CardContent className="p-8">
            {/* Step 1: Activity Selection */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-2xl font-serif text-charcoal-gray flex items-center">
                    <Calendar className="w-6 h-6 mr-3 text-coral-orange" />
                    Choisissez Votre Aventure
                  </CardTitle>
                </CardHeader>

                <RadioGroup value={selectedActivity} onValueChange={setSelectedActivity}>
                  <div className="grid gap-4">
                    {activities.map((activity) => (
                      <div key={activity.id} className="relative">
                        <RadioGroupItem value={activity.id} id={activity.id} className="peer sr-only" />
                        <Label
                          htmlFor={activity.id}
                          className="flex items-center space-x-4 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-coral-orange peer-checked:border-coral-orange peer-checked:bg-coral-orange/5 transition-all duration-300"
                        >
                          <img
                            src={activity.image || "/placeholder.svg"}
                            alt={activity.title}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-charcoal-gray">{activity.title}</h3>
                            <p className="text-sm text-gray-600">{activity.duration}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-coral-orange">{activity.price} DT</p>
                            <p className="text-sm text-gray-600">par personne</p>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>

                <div className="flex items-center space-x-4">
                  <Label htmlFor="participants" className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-coral-orange" />
                    <span>Nombre de participants:</span>
                  </Label>
                  <Input
                    id="participants"
                    type="number"
                    min="1"
                    max="8"
                    value={participants}
                    onChange={(e) => setParticipants(Number.parseInt(e.target.value) || 1)}
                    className="w-20"
                  />
                </div>

                {selectedActivityData && (
                  <div className="bg-sand-beige/50 p-4 rounded-lg">
                    <p className="text-lg font-semibold text-charcoal-gray">
                      Total: {totalPrice} DT ({participants} × {selectedActivityData.price} DT)
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Date & Time Selection */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-2xl font-serif text-charcoal-gray flex items-center">
                    <Clock className="w-6 h-6 mr-3 text-coral-orange" />
                    Choisissez Date & Heure
                  </CardTitle>
                </CardHeader>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Date Selection */}
                  <div>
                    <Label className="text-lg font-semibold mb-4 block">Sélectionnez une date</Label>
                    <div className="grid grid-cols-7 gap-2 text-center text-sm">
                      {/* Calendar header */}
                      {["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"].map((day) => (
                        <div key={day} className="p-2 font-semibold text-gray-600">
                          {day}
                        </div>
                      ))}
                      {/* Calendar days */}
                      {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                        <button
                          key={day}
                          onClick={() => setSelectedDate(`2024-01-${day.toString().padStart(2, "0")}`)}
                          className={`p-2 rounded-lg transition-all duration-200 ${
                            selectedDate === `2024-01-${day.toString().padStart(2, "0")}`
                              ? "bg-coral-orange text-white"
                              : "hover:bg-sky-blue/20 text-charcoal-gray"
                          }`}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Selection */}
                  <div>
                    <Label className="text-lg font-semibold mb-4 block">Choisissez l'heure</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                            selectedTime === time
                              ? "border-coral-orange bg-coral-orange text-white"
                              : "border-gray-200 hover:border-sky-blue text-charcoal-gray"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {selectedDate && selectedTime && (
                  <div className="bg-turquoise-green/10 p-4 rounded-lg">
                    <p className="text-lg font-semibold text-charcoal-gray">
                      Réservation confirmée pour le {selectedDate} à {selectedTime}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Payment */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-2xl font-serif text-charcoal-gray flex items-center">
                    <CreditCard className="w-6 h-6 mr-3 text-coral-orange" />
                    Informations & Paiement
                  </CardTitle>
                </CardHeader>

                {/* Customer Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Nom complet *</Label>
                    <Input
                      id="name"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                      placeholder="Votre nom complet"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                      placeholder="votre@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Téléphone *</Label>
                    <Input
                      id="phone"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      placeholder="+216 XX XXX XXX"
                    />
                  </div>
                </div>

                {/* Booking Summary */}
                <div className="bg-sand-beige/30 p-6 rounded-lg">
                  <h3 className="text-xl font-serif font-bold mb-4">Résumé de votre réservation</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Activité:</span>
                      <span className="font-semibold">{selectedActivityData?.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Date & Heure:</span>
                      <span className="font-semibold">
                        {selectedDate} à {selectedTime}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Participants:</span>
                      <span className="font-semibold">{participants} personne(s)</span>
                    </div>
                    <div className="border-t pt-2 mt-4">
                      <div className="flex justify-between text-xl font-bold text-coral-orange">
                        <span>Total:</span>
                        <span>{totalPrice} DT</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div>
                  <Label className="text-lg font-semibold mb-4 block">Méthode de paiement</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Button variant="outline" className="h-16 border-2 hover:border-coral-orange bg-transparent">
                      <CreditCard className="w-6 h-6 mr-2" />
                      Carte Bancaire
                    </Button>
                    <Button variant="outline" className="h-16 border-2 hover:border-coral-orange bg-transparent">
                      <div className="w-6 h-6 mr-2 bg-blue-600 rounded"></div>
                      PayPal
                    </Button>
                    <Button variant="outline" className="h-16 border-2 hover:border-coral-orange bg-transparent">
                      <div className="w-6 h-6 mr-2 bg-green-600 rounded"></div>
                      Paymee
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center space-x-2 bg-transparent"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Précédent</span>
              </Button>

              {currentStep < 3 ? (
                <Button
                  onClick={nextStep}
                  disabled={(currentStep === 1 && !canProceedStep1) || (currentStep === 2 && !canProceedStep2)}
                  className="bg-coral-orange hover:bg-coral-orange/90 flex items-center space-x-2"
                >
                  <span>Suivant</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  disabled={!canProceedStep3}
                  className="bg-turquoise-green hover:bg-turquoise-green/90 text-white font-semibold px-8"
                >
                  Confirmer & Payer
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
