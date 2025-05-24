# Development Guide - Sifnos Seaview Villa

This document outlines development practices and guidelines for the Sifnos Seaview Villa project.

## UI Component Management (shadcn/ui)

### Adding New Components

1. **Install a New Component**
   ```bash
   npx shadcn-ui@latest add component-name
   ```
   This will:
   - Copy the component code to `src/components/ui/`
   - Add necessary dependencies to `package.json`
   - Update TailwindCSS configuration if needed

2. **Add to Central Exports**
   After installing, add the component to `src/components/ui/index.ts`:
   ```typescript
   export { NewComponent } from './new-component'
   ```

3. **Usage in Components**
   Import from the central export:
   ```typescript
   import { Button, Label, Input } from "@/components/ui"
   ```

### Best Practices
- Only install components you need
- Always use the central import from `@/components/ui`
- Check existing components before installing new ones
- Keep `index.ts` exports up to date

## Project Structure

### Key Directories
- `/src/components/ui/` - shadcn/ui components
- `/src/components/` - project-specific components
- `/src/pages/` - page components
- `/src/utils/` - utility functions
- `/src/hooks/` - custom React hooks

### Component Organization
- Feature-based organization
- Each component in its own directory with related files
- Example structure:
  ```
  components/
    feature-name/
      index.tsx
      styles.ts
      types.ts
      utils.ts
  ```

## TypeScript Guidelines

### Import Organization
- Group imports by type:
  1. React and core libraries
  2. UI components
  3. Project utilities and types
  4. Styles and assets

### React Imports and JSX Transform
**Important:** This project uses React 17+ with the new JSX transform (`"jsx": "react-jsx"` in tsconfig.json).

- **DO NOT** import React in files that only use JSX
- **DO** import React only when using React APIs (useState, useEffect, etc.)
- The new JSX transform automatically handles JSX without needing React in scope

**Correct:**
```typescript
// No React import needed for JSX-only files
export const MyComponent = () => {
  return <div>Hello World</div>
}
```

**Also Correct (when using React APIs):**
```typescript
import { useState } from 'react' // Named import, no default React import
export const MyComponent = () => {
  const [count, setCount] = useState(0)
  return <div>{count}</div>
}
```

**Incorrect (will cause linter errors):**
```typescript
import React from 'react' // Don't use default React import
```

### Type Definitions
- Prefer interfaces for object types
- Use type aliases for unions and complex types
- Export types from feature directories
- Keep types close to their usage

## State Management

### Local State
- Use hooks for component-level state
- Prefer multiple `useState` over complex objects
- Use `useReducer` for complex state logic

### Global State
- Use React Context for theme/auth
- Consider React Query for server state
- Avoid prop drilling

## Performance

### Component Optimization
- Use React.memo for expensive renders
- Lazy load components when possible
- Optimize images and assets

### Build Optimization
- Keep bundle size in check
- Use code splitting
- Monitor performance metrics

## Testing

### Unit Tests
- Test utilities and hooks
- Use React Testing Library
- Focus on user interactions

### Integration Tests
- Test key user flows
- Verify component integration
- Check responsive behavior

## Development Workflow

### Local Development
1. Start development server:
   ```bash
   npm run dev
   ```
2. Access at `http://localhost:3000`

### Code Quality
- Use ESLint for code quality
- Follow Prettier configuration
- Run type checks before commits

### Git Workflow
- Feature branches from main
- Meaningful commit messages
- PR reviews required

## Service Verification

Use the `service-verification-tests.sh` script to verify all services:

```bash
./service-verification-tests.sh
```

This will test:
- React development server (Port 3000)
- Admin gallery page functionality
- iCal proxy server (Port 3001)

## React Import Checker

The project includes an automated test to ensure React imports follow the correct pattern for React 17+ with the new JSX transform.

### Running the Test

```bash
npm run check:react-imports
```

This test will:
- Verify `tsconfig.app.json` has `"jsx": "react-jsx"` setting
- Check all component and page files for incorrect React imports
- Fail if it finds default React imports or FC type usage

### What It Checks

✅ **Correct patterns:**
```typescript
// No import needed for JSX-only files
export const MyComponent = () => {
  return <div>Hello</div>
}

// Named imports only when using React APIs
import { useState, useEffect } from 'react';
```

❌ **Incorrect patterns:**
```typescript
// Default React import - NOT ALLOWED
import React from 'react';

// FC type annotation - NOT ALLOWED
const MyComponent: React.FC = () => { ... }
```

### Automatic Checks

This test runs automatically:
- Before every build (`npm run build`)
- Can be added to CI/CD pipelines
- Executes quickly (< 1 second)

### Fixing Issues

If the test fails:
1. Remove any `import React from 'react'` statements
2. Remove `FC` or `React.FC` type annotations
3. Use only named imports for React hooks and types

## Text Change Detection

The project includes an automated system to detect unintentional text changes on the website. This helps catch accidental content modifications during development.

### How It Works

1. **Text Extraction**: Uses Puppeteer to visit each page and extract all visible text content
2. **Checkpoint System**: Saves a baseline of all text content for comparison
3. **Change Detection**: Compares current site text against the checkpoint to identify changes

### Creating a Checkpoint

Before you can check for changes, you need to create a baseline checkpoint:

```bash
# Make sure the dev server is running first
npm run dev

# In another terminal, create the checkpoint
npm run text:checkpoint
```

This creates a `text-checkpoint.json` file containing all text from:
- Homepage (`/`)

### Checking for Text Changes

To verify no unintentional text changes have occurred:

```bash
npm run text:check
```

This command will:
- Extract current text from all pages
- Compare against the checkpoint
- Report any additions or removals
- Exit with error code 1 if changes are detected

### Output Example

When changes are detected:
```
❌ TEXT CHANGES DETECTED

Page: /
Removed text:
  - "Original heading text"
Added text:
  + "New heading text"

To update the checkpoint with these changes, run:
npm run text:checkpoint
```

### Manual Text Extraction

To extract text without creating a checkpoint:

```bash
npm run text:extract
```

This shows the current text content without saving it.

### Integration with Build Process

Consider adding text checking to your CI/CD pipeline or as a pre-commit hook to catch unintentional changes early.

### Technical Details

- Uses Puppeteer for browser automation
- Extracts visible text only (ignores hidden elements)
- Includes alt text from images
- Excludes script and style tag content
- Word-by-word comparison using the `diff` library

## Troubleshooting

### Common Issues
1. Port conflicts:
   ```bash
   lsof -i :3000
   kill -9 <PID>
   ```

2. Type errors:
   - Check imports from `@/components/ui`
   - Verify TypeScript configuration
   - Update type definitions

### Development Tools
- VSCode with TypeScript
- React DevTools
- Network inspector

## Resources

### Documentation
- [shadcn/ui docs](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)

### Project Links
- Repository
- Issue tracker
- Design system

---

Keep this guide updated as development practices evolve. Submit PRs for significant changes. 