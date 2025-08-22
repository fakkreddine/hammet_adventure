"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"

interface AuthGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
  redirectTo?: string
  redirectIfAuthenticated?: boolean
  redirectAuthenticatedTo?: string
}

export function AuthGuard({
  children,
  requireAuth = false,
  redirectTo = "/auth/login",
  redirectIfAuthenticated = false,
  redirectAuthenticatedTo = "/protected",
}: AuthGuardProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      // Redirect unauthenticated users from protected routes
      if (requireAuth && !user) {
        console.log("[v0] Auth required but no user, redirecting to:", redirectTo)
        router.push(redirectTo)
        return
      }

      // Redirect authenticated users from auth pages (login, signup, etc.)
      if (redirectIfAuthenticated && user) {
        console.log("[v0] User authenticated, redirecting to:", redirectAuthenticatedTo)
        router.push(redirectAuthenticatedTo)
        return
      }
    }
  }, [user, loading, requireAuth, redirectIfAuthenticated, router, redirectTo, redirectAuthenticatedTo])

  return <>{children}</>
}
