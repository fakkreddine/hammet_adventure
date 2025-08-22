"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, ArrowLeft, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useSearchParams } from "next/navigation"

export default function SignupSuccessPage() {
  const [isResending, setIsResending] = useState(false)
  const [resendSuccess, setResendSuccess] = useState(false)
  const [resendError, setResendError] = useState<string | null>(null)
  const { resendConfirmation } = useAuth()
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""

  const handleResendConfirmation = async () => {
    if (!email) {
      setResendError("Adresse email manquante")
      return
    }

    setIsResending(true)
    setResendError(null)

    try {
      const { error } = await resendConfirmation(email)
      if (error) throw error
      setResendSuccess(true)
      setTimeout(() => setResendSuccess(false), 3000)
    } catch (error: unknown) {
      setResendError(error instanceof Error ? error.message : "Erreur lors de l'envoi")
    } finally {
      setIsResending(false)
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

        <Card className="backdrop-blur-sm bg-white/90 border-amber-200 shadow-2xl">
          <CardHeader className="text-center space-y-2">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-4"
            >
              <Mail className="w-8 h-8 text-white" />
            </motion.div>
            <CardTitle className="text-2xl font-bold text-gray-900">Vérifiez votre email</CardTitle>
            <CardDescription className="text-gray-600">
              Nous avons envoyé un lien de confirmation à votre adresse email
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              {email && (
                <p className="text-sm text-gray-600">
                  Un email de confirmation a été envoyé à <strong>{email}</strong>
                </p>
              )}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h4 className="font-semibold text-amber-800 mb-2">Étapes suivantes:</h4>
                <ol className="text-sm text-amber-700 space-y-1 list-decimal list-inside">
                  <li>Ouvrez votre boîte de réception</li>
                  <li>Cliquez sur le lien de confirmation</li>
                  <li>Connectez-vous à votre compte</li>
                </ol>
              </div>
              <p className="text-xs text-gray-500">
                N'oubliez pas de vérifier votre dossier spam si vous ne voyez pas l'email.
              </p>
            </div>

            {resendSuccess && (
              <div className="text-sm text-green-600 bg-green-50 p-3 rounded-md border border-green-200">
                Email de confirmation renvoyé avec succès!
              </div>
            )}

            {resendError && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-200">{resendError}</div>
            )}

            <div className="space-y-3">
              {email && (
                <Button
                  onClick={handleResendConfirmation}
                  disabled={isResending}
                  variant="outline"
                  className="w-full border-amber-200 hover:bg-amber-50 bg-transparent"
                >
                  {isResending ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="w-4 h-4 mr-2"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </motion.div>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Renvoyer l'email de confirmation
                    </>
                  )}
                </Button>
              )}

              <Button
                asChild
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
              >
                <Link href="/auth/login">Aller à la connexion</Link>
              </Button>
            </div>

            <div className="text-center text-sm text-gray-600">
              Problème avec votre email?{" "}
              <Link href="/contact" className="text-amber-600 hover:text-amber-700 font-semibold">
                Contactez-nous
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
