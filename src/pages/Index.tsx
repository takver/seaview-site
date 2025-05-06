
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PropertyFeaturesBanner from "@/components/PropertyFeaturesBanner";
import LocationSection from "@/components/LocationSection";
import PropertyHighlights from "@/components/PropertyHighlights";
import PropertyDetailsSection from "@/components/PropertyDetailsSection";
import GallerySection from "@/components/GallerySection";
import AmenitiesSection from "@/components/AmenitiesSection";
import IdealGuestsSection from "@/components/IdealGuestsSection";
import DiscoverSifnosSection from "@/components/DiscoverSifnosSection";
import BookingSection from "@/components/BookingSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

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
