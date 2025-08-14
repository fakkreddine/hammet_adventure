import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    title: "Les 10 Plus Beaux Spots de Hammamet à Découvrir en Quad",
    excerpt:
      "Découvrez les paysages cachés et les panoramas époustouflants de Hammamet lors de votre aventure quad. Des dunes dorées aux oliveraies centenaires...",
    image: "/blog-quad-spots-hammamet.jpg",
    date: "15 Janvier 2024",
    readTime: "5 min",
    category: "Aventure",
  },
  {
    id: 2,
    title: "Guide Complet: Excursion Catamaran sur la Côte de Hammamet",
    excerpt:
      "Tout ce que vous devez savoir pour profiter pleinement de votre sortie en catamaran : meilleurs moments, équipements, spots de snorkeling...",
    image: "/blog-catamaran-guide-hammamet.jpg",
    date: "12 Janvier 2024",
    readTime: "7 min",
    category: "Maritime",
  },
  {
    id: 3,
    title: "Traditions Bédouines: L'Art de la Balade à Dos de Dromadaire",
    excerpt:
      "Plongez dans l'histoire millénaire des nomades du désert et découvrez les secrets de cette expérience authentique au coucher du soleil...",
    image: "/blog-camel-traditions-hammamet.jpg",
    date: "8 Janvier 2024",
    readTime: "6 min",
    category: "Culture",
  },
]

export function BlogSection() {
  return (
    <section id="blog" className="py-20 bg-gradient-to-b from-turquoise-green/10 to-sand-beige/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-charcoal-gray mb-6">
            Guide Local <span className="text-coral-orange">Hammamet</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conseils d'experts, guides pratiques et secrets locaux pour enrichir votre aventure tunisienne
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <Card
              key={post.id}
              className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 bg-white"
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image || "/placeholder.svg?height=250&width=400&query=Hammamet landscape"}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-coral-orange text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {post.category}
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-serif font-bold text-charcoal-gray mb-3 leading-tight group-hover:text-sky-blue transition-colors">
                  {post.title}
                </h3>

                <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">{post.excerpt}</p>

                {/* Meta Information */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>

                {/* Read More Button */}
                <Button
                  variant="ghost"
                  className="w-full justify-between text-coral-orange hover:text-white hover:bg-coral-orange transition-all duration-300 group/btn"
                >
                  Lire l'article
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-sky-blue text-sky-blue hover:bg-sky-blue hover:text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 bg-transparent"
          >
            Voir Tous les Articles
          </Button>
        </div>
      </div>
    </section>
  )
}
