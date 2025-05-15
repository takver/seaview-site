import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { PropertyFeaturesBanner } from "@/components/property-features-banner";
import { LocationSection } from "@/components/location-section";
import { PropertyHighlights } from "@/components/property-highlights";
import { PropertyDetailsSection } from "@/components/property-details-section";
import { GallerySection } from "@/components/gallery-section";
import { AmenitiesSection } from "@/components/amenities-section";
import { IdealGuestsSection } from "@/components/ideal-guests-section";
import { DiscoverSifnosSection } from "@/components/discover-sifnos-section";
import { BookingSection } from "@/components/booking-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        <HeroSection />
        <PropertyFeaturesBanner />
        <LocationSection />
        <PropertyHighlights />
        <GallerySection />
        <AmenitiesSection />
        <IdealGuestsSection />
        <DiscoverSifnosSection />
        <BookingSection />
        <PropertyDetailsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
