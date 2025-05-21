# Sifnos Seaview Website

A professional website for the Sifnos Seaview vacation property showcasing the villa, its amenities, and the beautiful island of Sifnos, Greece.

## Getting Started

Follow these steps to set up the project locally:

```sh
# Step 1: Clone the repository
git clone <REPOSITORY_URL>

# Step 2: Navigate to the project directory
cd seaview-site/website-lovable-shift

# Step 3: Install dependencies
npm install

# Step 4: Start the development server
npm run dev
```

## Project Structure

This project consists of two main components:

1. **Main Website** (Vite React application running on port 3000)
2. **iCal Proxy Server** (Node.js Express server running on port 3001 for calendar data)

For detailed architecture information, see the [seaview-site-architecture.md](../seaview-site-architecture.md) file.

## Documentation Resources

This project includes several documentation files that provide detailed information about different aspects of the website:

### [SECTION-ARRANGEMENT.md](./SECTION-ARRANGEMENT.md)
Contains the current section arrangement of the Sifnos Seaview homepage, including the order and hierarchy of all content sections. Reference this document when making changes to the website structure or when adding new sections.

### [STYLE-GUIDE.md](./STYLE-GUIDE.md)
The definitive reference for all styling decisions across the project, including typography, color palette, component styling, and layout guidelines. Consult this document to ensure visual consistency when implementing new features or modifying existing ones.

### [ANIMATIONS.md](./ANIMATIONS.md)
Provides technical details about the animations used throughout the website, with focus on the hero section's dynamic zoom and pan effects. Contains code examples, best practices, and guidance for future animation enhancements.

### [../seaview-site-architecture.md](../seaview-site-architecture.md)
Documents the overall architecture of the Sifnos Seaview website system, including the main frontend (port 3000) and iCal proxy server (port 3001) components. Provides details about data flow, caching, troubleshooting, and how to start both parts of the system. Essential reading for understanding how the booking calendar integrates with external services.

## Technologies Used

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Custom animations:
  - Dynamic zoom and pan animations in the hero section
  - Configurable animations defined in the Tailwind config
  - Performance-optimized using CSS transforms and hardware acceleration
  - See [ANIMATIONS.md](./ANIMATIONS.md) for technical details
