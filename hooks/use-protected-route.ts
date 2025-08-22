"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"

interface UseProtectedRouteOptions {
  redirectTo?: string
  requireEmailVerification?: boolean
  onUnauthorized?: () => void
  onAuthorized?: () => void
}

export function useProtectedRoute(options: UseProtectedRouteOptions = {}) {
  const { redirectTo = "/auth/login", requireEmailVerification = false, onUnauthorized, onAuthorized } = options

  const { user, loading } = useAuth()
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    if (!loading) {
      const checkAuthorization = () => {
        // Check if user exists
        if (!user) {
          setIsAuthorized(false)
          setIsChecking(false)
          onUnauthorized?.()
          router.push(redirectTo)
          return
        }

        // Check email verification if required
        if (requireEmailVerification && !user.email_confirmed_at) {
          setIsAuthorized(false)
          setIsChecking(false)
          onUnauthorized?.()
          router.push("/auth/verify-email")
          return
        }

        // User is authorized
        setIsAuthorized(true)
        setIsChecking(false)
        onAuthorized?.()
      }

      checkAuthorization()
    }
  }, [user, loading, redirectTo, requireEmailVerification, router, onUnauthorized, onAuthorized])

  return {
    isAuthorized,
    isChecking,
    user,
  }
}
