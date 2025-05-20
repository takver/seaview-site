import { previewHomepageImages } from "@/config/galleryConfig";

/**
 * This function is deprecated for main gallery use.
 * The main gallery (mosaic/carousel) image order is solely determined by public/galleryOrder.json via the API.
 * It can be removed if no other part of the application needs a default image list concept.
 */
export const getDefaultImages = (): string[] => {
  return []; // Return empty array as there's no longer a static default list for the main gallery.
};

/**
 * Provides the specific list of images for the homepage preview section.
 */
export const getPreviewHomepageImages = (): string[] => {
  return previewHomepageImages;
};

/**
 * Saves the gallery configuration by POSTing to the server-side API endpoint.
 * @param images Array of image paths in the desired order
 */
export const saveGalleryConfig = async (images: string[]): Promise<void> => {
  try {
    const response = await fetch('/api/save-gallery-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(images),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Failed to save gallery order' }));
      throw new Error(errorData.message || 'Failed to save gallery order');
    }
    return Promise.resolve();
  } catch (error) {
    console.error('Error saving gallery configuration via API:', error);
    return Promise.reject(error);
  }
};

/**
 * Load the gallery configuration for the main gallery (mosaic/carousel) by fetching from the server-side API.
 * Returns an empty array if API call fails or returns no valid order.
 */
export const loadMainGalleryConfig = async (): Promise<string[]> => {
  try {
    const response = await fetch('/api/get-gallery-order?t=' + new Date().getTime()); // Cache buster
    if (response.ok) {
      const serverConfig = await response.json();
      if (Array.isArray(serverConfig) && serverConfig.length > 0) {
        return Promise.resolve(serverConfig);
      }
    }
    return Promise.resolve([]); 
  } catch (fetchError) {
    console.error('Error fetching main gallery configuration from API:', fetchError);
    return Promise.resolve([]);
  }
}; 

/**
 * Renames a gallery image by updating both the file on the filesystem and its path in the gallery configuration.
 * @param oldPath The current path of the image
 * @param newPath The new path for the image
 * @returns A promise that resolves when the rename operation is complete
 */
export const renameGalleryImage = async (oldPath: string, newPath: string): Promise<{ oldPath: string, newPath: string }> => {
  try {
    const response = await fetch('/api/rename-gallery-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ oldPath, newPath }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Failed to rename image' }));
      throw new Error(errorData.message || 'Failed to rename image');
    }
    
    const result = await response.json();
    return Promise.resolve({ oldPath, newPath });
  } catch (error) {
    console.error('Error renaming gallery image via API:', error);
    return Promise.reject(error);
  }
};