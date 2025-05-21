/** @jsxRuntime classic */
/** @jsx React.createElement */
/** @jsxFrag React.Fragment */

import React, { useState, useEffect } from 'react';
import { CATEGORY_KEYWORDS } from '@/config/galleryConfig';
import { loadMainGalleryConfig, getPreviewHomepageImages } from '@/utils/galleryConfigUtils';
import GalleryPreview from './GalleryPreview';
import GalleryMosaic from './GalleryMosaic';

interface GalleryImage {
  src: string;
  categories: string[];
}

const getCategoriesForImage = (filename: string, keywordsConfig: Record<string, string[]>): string[] => {
  if (!filename) return [];
  const cats = [];
  for (const [cat, keywords] of Object.entries(keywordsConfig)) {
    if (keywords.some(kw => filename.toLowerCase().includes(kw))) {
      cats.push(cat);
    }
  }
  return cats;
};

const GallerySection: React.FC = () => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  
  const [allGalleryImages, setAllGalleryImages] = useState<GalleryImage[]>([]);
  const [previewDisplayImages, setPreviewDisplayImages] = useState<Array<{src: string}>>([]);
  
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
        const previewPaths = getPreviewHomepageImages();
        const transformedPreview = previewPaths.map(src => ({ src }));
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
      {imageErrors.has(image.src) && (
        <div className="absolute inset-0 bg-red-100 flex items-center justify-center text-red-500">
          Error
        </div>
      )}
    </div>
  );

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
    </section>
  );
};

export default GallerySection; 