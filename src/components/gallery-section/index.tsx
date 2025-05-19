/** @jsxRuntime classic */
/** @jsx React.createElement */
/** @jsxFrag React.Fragment */

// @ts-nocheck
import React, { useState, useEffect, useMemo } from "react";
// Button and GalleryHorizontal are no longer directly used here for main actions
import { loadGalleryConfig } from "@/utils/galleryConfigUtils";
import { CATEGORY_KEYWORDS } from "@/config/galleryConfig"; // Corrected import
// CATEGORY_LABELS is used in GalleryMosaic now

import GalleryPreview from './GalleryPreview';
import GalleryMosaic from './GalleryMosaic';

// Moved to GalleryMosaic.tsx
// function getCategoriesForImage(filename: string) { ... }
// function filterImagesByCategory(images, category: string) { ... }

// Helper to add categories to images, used for initial data transformation
function getCategoriesForImage(filename: string, keywordsConfig: Record<string, string[]>) {
  if (!filename) return [];
  const cats = [];
  for (const [cat, keywords] of Object.entries(keywordsConfig)) {
    if (keywords.some(kw => filename.toLowerCase().includes(kw))) {
      cats.push(cat);
    }
  }
  return cats;
}

export const GallerySection = () => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [allImages, setAllImages] = useState<Array<{src: string, categories: string[]}>>([]);
  const [loading, setLoading] = useState(true);

  // Load images from configuration
  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const imagePaths = await loadGalleryConfig();
        const transformedImages = imagePaths.map(src => ({
          src,
          categories: getCategoriesForImage(src, CATEGORY_KEYWORDS) // Use imported CATEGORY_KEYWORDS
        }));
        setAllImages(transformedImages);
      } catch (error) {
        console.error("Failed to load gallery configuration:", error);
        // Set empty array or handle error state for allImages
        setAllImages([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleImageLoad = (src: string) => {
    setLoadedImages(prev => new Set([...prev, src]));
  };

  const handleImageError = (src: string) => {
    setImageErrors(prev => new Set([...prev, src]));
  };

  // renderImage function remains here as it's used by GalleryPreview
  const renderImage = (image: { src: string; alt?: string }, className: string) => (
    <div className={`relative ${className}`}>
      <img
        src={image.src}
        alt={image.alt || ""}
        className={`w-full h-full object-cover transition-transform duration-300 ${
          loadedImages.has(image.src) ? '' : ''
        }`}
        onLoad={() => handleImageLoad(image.src)}
        onError={() => handleImageError(image.src)}
      />
      {!loadedImages.has(image.src) && !imageErrors.has(image.src) && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      {/* Optionally show an error state for the image itself */}
      {imageErrors.has(image.src) && (
        <div className="absolute inset-0 bg-red-100 flex items-center justify-center text-red-500">
          Error
        </div>
      )}
    </div>
  );

  // Prepare the first 5 images for the preview grid, without category filtering
  const previewImagesForGrid = useMemo(() => allImages.slice(0, 5), [allImages]);

  return (
    <section id="gallery" className="py-16 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-light text-center mb-4">Gallery</h2>

        
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <GalleryPreview previewImages={previewImagesForGrid} renderImage={renderImage} />
            <GalleryMosaic allImages={allImages} />
          </>
        )}
      </div>
      
      {/* GalleryCarousel is now rendered inside GalleryMosaic */}
    </section>
  );
}; 