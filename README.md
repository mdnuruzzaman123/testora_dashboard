# Testora Dashboard

A comprehensive admin dashboard for managing the Testora learning ecosystem. Built with **Next.js 16**, **React 19**, **TypeScript**, and **Recharts**, the Testora Dashboard provides administrators with powerful tools for platform management, analytics, and content administration.

## 🎯 Project Overview

Testora Dashboard is a full-featured administration platform designed to support multi-tenant exam preparation and marketplace operations. It provides real-time analytics, user management, content creation tools, marketplace controls, and comprehensive administrative functions to ensure smooth platform operation.

This dashboard is the nerve center of the Testora platform, enabling administrators to:

- Manage users and track user activity
- Create and organize exam questions
- Manage blog content and articles
- Administer marketplace products and integrations
- Process and track orders
- Monitor platform analytics and performance
- Manage premium subscriptions
- Generate reports and insights

## ✨ Key Features

### 👥 User Management

- Comprehensive user administration dashboard
- User profile viewing and management
- Premium user tracking and management
- User activity monitoring and analytics
- User statistics and growth tracking
- Advanced search and filtering
- Bulk user operations

### ❓ Questions System

- Create and manage exam questions
- Categorize questions by topics
- Question difficulty levels and tagging
- Question validation and review workflow
- Bulk import/export functionality
- Answer key management
- Question performance analytics

### 📚 Blog & Content Management

- Full-featured blog management system
- Create, edit, and publish articles
- Rich text editor for content creation
- Category management and tagging
- Article scheduling and publishing workflow
- Editorial workflow support
- Content performance tracking
- SEO optimization tools

### 📊 Category Management

- Dynamic category creation and organization
- Hierarchical category structure
- Category analytics and usage tracking
- Bulk category operations
- SEO-friendly category management

### 🛍️ Marketplace Administration

- Product catalog management
- Add, edit, and remove products
- Product pricing and discounting
- Inventory management
- Category and tag management
- Auto-integration panels for marketplace services
- Product performance analytics
- Bulk operations support

### 📦 Order Management

- Complete order processing system
- Order tracking and status management
- Premium subscription order management
- Order history and analytics
- Refund and return management
- Order search and filtering
- Customer communication tools
- Order export and reporting

### 📈 Analytics & Insights

- **Dashboard Overview** with key performance metrics (KPIs)
- **User Growth Analytics** - Visualize user growth trends over time
- **Revenue Tracking** - Monitor sales and revenue metrics
- **Subscription Analytics** - Track premium subscription trends
- **Interactive Charts**:
  - Area charts for trend visualization
  - Donut charts for distribution analysis
  - Horizontal bar charts for comparative analysis
  - Category performance charts
  - Premium subscription charts
- **Yearly Data Filtering** - Analyze data by year
- **Custom Date Ranges** - Generate reports for specific periods
- **Data Export** - Export analytics for external reporting

### ⚙️ Settings & Configuration

- Platform settings management
- Administrator account management
- Role-based access control (RBAC)
- Integration settings
- System configuration
- Notification preferences

## 🛠️ Tech Stack

### Core Framework

- **Next.js 16.1.6** - React framework for production
- **React 19.2.3** - UI library
- **React DOM 19.2.3** - DOM rendering
- **TypeScript 5** - Static type checking and development

### State Management & Forms

- **@reduxjs/toolkit 2.11.2** - Redux state management
- **react-redux 9.2.0** - React-Redux bindings
- **react-hook-form 7.71.2** - Performant form handling
- **@hookform/resolvers 5.2.2** - Schema validation integration
- **zod 4.3.6** - TypeScript-first schema validation

### Data Visualization

- **recharts 3.8.0** - Composable charting library built on React components
  - Area charts for trend analysis
  - Donut charts for distribution
  - Bar charts for comparisons
  - Responsive design

### UI & Styling

- **Tailwind CSS 4** - Utility-first CSS framework
- **@tailwindcss/postcss 4** - PostCSS plugin for Tailwind
- **class-variance-authority 0.7.1** - CSS class composition
- **tailwind-merge 3.5.0** - Combines Tailwind classes
- **tw-animate-css 1.4.0** - Animation utilities
- **lucide-react 0.577.0** - Beautiful, consistent icons
- **shadcn 4.0.5** - High-quality React components
- **clsx 2.1.1** - Conditional classname utility
- **@base-ui/react 1.2.0** - Customizable components

### Development Tools

- **ESLint 9** - Code quality linting
- **Prettier 3.8.1** - Code formatting
- **PostCSS 4** - CSS transformations

## 📁 Project Structure

```
testora-dashboard/
├── public/                         # Static assets and images
├── src/
│   ├── app/                        # Next.js app directory
│   │   ├── globals.css             # Global styles
│   │   ├── layout.tsx              # Root layout
│   │   ├── (auth)/                 # Authentication routes
│   │   │   ├── layout.tsx
│   │   │   ├── login/
│   │   │   ├── forgot-password/
│   │   │   ├── reset-password/
│   │   │   └── verify-otp/
│   │   └── (dashboard)/            # Main dashboard routes
│   │       ├── layout.tsx
│   │       ├── dashboard/          # Dashboard home page
│   │       ├── users/              # User management
│   │       ├── questions/          # Questions management
│   │       ├── blog/               # Blog management
│   │       ├── marketplace/        # Marketplace admin
│   │       ├── orders/             # Order management
│   │       ├── premium-users/      # Premium subscription mgmt
│   │       └── settings/           # Settings and configuration
│   ├── components/                 # Reusable React components
│   │   ├── dashboard/              # Dashboard-specific components
│   │   │   ├── DashboardContent.tsx
│   │   │   └── YearSelect.tsx
│   │   ├── charts/                 # Chart components
│   │   │   ├── CategoryDonutChart.tsx
│   │   │   ├── DashboardAreaChart.tsx
│   │   │   ├── DashboardDonutChart.tsx
│   │   │   ├── DashboardHorizontalBarChart.tsx
│   │   │   ├── PremiumByProductChart.tsx
│   │   │   └── UserGrowthChart.tsx
│   │   ├── layout/                 # Layout components
│   │   │   ├── DashboardShell.tsx
│   │   │   ├── Header.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── blog/                   # Blog management components
│   │   │   ├── BlogManagementPage.tsx
│   │   │   ├── ArticleTableRow.tsx
│   │   │   └── ManageCategoriesModal.tsx
│   │   ├── marketplace/            # Marketplace components
│   │   │   ├── AddProductModal.tsx
│   │   │   ├── AutoDsIntegrationPanel.tsx
│   │   │   ├── CategoriesPanel.tsx
│   │   │   └── ...
│   │   ├── orders/                 # Order management components
│   │   ├── questions/              # Question management components
│   │   ├── premium-subscribers/    # Premium user components
│   │   ├── settings/               # Settings components
│   │   ├── users/                  # User management components
│   │   └── ui/                     # Reusable UI components
│   ├── constants/                  # Application constants
│   │   └── index.ts
│   ├── lib/                        # Utility functions and mock data
│   │   ├── dashboard-sample-data.ts
│   │   ├── blog-data.ts
│   │   ├── marketplace-data.ts
│   │   ├── orders-data.ts
│   │   ├── question-system-data.ts
│   │   ├── user-management-data.ts
│   │   ├── premium-subscribers-data.ts
│   │   ├── settings-data.ts
│   │   ├── import-data.ts
│   │   ├── test-archive-data.ts
│   │   ├── passages-data.ts
│   │   ├── preview-validation-data.ts
│   │   ├── utils.ts
│   │   └── ...
│   ├── services/                   # API integration layer
│   │   └── api.ts                  # API client configuration
│   ├── store/                      # Redux store configuration
│   │   ├── index.ts                # Store setup
│   │   ├── hooks.ts                # Custom Redux hooks
│   │   ├── ReduxProvider.tsx       # Redux provider
│   │   └── slices/                 # Redux slices (reducers)
│   └── types/                      # TypeScript type definitions
│       └── index.ts
├── package.json                    # Project dependencies
├── tsconfig.json                   # TypeScript configuration
├── next.config.ts                  # Next.js configuration
├── tailwind.config.ts              # Tailwind CSS configuration
├── postcss.config.mjs              # PostCSS configuration
├── eslint.config.mjs               # ESLint configuration
├── components.json                 # Component configuration
└── README.md                       # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or **yarn** 1.22.x or **pnpm** 8.x

### Installation

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
   ```

3. **Environment Configuration**
   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
   # Add other environment variables as needed
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to access the dashboard.

## 📝 Available Scripts

### Development

- **`npm run dev`** - Start development server with hot reload
- **`npm run build`** - Build optimized production bundle
- **`npm start`** - Start production server

### Code Quality

- **`npm run lint`** - Run ESLint to check code quality
- **`npm run lint:fix`** - Fix ESLint issues automatically
- **`npm run format`** - Format code with Prettier
- **`npm run format:check`** - Check if code is formatted correctly

## 🔧 Configuration Files

### TypeScript Configuration (`tsconfig.json`)

- Target: ES2017
- Strict mode enabled
- Path alias: `@/*` maps to `./src/*`
- JSX: React 19 compatible

### Next.js Configuration (`next.config.ts`)

- Optimized for dashboard performance
- Image optimization support

### Tailwind CSS Configuration

- Utility-first CSS framework
- Custom theme extensions
- Dark mode support
- PostCSS integration

## 🔌 API Integration

The dashboard integrates with the backend API through a centralized client at `src/services/api.ts`.

### Key Endpoints

- User management and analytics
- Question creation and management
- Blog content operations
- Marketplace product management
- Order processing and tracking
- Premium subscription management
- Analytics and reporting

## 📊 Data & State Management

### Redux Store

- **User data** - User management and permissions
- **Products** - Marketplace product data
- **Orders** - Order and transaction data
- **Questions** - Exam question data
- **Blog** - Article and content data
- **Premium Subscriptions** - Subscription data
- **Analytics** - Dashboard metrics and charts

### Mock Data

The project includes comprehensive mock data for development:

- Sample dashboards and analytics
- Product catalogs
- User lists and profiles
- Order histories
- Blog articles and categories
- Question libraries
- Premium subscriber data

## 📈 Analytics & Charting

### Chart Components Built with Recharts

Located in `src/components/charts/`:

- **DashboardAreaChart** - User growth and trend analysis
- **DashboardDonutChart** - Category distribution
- **DashboardHorizontalBarChart** - Comparative metrics
- **CategoryDonutChart** - Category breakdown
- **PremiumByProductChart** - Premium distribution by product
- **UserGrowthChart** - User acquisition trends

### Analytics Features

- Real-time data visualization
- Year-based filtering
- Custom date ranges
- Responsive chart designs
- Export-ready visualizations

## 🎨 UI Components

### Component Libraries

- **shadcn/ui** - High-quality components
- **Base UI** - Headless components
- **Lucide React** - Icon set
- **Custom components** - Dashboard-specific UI

### Layout Components

- `DashboardShell` - Main dashboard layout wrapper
- `Header` - Top navigation and controls
- `Sidebar` - Main navigation menu

## 🧪 Form Validation

- **react-hook-form** for efficient form handling
- **zod** for schema validation
- Type-safe forms with TypeScript
- Real-time validation feedback

## 🔐 Authentication

- Admin login system
- Session management
- Role-based access control
- Secure password recovery
- OTP verification for sensitive operations

## 📱 Responsive Design

- Mobile-optimized admin interface
- Responsive breakpoints for all devices
- Touch-friendly controls
- Desktop-first layout for data-heavy views

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚢 Deployment

### Vercel (Recommended)

```bash
vercel
```

### Docker

Create containerized deployment with Docker and Docker Compose.

### Build Steps

1. Install dependencies: `npm install`
2. Build the application: `npm run build`
3. Start production server: `npm start`

## 🔒 Security Considerations

- Protected admin routes
- Session-based authentication
- CSRF protection
- Input validation and sanitization
- Secure API communication
- Role-based access control

## 👥 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes and commit: `git commit -am 'Add feature'`
3. Push to the branch: `git push origin feature/your-feature`
4. Submit a pull request

### Code Standards

- Follow ESLint rules
- Format with Prettier
- Write meaningful commits
- Keep components focused
- Use TypeScript
- Add documentation for complex features

## 🐛 Troubleshooting

### Common Issues

**Issue: Charts not rendering**

- Verify Recharts is properly installed
- Check chart data structure
- Ensure container has defined width/height

**Issue: Form validation errors**

- Use direct `schema.safeParse()` for better compatibility
- Check Zod schema definitions

**Issue: Navigation issues**

- Verify route structure in app directory
- Check Next.js routing configuration

## 📄 License

This project is proprietary software. All rights reserved.

## 📞 Support

For issues, questions, or suggestions:

- Create an issue in the repository
- Contact the development team
- Review documentation in related projects

## 🔗 Related Projects

- **testora-frontend** - Consumer-facing learning platform
- **testora-backend** - Backend API service

## 📊 Performance Optimization

- Next.js image optimization
- Code splitting and lazy loading
- CSS purging for smaller bundle sizes
- Redux for efficient state management
- Recharts optimization for large datasets
- React 19's rendering improvements

---

**Version:** 0.1.0
**Last Updated:** April 2026
**Maintainer:** Development Team
**Environment:** Admin/Internal Use Only
