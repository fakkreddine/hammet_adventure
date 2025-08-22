"use client"

import type React from "react"

import { ProtectedRoute } from "./protected-route"
import { AuthGuard } from "./auth-guard"
import { RoleGuard } from "./role-guard"

interface AuthWrapperProps {
  children: React.ReactNode
  // Protection options
  requireAuth?: boolean
  requireEmailVerification?: boolean
  allowedRoles?: string[]
  requiredPermissions?: string[]
  // Redirect options
  redirectTo?: string
  redirectIfAuthenticated?: boolean
  redirectAuthenticatedTo?: string
  // UI options
  showUnauthorizedFallback?: boolean
  loadingFallback?: React.ReactNode
  unauthorizedFallback?: React.ReactNode
}

export function AuthWrapper({
  children,
  requireAuth = false,
  requireEmailVerification = false,
  allowedRoles = [],
  requiredPermissions = [],
  redirectTo = "/auth/login",
  redirectIfAuthenticated = false,
  redirectAuthenticatedTo = "/protected",
  showUnauthorizedFallback = true,
  loadingFallback,
  unauthorizedFallback,
}: AuthWrapperProps) {
  // If no auth is required, just render children
  if (!requireAuth && !redirectIfAuthenticated && allowedRoles.length === 0 && requiredPermissions.length === 0) {
    return <>{children}</>
  }

  // Wrap with AuthGuard for basic auth checks and redirects
  let wrappedChildren = (
    <AuthGuard
      requireAuth={requireAuth}
      redirectTo={redirectTo}
      redirectIfAuthenticated={redirectIfAuthenticated}
      redirectAuthenticatedTo={redirectAuthenticatedTo}
    >
      {children}
    </AuthGuard>
  )

  // Wrap with RoleGuard if roles or permissions are specified
  if (allowedRoles.length > 0 || requiredPermissions.length > 0) {
    wrappedChildren = (
      <RoleGuard
        allowedRoles={allowedRoles}
        requiredPermissions={requiredPermissions}
        fallback={unauthorizedFallback}
        showFallback={showUnauthorizedFallback}
      >
        {wrappedChildren}
      </RoleGuard>
    )
  }

  // Wrap with ProtectedRoute if auth is required
  if (requireAuth) {
    wrappedChildren = (
      <ProtectedRoute
        redirectTo={redirectTo}
        requireEmailVerification={requireEmailVerification}
        fallback={loadingFallback}
      >
        {wrappedChildren}
      </ProtectedRoute>
    )
  }

  return wrappedChildren
}
