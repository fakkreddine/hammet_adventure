"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, ArrowLeft, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { useState } from "react"

export default function SessionExpiredPage() {
  const { refreshSession } = useAuth()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefreshSession = async () => {
    setIsRefreshing(true)
    try {
      await refreshSession()
      // If successful, redirect to protected area
      window.location.href = "/protected"
    } catch (error) {
      console.error("[v0] Session refresh failed:", error)
      // If refresh fails, redirect to login
      window.location.href = "/auth/login"
    } finally {
      setIsRefreshing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Link href="/" className="inline-flex items-center text-amber-600 hover:text-amber-700 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour à l'accueil
        </Link>

        <Card className="backdrop-blur-sm bg-white/90 border-orange-200 shadow-2xl">
          <CardHeader className="text-center space-y-2">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center mb-4"
            >
              <Clock className="w-8 h-8 text-white" />
            </motion.div>
            <CardTitle className="text-2xl font-bold text-gray-900">Session expirée</CardTitle>
            <CardDescription className="text-gray-600">
              Votre session a expiré pour des raisons de sécurité
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h4 className="font-semibold text-orange-800 mb-2">Pourquoi ma session a-t-elle expiré?</h4>
              <ul className="text-sm text-orange-700 space-y-1 list-disc list-inside">
                <li>Inactivité prolongée</li>
                <li>Mesure de sécurité automatique</li>
                <li>Changement d'appareil ou de navigateur</li>
              </ul>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleRefreshSession}
                disabled={isRefreshing}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
              >
                {isRefreshing ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="w-4 h-4 mr-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </motion.div>
                    Renouvellement...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Renouveler la session
                  </>
                )}
              </Button>

              <Button asChild variant="outline" className="w-full border-amber-200 hover:bg-amber-50 bg-transparent">
                <Link href="/auth/login">Se reconnecter</Link>
              </Button>
            </div>

            <div className="text-center text-sm text-gray-600">
              Besoin d'aide?{" "}
              <Link href="/contact" className="text-amber-600 hover:text-amber-700 font-semibold">
                Contactez le support
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
