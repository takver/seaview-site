/** @jsxRuntime classic */
/** @jsx React.createElement */
/** @jsxFrag React.Fragment */

// @ts-nocheck
import React from 'react';

interface ImageItem {
  src: string;
  alt?: string;
  categories?: string[];
}

interface GalleryPreviewProps {
  previewImages: ImageItem[];
  renderImage: (image: ImageItem, className: string, imageClassName: string) => React.ReactNode;
}

const GalleryPreview: React.FC<GalleryPreviewProps> = ({ previewImages, renderImage }) => {
  // Ensure previewImages always has 5 items for grid layout, filling with placeholders if necessary
  const displayImages = [...previewImages];
  while (displayImages.length < 5) {
    displayImages.push({ src: "", categories: [] }); // Placeholder for empty slot
  }

  const commonImageContainerClass = "overflow-hidden rounded-lg shadow-lg";
  const commonImageClass = "w-full h-full object-cover";
  const placeholderClass = "bg-gray-200 dark:bg-gray-700 rounded-lg shadow-lg";

  return (
    // The parent grid now defines 2 rows of equal height implicitly by how content flows.
    // On medium screens, it's 4 columns. The large image takes 2 cols, 2 rows.
    // The small images will flow into the remaining 2 cols, 2 rows.
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
      {/* Left Side - Large Image */}
      {displayImages[0]?.src ? (
        <div className={`md:col-span-2 md:row-span-2 aspect-[4/3] ${commonImageContainerClass}`}>
          {/* The image itself will now fill this container, and object-cover will handle its aspect ratio */}
          {renderImage(displayImages[0], "", commonImageClass)}
        </div>
      ) : (
        <div className={`md:col-span-2 md:row-span-2 aspect-[3/3] ${placeholderClass}`}></div>
      )}
      
      {/* Right Side - 2x2 Grid */}
      {/* These will occupy one grid cell each. Their height will be determined by the implicit row height established by the large image. */}
      {displayImages[1]?.src ? (
        <div className={`aspect-[5/6] ${commonImageContainerClass}`}>
          {renderImage(displayImages[1], "", commonImageClass)}
        </div>
      ) : (
        <div className={`aspect-[4/4] ${placeholderClass}`}></div>
      )}
      
      {displayImages[2]?.src ? (
        <div className={`aspect-[4/4] ${commonImageContainerClass}`}>
          {renderImage(displayImages[2], "", commonImageClass)}
        </div>
      ) : (
        <div className={`aspect-[5/6] ${placeholderClass}`}></div>
      )}
      
      {displayImages[3]?.src ? (
        <div className={`aspect-[5/6] ${commonImageContainerClass}`}>
          {renderImage(displayImages[3], "", commonImageClass)}
        </div>
      ) : (
        <div className={`aspect-[5/6] ${placeholderClass}`}></div>
      )}
      
      {displayImages[4]?.src ? (
        <div className={`aspect-[5/6] ${commonImageContainerClass}`}>
          {renderImage(displayImages[4], "", commonImageClass)}
        </div>
      ) : (
        <div className={`aspect-[5/6] ${placeholderClass}`}></div>
      )}
    </div>
  );
};

export default GalleryPreview; 