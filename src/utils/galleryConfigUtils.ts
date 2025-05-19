import { rawImages, applianceImages } from "@/config/galleryConfig";

/**
 * Get the default gallery images array if no configuration exists
 */
export const getDefaultImages = (): string[] => {
  return [...rawImages, ...applianceImages];
};

/**
 * Save the gallery configuration to localStorage
 * @param images Array of image paths in the desired order
 */
export const saveGalleryConfig = async (images: string[]): Promise<void> => {
  try {
    localStorage.setItem('galleryConfig', JSON.stringify(images));
    return Promise.resolve();
  } catch (error) {
    console.error('Error saving gallery configuration:', error);
    return Promise.reject(error);
  }
};

/**
 * Load the gallery configuration from localStorage
 * If no configuration exists, return the default images
 */
export const loadGalleryConfig = async (): Promise<string[]> => {
  try {
    const config = localStorage.getItem('galleryConfig');
    if (config) {
      return Promise.resolve(JSON.parse(config));
    }
    
    // If no saved configuration, return the default images
    return Promise.resolve(getDefaultImages());
  } catch (error) {
    console.error('Error loading gallery configuration:', error);
    return Promise.reject(error);
  }
}; 