"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { getSupabaseClient } from "@/lib/supabase/client"

export default function AuthCallbackPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = getSupabaseClient()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const code = searchParams.get("code")
        const error = searchParams.get("error")
        const errorDescription = searchParams.get("error_description")
        const type = searchParams.get("type")

        if (error) {
          setStatus("error")
          setMessage(errorDescription || error)
          return
        }

        if (code) {
          const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

          if (exchangeError) {
            setStatus("error")
            setMessage(exchangeError.message)
            return
          }

          if (data.session) {
            setStatus("success")

            if (type === "recovery") {
              setMessage("Réinitialisation du mot de passe confirmée")
              // Redirect to reset password page
              setTimeout(() => {
                router.push("/auth/reset-password")
              }, 2000)
            } else {
              setMessage("Email confirmé avec succès!")
              // Redirect to protected area
              setTimeout(() => {
                router.push("/protected")
              }, 2000)
            }
          }
        } else {
          setStatus("error")
          setMessage("Code de confirmation manquant")
        }
      } catch (error) {
        console.error("[v0] Auth callback error:", error)
        setStatus("error")
        setMessage("Une erreur inattendue s'est produite")
      }
    }

    handleAuthCallback()
  }, [searchParams, router, supabase.auth])

  const getIcon = () => {
    switch (status) {
      case "loading":
        return <Loader2 className="w-8 h-8 text-amber-600 animate-spin" />
      case "success":
        return <CheckCircle className="w-8 h-8 text-green-600" />
      case "error":
        return <XCircle className="w-8 h-8 text-red-600" />
    }
  }

  const getTitle = () => {
    switch (status) {
      case "loading":
        return "Vérification en cours..."
      case "success":
        return "Confirmation réussie!"
      case "error":
        return "Erreur de confirmation"
    }
  }

  const getBackgroundColor = () => {
    switch (status) {
      case "success":
        return "from-green-500 to-emerald-600"
      case "error":
        return "from-red-500 to-rose-600"
      default:
        return "from-amber-500 to-orange-600"
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
        <Card className="backdrop-blur-sm bg-white/90 border-amber-200 shadow-2xl">
          <CardHeader className="text-center space-y-2">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className={`mx-auto w-16 h-16 bg-gradient-to-br ${getBackgroundColor()} rounded-full flex items-center justify-center mb-4`}
            >
              {getIcon()}
            </motion.div>
            <CardTitle className="text-2xl font-bold text-gray-900">{getTitle()}</CardTitle>
            <CardDescription className="text-gray-600">{message || "Traitement de votre demande..."}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {status === "loading" && (
              <div className="text-center">
                <p className="text-sm text-gray-600">Veuillez patienter pendant que nous vérifions votre demande...</p>
              </div>
            )}

            {status === "success" && (
              <div className="text-center space-y-4">
                <p className="text-sm text-gray-600">Vous allez être redirigé automatiquement...</p>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                >
                  <Link href="/protected">Continuer</Link>
                </Button>
              </div>
            )}

            {status === "error" && (
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-4">Le lien peut avoir expiré ou être invalide.</p>
                </div>
                <div className="space-y-3">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-amber-200 hover:bg-amber-50 bg-transparent"
                  >
                    <Link href="/auth/signup">Créer un nouveau compte</Link>
                  </Button>
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
                  >
                    <Link href="/auth/login">Retour à la connexion</Link>
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
