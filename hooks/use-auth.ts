"use client"

import { useAuth } from "@/contexts/auth-context"
import { useEffect, useState } from "react"

// Re-export the useAuth hook for convenience
export { useAuth }

// Additional auth-related hooks can be added here
export const useUser = () => {
  const { user, loading } = useAuth()
  return { user, loading }
}

export const useSession = () => {
  const { session, loading } = useAuth()
  return { session, loading }
}

export const useIsAuthenticated = () => {
  const { user, loading } = useAuth()
  return { isAuthenticated: !!user, loading }
}

export const useUserProfile = () => {
  const { user, loading } = useAuth()

  const profile = user
    ? {
        id: user.id,
        email: user.email,
        firstName: user.user_metadata?.first_name || "",
        lastName: user.user_metadata?.last_name || "",
        phone: user.user_metadata?.phone || "",
        fullName: `${user.user_metadata?.first_name || ""} ${user.user_metadata?.last_name || ""}`.trim(),
        avatar: user.user_metadata?.avatar_url || "",
        emailConfirmed: user.email_confirmed_at !== null,
        createdAt: user.created_at,
      }
    : null

  return { profile, loading }
}

export const useSessionExpiry = () => {
  const { session } = useAuth()
  const [timeUntilExpiry, setTimeUntilExpiry] = useState<number | null>(null)
  const [isExpiringSoon, setIsExpiringSoon] = useState(false)

  useEffect(() => {
    if (!session?.expires_at) {
      setTimeUntilExpiry(null)
      setIsExpiringSoon(false)
      return
    }

    const updateExpiry = () => {
      const expiryTime = session.expires_at! * 1000 // Convert to milliseconds
      const currentTime = Date.now()
      const timeLeft = expiryTime - currentTime

      setTimeUntilExpiry(timeLeft)
      setIsExpiringSoon(timeLeft < 5 * 60 * 1000) // 5 minutes warning
    }

    updateExpiry()
    const interval = setInterval(updateExpiry, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [session?.expires_at])

  return { timeUntilExpiry, isExpiringSoon }
}

export const useAuthPersistence = () => {
  const { user, session, loading } = useAuth()
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  // Return loading state until hydrated to prevent SSR mismatches
  return {
    user: isHydrated ? user : null,
    session: isHydrated ? session : null,
    loading: loading || !isHydrated,
    isHydrated,
  }
}

export const useAuthRateLimit = (maxAttempts = 5, windowMs: number = 15 * 60 * 1000) => {
  const [attempts, setAttempts] = useState<number[]>([])

  const isRateLimited = () => {
    const now = Date.now()
    const recentAttempts = attempts.filter((attempt) => now - attempt < windowMs)
    return recentAttempts.length >= maxAttempts
  }

  const recordAttempt = () => {
    const now = Date.now()
    setAttempts((prev) => [...prev.filter((attempt) => now - attempt < windowMs), now])
  }

  const getRemainingTime = () => {
    if (!isRateLimited()) return 0
    const oldestRecentAttempt = Math.min(...attempts.filter((attempt) => Date.now() - attempt < windowMs))
    return windowMs - (Date.now() - oldestRecentAttempt)
  }

  return {
    isRateLimited: isRateLimited(),
    recordAttempt,
    remainingTime: getRemainingTime(),
    attemptsLeft: Math.max(0, maxAttempts - attempts.filter((attempt) => Date.now() - attempt < windowMs).length),
  }
}
