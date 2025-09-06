"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Users, Minus, Plus, Lock, User, CalendarDays } from "lucide-react"
import type { ReservationData } from "@/app/reservation/page"

interface ReservationDetailsStepProps {
  data: ReservationData
  onUpdate: (data: Partial<ReservationData>) => void
}

export function ReservationDetailsStep({ data, onUpdate }: ReservationDetailsStepProps) {
  const [dateInput, setDateInput] = useState(data.date ? data.date.toISOString().split("T")[0] : "")

  const updatePersons = (change: number) => {
    const newPersons = Math.max(1, data.persons + change)
    onUpdate({ persons: newPersons })
  }

  const handleDateChange = (dateString: string) => {
    setDateInput(dateString)
    if (dateString) {
      const date = new Date(dateString)
      onUpdate({ date })
    } else {
      onUpdate({ date: null })
    }
  }

  const renderPersonDisplay = () => {
    if (data.persons <= 8) {
      // Show individual person icons for 1-8 people
      return (
        <div className="flex flex-wrap justify-center gap-2 max-w-xs mx-auto">
          {Array.from({ length: data.persons }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 500 }}
              className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center"
            >
              <User className="w-4 h-4 text-amber-600" />
            </motion.div>
          ))}
        </div>
      )
    } else {
      // Show compact display for 9+ people
      return (
        <div className="flex items-center justify-center space-x-2 sm:space-x-4">
          <div className="flex -space-x-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="w-6 h-6 sm:w-8 sm:h-8 bg-amber-100 rounded-full flex items-center justify-center border-2 border-white"
              >
                <User className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600" />
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2 bg-amber-500 text-white px-2 sm:px-3 py-1 rounded-full">
            <User className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="font-bold text-sm sm:text-base">+{data.persons - 8}</span>
          </div>
        </div>
      )
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
      {/* Locked Account Info */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="backdrop-blur-sm bg-gray-50 border-gray-300">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
                  <AvatarImage src={data.account.avatar || "/placeholder.svg"} alt={data.account.name} />
                  <AvatarFallback className="bg-gradient-to-br from-amber-500 to-orange-600 text-white text-sm sm:text-base">
                    {data.account.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{data.account.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 truncate">{data.account.email}</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-gray-200 text-gray-600 text-xs sm:text-sm">
                <Lock className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                Verrouillé
              </Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Reservation Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="backdrop-blur-sm bg-white/90 border-amber-200 shadow-lg">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="flex items-center text-lg sm:text-2xl">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-amber-600" />
              Détails de la Réservation
            </CardTitle>
            <CardDescription className="text-sm sm:text-lg">
              Configurez les détails de votre réservation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 sm:space-y-8 p-4 sm:p-6 pt-0">
            {/* Number of Persons */}
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Nombre de personnes</h3>
              <div className="flex items-center justify-center space-x-4 sm:space-x-6">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => updatePersons(-1)}
                  disabled={data.persons <= 1}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-transparent hover:bg-amber-50 flex-shrink-0"
                >
                  <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>

                <motion.div
                  key={data.persons}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                  className="flex flex-col items-center space-y-3 sm:space-y-4 min-w-0 flex-1 max-w-xs"
                >
                  {renderPersonDisplay()}
                  <div className="text-lg sm:text-2xl font-bold text-amber-600 text-center">
                    {data.persons} {data.persons === 1 ? "personne" : "personnes"}
                  </div>
                </motion.div>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => updatePersons(1)}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-transparent hover:bg-amber-50 flex-shrink-0"
                >
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>
            </div>

            {/* Date of Reservation */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Date de réservation</h3>
              <div className="relative">
                <Label htmlFor="reservation-date" className="sr-only">
                  Date de réservation
                </Label>
                <div className="relative">
                  <CalendarDays className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-amber-600 z-10" />
                  <Input
                    id="reservation-date"
                    type="date"
                    value={dateInput}
                    onChange={(e) => handleDateChange(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="pl-10 sm:pl-12 h-12 sm:h-14 text-base sm:text-lg bg-transparent border-amber-200 focus:border-amber-500 focus:ring-amber-500 w-full"
                    placeholder="Sélectionner une date"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
