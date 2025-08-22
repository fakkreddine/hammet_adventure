"use client"

import type React from "react"

import { useAuth } from "@/hooks/use-auth"
import { motion } from "framer-motion"
import { ShieldX } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface RoleGuardProps {
  children: React.ReactNode
  allowedRoles?: string[]
  requiredPermissions?: string[]
  fallback?: React.ReactNode
  showFallback?: boolean
}

export function RoleGuard({
  children,
  allowedRoles = [],
  requiredPermissions = [],
  fallback,
  showFallback = true,
}: RoleGuardProps) {
  const { user } = useAuth()

  // Helper function to check if user has required role
  const hasRequiredRole = () => {
    if (allowedRoles.length === 0) return true
    if (!user?.user_metadata?.role) return false
    return allowedRoles.includes(user.user_metadata.role)
  }

  // Helper function to check if user has required permissions
  const hasRequiredPermissions = () => {
    if (requiredPermissions.length === 0) return true
    if (!user?.user_metadata?.permissions) return false
    const userPermissions = user.user_metadata.permissions || []
    return requiredPermissions.every((permission) => userPermissions.includes(permission))
  }

  // Check authorization
  const isAuthorized = hasRequiredRole() && hasRequiredPermissions()

  if (isAuthorized) {
    return <>{children}</>
  }

  // Show custom fallback if provided
  if (fallback) {
    return <>{fallback}</>
  }

  // Show default unauthorized message
  if (showFallback) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6 max-w-md"
        >
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-red-500 to-rose-600 rounded-full flex items-center justify-center">
            <ShieldX className="w-8 h-8 text-white" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">Accès non autorisé</h2>
            <p className="text-gray-600">Vous n'avez pas les permissions nécessaires pour accéder à cette page.</p>
          </div>
          <div className="space-y-3">
            <Button
              asChild
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
            >
              <Link href="/protected">Retour au tableau de bord</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Retour à l'accueil</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  // Don't render anything
  return null
}
