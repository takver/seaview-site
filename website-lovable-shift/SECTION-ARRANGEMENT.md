# Sifnos Seaview Website - Section Arrangement

This document outlines the arrangement of sections on the Sifnos Seaview homepage as of the latest update.

## Current Section Order

1. **Header** - Black navigation bar with logo and menu items
2. **Hero Section** - Main banner with property image and headline
3. **Property Features Banner** - Banner showing key property features (rooms, bathrooms, etc.)
4. **Cycladic Home in Sifnos, Greece** (`LocationSection`) - Introduction to the property location
5. **What Sets This Place Apart** (`PropertyHighlights`) - Unique selling points of the property
6. **Gallery** (`GallerySection`) - Image gallery showcasing the property
7. **Property Details** (`PropertyDetailsSection`) - Detailed information about the property
8. **Modern Amenities** (`AmenitiesSection`) - Features and amenities of the property
   - Includes Premium Brands & Technology Partners subsection
9. **Ideal Guests** (`IdealGuestsSection`) - Information about who the property is suitable for
10. **Discover Sifnos** (`DiscoverSifnosSection`) - Information about the island and surroundings
11. **Reserve Your Stay** (`BookingSection`) - Booking information and references
12. **Our Location** (`LocationPlaceholder`) - Map and location details (placeholder)
13. **Footer** - Site footer with additional information and links

## Notes

- The "Contact Us" section has been removed and replaced with the "Our Location" section
- The location section is currently a placeholder to be filled with a proper map implementation
- Premium Brands & Technology Partners are included as part of the Amenities section
- References are included as part of the Booking section

## Implementation Details

The section arrangement is implemented in `website-lovable-shift/src/pages/Index.tsx`. All content sections are wrapped in a container with `px-[10%]` padding to create white borders on both sides, while the header, hero section, and property features banner span the full width of the page.

```jsx
<div className="min-h-screen flex flex-col">
  <Header />
  <main className="flex-grow pt-16">
    <HeroSection />
    <PropertyFeaturesBanner />
    <div className="px-[10%]">
      <LocationSection />
      <PropertyHighlights />
      <GallerySection />
      <PropertyDetailsSection />
      <AmenitiesSection />
      <IdealGuestsSection />
      <DiscoverSifnosSection />
      <BookingSection />
      <LocationPlaceholder />
    </div>
  </main>
  <Footer />
</div>
```

## Future Enhancements

- Replace the location placeholder with an actual interactive map
- Consider adding a dedicated References section if needed
- Update content and imagery as required 