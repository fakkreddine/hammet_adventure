"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState, useCallback } from "react"
import type { User, Session, AuthError } from "@supabase/supabase-js"
import { getSupabaseClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signUp: (email: string, password: string, options?: any) => Promise<{ error: AuthError | null }>
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>
  signOut: () => Promise<{ error: AuthError | null }>
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>
  updatePassword: (password: string) => Promise<{ error: AuthError | null }>
  refreshSession: () => Promise<void>
  updateProfile: (updates: { first_name?: string; last_name?: string; phone?: string }) => Promise<{
    error: AuthError | null
  }>
  resendConfirmation: (email: string) => Promise<{ error: AuthError | null }>
  isSessionExpired: () => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshInterval, setRefreshInterval] = useState<NodeJS.Timeout | null>(null)
  const router = useRouter()
  const supabase = getSupabaseClient()

  const isSessionExpired = useCallback(() => {
    if (!session?.expires_at) return false
    return Date.now() >= session.expires_at * 1000
  }, [session?.expires_at])

  const refreshSession = useCallback(async () => {
    try {
      console.log("[v0] Refreshing session...")
      const { data, error } = await supabase.auth.refreshSession()
      if (error) {
        console.error("[v0] Session refresh error:", error)
        // If refresh fails, sign out the user
        if (error.message.includes("refresh_token_not_found") || error.message.includes("invalid_grant")) {
          await signOut()
        }
      } else {
        console.log("[v0] Session refreshed successfully")
        setSession(data.session)
        setUser(data.session?.user ?? null)
      }
    } catch (error) {
      console.error("[v0] Session refresh error:", error)
    }
  }, [supabase.auth])

  useEffect(() => {
    if (session?.expires_at) {
      // Clear existing interval
      if (refreshInterval) {
        clearInterval(refreshInterval)
      }

      // Schedule refresh 5 minutes before expiry
      const expiryTime = session.expires_at * 1000
      const refreshTime = expiryTime - 5 * 60 * 1000 // 5 minutes before
      const timeUntilRefresh = refreshTime - Date.now()

      if (timeUntilRefresh > 0) {
        const timeout = setTimeout(() => {
          refreshSession()
          // Set up recurring refresh every 50 minutes
          const interval = setInterval(refreshSession, 50 * 60 * 1000)
          setRefreshInterval(interval)
        }, timeUntilRefresh)

        return () => clearTimeout(timeout)
      }
    }

    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval)
        setRefreshInterval(null)
      }
    }
  }, [session?.expires_at, refreshSession, refreshInterval])

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()
        if (error) {
          console.error("[v0] Error getting initial session:", error)
        } else {
          setSession(session)
          setUser(session?.user ?? null)
        }
      } catch (error) {
        console.error("[v0] Error in getInitialSession:", error)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("[v0] Auth state changed:", event, session?.user?.email)

      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)

      // Handle different auth events
      switch (event) {
        case "SIGNED_IN":
          console.log("[v0] User signed in successfully")
          break
        case "SIGNED_OUT":
          console.log("[v0] User signed out")
          if (refreshInterval) {
            clearInterval(refreshInterval)
            setRefreshInterval(null)
          }
          break
        case "TOKEN_REFRESHED":
          console.log("[v0] Token refreshed successfully")
          break
        case "USER_UPDATED":
          console.log("[v0] User profile updated")
          break
        case "PASSWORD_RECOVERY":
          console.log("[v0] Password recovery initiated")
          break
      }
    })

    return () => {
      subscription.unsubscribe()
      if (refreshInterval) {
        clearInterval(refreshInterval)
      }
    }
  }, [supabase.auth, router, refreshInterval])

  // Sign up function
  const signUp = async (email: string, password: string, options?: any) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/auth/callback`,
          ...options,
        },
      })
      return { error }
    } catch (error) {
      console.error("[v0] Sign up error:", error)
      return { error: error as AuthError }
    } finally {
      setLoading(false)
    }
  }

  // Sign in function
  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      return { error }
    } catch (error) {
      console.error("[v0] Sign in error:", error)
      return { error: error as AuthError }
    } finally {
      setLoading(false)
    }
  }

  // Sign out function
  const signOut = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signOut()
      if (!error) {
        router.push("/")
      }
      return { error }
    } catch (error) {
      console.error("[v0] Sign out error:", error)
      return { error: error as AuthError }
    } finally {
      setLoading(false)
    }
  }

  // Reset password function
  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo:
          process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/auth/reset-password`,
      })
      return { error }
    } catch (error) {
      console.error("[v0] Reset password error:", error)
      return { error: error as AuthError }
    }
  }

  // Update password function
  const updatePassword = async (password: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password,
      })
      return { error }
    } catch (error) {
      console.error("[v0] Update password error:", error)
      return { error: error as AuthError }
    }
  }

  const updateProfile = async (updates: { first_name?: string; last_name?: string; phone?: string }) => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: updates,
      })
      return { error }
    } catch (error) {
      console.error("[v0] Update profile error:", error)
      return { error: error as AuthError }
    }
  }

  const resendConfirmation = async (email: string) => {
    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
        options: {
          emailRedirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/auth/callback`,
        },
      })
      return { error }
    } catch (error) {
      console.error("[v0] Resend confirmation error:", error)
      return { error: error as AuthError }
    }
  }

  const value: AuthContextType = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updatePassword,
    refreshSession,
    updateProfile,
    resendConfirmation,
    isSessionExpired,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
