"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Check, RefreshCw, User } from "lucide-react"
import type { ReservationData } from "@/app/reservation/page"

interface AccountSelectionStepProps {
  data: ReservationData
  onUpdate: (data: Partial<ReservationData>) => void
}

export function AccountSelectionStep({ data, onUpdate }: AccountSelectionStepProps) {
  const handleAccountSelect = (account: ReservationData["account"]) => {
    onUpdate({ account })
  }

  const handleChooseAnother = () => {
    // In a real app, this would redirect to login/signup
    console.log("Redirect to login/signup")
  }

  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="backdrop-blur-sm bg-white/90 border-amber-200 shadow-lg">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="flex items-center text-lg sm:text-2xl">
              <User className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-amber-600" />
              Sélection du Compte
            </CardTitle>
            <CardDescription className="text-sm sm:text-lg">
              Choisissez le compte à utiliser pour cette réservation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0">
            {/* Current Account */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card
                className={`
                  cursor-pointer transition-all duration-300 border-2
                  ${data.account ? "border-amber-500 bg-amber-50" : "border-gray-200 hover:border-amber-300"}
                `}
                onClick={() => handleAccountSelect(data.account)}
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                      <Avatar className="w-12 h-12 sm:w-16 sm:h-16 border-2 border-amber-200 flex-shrink-0">
                        <AvatarImage src={data.account.avatar || "/placeholder.svg"} alt={data.account.name} />
                        <AvatarFallback className="bg-gradient-to-br from-amber-500 to-orange-600 text-white text-sm sm:text-lg font-semibold">
                          {data.account.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base sm:text-xl font-semibold text-gray-900 truncate">
                          {data.account.name}
                        </h3>
                        <p className="text-gray-600 text-sm sm:text-base truncate">{data.account.email}</p>
                        <div className="flex items-center mt-1 sm:mt-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 flex-shrink-0"></div>
                          <span className="text-xs sm:text-sm text-green-600 font-medium">Compte actif</span>
                        </div>
                      </div>
                    </div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: data.account ? 1 : 0 }}
                      transition={{ type: "spring", stiffness: 500 }}
                      className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-amber-500 rounded-full flex-shrink-0 ml-2"
                    >
                      <Check className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Continue with this account button */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold h-12 sm:h-14 text-base sm:text-lg"
                onClick={() => handleAccountSelect(data.account)}
              >
                <Check className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                Continuer avec ce compte
              </Button>
            </motion.div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 sm:px-4 bg-white text-gray-500">ou</span>
              </div>
            </div>

            {/* Choose another account */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Button
                variant="outline"
                size="lg"
                className="w-full border-amber-300 text-amber-700 hover:bg-amber-50 h-12 sm:h-14 text-base sm:text-lg bg-transparent"
                onClick={handleChooseAnother}
              >
                <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                Choisir un autre compte
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
