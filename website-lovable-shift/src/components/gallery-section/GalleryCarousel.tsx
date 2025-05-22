/** @jsxRuntime classic */
/** @jsx React.createElement */
/** @jsxFrag React.Fragment */

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
}

interface MasonryItem extends GalleryImage {
  style: React.CSSProperties;
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
  const cats: string[] = [];
  if (!filename) return cats;
  for (const [cat, keywords] of Object.entries(keywordsConfig)) {
    if (keywords.some((kw) => filename.toLowerCase().includes(kw))) {
      cats.push(cat);
    }
  }
  return cats;
}

function filterImagesByCategory(images: GalleryImage[], category: string): GalleryImage[] {
  if (category === "all") return images;
  const keywords = CATEGORY_KEYWORDS[category as keyof typeof CATEGORY_KEYWORDS] || [];
  if (keywords.length === 0) return images;
  return images.filter(({ src }) => keywords.some((kw) => src.toLowerCase().includes(kw)));
}

function getImageCaption(src: string): string {
  if (!src) return "";
  const filename = src.split("/").pop() || "";
  const nameWithoutExt = filename.split(".")[0] || "";
  return nameWithoutExt.replace(/[_-]/g, " ");
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
  const [masonryItems, setMasonryItems] = useState<MasonryItem[]>([]);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [imageDimensionsMap, setImageDimensionsMap] = useState<Record<string, { width: number; height: number }>>({});

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  useEffect(() => {
    setShowGrid(gridMode);
  }, [gridMode]);

  const filteredImages = useMemo(() => filterImagesByCategory(images, selectedCategory), [images, selectedCategory]);
  const imagesForGrid = useMemo(() => (showGrid ? filteredImages : []), [filteredImages, showGrid]);

  useEffect(() => {
    const calculateMasonryLayout = () => {
      if (!showGrid || !galleryRef.current || imagesForGrid.length === 0) {
        setMasonryItems([]);
        if (galleryRef.current) galleryRef.current.style.height = "auto";
        return;
      }

      const galleryWidth = galleryRef.current.offsetWidth;
      const gap = 8;
      let numColumns = 3;
      if (galleryWidth < 640) numColumns = 1;
      else if (galleryWidth < 1024) numColumns = 2;
      else numColumns = 3;

      const columnWidth = (galleryWidth - (numColumns - 1) * gap) / numColumns;
      const columnHeights = Array(numColumns).fill(0);

      const items: MasonryItem[] = imagesForGrid.map((image) => {
        const dimensions = imageDimensionsMap[image.src];
        const aspectRatio = dimensions ? dimensions.width / dimensions.height : 1;
        const safeAspectRatio = aspectRatio && isFinite(aspectRatio) && aspectRatio > 0 ? aspectRatio : 1;
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
            position: "absolute",
            left: x,
            top: y,
            width: columnWidth,
            height: imageHeight,
          },
        };
      });

      setMasonryItems(items);
      if (galleryRef.current) {
        const newHeight = Math.max(...columnHeights);
        galleryRef.current.style.height = newHeight > 0 ? `${newHeight}px` : "auto";
      }
    };

    calculateMasonryLayout();
    window.addEventListener("resize", calculateMasonryLayout);
    return () => window.removeEventListener("resize", calculateMasonryLayout);
  }, [imagesForGrid, showGrid, selectedCategory, imageDimensionsMap]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showGrid) {
        if (e.key === "Escape") onClose();
        return;
      }
      const len = filteredImages.length;
      if (!len) return;
      if (e.key === "ArrowLeft") setCurrentIndex((p) => (p === 0 ? len - 1 : p - 1));
      else if (e.key === "ArrowRight") setCurrentIndex((p) => (p === len - 1 ? 0 : p + 1));
      else if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [filteredImages.length, onClose, showGrid]);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>, src: string) => {
    setLoadedImages((prev) => new Set(prev).add(src));
    const img = e.currentTarget;
    setImageDimensionsMap((prev) => ({ ...prev, [src]: { width: img.naturalWidth, height: img.naturalHeight } }));
  };

  const handleImageError = (src: string) => {
    setImageErrors((prev) => new Set(prev).add(src));
    setImageDimensionsMap((prev) => ({ ...prev, [src]: { width: 100, height: 100 } }));
  };

  const toggleView = () => {
    setShowGrid(!showGrid);
    onToggleView();
  };

  /* ---------------- GRID MODE ---------------- */
  if (showGrid) {
    return (
      <div className="fixed inset-0 z-50 bg-black/90 overflow-y-auto" role="dialog" aria-modal="true" aria-label="Image gallery grid preview">
        <div className="sticky top-0 z-10 w-full bg-black/80 p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-white text-xl font-light self-start sm:self-center">Gallery</h2>
          <div className="flex flex-wrap justify-center gap-2 self-center">
            {categoryLabels.map(({ key, label }) => (
              <Button key={key} variant={selectedCategory === key ? "filterActive" : "filterInactive"} onClick={() => setSelectedCategory(key)}>
                {label}
              </Button>
            ))}
          </div>
          <div className="flex gap-2 self-end sm:self-center">
            <Button variant="outline" size="sm" onClick={toggleView} className="rounded-full bg-transparent border border-white text-white hover:bg-white/30 hover:text-white focus-visible:ring-white" aria-label="Switch to carousel view">
              <Maximize className="h-4 w-4 mr-2" />
              Carousel
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full text-white hover:bg-white/30 hover:text-white focus-visible:ring-white" aria-label="Close gallery">
              <X className="h-6 w-6" />
            </Button>
          </div>
        </div>

        <div className="w-full max-w-6xl px-4 pt-4 pb-8 mx-auto">
          {imagesForGrid.length === 0 && selectedCategory !== "all" ? (
            <div className="text-center text-gray-400 py-10">
              No images found for the selected category "{categoryLabels.find((cl) => cl.key === selectedCategory)?.label || selectedCategory}".
            </div>
          ) : (
            <div ref={galleryRef} className="relative">
              {masonryItems.map((item, idx) => {
                const originalIndex = filteredImages.findIndex((img) => img.src === item.src);
                return (
                  <div
                    key={item.src + idx}
                    style={item.style}
                    className="rounded-md overflow-hidden cursor-pointer hover:brightness-105 transition-all delay-200 bg-gray-700 group"
                    onClick={() => {
                      setCurrentIndex(originalIndex !== -1 ? originalIndex : 0);
                      setShowGrid(false);
                      onToggleView();
                    }}
                    tabIndex={0}
                    aria-label={`Open image ${item.alt || "Gallery image"} in carousel`}
                  >
                    <div className="relative w-full h-full">
                      <img
                        src={item.src}
                        alt={item.alt || `Gallery image ${idx + 1}`}
                        className="w-full h-full block object-cover"
                        onLoad={(e) => handleImageLoad(e, item.src)}
                        onError={() => handleImageError(item.src)}
                        style={{ display: loadedImages.has(item.src) ? "block" : "none" }}
                      />
                      {(!loadedImages.has(item.src) || !imageDimensionsMap[item.src]) && !imageErrors.has(item.src) && <div className="absolute inset-0 bg-gray-800 animate-pulse w-full h-full" />}
                      {imageErrors.has(item.src) && <div className="absolute inset-0 bg-gray-900 flex items-center justify-center text-gray-400 w-full h-full">Image not available</div>}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent py-1 pb-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-200 font-light text-sm truncate text-center">
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

  /* ---------------- CAROUSEL MODE ---------------- */
  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" role="dialog" aria-modal="true" aria-label="Image carousel">
      <div className="absolute top-0 left-0 right-0 p-4 z-10 flex flex-col sm:flex-row items-center gap-4">
        <h2 className="text-white text-xl font-light self-start">Gallery</h2>
        <div className="flex flex-wrap justify-center gap-2 sm:flex-1">
          {categoryLabels.map(({ key, label }) => (
            <Button key={key} variant={selectedCategory === key ? "filterActive" : "filterInactive"} onClick={() => { setSelectedCategory(key); setCurrentIndex(0); }}>
              {label}
            </Button>
          ))}
        </div>
      </div>

      <div className="absolute top-0 right-0 p-4 z-10 flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={toggleView} className="rounded-full bg-black/50 border border-white text-white hover:bg-white/30 hover:text-white focus-visible:ring-white" aria-label="Switch to grid view">
          <LayoutGrid className="h-4 w-4 mr-2" />
          Grid
        </Button>
        <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full bg-black/50 text-white hover:bg-white/30 hover:text-white focus_visible:ring-white" aria-label="Close gallery">
          <X className="h-6 w-6" />
        </Button>
      </div>

      <button className="absolute left-4 top-1/2 -translate-y-1/2 p-2 z-10 rounded-full bg-black/50 text-white hover:bg-black/70 transition" onClick={() => setCurrentIndex((prev) => (prev === 0 ? filteredImages.length - 1 : prev - 1))} aria-label="Previous image">
        <ChevronLeft size={24} />
      </button>

      <div className="h-full w-full flex items-center justify-center">
        <div className="relative h-full w-full flex items-center justify-center">
          {filteredImages[currentIndex] && <img src={filteredImages[currentIndex].src} alt={filteredImages[currentIndex].alt || `Gallery image ${currentIndex + 1} of ${filteredImages.length}`} className="max-h-screen max-w-full w-auto h-auto object-contain" onLoad={(e) => handleImageLoad(e, filteredImages[currentIndex].src)} onError={() => handleImageError(filteredImages[currentIndex].src)} />}
          {filteredImages[currentIndex] && !loadedImages.has(filteredImages[currentIndex].src) && !imageErrors.has(filteredImages[currentIndex].src) && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          {filteredImages[currentIndex] && imageErrors.has(filteredImages[currentIndex].src) && <div className="absolute inset-0 flex items-center justify-center text-white">Failed to load image</div>}
        </div>
      </div>

      <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2 z-10 rounded-full bg-black/50 text-white hover:bg-black/70 transition" onClick={() => setCurrentIndex((prev) => (prev === filteredImages.length - 1 ? 0 : prev + 1))} aria-label="Next image">
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default GalleryCarousel;
