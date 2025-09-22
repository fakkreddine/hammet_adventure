import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin dashboard statistics
export async function getAdminStats() {
  try {
    // Get user count
    const { count: userCount } = await supabase.from("user_profiles").select("*", { count: "exact", head: true })

    // Get booking statistics
    const { data: bookingStats } = await supabase.rpc("get_booking_stats")

    // Get pending reviews count
    const { count: pendingReviews } = await supabase
      .from("reviews")
      .select("*", { count: "exact", head: true })
      .eq("is_approved", false)

    // Get recent bookings
    const { data: recentBookings } = await supabase
      .from("bookings")
      .select(`
        *,
        user_profiles!inner(first_name, last_name),
        tours!inner(title)
      `)
      .order("created_at", { ascending: false })
      .limit(5)

    return {
      userCount: userCount || 0,
      bookingStats: bookingStats?.[0] || {
        total_bookings: 0,
        pending_bookings: 0,
        confirmed_bookings: 0,
        completed_bookings: 0,
        cancelled_bookings: 0,
        total_revenue: 0,
        monthly_revenue: 0,
      },
      pendingReviews: pendingReviews || 0,
      recentBookings: recentBookings || [],
    }
  } catch (error) {
    console.error("Error fetching admin stats:", error)
    return {
      userCount: 0,
      bookingStats: {
        total_bookings: 0,
        pending_bookings: 0,
        confirmed_bookings: 0,
        completed_bookings: 0,
        cancelled_bookings: 0,
        total_revenue: 0,
        monthly_revenue: 0,
      },
      pendingReviews: 0,
      recentBookings: [],
    }
  }
}

// Get recent users
export async function getRecentUsers(limit = 5) {
  try {
    const { data } = await supabase
      .from("user_profiles")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit)

    return data || []
  } catch (error) {
    console.error("Error fetching recent users:", error)
    return []
  }
}

// Get system alerts (mock for now - can be extended with real monitoring)
export function getSystemAlerts() {
  return [
    {
      id: "1",
      type: "info" as const,
      message: "Système opérationnel",
      time: "Il y a 1h",
      priority: "low" as const,
    },
    {
      id: "2",
      type: "warning" as const,
      message: "Maintenance programmée demain",
      time: "Il y a 3h",
      priority: "medium" as const,
    },
  ]
}

// Update booking status
export async function updateBookingStatus(bookingId: string, status: string) {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", bookingId)
      .select()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error("Error updating booking status:", error)
    return { data: null, error }
  }
}

// Get all tours for management
export async function getTours() {
  try {
    const { data, error } = await supabase.from("tours").select("*").order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching tours:", error)
    return []
  }
}
