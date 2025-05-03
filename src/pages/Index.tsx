
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PropertyFeatures from "@/components/PropertyFeatures";
import GallerySection from "@/components/GallerySection";
import LocationSection from "@/components/LocationSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        <HeroSection />
        <PropertyFeatures />
        <GallerySection />
        <LocationSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
