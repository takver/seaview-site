import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GalleryHorizontal } from "lucide-react";
import GalleryCarousel from "./GalleryCarousel";

// Gallery images with proper typing
interface GalleryImage {
  src: string;
  alt: string;
}

const galleryImages: GalleryImage[] = [
  { src: "/images/BLD-E1.webp", alt: "Villa exterior night view" },
  { src: "/images/IMG_0380-scaled.webp", alt: "Villa entrance with blue door" },
  { src: "/images/DSC09508-scaled.webp", alt: "Villa interior living room" },
  { src: "/images/LR1-474907880.webp", alt: "Garden view with sea in background" },
  { src: "/images/KI1-474906199.webp", alt: "Villa interior with traditional design" },
  { src: "/images/LRa.1920x1280-605x465.webp", alt: "Villa interior with modern design" }
];

// Hero images with proper typing
const heroImages: GalleryImage[] = [
  { src: "/images/DSC09508-scaled.webp", alt: "Path with trees and greenery" },
  { src: "/images/IMG_0379.webp", alt: "Indoor dining area with hanging lights" },
  { src: "/images/IMG_0383-scaled.webp", alt: "Bedroom with white bedding" },
  { src: "/images/474913331.webp", alt: "View from terrace with sea" },
  { src: "/images/474913028.webp", alt: "Sea view with white building" },
  { src: "/images/GA1-IMG_0393-E-scaled.webp", alt: "White building exterior" },
  { src: "/images/BLD-E1.webp", alt: "Night landscape" },
  { src: "/images/IMG_0389-scaled.webp", alt: "Garden view with greenery" },
  { src: "/images/DSC09522-scaled.webp", alt: "Stone garden feature" },
  { src: "/images/IMG_0330-scaled.webp", alt: "Stone pathway" },
  { src: "/images/DSC09537-scaled.webp", alt: "White building corner" },
  { src: "/images/IMG_0380-scaled.webp", alt: "Interior with hanging lights" }
];

// Combine all images, removing duplicates based on src
const allImages = [...new Set([...galleryImages, ...heroImages].map(img => img.src))];

const GallerySection = () => {
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [carouselGridMode, setCarouselGridMode] = useState(true);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const handleImageLoad = (src: string) => {
    setLoadedImages(prev => new Set([...prev, src]));
  };

  const handleImageError = (src: string) => {
    setImageErrors(prev => new Set([...prev, src]));
  };

  const renderImage = (image: GalleryImage, className: string) => (
    <div className={`relative ${className}`}>
      <img
        src={image.src}
        alt={image.alt}
        className={`w-full h-full object-cover transition-transform duration-300 ${
          loadedImages.has(image.src) ? 'hover:scale-105' : ''
        }`}
        onLoad={() => handleImageLoad(image.src)}
        onError={() => handleImageError(image.src)}
      />
      {!loadedImages.has(image.src) && !imageErrors.has(image.src) && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      {imageErrors.has(image.src) && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-400">
          Failed to load image
        </div>
      )}
    </div>
  );

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-light text-center mb-12 text-[#1A1F2C]">
          Gallery
        </h2>
        <p className="text-gray-600 text-center font-light leading-relaxed max-w-2xl mx-auto mb-10">
          Take a glimpse at our beautiful property and the stunning views of Sifnos
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-[4px]">
          <div className="md:col-span-7 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow h-[500px]">
            {renderImage(galleryImages[0], "h-full")}
          </div>
          
          <div className="md:col-span-5 grid grid-cols-2 gap-[4px] h-[500px]">
            {galleryImages.slice(1, 5).map((image, index) => (
              <div key={image.src} className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow h-[248px]">
                {renderImage(image, "h-full")}
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-10">
          <Button 
            className="bg-[#6E59A5] hover:bg-[#6E59A5]/90 text-white flex items-center gap-2"
            onClick={() => {
              setCarouselGridMode(true);
              setIsCarouselOpen(true);
            }}
          >
            <GalleryHorizontal size={20} />
            <span>Show All Pictures</span>
          </Button>
        </div>

        <GalleryCarousel
          isOpen={isCarouselOpen}
          onClose={() => setIsCarouselOpen(false)}
          images={allImages}
          gridMode={carouselGridMode}
          initialIndex={0}
        />
      </div>
    </section>
  );
};

export default GallerySection;
