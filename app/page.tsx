import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import AdventuresSection from "@/components/adventures-section"
import BenefitsSection from "@/components/benefits-section"
import WhyChooseSection from "@/components/why-choose-section"
import GallerySection from "@/components/gallery-section"
import TestimonialsSection from "@/components/testimonials-section"
import NewsletterSection from "@/components/newsletter-section"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <BenefitsSection />
      <AdventuresSection />
      <GallerySection />
      <TestimonialsSection />
      <WhyChooseSection />
      <NewsletterSection />
      <Footer />
    </main>
  )
}
