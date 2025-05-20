/** @jsxRuntime classic */
/** @jsx React.createElement */
/** @jsxFrag React.Fragment */

// @ts-nocheck
import React, { useState, useEffect, useMemo, useRef } from "react";
import { X, ChevronLeft, ChevronRight, LayoutGrid, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CATEGORY_KEYWORDS } from "@/config/galleryConfig";

interface CategoryLabel {
  key: string;
  label: string;
}

interface GalleryImage { 
  src: string; 
  alt?: string;
  categories?: string[]; 
  // width and height are now primarily for initial estimates if needed, actual dimensions will be read from loaded images
  // width?: number; 
  // height?: number;
}

interface GalleryCarouselProps {
  images: GalleryImage[];
  onClose: () => void;
  gridMode?: boolean;
  onToggleView: () => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categoryLabels: CategoryLabel[];
}

function getCategoriesForImage(filename: string, keywordsConfig: Record<string, string[]> = CATEGORY_KEYWORDS): string[] {
  const cats: string[] = []; // Explicitly type cats
  if (!filename) return cats;
  for (const [cat, keywords] of Object.entries(keywordsConfig)) {
    if (keywords.some(kw => filename.toLowerCase().includes(kw))) {
      cats.push(cat);
    }
  }
  return cats;
}

function filterImagesByCategory(images: GalleryImage[], category: string): GalleryImage[] {
  if (category === "all") return images;
  return images.filter(img => 
    (img.categories || getCategoriesForImage(img.src)).includes(category)
  );
}

function getImageCaption(src: string): string {
  if (!src) return '';
  // Extract filename from path
  const filename = src.split('/').pop() || '';
  // Remove file extension
  const nameWithoutExt = filename.split('.')[0] || '';
  // Replace underscores and hyphens with spaces
  return nameWithoutExt.replace(/[_-]/g, ' ');
}

const GalleryCarousel: React.FC<GalleryCarouselProps> = ({
  images,
  onClose,
  gridMode = false,
  onToggleView,
  selectedCategory,
  setSelectedCategory,
  categoryLabels,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [showGrid, setShowGrid] = useState(gridMode);
  const [masonryItems, setMasonryItems] = useState([]);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [imageDimensionsMap, setImageDimensionsMap] = useState<Record<string, {width: number, height: number}>>({});

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  useEffect(() => {
    setShowGrid(gridMode);
  }, [gridMode]);

  const imagesForGrid = useMemo(() => {
    if (!showGrid) return [];
    const imagesWithCats = images.map(img => ({
      ...img,
      categories: img.categories || getCategoriesForImage(img.src)
    }));
    return filterImagesByCategory(imagesWithCats, selectedCategory);
  }, [images, selectedCategory, showGrid]);

  useEffect(() => {
    const calculateMasonryLayout = () => {
      if (!showGrid || !galleryRef.current || imagesForGrid.length === 0) {
        setMasonryItems([]);
        if (galleryRef.current) galleryRef.current.style.height = 'auto'; // Reset height
        return;
      }

      const galleryWidth = galleryRef.current.offsetWidth;
      const gap = 8;
      let numColumns = 3;
      if (galleryWidth < 640) numColumns = 1;
      else if (galleryWidth < 1024) numColumns = 2;

      const columnWidth = (galleryWidth - (numColumns - 1) * gap) / numColumns;
      const columnHeights = Array(numColumns).fill(0);
      
      const items = imagesForGrid.map((image) => {
        const dimensions = imageDimensionsMap[image.src];
        // Use actual aspect ratio if image dimensions are loaded, otherwise default (e.g., 1:1 or 3:2 for placeholder)
        // Using 1:1 as a more neutral placeholder before load might be better than landscape bias.
        const aspectRatio = (dimensions) ? dimensions.width / dimensions.height : 1; // Default to 1:1 if not loaded
        
        // If aspect ratio is 0 or invalid, use a fallback to prevent division by zero or extreme sizes
        const safeAspectRatio = (aspectRatio && isFinite(aspectRatio) && aspectRatio > 0) ? aspectRatio : 1;
        const imageHeight = columnWidth / safeAspectRatio;

        let shortestColumnIndex = 0;
        for (let i = 1; i < numColumns; i++) {
          if (columnHeights[i] < columnHeights[shortestColumnIndex]) {
            shortestColumnIndex = i;
          }
        }
        
        const x = shortestColumnIndex * (columnWidth + gap);
        const y = columnHeights[shortestColumnIndex];
        
        columnHeights[shortestColumnIndex] += imageHeight + gap;
        
        return {
          ...image,
          style: {
            position: 'absolute',
            left: x,
            top: y,
            width: columnWidth,
            // height will be set by the image itself fitting into the width, or by explicit height for placeholder
            height: imageHeight, 
          },
        };
      });
      
      setMasonryItems(items);
      if (galleryRef.current) {
        const newContainerHeight = Math.max(...columnHeights);
        galleryRef.current.style.height = newContainerHeight > 0 ? `${newContainerHeight}px` : 'auto';
      }
    };

    calculateMasonryLayout();
    // Consider adding a debounce to the resize listener if performance issues arise
    window.addEventListener('resize', calculateMasonryLayout);
    return () => window.removeEventListener('resize', calculateMasonryLayout);
  }, [imagesForGrid, showGrid, selectedCategory, imageDimensionsMap]); // Added imageDimensionsMap

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showGrid) {
        if (e.key === "Escape") {
          onClose();
        }
        return;
      }
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
  }, [images.length, onClose, showGrid]);

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>, src: string) => {
    setLoadedImages(prev => new Set(prev).add(src));
    const img = event.currentTarget;
    setImageDimensionsMap(prevMap => ({
      ...prevMap,
      [src]: { width: img.naturalWidth, height: img.naturalHeight },
    }));
  };

  const handleImageError = (src: string) => {
    setImageErrors(prev => new Set(prev).add(src));
     // Optionally, set placeholder dimensions for errored images too
    setImageDimensionsMap(prevMap => ({
      ...prevMap,
      [src]: { width: 100, height: 100 }, // Example placeholder for errored image
    }));
  };
  
  const toggleView = () => {
    setShowGrid(!showGrid);
    onToggleView();
  };

  if (showGrid) {
    return (
      <div
        className="fixed inset-0 z-50 bg-black/90 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-label="Image gallery grid preview"
      >
        <div className="sticky top-0 z-10 w-full bg-black/80 p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-white text-xl font-light self-start sm:self-center">Gallery</h2>
          <div className="flex flex-wrap justify-center gap-2 self-center">
            {categoryLabels.map(({ key, label }) => (
              <Button
                key={key}
                variant={selectedCategory === key ? "filterActive" : "filterInactive"}
                onClick={() => setSelectedCategory(key)}
              >
                {label}
              </Button>
            ))}
          </div>
          <div className="flex gap-2 self-end sm:self-center">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleView}
              className="rounded-full bg-transparent border border-white text-white hover:bg-white/30 hover:text-white focus-visible:ring-white"
              aria-label="Switch to carousel view"
            >
              <Maximize className="h-4 w-4 mr-2" />
              Carousel
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full text-white hover:bg-white/30 hover:text-white focus-visible:ring-white"
              aria-label="Close gallery"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
        </div>
        
        <div className="w-full max-w-6xl px-4 pt-4 pb-8 mx-auto">
          {imagesForGrid.length === 0 && selectedCategory !== "all" ? (
            <div className="text-center text-gray-400 py-10">
              No images found for the selected category "{categoryLabels.find(cl => cl.key === selectedCategory)?.label || selectedCategory}".
            </div>
          ) : (
            <div ref={galleryRef} className="relative"> 
              {masonryItems.map((item, idx) => { 
                const originalIndex = images.findIndex(originalImg => originalImg.src === item.src);
                return (
                  <div
                    key={item.src + idx}
                    style={item.style}
                    className="rounded-md overflow-hidden cursor-pointer hover:opacity-90 transition-opacity bg-gray-700 group" // Added 'group' class for hover effect
                    onClick={() => {
                      setCurrentIndex(originalIndex !== -1 ? originalIndex : 0);
                      setShowGrid(false); 
                      onToggleView(); 
                    }}
                    tabIndex={0}
                    aria-label={`Open image ${item.alt || 'Gallery image'} in carousel`}
                  >
                    <div className="relative w-full h-full">
                      <img
                        src={item.src}
                        alt={item.alt || `Gallery image ${idx + 1}`}
                        className="w-full h-full block object-cover" 
                        onLoad={(e) => handleImageLoad(e, item.src)}
                        onError={() => handleImageError(item.src)}
                        style={{ display: loadedImages.has(item.src) ? 'block' : 'none' }} // Hide until loaded to prevent ugly reflow
                      />
                      {(!loadedImages.has(item.src) || !imageDimensionsMap[item.src]) && !imageErrors.has(item.src) && (
                        <div className="absolute inset-0 bg-gray-800 animate-pulse w-full h-full" /> // Ensure pulse takes full item style height
                      )}
                      {imageErrors.has(item.src) && (
                        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center text-gray-400 w-full h-full">
                          Image not available
                        </div>
                      )}
                      {/* Image caption - only shown on hover */}
                      <div className="absolute bottom-0 left-0 right-0 bg-black/40 py-1 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-light text-sm truncate text-center">
                        {getImageCaption(item.src)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Image carousel"
    >
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
        <div className="text-white text-sm">
          {currentIndex + 1} / {images.length}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleView}
            className="rounded-full bg-transparent border border-white text-white hover:bg-white/30 hover:text-white focus-visible:ring-white"
            aria-label="Switch to grid view"
          >
            <LayoutGrid className="h-4 w-4 mr-2" />
            Grid
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full text-white hover:bg-white/30 hover:text-white focus-visible:ring-white"
            aria-label="Close gallery"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition"
        onClick={() => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
        aria-label="Previous image"
      >
        <ChevronLeft size={24} />
      </button>

      <div className="max-w-5xl max-h-[85vh] px-16 relative">
        <div className="relative">
          {images[currentIndex] && (
            <img
              src={images[currentIndex].src}
              alt={images[currentIndex].alt || `Gallery image ${currentIndex + 1} of ${images.length}`}
              className="max-h-[80vh] mx-auto object-contain"
              onLoad={(e) => handleImageLoad(e, images[currentIndex].src)} // Pass event here too
              onError={() => handleImageError(images[currentIndex].src)}
            />
          )}
          {/* Updated loading/error state for carousel view to match consistency */}
          {images[currentIndex] && !loadedImages.has(images[currentIndex].src) && !imageErrors.has(images[currentIndex].src) && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          {images[currentIndex] && imageErrors.has(images[currentIndex].src) && (
            <div className="absolute inset-0 flex items-center justify-center text-white">
              Failed to load image
            </div>
          )}
        </div>
      </div>

      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition"
        onClick={() => setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
        aria-label="Next image"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default GalleryCarousel; 