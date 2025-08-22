import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import TestimonialsSection from "@/components/testimonials-section"
import GallerySection from "@/components/gallery-section"
import AdventuresSection from "@/components/adventures-section"
import WhyChooseUs from "@/components/why-choose-us"
import AdventurePackages from "@/components/adventure-packages"
import { NewsletterSection } from "@/components/newsletter-section"
import { Footer } from "@/components/footer"
import ProtectedPage from "./protected/page"

export default function HomePage() {
  return (
    <main className="min-h-screen">
     
      <Header />
      <HeroSection />
      <WhyChooseUs />
      <AdventurePackages />
      <TestimonialsSection />
      <GallerySection />
      <AdventuresSection />
      <NewsletterSection />
      <Footer />

    </main>
  )
}
