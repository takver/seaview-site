import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { GalleryHorizontal } from "lucide-react";
import GalleryCarousel from "../GalleryCarousel";

// Combine all images, removing duplicates based on src
const initialImages = [
  "/images/exterior-east-side.webp",
  "/images/garden-path-st-john-evening.webp",
  "/images/livingroom-tripod-camera-seats.webp",
  "/images/kitchen-view-patio-st-john.webp",
  "/images/exterior-white-house-olive.webp",
  "/images/bathroom-gold-shower-sink.webp",
  "/images/view-st-john-bright.webp",
  "/images/livingroom-archway-sunbeam.webp",
  "/images/livingroom-carved-cabinet-window.webp",
  "/images/kitchen-island-amber-pendants.webp",
  "/images/interior-brass-lantern-cabinet.webp",
  "/images/interior-hat-hook-windowview.webp",
  "/images/view-st-john-bright.webp",
  "/images/garden-sunset-herbs-view.webp",
  "/images/garden-central-path-morning.webp",
  "/images/bathroom-gold-shower-mirror.webp",
  "/images/plan-floor-topographic-sketch.webp",
  "/images/garden-night-path-uplights.webp",
  "/images/closeup-brass-lantern-detail.webp",
  "/images/exterior-rouster-flowers.webp",
  "/images/garden-curved-path-sunset.webp",
  "/images/bathroom-modern-wall-mounted-mixer.webp",
  "/images/livingroom-sofa-tripod-lamp.webp",
  "/images/exterior-garden-steps-shaded-path.webp",
  "/images/exterior-stairs-shadow-light-angle.webp",
  "/images/exterior-white-pergola-archway.webp",
  "/images/garden-night-lit-path.webp",
  "/images/garden-olive-tree-seating.webp",
  "/images/garden-path-south-view.webp",
  "/images/garden-path-spring.webp",
  "/images/garden-path-st-john-2.webp",
  "/images/garden-tree-round-stonebed.webp",
  "/images/livingroom-blue-windows-bamboo-seating.webp",
  "/images/sifnos-coast-rocks-steps.jpg",
  "/images/sifnos-trail-1-32.webp"
];

const applianceImages = [
  "/images/kitchen-appliance-stove-pot-pan.webp",
  "/images/appliance-clothes-washer-bosch.webp",
  "/images/kitchen-appliance-smeg-burners-closeup.webp",
  "/images/kitchen-appliance-smeg-gas-cooktop.webp",
  "/images/kitchen-appliance-retro-cream-fridge.webp",
  "/images/kitchen-appliance-dishwasher-drawer-open.webp"
];

const allImages = Array.from(new Set([...initialImages, ...applianceImages]));

// --- Dynamic Categorization ---
const CATEGORY_KEYWORDS = {
  interior: ["bedroom", "livingroom", "kitchen", "bathroom", "interior", "kitchen-appliance-stove-pot-pan", "kitchen-appliance-smeg-burners-closeup", "kitchen-appliance-smeg-gas-cooktop", "kitchen-appliance-retro-cream-fridge", "kitchen-appliance-dishwasher-drawer-open", "appliance-clothes-washer-bosch"],
  exterior: ["exterior", "garden", "view", "yard", "patio", "terrace", "stone", "path", "st-john", "stjohn"],
  sifnos: ["sifnos", "island", "apollonia", "vathi", "beach"],
  "kitchen-appliances": [
    "kitchen-appliance-stove-pot-pan",
    "kitchen-appliance-smeg-burners-closeup",
    "kitchen-appliance-smeg-gas-cooktop",
    "kitchen-appliance-retro-cream-fridge",
    "kitchen-appliance-dishwasher-drawer-open",
    "appliance-clothes-washer-bosch"
  ],
};

const CATEGORY_LABELS = [
  { key: "all", label: "All" },
  { key: "interior", label: "Interior" },
  { key: "exterior", label: "Exterior" },
  { key: "sifnos", label: "Sifnos" },
  { key: "kitchen-appliances", label: "Kitchen Appliances" },
];

function getCategoriesForImage(filename: string) {
  const cats = [];
  for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some(kw => filename.toLowerCase().includes(kw))) {
      cats.push(cat);
    }
  }
  return cats;
}

const categorizedImages = allImages.map(src => {
  const categories = getCategoriesForImage(src);
  return { src, categories };
});

function filterImagesByCategory(category: string) {
  if (category === "all") return categorizedImages;
  if (category === "kitchen-appliances") {
    return categorizedImages.filter(img => img.categories.includes("kitchen-appliances"));
  }
  // For other categories, exclude kitchen appliances from the top 5
  return categorizedImages.filter(
    img => img.categories.includes(category) && !img.categories.includes("kitchen-appliances")
  );
}

export const GallerySection = () => {
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [carouselGridMode, setCarouselGridMode] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const filteredImages = useMemo(() => filterImagesByCategory(selectedCategory), [selectedCategory]);

  const handleImageLoad = (src: string) => {
    setLoadedImages(prev => new Set([...prev, src]));
  };

  const handleImageError = (src: string) => {
    setImageErrors(prev => new Set([...prev, src]));
  };

  const renderImage = (image: { src: string; alt?: string }, className: string) => (
    <div className={`relative ${className}`}>
      <img
        src={image.src}
        alt={image.alt || ""}
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
        {/* Main grid preview (uses filteredImages) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-[4px]">
          <div className="md:col-span-7 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow h-[500px]">
            {filteredImages[0] && renderImage({ src: filteredImages[0].src }, "h-full")}
          </div>
          <div className="md:col-span-5 grid grid-cols-2 gap-[4px] h-[500px]">
            {filteredImages.slice(1, 5).map((img) => (
              <div key={img.src} className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow h-[248px]">
                {renderImage({ src: img.src }, "h-full")}
              </div>
            ))}
          </div>
        </div>
        <div className="text-center mt-10">
          <Button
            variant="rounded"
            size="pill"
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
          images={filteredImages}
          gridMode={carouselGridMode}
          initialIndex={0}
        />
      </div>
    </section>
  );
}; 