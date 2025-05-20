/**
 * Gallery configuration for the Seaview Villa website
 * This file contains the list of images shown in the gallery section.
 * The order of images is preserved in the gallery display.
 */

// Images specifically for the 5-image GalleryPreview component on the homepage
export const previewHomepageImages = [
  "/images/exterior-east-side.webp",
  "/images/exterior-white-house-olive.webp",
  "/images/livingroom-blue-windows-bamboo-seating.webp",
  "/images/garden-sunset-herbs-view.webp",
  "/images/livingroom-archway-sunbeam.webp",
];

// Category keywords for image classification (used by GallerySection to categorize images from galleryOrder.json)
export const CATEGORY_KEYWORDS = {
  interior: ["bedroom", "livingroom", "kitchen", "bathroom", "interior", "kitchen-appliance-stove-pot-pan", "kitchen-appliance-smeg-burners-closeup", "kitchen-appliance-smeg-gas-cooktop", "kitchen-appliance-retro-cream-fridge", "kitchen-appliance-dishwasher-drawer-open", "appliance-clothes-washer-bosch"],
  exterior: ["exterior", "garden", "view", "yard", "patio", "terrace", "stone", "path", "st-john", "stjohn"],
  sifnos: ["sifnos", "island", "apollonia", "vathi", "beach"],
  };

// Category labels for the gallery filter buttons
export const CATEGORY_LABELS = [
  { key: "all", label: "All" },
  { key: "interior", label: "Interior" },
  { key: "exterior", label: "Exterior" },
  { key: "sifnos", label: "Sifnos" },
]; 