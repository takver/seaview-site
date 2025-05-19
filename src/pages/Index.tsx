// @ts-nocheck
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
import { LocationPlaceholder } from "@/components/location-placeholder";
import { Footer } from "@/components/footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <PropertyFeaturesBanner />
        <div className="px-[10%]">
          {/* Cycladic home in Sifnos, Greece */}
          <LocationSection />
          
          {/* What Sets This Place Apart */}
          <PropertyHighlights />
          
          {/* Gallery */}
          <GallerySection />
          
          {/* Property Details */}
          <PropertyDetailsSection />
          
          {/* Modern Amenities */}
          <AmenitiesSection />
          
          {/* Premium Brands & Technology Partners (included in AmenitiesSection) */}
          
          {/* Ideal Guests */}
          <IdealGuestsSection />
          
          {/* Discover Sifnos */}
          <DiscoverSifnosSection />
          
          {/* Reserve Your Stay */}
          <BookingSection />
          
          {/* References (possibly part of BookingSection) */}
          
          {/* Our location (map) */}
          <LocationPlaceholder />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
