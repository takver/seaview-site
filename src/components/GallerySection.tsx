
import { Button } from "./ui/button";
import { GalleryHorizontal } from "lucide-react";

const galleryImages = [
  "/images/IMG_0389-scaled.webp", // Large main image
  "/images/IMG_0380-scaled.webp", // Top right
  "/images/DSC09508-scaled.webp", // Top middle right
  "/images/LR1-474907880.webp",   // Bottom right
  "/images/KI1-474906199.webp"    // Bottom middle right
];

const GallerySection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-light text-center mb-12 text-[#1A1F2C]">
          Gallery
        </h2>
        <p className="text-gray-600 text-center font-light leading-relaxed max-w-2xl mx-auto mb-10">
          Take a glimpse at our beautiful property and the stunning views of Sifnos
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Large left image - spans 7 columns */}
          <div className="md:col-span-7 h-full rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <img
              src={galleryImages[0]}
              alt="Villa exterior with olive trees"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              style={{ height: "100%", minHeight: "100%" }}
            />
          </div>
          
          {/* Right side grid - spans 5 columns */}
          <div className="md:col-span-5 grid grid-cols-2 gap-3 h-full">
            {/* Top row - 2 images */}
            <div className="aspect-square rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img
                src={galleryImages[1]}
                alt="Villa entrance with blue door"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img
                src={galleryImages[2]}
                alt="Villa interior living room"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            {/* Bottom row - 2 images */}
            <div className="aspect-square rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img
                src={galleryImages[3]}
                alt="Garden view with sea in background"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img
                src={galleryImages[4]}
                alt="Villa interior with traditional ceiling"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
        
        <div className="text-center mt-10">
          <Button className="bg-[#6E59A5] hover:bg-[#6E59A5]/90 text-white flex items-center gap-2">
            <GalleryHorizontal size={20} />
            <span>Show All Pictures</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
