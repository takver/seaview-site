
import { useState, useEffect } from "react";
import { Button } from "./ui/button";

const images = [
  "/images/DSC09508-scaled.webp",
  "/images/DSC09522-scaled.webp",
  "/images/DSC09537-scaled.webp",
  "/images/IMG_0330-scaled.webp",
  "/images/IMG_0379.webp",
  "/images/IMG_0380-scaled.webp",
  "/images/IMG_0383-scaled.webp",
  "/images/IMG_0389-scaled.webp",
  "/images/474913028.webp",
  "/images/474913331.webp",
  "/images/BLD-E1.webp",
  "/images/GA1-IMG_0393-E-scaled.webp"
];

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [nextImage, setNextImage] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [panDirections, setPanDirections] = useState<{x: number, y: number}[]>([]);

  // Generate random pan directions for each image
  useEffect(() => {
    const directions = images.map(() => {
      // Generate random values between -1 and 1 for x and y directions
      return {
        x: (Math.random() * 2 - 1) * 0.05, // Scale down to subtle movement
        y: (Math.random() * 2 - 1) * 0.05  // Scale down to subtle movement
      };
    });
    setPanDirections(directions);
  }, []);

  // Auto-rotate images with smoother transition
  useEffect(() => {
    const interval = setInterval(() => {
      // Prepare the next image
      const next = (currentImage + 1) % images.length;
      setNextImage(next);
      setTransitioning(true);
      
      // After a short delay, complete the transition
      setTimeout(() => {
        setCurrentImage(next);
        setTransitioning(false);
      }, 1000); // 1s transition time
    }, 12000); // 12s display time
    
    return () => {
      clearInterval(interval);
    };
  }, [currentImage]);

  const handleIndicatorClick = (index: number) => {
    if (index !== currentImage) {
      setNextImage(index);
      setTransitioning(true);
      
      setTimeout(() => {
        setCurrentImage(index);
        setTransitioning(false);
      }, 1000);
    }
  };

  return (
    <div className="relative h-[500px] md:h-[600px] lg:h-[700px] w-full overflow-hidden">
      {/* Image Carousel */}
      {images.map((image, index) => {
        // Show current image and next image during transition
        const isVisible = index === currentImage || (transitioning && index === nextImage);
        
        // Get this image's pan directions or default to no pan
        const panDirection = panDirections[index] || { x: 0, y: 0 };
        
        return (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              isVisible ? "opacity-100" : "opacity-0"
            } ${index === nextImage && transitioning ? "z-10" : "z-0"}`}
          >
            <div className="w-full h-full overflow-hidden">
              <img
                src={image}
                alt={`Sifnos Seaview property ${index + 1}`}
                className={`object-cover w-full h-full transform-gpu ${
                  isVisible ? "animate-slow-zoom-pan" : ""
                }`}
                style={{
                  transformOrigin: `${50 + panDirection.x * 100}% ${50 + panDirection.y * 100}%`
                }}
              />
            </div>
          </div>
        );
      })}

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-black/40 z-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          Welcome to Sifnos Seaview
        </h1>
        <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl">
          Experience the beauty of Sifnos from our beautiful property with stunning sea views
        </p>
        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
          Book Your Stay
        </Button>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2 overflow-x-auto px-4 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentImage ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => handleIndicatorClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
