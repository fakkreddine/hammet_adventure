import { MeiliSearch } from "meilisearch"

const client = new MeiliSearch({
  host: process.env.NEXT_PUBLIC_MEILISEARCH_HOST || "https://ms-2b6d90b15c65-28795.fra.meilisearch.io",
  apiKey: process.env.NEXT_PUBLIC_MEILISEARCH_API_KEY || "1fed88384a92eeffdbb27d4e2b365c64ff347bf1",
})

export interface Adventure {
  id: number
  title: string
  location: string
  duration: string
  price: number
  rating: number
  reviews: number
  image: string
  category: string
  features: string[]
  difficulty: string
  groupSize: string
  description?: string
}

export const searchAdventures = async (
  query: string,
  filters: {
    priceRange?: [number, number]
    difficulty?: string[]
    features?: string[]
    location?: string
  } = {},
) => {
  try {
    const index = client.index("adventures")

    const searchParams: any = {
      q: query,
      limit: 50,
      attributesToHighlight: ["title", "location", "features"],
    }

    // Build filter string
    const filterConditions: string[] = []

    if (filters.priceRange) {
      filterConditions.push(`price >= ${filters.priceRange[0]} AND price <= ${filters.priceRange[1]}`)
    }

    if (filters.difficulty && filters.difficulty.length > 0) {
      const difficultyFilter = filters.difficulty.map((d) => `difficulty = "${d}"`).join(" OR ")
      filterConditions.push(`(${difficultyFilter})`)
    }

    if (filters.location) {
      filterConditions.push(`location CONTAINS "${filters.location}"`)
    }

    if (filterConditions.length > 0) {
      searchParams.filter = filterConditions.join(" AND ")
    }

    const results = await index.search(query, searchParams)
    return results.hits as Adventure[]
  } catch (error) {
    console.error("Search error:", error)
    // Fallback to local data if Meilisearch is not available
    return []
  }
}

export const initializeSearchIndex = async (adventures: Adventure[]) => {
  try {
    const index = client.index("adventures")

    // Configure searchable attributes
    await index.updateSearchableAttributes(["title", "location", "features", "category", "difficulty"])

    // Configure filterable attributes
    await index.updateFilterableAttributes(["price", "difficulty", "location", "category", "rating"])

    // Add documents
    await index.addDocuments(adventures)

    return true
  } catch (error) {
    console.error("Failed to initialize search index:", error)
    return false
  }
}
