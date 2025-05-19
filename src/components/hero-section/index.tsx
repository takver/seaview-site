// @ts-nocheck
import React, { useState, useEffect, FC } from "react";
import { Button } from "../ui/button";

// Updated images array to match the order in the reference image
const images = [
  "/images/exterior-white-house-olive.webp",
  "/images/kitchen-island-amber-pendants.webp",
  "/images/bedroom-rustic-wood-bed.webp",
  "/images/kitchen-view-patio-st-john.webp",
  "/images/view-st-john-bright.webp",
  "/images/garden-path-st-john-evening.webp",
  "/images/garden-night-lit-path.webp",
  "/images/exterior-garden-steps-shaded-path.webp",
  "/images/closeup-brass-lantern-detail.webp",
  "/images/exterior-rouster-flowers.webp",
  "/images/bathroom-modern-wall-mounted-mixer.webp",
  "/images/garden-curved-path-sunset.webp"
];

export const HeroSection: FC = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [nextImage, setNextImage] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [panDirections, setPanDirections] = useState<{x: number, y: number}[]>([]);

  // Generate more subtle pan directions for each image to avoid showing edges
  useEffect(() => {
    const directions = images.map(() => {
      // Generate random values with reduced max movement to prevent edge exposure
      return {
        x: (Math.random() * 2 - 1) * 5, // 5% movement in x direction (reduced from 8%)
        y: (Math.random() * 1.5 - 0.5) * 3  // 3% movement in y direction (reduced from 5%)
      };
    });
    setPanDirections(directions);
  }, []);

  // Auto-rotate images with smoother transition and reduced display time
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
    }, 8000); // 8s display time
    
    return () => {
      clearInterval(interval);
    };
  }, [currentImage]);

  return (
    <div className="relative h-[500px] md:h-[600px] lg:h-[700px] w-full overflow-hidden mt-[-5px]">
      {/* Image Carousel */}
      {images.map((image, index) => {
        // Show current image and next image during transition
        const isVisible = index === currentImage || (transitioning && index === nextImage);
        
        // Get this image's pan directions or default to no pan
        const panDirection = panDirections[index] || { x: 0, y: 0 };
        
        // Debug the pan values
        if (isVisible) {
          console.log(`Image ${index} pan: x=${panDirection.x}%, y=${panDirection.y}%`);
        }
        
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
                  isVisible ? "animate-dynamic-zoom-pan" : ""
                }`}
                style={{
                  '--pan-x': `${panDirection.x}%`,
                  '--pan-y': `${panDirection.y}%`,
                  transformOrigin: `center center`
                } as React.CSSProperties}
              />
            </div>
          </div>
        );
      })}

      {/* Content Overlay - Now a square on the left side with darker olive-green tint background */}
      <div className="absolute left-8 md:left-16 lg:left-24 top-1/2 transform -translate-y-1/2 max-w-md p-8 bg-[rgba(90,110,80,0.4)] z-20">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4">
          Eco-Luxury Retreat With Sea View
        </h1>
        <p className="text-lg md:text-xl text-white mb-6">
          An Exceptional Sanctuary in Ano Petali Village
        </p>
        <Button 
          size="lg" 
          variant="transparentRounded"
          className="px-8"
        >
          Check Availability
        </Button>
      </div>
    </div>
  );
}; 