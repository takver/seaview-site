/** @jsxRuntime classic */
/** @jsx React.createElement */
/** @jsxFrag React.Fragment */

// @ts-nocheck
import React, { useState, useEffect, useMemo } from "react";
// Button and GalleryHorizontal are no longer directly used here for main actions
import { loadMainGalleryConfig, getPreviewHomepageImages } from "@/utils/galleryConfigUtils";
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
  
  const [allGalleryImages, setAllGalleryImages] = useState<Array<{src: string, categories: string[]}>>([]); // For Mosaic
  const [previewDisplayImages, setPreviewDisplayImages] = useState<Array<{src: string}>>([]); // For Preview
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        // Fetch images for the main mosaic/carousel gallery
        const mainGalleryPaths = await loadMainGalleryConfig();
        const transformedMainGallery = mainGalleryPaths.map(src => ({
          src,
          categories: getCategoriesForImage(src, CATEGORY_KEYWORDS)
        }));
        setAllGalleryImages(transformedMainGallery);

        // Fetch images for the homepage preview
        const previewPaths = getPreviewHomepageImages(); // This is synchronous
        const transformedPreview = previewPaths.map(src => ({ src })); // Preview doesn't need categories prop
        setPreviewDisplayImages(transformedPreview);

      } catch (error) {
        console.error("Failed to load gallery configurations:", error);
        setAllGalleryImages([]); 
        setPreviewDisplayImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const handleImageLoad = (src: string) => {
    setLoadedImages(prev => new Set([...prev, src]));
  };

  const handleImageError = (src: string) => {
    setImageErrors(prev => new Set([...prev, src]));
  };

  // renderImage function remains here as it's used by GalleryPreview
  const renderImage = (image: { src: string; alt?: string }, className: string, imageSpecificClass?: string) => (
    <div className={`relative ${className}`}>
      <img
        src={image.src}
        alt={image.alt || ""}
        className={`w-full h-full object-cover transition-transform duration-300 ${imageSpecificClass || ''} ${
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

  // Note: previewImagesForGrid is now previewDisplayImages from state

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
            <GalleryPreview previewImages={previewDisplayImages} renderImage={renderImage} />
            <GalleryMosaic allImages={allGalleryImages} />
          </>
        )}
      </div>
      
      {/* GalleryCarousel is now rendered inside GalleryMosaic */}
    </section>
  );
}; 