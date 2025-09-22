export interface MockUser {
  id: string
  first_name: string
  last_name: string
  email: string
  role: "user" | "admin" | "super_admin"
  created_at: string
  status: "active" | "inactive"
}

export interface MockBooking {
  id: string
  user_id: string
  tour_name: string
  date: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  amount: number
  participants: number
  created_at: string
}

export interface MockTour {
  id: string
  name: string
  description: string
  price: number
  duration: string
  max_participants: number
  status: "active" | "inactive"
  created_at: string
}

// Mock users data
export const mockUsers: MockUser[] = [
  {
    id: "1",
    first_name: "Ahmed",
    last_name: "Ben Ali",
    email: "ahmed@example.com",
    role: "user",
    created_at: "2024-01-15T10:30:00Z",
    status: "active",
  },
  {
    id: "2",
    first_name: "Fatima",
    last_name: "Khelifi",
    email: "fatima@example.com",
    role: "user",
    created_at: "2024-01-20T14:15:00Z",
    status: "active",
  },
  {
    id: "3",
    first_name: "Mohamed",
    last_name: "Trabelsi",
    email: "mohamed@example.com",
    role: "admin",
    created_at: "2024-01-10T09:00:00Z",
    status: "active",
  },
]

// Mock bookings data
export const mockBookings: MockBooking[] = [
  {
    id: "1",
    user_id: "1",
    tour_name: "Quad Adventure Sahara",
    date: "2024-02-15",
    status: "confirmed",
    amount: 120,
    participants: 2,
    created_at: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    user_id: "2",
    tour_name: "Desert Sunset Tour",
    date: "2024-02-20",
    status: "pending",
    amount: 80,
    participants: 1,
    created_at: "2024-01-20T14:15:00Z",
  },
  {
    id: "3",
    user_id: "1",
    tour_name: "Oasis Discovery",
    date: "2024-02-10",
    status: "completed",
    amount: 95,
    participants: 3,
    created_at: "2024-01-10T09:00:00Z",
  },
]

// Mock tours data
export const mockTours: MockTour[] = [
  {
    id: "1",
    name: "Quad Adventure Sahara",
    description: "Exciting quad bike adventure through the Sahara desert",
    price: 120,
    duration: "4 hours",
    max_participants: 8,
    status: "active",
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Desert Sunset Tour",
    description: "Romantic sunset tour with traditional tea ceremony",
    price: 80,
    duration: "3 hours",
    max_participants: 12,
    status: "active",
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "3",
    name: "Oasis Discovery",
    description: "Explore hidden oases and local Berber culture",
    price: 95,
    duration: "6 hours",
    max_participants: 6,
    status: "active",
    created_at: "2024-01-01T00:00:00Z",
  },
]

// Mock admin functions
export const getMockAdminStats = () => {
  const totalBookings = mockBookings.length
  const confirmedBookings = mockBookings.filter((b) => b.status === "confirmed").length
  const pendingBookings = mockBookings.filter((b) => b.status === "pending").length
  const completedBookings = mockBookings.filter((b) => b.status === "completed").length
  const cancelledBookings = mockBookings.filter((b) => b.status === "cancelled").length
  const totalRevenue = mockBookings.reduce((sum, booking) => sum + booking.amount, 0)
  const monthlyRevenue = mockBookings
    .filter((b) => new Date(b.created_at).getMonth() === new Date().getMonth())
    .reduce((sum, booking) => sum + booking.amount, 0)

  return {
    userCount: mockUsers.length,
    bookingStats: {
      total_bookings: totalBookings,
      pending_bookings: pendingBookings,
      confirmed_bookings: confirmedBookings,
      completed_bookings: completedBookings,
      cancelled_bookings: cancelledBookings,
      total_revenue: totalRevenue,
      monthly_revenue: monthlyRevenue,
    },
    pendingReviews: 3,
    recentBookings: mockBookings.slice(0, 5),
  }
}

export const getMockRecentUsers = () => {
  return mockUsers.slice(0, 5)
}

export const getMockSystemAlerts = () => [
  {
    id: "1",
    type: "info" as const,
    message: "Système fonctionnel - Mode démonstration",
    time: "Il y a 5 minutes",
  },
  {
    id: "2",
    type: "warning" as const,
    message: "Base de données non configurée - Utilisation de données fictives",
    time: "Il y a 1 heure",
  },
  {
    id: "3",
    type: "info" as const,
    message: "Interface admin prête pour la configuration",
    time: "Il y a 2 heures",
  },
]
