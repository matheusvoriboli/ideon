# Ideon

A modern React application built with TypeScript, Vite, and TailwindCSS for managing coverage periods and organizational dashboards.

## 🚀 Technologies Used

- **React 19** with **TypeScript** - Modern UI development
- **Vite** - Fast build tool and development server
- **TailwindCSS 4** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **React Hook Form + Zod** - Form handling and validation
- **React Router DOM 7** - Client-side routing
- **Vitest + Testing Library** - Testing framework
- **ESLint + Prettier** - Code quality and formatting
- **Husky** - Git hooks for code validation

## 📁 Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── UI/           # Base UI components
│   └── Coverage*/    # Coverage-related components
├── pages/            # Application pages
├── stores/           # Zustand state stores
├── utils/            # Utility functions
└── test/             # Test setup and utilities
```

## 🛠️ Available Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm preview          # Preview production build

# Building
pnpm build            # Build for production

# Code Quality
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix ESLint issues
pnpm format           # Format code with Prettier
pnpm format:check     # Check formatting

# Testing
pnpm test             # Run tests in watch mode
pnpm test:ui          # Run tests with UI
pnpm test:run         # Run tests once (CI mode)

# Validation
pnpm validate         # Run complete validation pipeline
```

## 🔧 Setup & Installation

```bash
# Clone and install
git clone [repository-url]
cd ideon
pnpm install

# Setup git hooks
pnpm prepare

# Start development
pnpm dev
```

## ✨ Additional Features Implemented

- **Dark Mode Support** - Complete theming system with TailwindCSS dark mode utilities
- **Enhanced Accessibility** - ARIA labels, keyboard navigation, and screen reader support
- **Real-time Search** - Global search functionality across organization names, carriers, accounts, and UUIDs
- **Real-time Toast Notifications** - User feedback for actions and form submissions
- **Form Validation** - Client-side validation with detailed error messages

## 🚧 Challenges & Trade-offs

### Implementation Challenges

**Dark Mode Integration**

- **Challenge**: Dark mode was implemented towards the end of development
- **Impact**: Required extensive refactoring of existing components and color schemes
- **Trade-off**: Would have been significantly easier to implement from the project's inception
- **Solution**: Systematic component-by-component theme updates with TailwindCSS utilities

**Accessibility Implementation**

- **Challenge**: Adding accessibility features to complex interactive components
- **Impact**: Required deep investigation into DOM interactions and ARIA specifications
- **Solution**: Extensive testing with screen readers and keyboard navigation patterns

**State Management Complexity**

- **Challenge**: Managing complex filter states and form interactions
- **Trade-off**: Chose Zustand over Redux for simpler implementation but required careful store structure design
- **Solution**: Modular store approach with clear separation of concerns

## 🪝 Git Hooks with Husky

### Pre-commit Hook

- Runs `pnpm test` before every commit

### Pre-push Hook

Comprehensive validation pipeline:

1. **ESLint** - Code quality validation
2. **Prettier** - Formatting check
3. **Build** - TypeScript compilation
4. **Tests** - Complete test suite

#### Strict Mode

```bash
# Enable strict mode (blocks push on test failures)
STRICT_MODE=true git push
```

#### Skip hooks (not recommended)

```bash
git commit --no-verify  # Skip pre-commit
git push --no-verify    # Skip pre-push
```

## 🧪 Testing

Uses **Vitest** with jsdom environment and Testing Library utilities for React component testing.

## 📦 Package Manager

This project uses **pnpm** for faster installs and better dependency management.

## 🤝 Contributing

1. Follow ESLint + Prettier standards
2. Write tests for new features
3. Ensure git hooks pass
4. Use semantic commit messages
