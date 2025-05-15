import { useState, useEffect, useMemo } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GalleryImage { src: string; alt?: string; }
interface GalleryCarouselProps {
  isOpen: boolean;
  onClose: () => void;
  images: GalleryImage[];
  initialIndex?: number;
  gridMode?: boolean;
}

const COLUMN_WIDTH = 320; // px, adjust as needed

// --- Dynamic Categorization ---
const CATEGORY_KEYWORDS = {
  interior: ["livingroom", "kitchen", "bathroom", "interior"],
  exterior: ["exterior", "garden", "view", "yard", "patio", "terrace", "stone", "path"],
  sifnos: ["sifnos", "island", "apollonia", "vathi", "beach"]
};
const CATEGORY_LABELS = [
  { key: "all", label: "All" },
  { key: "interior", label: "Interior" },
  { key: "exterior", label: "Exterior" },
  { key: "sifnos", label: "Sifnos" }
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

function filterImagesByCategory(images: GalleryImage[], category: string) {
  if (category === "all") return images;
  return images.filter(img => getCategoriesForImage(img.src).includes(category));
}

const GalleryCarousel = ({
  isOpen,
  onClose,
  images,
  initialIndex = 0,
  gridMode = false,
}: GalleryCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [showGrid, setShowGrid] = useState(gridMode);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredImages = useMemo(() => filterImagesByCategory(images, selectedCategory), [images, selectedCategory]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    setShowGrid(gridMode);
  }, [gridMode, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (showGrid) {
        if (e.key === "Escape") {
          onClose();
        }
        return;
      }
      if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev === 0 ? filteredImages.length - 1 : prev - 1));
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev === filteredImages.length - 1 ? 0 : prev + 1));
      } else if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredImages.length, onClose, showGrid]);

  const handleImageLoad = (src: string) => {
    setLoadedImages(prev => new Set([...prev, src]));
  };

  const handleImageError = (src: string) => {
    setImageErrors(prev => new Set([...prev, src]));
  };

  if (!isOpen) return null;

  // Grid preview mode
  if (showGrid) {
    return (
      <div
        className="fixed inset-0 z-50 bg-black/90 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-label="Image gallery grid preview"
      >
        <div className="flex justify-center gap-4 mb-8 pt-8">
          {CATEGORY_LABELS.map(cat => (
            <Button
              key={cat.key}
              variant={selectedCategory === cat.key ? "filterActive" : "filterInactive"}
              size="pill"
              onClick={() => {
                setSelectedCategory(cat.key);
                setCurrentIndex(0);
              }}
            >
              {cat.label}
            </Button>
          ))}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
          aria-label="Close gallery"
        >
          <X size={32} />
        </Button>
        <div className="w-full max-w-5xl px-4 pt-8 pb-4 mx-auto">
          <div className="masonry-gallery">
            {filteredImages.map((img, idx) => (
              <div
                key={img.src}
                className="mb-[5px] rounded overflow-hidden cursor-pointer"
                style={{ width: '100%', display: 'block' }}
                onClick={() => {
                  setCurrentIndex(idx);
                  setShowGrid(false);
                }}
                tabIndex={0}
                aria-label={`Open image ${idx + 1} in carousel`}
              >
                <img
                  src={img.src}
                  alt={img.alt || `Gallery image ${idx + 1} of ${images.length}`}
                  className="w-full block object-cover transition-transform duration-200"
                  style={{ transform: 'scale(1.15)', transformOrigin: 'center center', height: 'auto' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1.15)')}
                  onLoad={() => handleImageLoad(img.src)}
                  onError={() => handleImageError(img.src)}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8 mb-4">
            <Button
              variant="rounded"
              size="pill"
              onClick={onClose}
              aria-label="Close gallery"
            >
              <X size={24} />
            </Button>
          </div>
        </div>
        <style>{`
          .masonry-gallery {
            column-count: 2;
            column-gap: 5px;
          }
          @media (max-width: 640px) {
            .masonry-gallery {
              column-count: 1;
            }
          }
          .masonry-gallery img {
            width: 100%;
            display: block;
            margin-bottom: 5px;
            border-radius: 6px;
          }
        `}</style>
      </div>
    );
  }

  // Carousel mode
  return (
    <div 
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery"
    >
      <div className="flex justify-center gap-4 absolute top-4 left-0 right-0 z-50">
        {CATEGORY_LABELS.map(cat => (
          <Button
            key={cat.key}
            variant={selectedCategory === cat.key ? "filterActive" : "filterInactive"}
            size="pill"
            onClick={() => {
              setSelectedCategory(cat.key);
              setCurrentIndex(0);
            }}
          >
            {cat.label}
          </Button>
        ))}
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
        aria-label="Close gallery"
      >
        <X size={32} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setCurrentIndex((prev) => (prev === 0 ? filteredImages.length - 1 : prev - 1))}
        className="absolute left-4 text-white hover:text-gray-300 z-50"
        aria-label="Previous image"
      >
        <ChevronLeft size={48} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setCurrentIndex((prev) => (prev === filteredImages.length - 1 ? 0 : prev + 1))}
        className="absolute right-4 text-white hover:text-gray-300 z-50"
        aria-label="Next image"
      >
        <ChevronRight size={48} />
      </Button>
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="relative">
          <img
            src={filteredImages[currentIndex]?.src}
            alt={filteredImages[currentIndex]?.alt || `Gallery image ${currentIndex + 1} of ${filteredImages.length}`}
            className={`max-h-[90vh] max-w-[90vw] object-contain transition-opacity duration-300 ${
              loadedImages.has(filteredImages[currentIndex]?.src) ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => handleImageLoad(filteredImages[currentIndex]?.src)}
            onError={() => handleImageError(filteredImages[currentIndex]?.src)}
          />
          <div className="text-center text-white text-lg mt-4">
            {filteredImages[currentIndex]?.alt || 
              filteredImages[currentIndex]?.src
                .split('/')
                .pop()
                ?.replace('.webp', '')
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')
            }
          </div>
          {!loadedImages.has(filteredImages[currentIndex]?.src) && !imageErrors.has(filteredImages[currentIndex]?.src) && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          {imageErrors.has(filteredImages[currentIndex]?.src) && (
            <div className="absolute inset-0 flex items-center justify-center text-white">
              Failed to load image
            </div>
          )}
        </div>
      </div>
      <div 
        className="absolute bottom-4 left-0 right-0 flex justify-center gap-2"
        role="tablist"
        aria-label="Gallery navigation"
      >
        {filteredImages.map((_, index) => (
          <Button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 p-0 min-h-0 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
            variant="ghost"
            size="icon"
            role="tab"
            aria-selected={index === currentIndex}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
      <Button
        variant="transparentRounded"
        size="pill"
        onClick={() => setShowGrid(true)}
        className="absolute top-4 left-4 z-50"
        aria-label="Back to grid preview"
      >
        Grid view
      </Button>
    </div>
  );
};

export default GalleryCarousel; 