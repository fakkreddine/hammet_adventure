"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ArrowRight, Home, User } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const successMessages: Record<
  string,
  { title: string; description: string; action?: string; redirectTo?: string; redirectDelay?: number }
> = {
  login: {
    title: "Connexion réussie!",
    description: "Vous êtes maintenant connecté à votre compte.",
    action: "Vous allez être redirigé vers votre tableau de bord...",
    redirectTo: "/protected",
    redirectDelay: 3000,
  },
  signup: {
    title: "Compte créé avec succès!",
    description: "Votre compte a été créé. Vérifiez votre email pour l'activer.",
    action: "Un email de confirmation vous a été envoyé.",
  },
  email_verified: {
    title: "Email vérifié!",
    description: "Votre adresse email a été confirmée avec succès.",
    action: "Vous pouvez maintenant accéder à toutes les fonctionnalités.",
    redirectTo: "/protected",
    redirectDelay: 3000,
  },
  password_reset: {
    title: "Mot de passe mis à jour!",
    description: "Votre mot de passe a été modifié avec succès.",
    action: "Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.",
    redirectTo: "/auth/login",
    redirectDelay: 3000,
  },
  profile_updated: {
    title: "Profil mis à jour!",
    description: "Vos informations ont été sauvegardées avec succès.",
    redirectTo: "/protected",
    redirectDelay: 2000,
  },
  logout: {
    title: "Déconnexion réussie",
    description: "Vous avez été déconnecté de votre compte.",
    action: "Merci d'avoir utilisé nos services!",
  },
  default: {
    title: "Opération réussie!",
    description: "L'action a été effectuée avec succès.",
  },
}

export default function AuthSuccessPage() {
  const searchParams = useSearchParams()
  const successType = searchParams.get("type") || "default"
  const customMessage = searchParams.get("message")
  const [countdown, setCountdown] = useState<number | null>(null)

  const success = successMessages[successType] || successMessages.default

  useEffect(() => {
    if (success.redirectTo && success.redirectDelay) {
      setCountdown(Math.ceil(success.redirectDelay / 1000))

      const countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev && prev > 1) {
            return prev - 1
          }
          return null
        })
      }, 1000)

      const redirectTimeout = setTimeout(() => {
        window.location.href = success.redirectTo!
      }, success.redirectDelay)

      return () => {
        clearInterval(countdownInterval)
        clearTimeout(redirectTimeout)
      }
    }
  }, [success.redirectTo, success.redirectDelay])

  const getActionButtons = () => {
    switch (successType) {
      case "login":
      case "email_verified":
        return (
          <div className="space-y-3">
            <Button
              asChild
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
            >
              <Link href="/protected">
                <User className="w-4 h-4 mr-2" />
                Aller au tableau de bord
              </Link>
            </Button>
          </div>
        )
      case "signup":
        return (
          <div className="space-y-3">
            <Button
              asChild
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
            >
              <Link href="/auth/login">
                Se connecter
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        )
      case "password_reset":
        return (
          <div className="space-y-3">
            <Button
              asChild
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
            >
              <Link href="/auth/login">
                Se connecter
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        )
      case "profile_updated":
        return (
          <div className="space-y-3">
            <Button
              asChild
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
            >
              <Link href="/protected">
                <User className="w-4 h-4 mr-2" />
                Retour au tableau de bord
              </Link>
            </Button>
          </div>
        )
      default:
        return (
          <div className="space-y-3">
            <Button
              asChild
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
            >
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Retour à l'accueil
              </Link>
            </Button>
          </div>
        )
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
        <Card className="backdrop-blur-sm bg-white/90 border-green-200 shadow-2xl">
          <CardHeader className="text-center space-y-2">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4"
            >
              <CheckCircle className="w-8 h-8 text-white" />
            </motion.div>
            <CardTitle className="text-2xl font-bold text-gray-900">{success.title}</CardTitle>
            <CardDescription className="text-gray-600">{customMessage || success.description}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {success.action && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-700">{success.action}</p>
              </div>
            )}

            {countdown && (
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Redirection automatique dans <span className="font-semibold text-amber-600">{countdown}</span> seconde
                  {countdown > 1 ? "s" : ""}...
                </p>
              </div>
            )}

            {getActionButtons()}

            {successType !== "logout" && (
              <div className="text-center">
                <Button variant="ghost" className="text-gray-600 hover:text-gray-800" asChild>
                  <Link href="/">
                    <Home className="w-4 h-4 mr-2" />
                    Retour à l'accueil
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
