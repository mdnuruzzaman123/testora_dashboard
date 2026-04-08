# Testora Dashboard

A comprehensive admin dashboard for managing the Testora platform. Built with Next.js 16, React 19, and TypeScript, this application provides administrators with powerful tools to manage users, create and organize exam questions, manage the marketplace, process orders, and maintain blog content.

## Overview

Testora Dashboard is a full-featured administration platform designed to support a multi-tenant exam preparation and marketplace ecosystem. It provides real-time analytics, user management, content creation tools, and comprehensive administrative controls.

## Key Features

### User Management

- Comprehensive user administration and profile management
- Premium user tracking and management
- User activity monitoring and analytics

### Content Management

- **Questions System**: Create, organize, and manage exam questions with categorization
- **Blog Module**: Full-featured blog management with article creation, editing, and content organization
- **Category Management**: Dynamic category system for organizing content

### Marketplace Administration

- Product catalog management
- Integration controls for marketplace services
- Revenue tracking and analytics

### Order Management

- Order processing and tracking
- Premium subscription management
- Order history and analytics

### Analytics & Insights

- Dashboard with key performance metrics
- User growth analytics
- Revenue and subscription trends
- Interactive charts and visualizations (Area charts, Donut charts, Horizontal bar charts)
- Yearly data filtering and analysis

### Additional Features

- User settings and account management
- Role-based access control
- Real-time data visualization
- Export capabilities

## Tech Stack

### Core Framework

- **Next.js 16.1.6** - React framework for production
- **React 19.2.3** - UI library
- **TypeScript 5** - Static type checking

### State Management & Forms

- **Redux Toolkit 2.11.2** - State management
- **React-Redux 9.2.0** - Redux bindings for React
- **React Hook Form 7.71.2** - Efficient form management
- **Zod 4.3.6** - Schema validation with TypeScript integration

### UI & Styling

- **TailwindCSS 4** - Utility-first CSS framework
- **shadcn/ui** - Component library built on Radix UI
- **Base UI React 1.2.0** - Unstyled, accessible components
- **Lucide React 0.577.0** - Icon library
- **Class Variance Authority 0.7.1** - CSS class composition
- **Tailwind Merge 3.5.0** - Smart TailwindCSS class merging

### Data Visualization

- **Recharts 3.8.0** - React charting library for analytics

### Development Tools

- **ESLint 9** - Code linting
- **Prettier 3.8.1** - Code formatting
- **TypeScript** - Type checking

## Project Structure

```
src/
├── app/                          # Next.js app directory
│   ├── (auth)/                  # Authentication pages (login, password reset, OTP verification)
│   ├── (dashboard)/             # Protected dashboard routes
│   │   ├── blog/               # Blog management interface
│   │   ├── dashboard/          # Main dashboard with analytics
│   │   ├── marketplace/        # Marketplace administration
│   │   ├── orders/             # Order management
│   │   ├── premium-users/      # Premium subscription management
│   │   ├── questions/          # Question management system
│   │   ├── settings/           # Settings and configuration
│   │   └── users/              # User administration
│   └── globals.css             # Global styles
├── components/                   # Reusable React components
│   ├── blog/                    # Blog-related components
│   ├── charts/                  # Chart components (Area, Donut, Bar charts)
│   ├── dashboard/               # Dashboard-specific components
│   ├── layout/                  # Layout components (Header, Sidebar, Shell)
│   ├── marketplace/             # Marketplace management components
│   ├── orders/                  # Order management components
│   ├── questions/               # Question system components
│   ├── settings/                # Settings components
│   ├── users/                   # User management components
│   └── ui/                      # Shared UI components
├── constants/                    # Application constants and routes
├── lib/                         # Utility functions and helpers
│   ├── *-data.ts               # Mock data for development/testing
│   └── utils.ts                # General utility functions
├── services/                     # API integration layer
│   └── api.ts                   # API client configuration
├── store/                        # Redux store configuration
│   ├── slices/                  # Redux reducers
│   ├── hooks.ts                 # Custom Redux hooks
│   └── index.ts                 # Store configuration
└── types/                        # TypeScript type definitions
```

## Installation

### Prerequisites

- Node.js 18+ or higher
- npm, yarn, pnpm, or bun package manager

### Setup Instructions

1. **Clone the repository**

```bash
git clone <repository-url>
cd testora-dashboard
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. **Configure environment variables**
   Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Development

### Start Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## Available Scripts

| Command                | Description                                 |
| ---------------------- | ------------------------------------------- |
| `npm run dev`          | Start development server with hot reload    |
| `npm run build`        | Build optimized production bundle           |
| `npm start`            | Start production server                     |
| `npm run lint`         | Run ESLint to check code quality            |
| `npm run lint:fix`     | Run ESLint and automatically fix issues     |
| `npm run format`       | Format code with Prettier                   |
| `npm run format:check` | Check code formatting without modifications |

## Authentication

The dashboard implements a role-based authentication system:

- Login page for administrator access
- Password reset functionality with OTP verification
- Email-based password recovery flow
- Protected routes using middleware

Access the authentication pages at:

- `/login` - Administrator login
- `/forgot-password` - Password recovery initiation
- `/reset-password` - Password reset with token
- `/verify-otp` - Two-factor authentication

## API Integration

The application communicates with a backend API configured at:

```
http://localhost:5000/api (default development)
```

This can be overridden via the `NEXT_PUBLIC_API_URL` environment variable.

### API Service Structure

- Centralized API client in `src/services/api.ts`
- Modular data management in `src/lib/` directory
- Mock data for development and testing

## Validation

Form validation is implemented using:

- **Zod** for schema definition and runtime validation
- **React Hook Form** for efficient form state management
- Direct schema validation for maximum compatibility with TypeScript overloads

## Code Quality

### ESLint Configuration

- Strict code quality standards
- Next.js recommended rules
- Prettier integration for code formatting

### Development Workflow

1. Write code following project conventions
2. Format code: `npm run format`
3. Check linting: `npm run lint`
4. Fix issues: `npm run lint:fix`

## Performance Considerations

- Client components using `useSearchParams` must be wrapped in `Suspense` from server pages to prevent prerender issues
- Next.js built-in optimizations for images, fonts, and scripts
- Code splitting via dynamic imports for dashboard modules

## Troubleshooting

### Build Errors

- Clear `.next` cache: `rm -rf .next`
- Regenerate node_modules: `rm -rf node_modules && npm install`

### Type Errors with @hookform/resolvers

- Direct Zod validation using `schema.safeParse()` is recommended for maximum compatibility
- Avoid resolver overloads with newer versions

### Prerender Issues

- Ensure client components using hooks are properly wrapped in `Suspense`
- Check browser API usage is isolated to client components

## Contributing

When contributing to this project:

1. Follow the existing code structure and naming conventions
2. Use TypeScript for type safety
3. Maintain component modularity
4. Test changes in the development environment
5. Format code before committing: `npm run format`

## Resources

- [Next.js Documentation](https://nextjs.org/docs) - Framework features and API
- [React Documentation](https://react.dev) - React concepts and APIs
- [TailwindCSS Documentation](https://tailwindcss.com/docs) - Styling guide
- [Redux Toolkit Documentation](https://redux-toolkit.js.org) - State management
- [Recharts Documentation](https://recharts.org) - Chart implementation
- [Zod Documentation](https://zod.dev) - Schema validation

## License

This project is part of the Testora platform. All rights reserved.
