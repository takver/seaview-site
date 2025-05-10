import React, { useState } from "react";
import { Button } from "./ui/button";
import { GalleryHorizontal } from "lucide-react";
import GalleryCarousel from "./GalleryCarousel";

// Gallery images
const galleryImages = [
  "/images/IMG_0389-scaled.webp", // Large main image
  "/images/IMG_0380-scaled.webp", // Top right
  "/images/DSC09508-scaled.webp", // Top middle right
  "/images/LR1-474907880.webp",   // Bottom right
  "/images/KI1-474906199.webp",   // Bottom middle right
  "/images/LRa.1920x1280-605x465.webp" // New image added
];

// Hero images
const heroImages = [
  "/images/DSC09508-scaled.webp",     // Path with trees and greenery
  "/images/IMG_0379.webp",            // Indoor dining area with hanging lights
  "/images/IMG_0383-scaled.webp",     // Bedroom with white bedding
  "/images/474913331.webp",           // View from terrace with sea
  "/images/474913028.webp",           // Sea view with white building
  "/images/GA1-IMG_0393-E-scaled.webp", // White building exterior
  "/images/BLD-E1.webp",              // Night landscape
  "/images/IMG_0389-scaled.webp",     // Garden view with greenery
  "/images/DSC09522-scaled.webp",     // Stone garden feature
  "/images/IMG_0330-scaled.webp",     // Stone pathway
  "/images/DSC09537-scaled.webp",     // White building corner
  "/images/IMG_0380-scaled.webp"      // Interior with hanging lights
];

// Combine all images, removing duplicates
const allImages = [...new Set([...galleryImages, ...heroImages])];

const GallerySection = () => {
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-light text-center mb-12 text-[#1A1F2C]">
          Gallery
        </h2>
        <p className="text-gray-600 text-center font-light leading-relaxed max-w-2xl mx-auto mb-10">
          Take a glimpse at our beautiful property and the stunning views of Sifnos
        </p>
        
        {/* Set both outer and inner grids to have the same gap (4px) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-[4px]">
          {/* Large left image - spans 7 columns */}
          <div className="md:col-span-7 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow h-[500px]">
            <img
              src={galleryImages[0]}
              alt="Villa exterior with olive trees"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          {/* Right side grid - spans 5 columns - same 4px gap as outer grid */}
          <div className="md:col-span-5 grid grid-cols-2 gap-[4px] h-[500px]">
            {/* (500px - (1 gap × 4px)) ÷ 2 = 248px for each small image */}
            <div className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow h-[248px]">
              <img
                src={galleryImages[1]}
                alt="Villa entrance with blue door"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow h-[248px]">
              <img
                src={galleryImages[2]}
                alt="Villa interior living room"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            {/* Bottom row - same height as top row */}
            <div className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow h-[248px]">
              <img
                src={galleryImages[3]}
                alt="Garden view with sea in background"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow h-[248px]">
              <img
                src={galleryImages[5]} // Using the new image in the 4th position
                alt="Villa interior with traditional design"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
        
        <div className="text-center mt-10">
          <Button 
            className="bg-[#6E59A5] hover:bg-[#6E59A5]/90 text-white flex items-center gap-2"
            onClick={() => setIsCarouselOpen(true)}
          >
            <GalleryHorizontal size={20} />
            <span>Show All Pictures</span>
          </Button>
        </div>

        <GalleryCarousel
          isOpen={isCarouselOpen}
          onClose={() => setIsCarouselOpen(false)}
          images={allImages}
        />
      </div>
    </section>
  );
};

export default GallerySection;
