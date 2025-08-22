"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, ArrowLeft, Mail, Phone } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function AccountLockedPage() {
  const searchParams = useSearchParams()
  const reason = searchParams.get("reason") || "security"

  const getLockReason = () => {
    switch (reason) {
      case "too_many_attempts":
        return {
          title: "Compte temporairement verrouillé",
          description: "Trop de tentatives de connexion incorrectes ont été détectées.",
          details: "Votre compte a été verrouillé pendant 15 minutes pour des raisons de sécurité.",
          action: "Attendez 15 minutes puis réessayez, ou réinitialisez votre mot de passe.",
        }
      case "suspicious_activity":
        return {
          title: "Activité suspecte détectée",
          description: "Nous avons détecté une activité inhabituelle sur votre compte.",
          details: "Par mesure de sécurité, votre compte a été temporairement suspendu.",
          action: "Contactez notre équipe de support pour débloquer votre compte.",
        }
      case "policy_violation":
        return {
          title: "Violation des conditions d'utilisation",
          description: "Votre compte a été suspendu pour non-respect de nos conditions.",
          details: "Cette suspension peut être temporaire ou permanente selon la gravité.",
          action: "Consultez nos conditions d'utilisation et contactez le support.",
        }
      default:
        return {
          title: "Compte verrouillé",
          description: "Votre compte a été verrouillé pour des raisons de sécurité.",
          details: "Cette mesure protège votre compte et nos services.",
          action: "Contactez notre équipe de support pour plus d'informations.",
        }
    }
  }

  const lockInfo = getLockReason()

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

        <Card className="backdrop-blur-sm bg-white/90 border-red-200 shadow-2xl">
          <CardHeader className="text-center space-y-2">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="mx-auto w-16 h-16 bg-gradient-to-br from-red-500 to-rose-600 rounded-full flex items-center justify-center mb-4"
            >
              <Shield className="w-8 h-8 text-white" />
            </motion.div>
            <CardTitle className="text-2xl font-bold text-gray-900">{lockInfo.title}</CardTitle>
            <CardDescription className="text-gray-600">{lockInfo.description}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 space-y-3">
              <p className="text-sm text-red-700 font-medium">{lockInfo.details}</p>
              <p className="text-sm text-red-600">{lockInfo.action}</p>
            </div>

            {reason === "too_many_attempts" ? (
              <div className="space-y-3">
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
                >
                  <Link href="/auth/forgot-password">Réinitialiser le mot de passe</Link>
                </Button>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/auth/login">Retour à la connexion</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
                >
                  <Link href="/contact">
                    <Mail className="w-4 h-4 mr-2" />
                    Contacter le support
                  </Link>
                </Button>
              </div>
            )}

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">Besoin d'aide immédiate?</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-gray-400" />
                  <span>support@carthagequad.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-gray-400" />
                  <span>+216 XX XXX XXX</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
