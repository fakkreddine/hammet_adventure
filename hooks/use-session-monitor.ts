"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"

interface SessionMonitorOptions {
  warningThreshold?: number // Minutes before expiry to show warning
  autoRefresh?: boolean // Whether to automatically refresh the session
  onExpiringSoon?: () => void // Callback when session is expiring soon
  onExpired?: () => void // Callback when session has expired
}

export const useSessionMonitor = (options: SessionMonitorOptions = {}) => {
  const { warningThreshold = 5, autoRefresh = true, onExpiringSoon, onExpired } = options

  const { session, refreshSession, isSessionExpired } = useAuth()
  const [timeUntilExpiry, setTimeUntilExpiry] = useState<number | null>(null)
  const [isExpiringSoon, setIsExpiringSoon] = useState(false)
  const [hasExpired, setHasExpired] = useState(false)

  useEffect(() => {
    if (!session?.expires_at) {
      setTimeUntilExpiry(null)
      setIsExpiringSoon(false)
      setHasExpired(false)
      return
    }

    const updateStatus = () => {
      const expiryTime = session.expires_at! * 1000
      const currentTime = Date.now()
      const timeLeft = expiryTime - currentTime

      setTimeUntilExpiry(timeLeft)

      const expiringSoon = timeLeft < warningThreshold * 60 * 1000 && timeLeft > 0
      const expired = timeLeft <= 0

      // Handle expiring soon
      if (expiringSoon && !isExpiringSoon) {
        setIsExpiringSoon(true)
        onExpiringSoon?.()

        // Auto-refresh if enabled
        if (autoRefresh) {
          console.log("[v0] Session expiring soon, auto-refreshing...")
          refreshSession()
        }
      }

      // Handle expired
      if (expired && !hasExpired) {
        setHasExpired(true)
        onExpired?.()
      }

      // Reset flags if session was refreshed
      if (!expiringSoon && isExpiringSoon) {
        setIsExpiringSoon(false)
      }
      if (!expired && hasExpired) {
        setHasExpired(false)
      }
    }

    updateStatus()
    const interval = setInterval(updateStatus, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [
    session?.expires_at,
    warningThreshold,
    autoRefresh,
    isExpiringSoon,
    hasExpired,
    onExpiringSoon,
    onExpired,
    refreshSession,
  ])

  return {
    timeUntilExpiry,
    isExpiringSoon,
    hasExpired,
    minutesUntilExpiry: timeUntilExpiry ? Math.floor(timeUntilExpiry / (1000 * 60)) : null,
    secondsUntilExpiry: timeUntilExpiry ? Math.floor(timeUntilExpiry / 1000) : null,
  }
}
