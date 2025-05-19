/**
 * Gallery configuration for the Seaview Villa website
 * This file contains the list of images shown in the gallery section.
 * The order of images is preserved in the gallery display.
 */

// Main gallery images
export const rawImages = [
  // Preview order: large left first, then four small (TL, TR, BL, BR)
  "/images/exterior-east-side.webp", // large preview
  "/images/exterior-white-house-olive.webp", // top-left small
  "/images/livingroom-blue-windows-bamboo-seating.webp", // top-right small
  "/images/garden-sunset-herbs-view.webp", // bottom-left small
  "/images/livingroom-archway-sunbeam.webp", // bottom-right small
  // remaining images
  "/images/garden-path-st-john-evening.webp",
  "/images/livingroom-tripod-camera-seats.webp",
  "/images/kitchen-view-patio-st-john.webp",
  "/images/bathroom-gold-shower-sink.webp",
  "/images/view-st-john-bright.webp",
  "/images/livingroom-carved-cabinet-window.webp",
  "/images/kitchen-island-amber-pendants.webp",
  "/images/interior-brass-lantern-cabinet.webp",
  "/images/interior-hat-hook-windowview.webp",
  "/images/view-st-john-bright.webp",
  "/images/garden-central-path-morning.webp",
  "/images/bathroom-gold-shower-mirror.webp",
  "/images/plan-floor-topographic-sketch.webp",
  "/images/garden-night-path-uplights.webp",
  "/images/closeup-brass-lantern-detail.webp",
  "/images/exterior-rouster-flowers.webp",
  "/images/garden-curved-path-sunset.webp",
  "/images/bathroom-modern-wall-mounted-mixer.webp",
  "/images/livingroom-sofa-tripod-lamp.webp",
  "/images/exterior-garden-steps-shaded-path.webp",
  "/images/exterior-stairs-shadow-light-angle.webp",
  "/images/exterior-white-pergola-archway.webp",
  "/images/garden-night-lit-path.webp",
  "/images/garden-olive-tree-seating.webp",
  "/images/garden-path-south-view.webp",
  "/images/garden-path-spring.webp",
  "/images/garden-path-st-john-2.webp",
  "/images/garden-tree-round-stonebed.webp",
  "/images/sifnos-coast-rocks-steps.jpg",
  "/images/sifnos-trail-1-32.webp"
];

// Appliance images
export const applianceImages = [
  "/images/kitchen-appliance-stove-pot-pan.webp",
  "/images/appliance-clothes-washer-bosch.webp",
  "/images/kitchen-appliance-smeg-burners-closeup.webp",
  "/images/kitchen-appliance-smeg-gas-cooktop.webp",
  "/images/kitchen-appliance-retro-cream-fridge.webp",
  "/images/kitchen-appliance-dishwasher-drawer-open.webp"
];

// Category keywords for image classification
export const CATEGORY_KEYWORDS = {
  interior: ["bedroom", "livingroom", "kitchen", "bathroom", "interior", "kitchen-appliance-stove-pot-pan", "kitchen-appliance-smeg-burners-closeup", "kitchen-appliance-smeg-gas-cooktop", "kitchen-appliance-retro-cream-fridge", "kitchen-appliance-dishwasher-drawer-open", "appliance-clothes-washer-bosch"],
  exterior: ["exterior", "garden", "view", "yard", "patio", "terrace", "stone", "path", "st-john", "stjohn"],
  sifnos: ["sifnos", "island", "apollonia", "vathi", "beach"],
  "kitchen-appliances": [
    "kitchen-appliance-stove-pot-pan",
    "kitchen-appliance-smeg-burners-closeup",
    "kitchen-appliance-smeg-gas-cooktop",
    "kitchen-appliance-retro-cream-fridge", 
    "kitchen-appliance-dishwasher-drawer-open",
    "appliance-clothes-washer-bosch"
  ],
};

// Category labels for the gallery filter buttons
export const CATEGORY_LABELS = [
  { key: "all", label: "All" },
  { key: "interior", label: "Interior" },
  { key: "exterior", label: "Exterior" },
  { key: "sifnos", label: "Sifnos" },
  { key: "kitchen-appliances", label: "Kitchen Appliances" },
]; 