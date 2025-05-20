/** @jsxRuntime classic */
/** @jsx React.createElement */
/** @jsxFrag React.Fragment */

// @ts-nocheck
import React, { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { GalleryHorizontal } from "lucide-react";
import GalleryCarousel from "../GalleryCarousel";
import { 
  CATEGORY_LABELS
} from "@/config/galleryConfig";

interface ImageItem {
  src: string;
  alt?: string;
  categories?: string[];
}

interface GalleryMosaicProps {
  allImages: ImageItem[];
}

const GalleryMosaic: React.FC<GalleryMosaicProps> = ({ allImages }) => {
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [carouselGridMode, setCarouselGridMode] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const openCarousel = () => {
    setIsCarouselOpen(true);
  };

  return (
    <>
      {/* Show All Pictures Button */}
      <div className="flex justify-center mt-8">
        <Button 
          onClick={openCarousel}
          variant="rounded"
          size="lg"
        >
          <GalleryHorizontal className="mr-2 h-5 w-5" />
          Show All Pictures
        </Button>
      </div>

      {/* Full Gallery Modal */}
      {isCarouselOpen && (
        <GalleryCarousel
          images={allImages}
          onClose={() => setIsCarouselOpen(false)}
          gridMode={carouselGridMode}
          onToggleView={() => setCarouselGridMode(!carouselGridMode)}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categoryLabels={CATEGORY_LABELS}
        />
      )}
    </>
  );
};

export default GalleryMosaic; 