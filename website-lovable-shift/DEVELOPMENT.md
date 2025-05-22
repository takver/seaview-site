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