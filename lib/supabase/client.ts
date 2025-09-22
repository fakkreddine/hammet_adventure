import { createClient as createSupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://jcasygjyttfsspyimxge.supabase.co"
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjYXN5Z2p5dHRmc3NweWlteGdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUzMjk2NDMsImV4cCI6MjA3MDkwNTY0M30.YvphjNjOb2MF_ohTV7GrPMH6o-gqf7HYM65YW2IA3Pk"

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables. Please check your .env.local file.")
}

// Create a singleton Supabase client for client-side operations
export const createBrowserClient = () => {
  return createSupabaseClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: typeof window !== "undefined" ? window.localStorage : undefined,
      flowType: "pkce",
    },
  })
}

// Export a default client instance
let supabaseClient: ReturnType<typeof createBrowserClient> | null = null

export const getSupabaseClient = () => {
  if (!supabaseClient) {
    supabaseClient = createBrowserClient()
  }
  return supabaseClient
}

export const createClient = createBrowserClient
