# Gallery UI/UX Design Guidelines for LLM Assistant

This document outlines the current design, functionality, and styling rules for the image gallery on the Seaview Villa website. Use these guidelines when assisting with UI/UX improvements or modifications to the gallery.

## I. Overall Gallery Architecture

1.  **Main Orchestrator:**
    *   The primary gallery component is `GallerySection` (`src/components/gallery-section/index.tsx`).
    *   It is responsible for fetching all images and managing overall gallery state.

2.  **Sub-Components:**
    *   **`GalleryPreview.tsx`**: Displays a static 5-image preview grid on the main page.
        *   Images are the first 5 from the `allImages` collection.
        *   Styling: Ensure images are well-proportioned, with consistent rounded corners, subtle shadows, and appropriate gap spacing. The goal is a polished, inviting preview.
    *   **`GalleryMosaic.tsx`**: Manages the entry point to the full interactive gallery.
        *   Contains the "Show All Pictures" button.
        *   Launches `GalleryCarousel.tsx` when the "Show All Pictures" button is clicked.
    *   **`GalleryCarousel.tsx`**: A modal component for viewing all images.
        *   It operates in two modes:
            *   **Grid Mode (default when opened):** A masonry layout displaying all images, filterable by category.
            *   **Carousel Mode:** A single image viewer with next/previous navigation.
        *   Handles image loading, error states, and keyboard navigation.

## II. Image Source and Order

1.  **Image Source:** All gallery images are intended to be sourced from a structured directory, typically like `/public/images/gallery/` or similar, and then processed/mapped. The current implementation loads images from `/public/images/uploads/...` based on `allImageFilenames.json`.
2.  **Custom Ordering:**
    *   Image order is configurable via an admin interface (`/admin`).
    *   This custom order is stored in `localStorage` (see `src/config/galleryConfig.ts` and `src/utils/galleryConfigUtils.ts`).
    *   The gallery components MUST respect this custom order.

## III. Filtering Functionality (within `GalleryCarousel` - Grid Mode)

1.  **Filter Buttons:**
    *   Category filter buttons are displayed *only* within the `GalleryCarousel.tsx` component when it is in **Grid Mode**.
    *   They should be positioned prominently, typically near the top of the grid view, allowing easy user interaction.
2.  **Categories:**
    *   Image categories are defined in `src/config/galleryConfig.ts` (specifically `CATEGORY_KEYWORDS` for keyword matching and `CATEGORY_LABELS` for display).
    *   The `getCategoriesForImage` utility function (now within `GalleryCarousel.tsx`) assigns categories to images based on filename keywords.
    *   The `filterImagesByCategory` utility function (now within `GalleryCarousel.tsx`) filters images based on the selected category.
3.  **Interaction:**
    *   Clicking a category button filters the displayed images in the grid.
    *   An "All" category (or similar) shows all images.
    *   The active filter button should be visually distinct (e.g., using primary button styles). Inactive filter buttons should use outline styles suitable for a dark modal background.

## IV. `GalleryCarousel.tsx` - Detailed Behavior

1.  **Opening:**
    *   Opens as a modal, overlaying the page content with a dark background (e.g., `bg-black/90` or `bg-black/95`).
    *   Defaults to **Grid Mode** when opened via the "Show All Pictures" button.
    *   Body scroll should be disabled when the carousel is open to prevent background scrolling.
2.  **View Toggling:**
    *   A button (e.g., labeled "Carousel" / "Grid" or using icons like `Maximize` / `LayoutGrid`) allows users to switch between Grid Mode and Carousel Mode.
    *   The state of this toggle (`showGrid` / `gridMode`) is managed and passed between relevant components.
3.  **Grid Mode Specifics:**
    *   Displays images in a responsive masonry layout. This is achieved via JavaScript in `GalleryCarousel.tsx` using the `calculateMasonryLayout` function.
    *   The function determines the number of columns based on viewport width, then calculates the position (`left`, `top`) and dimensions (`width`, `height`) for each image.
    *   Image heights are determined by their actual aspect ratios (once loaded via `imageDimensionsMap`) to fit the calculated column width. This ensures portrait images are not excessively cropped.
    *   Items are absolutely positioned within a relatively positioned container (`galleryRef`).
    *   The container's height is dynamically adjusted to fit the tallest column.
    *   Clicking an image in the grid should switch to Carousel Mode, displaying that specific image. The `currentIndex` should be updated accordingly.
    *   Includes the category filter buttons as described in Section III.
4.  **Carousel Mode Specifics:**
    *   Displays one image at a time, centered and scaled to fit within the viewport.
    *   Next/Previous buttons for navigation through the `images` array.
    *   Keyboard navigation (Left/Right arrow keys for previous/next).
    *   Displays current image index and total count (e.g., "5 / 55").
5.  **Closing:**
    *   A clearly visible close button (e.g., 'X' icon).
    *   The Escape key should close the carousel from either Grid Mode or Carousel Mode.
6.  **Image Handling:**
    *   Display a loading state (e.g., shimmer/placeholder like `animate-pulse` for grid, spinner for carousel) while images are loading.
    *   Display an error state or placeholder text (e.g., "Image not available") if an image fails to load. This is managed by `loadedImages` and `imageErrors` state sets.

## V. Styling and Button Conventions (refer to `STYLE-GUIDE.md` for base styles)

1.  **General Principles:**
    *   Ensure a clean, modern, and responsive design.
    *   Maintain consistency with the overall site theme and `STYLE-GUIDE.md`.
    *   Buttons within the dark modal (`GalleryCarousel`) should use light text/borders for contrast.
2.  **"Show All Pictures" Button (in `GalleryMosaic.tsx`):**
    *   Style: Primary button, typically large and inviting.
    *   Current implementation: `<Button variant="rounded" size="lg">`. This translates to `rounded-full` and primary color fills as per `Button.tsx` and `STYLE-GUIDE.md`.
    *   Icon: `GalleryHorizontal` lucide icon.
3.  **Category Filter Buttons (in `GalleryCarousel.tsx` - Grid Mode):**
    *   Utilize the built-in button variants `filterActive` and `filterInactive` from `src/components/ui/button.tsx`.
        *   The `filterActive` variant provides the style for the selected category button (e.g., `rounded-full bg-[#6E59A5] text-white font-medium`).
        *   The `filterInactive` variant provides the style for non-selected category buttons (e.g., `rounded-full bg-[#0000001a] text-white font-medium hover:bg-[#ffffff33]`).
    *   This approach centralizes the styling within `button.tsx` and ensures consistency with other buttons like the "Show All Pictures" button (which uses the `rounded` variant, also styled with `#6E59A5`).
    *   Implementation in `GalleryCarousel.tsx`:
        ```typescript
        <Button
          key={key}
          variant={selectedCategory === key ? "filterActive" : "filterInactive"}
          onClick={() => setSelectedCategory(key)}
        >
          {label}
        </Button>
        ```
4.  **Carousel View Toggle Button (in `GalleryCarousel.tsx`):**
    *   Style: Outline button, customized for a dark background. The `className` directly applies white text and border colors, with a subtle hover effect (`hover:bg-white/30`), for optimal contrast and visibility against the modal's dark theme, adhering to the general principle in V.1.
        *   Current: `<Button variant="outline" size="sm" className="rounded-full text-white border-white hover:bg-white/30 focus-visible:ring-white">`
    *   Icons: `LayoutGrid` (lucide) for switching to Grid view, `Maximize` (lucide) for switching to Carousel view.
5.  **Carousel Close Button (in `GalleryCarousel.tsx`):**
    *   Style: Ghost button, customized for a dark background. The `className` directly applies white text color, with a subtle hover effect (`hover:bg-white/30`), for optimal contrast and visibility against the modal's dark theme.
        *   Current: `<Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/30 focus-visible:ring-white">`
    *   Icon: `X` lucide icon.
6.  **Carousel Next/Previous Navigation Buttons (in `GalleryCarousel.tsx` - Carousel Mode):**
    *   Style: Semi-transparent background, light icon color, typically circular or rounded.
        *   Current: `className="absolute ... p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition"`
    *   Icons: `ChevronLeft`, `ChevronRight` lucide icons.

## VI. Known Past Issues & Considerations

1.  **Filter Button Placement:** A key previous issue was filter buttons appearing outside the main gallery modal. The correct and current implementation places them *inside* `GalleryCarousel.tsx` and makes them visible only in Grid Mode.
2.  **Styling Consistency:** Adherence to `STYLE-GUIDE.md` and the `Button` component's variants (`default`, `outline`, `ghost`, `rounded`) is crucial. Minimize manual class overrides for properties handled by variants (like `bg-primary`, `rounded-full`).
3.  **Preview Image Styling (`GalleryPreview.tsx`):** The 5-image preview grid on the main page requires careful attention to:
    *   Image aspect ratios and `object-fit`.
    *   Consistent rounded corners (e.g., `rounded-lg`).
    *   Subtle shadows (e.g., `shadow-lg`).
    *   Appropriate `gap` between images.
    This section had regressions previously; ensure it aligns with a polished design.
4.  **Linter Errors & Types:** Past issues included linter errors related to JSX elements and module resolution. Ensure `@jsxRuntime classic`, `@jsx React.createElement`, `@jsxFrag React.Fragment` pragmas are used if needed, and types (e.g., for `react-beautiful-dnd` or event handlers) are correctly applied. TypeScript's `tsconfig.json` path aliases (`@/*`) should function correctly.

## VII. Future Enhancements (Considerations for LLM)

*   Smooth animations/transitions for opening/closing the carousel and switching between grid/carousel views.
*   Image zoom functionality within Carousel Mode.
*   Enhanced lazy loading or virtualized scrolling for the grid view if performance with very large galleries becomes an issue.
*   Full keyboard accessibility for all interactive elements within the gallery (focus management, appropriate ARIA roles and attributes).
*   Swipe gestures for mobile navigation in Carousel Mode.

---

This document should be updated as the gallery design and implementation evolve. 