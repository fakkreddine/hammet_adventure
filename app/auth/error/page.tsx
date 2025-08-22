"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, ArrowLeft, RefreshCw, Home } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useState } from "react"

const errorMessages: Record<string, { title: string; description: string; action?: string }> = {
  invalid_credentials: {
    title: "Identifiants incorrects",
    description: "L'email ou le mot de passe que vous avez saisi est incorrect.",
    action: "Veuillez vérifier vos informations et réessayer.",
  },
  email_not_confirmed: {
    title: "Email non vérifié",
    description: "Vous devez vérifier votre adresse email avant de pouvoir vous connecter.",
    action: "Vérifiez votre boîte de réception et cliquez sur le lien de confirmation.",
  },
  too_many_requests: {
    title: "Trop de tentatives",
    description: "Vous avez effectué trop de tentatives de connexion.",
    action: "Veuillez attendre quelques minutes avant de réessayer.",
  },
  signup_disabled: {
    title: "Inscription désactivée",
    description: "Les nouvelles inscriptions sont temporairement désactivées.",
    action: "Veuillez réessayer plus tard ou contactez le support.",
  },
  email_already_exists: {
    title: "Email déjà utilisé",
    description: "Un compte existe déjà avec cette adresse email.",
    action: "Essayez de vous connecter ou utilisez une autre adresse email.",
  },
  weak_password: {
    title: "Mot de passe trop faible",
    description: "Le mot de passe choisi ne respecte pas les critères de sécurité.",
    action: "Choisissez un mot de passe plus fort avec au moins 8 caractères.",
  },
  session_expired: {
    title: "Session expirée",
    description: "Votre session a expiré pour des raisons de sécurité.",
    action: "Veuillez vous reconnecter pour continuer.",
  },
  account_locked: {
    title: "Compte verrouillé",
    description: "Votre compte a été temporairement verrouillé.",
    action: "Contactez le support pour débloquer votre compte.",
  },
  network_error: {
    title: "Erreur de connexion",
    description: "Impossible de se connecter au serveur.",
    action: "Vérifiez votre connexion internet et réessayez.",
  },
  default: {
    title: "Erreur d'authentification",
    description: "Une erreur inattendue s'est produite lors de l'authentification.",
    action: "Veuillez réessayer ou contactez le support si le problème persiste.",
  },
}

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const errorType = searchParams.get("type") || "default"
  const customMessage = searchParams.get("message")
  const [isRetrying, setIsRetrying] = useState(false)

  const error = errorMessages[errorType] || errorMessages.default

  const handleRetry = () => {
    setIsRetrying(true)
    // Simulate retry delay
    setTimeout(() => {
      setIsRetrying(false)
      window.location.reload()
    }, 1000)
  }

  const getActionButtons = () => {
    switch (errorType) {
      case "invalid_credentials":
        return (
          <div className="space-y-3">
            <Button
              asChild
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
            >
              <Link href="/auth/login">Réessayer la connexion</Link>
            </Button>
            <Button variant="outline" className="w-full bg-transparent" asChild>
              <Link href="/auth/forgot-password">Mot de passe oublié?</Link>
            </Button>
          </div>
        )
      case "email_not_confirmed":
        return (
          <div className="space-y-3">
            <Button
              asChild
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
            >
              <Link href="/auth/verify-email">Vérifier l'email</Link>
            </Button>
            <Button variant="outline" className="w-full bg-transparent" asChild>
              <Link href="/auth/login">Retour à la connexion</Link>
            </Button>
          </div>
        )
      case "email_already_exists":
        return (
          <div className="space-y-3">
            <Button
              asChild
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
            >
              <Link href="/auth/login">Se connecter</Link>
            </Button>
            <Button variant="outline" className="w-full bg-transparent" asChild>
              <Link href="/auth/forgot-password">Mot de passe oublié?</Link>
            </Button>
          </div>
        )
      case "session_expired":
        return (
          <div className="space-y-3">
            <Button
              asChild
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
            >
              <Link href="/auth/login">Se reconnecter</Link>
            </Button>
          </div>
        )
      default:
        return (
          <div className="space-y-3">
            <Button
              onClick={handleRetry}
              disabled={isRetrying}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
            >
              {isRetrying ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="w-4 h-4 mr-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </motion.div>
                  Nouvelle tentative...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Réessayer
                </>
              )}
            </Button>
            <Button variant="outline" className="w-full bg-transparent" asChild>
              <Link href="/auth/login">Retour à la connexion</Link>
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
              <AlertTriangle className="w-8 h-8 text-white" />
            </motion.div>
            <CardTitle className="text-2xl font-bold text-gray-900">{error.title}</CardTitle>
            <CardDescription className="text-gray-600">{customMessage || error.description}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {error.action && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-700">{error.action}</p>
              </div>
            )}

            {getActionButtons()}

            <div className="text-center">
              <Button variant="ghost" className="text-gray-600 hover:text-gray-800" asChild>
                <Link href="/">
                  <Home className="w-4 h-4 mr-2" />
                  Retour à l'accueil
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
