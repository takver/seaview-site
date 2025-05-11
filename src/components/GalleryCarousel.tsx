import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryCarouselProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  initialIndex?: number;
  gridMode?: boolean;
}

const COLUMN_WIDTH = 320; // px, adjust as needed

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
      if (!isOpen || showGrid) return;
      if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      } else if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, images.length, onClose, showGrid]);

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
        className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-label="Image gallery grid preview"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
          aria-label="Close gallery"
        >
          <X size={32} />
        </button>
        <div className="w-full max-w-5xl px-4 py-8">
          <div className="masonry-gallery">
            {images.map((src, idx) => (
              <img
                key={src}
                src={src}
                alt={`Gallery image ${idx + 1} of ${images.length}`}
                className="mb-[5px] rounded cursor-pointer transition-transform duration-200 hover:scale-105"
                style={{ width: '100%', display: 'block' }}
                onClick={() => {
                  setCurrentIndex(idx);
                  setShowGrid(false);
                }}
                tabIndex={0}
                aria-label={`Open image ${idx + 1} in carousel`}
                onLoad={() => handleImageLoad(src)}
                onError={() => handleImageError(src)}
              />
            ))}
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
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
        aria-label="Close gallery"
      >
        <X size={32} />
      </button>
      <button
        onClick={() => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
        className="absolute left-4 text-white hover:text-gray-300 z-50"
        aria-label="Previous image"
      >
        <ChevronLeft size={48} />
      </button>
      <button
        onClick={() => setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
        className="absolute right-4 text-white hover:text-gray-300 z-50"
        aria-label="Next image"
      >
        <ChevronRight size={48} />
      </button>
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="relative">
          <img
            src={images[currentIndex]}
            alt={`Gallery image ${currentIndex + 1} of ${images.length}`}
            className={`max-h-[90vh] max-w-[90vw] object-contain transition-opacity duration-300 ${
              loadedImages.has(images[currentIndex]) ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => handleImageLoad(images[currentIndex])}
            onError={() => handleImageError(images[currentIndex])}
          />
          {!loadedImages.has(images[currentIndex]) && !imageErrors.has(images[currentIndex]) && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          {imageErrors.has(images[currentIndex]) && (
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
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
            role="tab"
            aria-selected={index === currentIndex}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
      <div className="absolute bottom-16 left-0 right-0 text-center text-white/70 text-sm">
        Use arrow keys or click the dots to navigate
      </div>
      <button
        onClick={() => setShowGrid(true)}
        className="absolute top-4 left-4 text-white bg-black/60 px-3 py-1 rounded hover:bg-black/80 z-50"
        aria-label="Back to grid preview"
      >
        Grid view
      </button>
    </div>
  );
};

export default GalleryCarousel; 