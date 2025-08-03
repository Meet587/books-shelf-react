# Books Shelf - React Application

A modern bookshelf application built with React, TypeScript, and Vite. This application allows users to manage and organize their books with features like search, pagination, and favorites.

## Features

- Browse and search books
- Add books to favorites
- Pagination for better navigation
- Modern UI with Tailwind CSS
- Redux for state management
- TypeScript for type safety
- Fast development with Vite

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **UI**: Tailwind CSS, Radix UI components
- **State Management**: Redux Toolkit with Redux Persist
- **Routing**: React Router
- **Development Tools**: ESLint, TypeScript ESLint

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone [repository-url]
cd books-shelf
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Starts the development server with hot reload
- `npm run build` - Builds the application for production
- `npm run preview` - Previews the production build
- `npm run lint` - Runs ESLint for code linting

## Project Structure

```
src/
├── components/      # Reusable UI components
├── helpers/         # Utility functions
├── pages/           # Page components
├── public/          # Static assets
└── types/           # TypeScript type definitions
```

## Development

The project uses TypeScript for type safety and Vite for fast development. The UI is built with Tailwind CSS and Radix UI components for accessibility.

### State Management

The application uses Redux Toolkit for state management with Redux Persist for data persistence.

### Code Style

The project follows ESLint rules for consistent code style and includes React-specific lint rules.


