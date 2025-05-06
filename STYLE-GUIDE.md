
# Style Guide - Sifnos Seaview Villa

This document serves as the definitive reference for all styling decisions across the Sifnos Seaview Villa project. Follow these guidelines to maintain consistency throughout the application.

## Typography

### Font Family
- **Primary Font**: Montserrat (sans-serif)
- **Font Weights Used**:
  - Light (300) - Primary body text and headings
  - Regular (400) - Navbar, buttons, card titles
  - Medium (500) - Selected navigation items
  - Semibold (600) - Not currently used, but available if needed

### Heading Styles
- **Page Titles (h1)**
  - Font: Montserrat Light
  - Size: `text-3xl md:text-4xl lg:text-5xl` (responsive)
  - Weight: `font-light`
  - Color: White (on dark backgrounds) or `text-gray-800` (on light backgrounds)
  - Example: Hero section title

- **Section Headers (h2)**
  - Font: Montserrat Light
  - Size: `text-4xl` (desktop) / `text-3xl` (mobile)
  - Weight: `font-light`
  - Color: `text-[#1A1F2C]` or `text-gray-800`
  - Center aligned: `text-center`
  - Margin bottom: `mb-12` or `mb-8` (varies by section)
  - Example: "What Sets This Place Apart"

- **Component Headers (h3)**
  - Font: Montserrat
  - Size: `text-xl`
  - Weight: `font-normal` or `font-medium` (varies)
  - Color: `text-[#6E59A5]` (for card titles) or standard text colors
  - Example: Card titles in Property Highlights

### Body Text
- **Primary Body Text**
  - Font: Montserrat Light
  - Size: Regular text - `text-base`
  - Size: Featured text - `text-lg md:text-xl`
  - Weight: `font-light`
  - Line height: `leading-relaxed`
  - Color: `text-gray-600`
  - Example: Location section description

- **Secondary/Supporting Text**
  - Font: Montserrat Light
  - Size: `text-sm`
  - Color: `text-gray-600`
  - Example: Card content

## Color Palette

### Primary Colors
- **Brand Purple**: `#6E59A5` - Used for accents, card titles, underlines
- **Dark Text**: `#1A1F2C` - Used for primary headings
- **White**: `#FFFFFF` - Used for backgrounds, text on dark backgrounds
- **Black**: `#000000` - Used for header background

### Secondary Colors
- **Light Gray**: `#F6F6F7` - Used for subtle backgrounds
- **Medium Gray**: `#8A898C` - Used for secondary text
- **Dark Gray**: `#333333` - Used for text on light backgrounds
- **Gray Text**: `#606060` - Used for body text

### UI Element Colors
- **Card Border**: `border-gray-300`
- **Card Shadow**: `shadow-md`
- **Card Hover Shadow**: `hover:shadow-lg`
- **Button Text**: White or appropriate contrast color

## Layout & Spacing

### Section Spacing
- Standard vertical padding between sections: `py-16`
- Container horizontal padding: `px-4`
- Container width: `container mx-auto`

### Grid System
- Mobile: Single column `grid-cols-1`
- Tablet: Two columns `md:grid-cols-2`
- Desktop: Four columns for cards `lg:grid-cols-4`
- Gap between grid items: `gap-6`

### Gallery Section Layout
- Gallery grid uses `md:grid-cols-12` layout
- Large image spans 7 columns: `md:col-span-7`
- Small images grid spans 5 columns: `md:col-span-5`
- Consistent gap size of 4px for both outer and inner grids: `gap-[4px]`
- Height of large image: `h-[500px]`
- Height of small images: `h-[248px]` (calculated as (500px - 4px) ÷ 2)
- Image hover effect: `hover:scale-105 transition-transform duration-300`
- Cards have `shadow-md hover:shadow-xl transition-shadow`
- All images have `object-cover` to maintain aspect ratio

### Amenities Section Layout
- Grid layout: 1 column (mobile), 2 columns (tablet), 3 columns (medium), 5 columns (desktop)
- Grid columns: `grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5`
- Gap between amenity cards: `gap-6`
- Amenity card styling: 
  - Border: `border border-gray-300`
  - Shadow: `shadow-md hover:shadow-lg transition-shadow`
  - Padding: `p-6`
  - Layout: `flex flex-col items-center`
- Icon styling: 
  - Brand purple: `text-[#6E59A5]`
  - Size: `size={24}`
  - Stroke width: `strokeWidth={1.5}`
- Collapsible functionality: Initially shows 10 featured amenities

### Card Spacing
- Card padding: `p-6`
- Card margin bottom (when stacked): `mb-6`

## Component Styling

### Cards
- Standard card style:
  ```
  border-2 border-gray-300 shadow-md hover:shadow-lg transition-shadow rounded-lg
  ```
- Inner padding: `p-6`
- Title styling:
  ```
  text-xl font-normal text-[#6E59A5] text-center mb-4
  ```
- Content styling:
  ```
  text-gray-600 text-center font-light leading-relaxed
  ```

### Buttons
- Primary button:
  ```
  bg-primary text-white px-4 py-2 rounded hover:bg-primary/90
  ```
- Outline button:
  ```
  bg-transparent border border-input hover:bg-accent hover:text-accent-foreground
  ```
- Rounded button:
  ```
  rounded-full
  ```
  
### Feature Banner
- Background: `bg-[#333333]`
- Text: `text-white`
- Icon: `opacity-90`
- Vertical spacing: `py-6`
- Element spacing: `gap-6 md:gap-8`

### Hero Section
- Overlay Background: `bg-[rgba(90,110,80,0.4)]`
- Animation: `animate-slow-zoom-pan` (subtle zoom effect for images)

## Icons
- Source: lucide-react
- Default size: `size={24}`
- Stroke width: `strokeWidth={1.5}`
- Color: Contextual (matches surrounding text or specific design)

## Media Queries
- Mobile first approach
- Breakpoints:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
  - 2xl: 1536px

## Other UI Elements

### Hover Effects
- Cards: `hover:shadow-lg transition-shadow`
- Buttons: Color shift depending on variant (e.g., `hover:bg-primary/90` or `hover:bg-accent`)
- Link: `hover:text-gray-300` (in dark contexts)

### Focus States
- Standard focus outline is managed via Tailwind's built-in focus utilities
- Example: `focus:outline-none focus:ring-2 focus:ring-offset-2`

## Animation
- Custom animations defined in tailwind.config.ts:
  - `slow-zoom` - Scale from 1.0 to 1.1 over 5s
  - `slow-zoom-pan` - Scale from 1.0 to 1.1 over 12s with directional movement

---

This style guide should be referenced when making any design decisions or implementing new features to ensure visual consistency throughout the application. Updates to this guide should be proposed as needed to keep it aligned with the evolving design of the site.
