
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PropertyFeaturesBanner from "@/components/PropertyFeaturesBanner";
import LocationSection from "@/components/LocationSection";
import PropertyHighlights from "@/components/PropertyHighlights";
import GallerySection from "@/components/GallerySection";
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
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
