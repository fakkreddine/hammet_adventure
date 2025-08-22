"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useAuthPersistence } from "@/hooks/use-auth"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  redirectTo?: string
  requireEmailVerification?: boolean
  fallback?: React.ReactNode
}

export function ProtectedRoute({
  children,
  redirectTo = "/auth/login",
  requireEmailVerification = false,
  fallback,
}: ProtectedRouteProps) {
  const { user, loading, isHydrated } = useAuthPersistence()
  const router = useRouter()
  const [isRedirecting, setIsRedirecting] = useState(false)

  useEffect(() => {
    if (!loading && isHydrated) {
      if (!user) {
        console.log("[v0] No user found, redirecting to:", redirectTo)
        setIsRedirecting(true)
        router.push(redirectTo)
        return
      }

      if (requireEmailVerification && !user.email_confirmed_at) {
        console.log("[v0] Email not verified, redirecting to verification page")
        setIsRedirecting(true)
        router.push("/auth/verify-email")
        return
      }
    }
  }, [user, loading, isHydrated, router, redirectTo, requireEmailVerification])

  // Show loading state while checking authentication
  if (loading || !isHydrated || isRedirecting) {
    if (fallback) {
      return <>{fallback}</>
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center space-y-4"
        >
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">Vérification...</h3>
            <p className="text-sm text-gray-600">Vérification de votre authentification</p>
          </div>
        </motion.div>
      </div>
    )
  }

  // Show content if user is authenticated
  if (user && (!requireEmailVerification || user.email_confirmed_at)) {
    return <>{children}</>
  }

  // Fallback - should not reach here due to useEffect redirect
  return null
}
