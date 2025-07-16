# Overview

This is a full-stack web application for the GLRS (Gleritas) token airdrop platform. It's a React-based single-page application with an Express.js backend that allows users to earn points through various social media tasks and referrals, with the goal of converting these points to GLRS tokens later.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Build Tool**: Vite for development and production builds
- **Theme System**: Custom theme provider supporting light/dark mode with CSS variables

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Authentication**: Session-based authentication with cookies
- **API Design**: RESTful API endpoints under `/api` prefix
- **Password Security**: bcryptjs for password hashing

### Key Components

#### Authentication System
- Session-based authentication using cookies
- User registration with email/username validation
- Password hashing with bcryptjs
- Session management with database storage
- Referral code system during signup

#### Task Management System
- Pre-defined social media tasks (Telegram, Twitter, YouTube)
- Task completion tracking per user
- Point-based reward system
- Task types: referral, telegram, twitter, youtube

#### Referral System
- Unique referral codes for each user
- Maximum 50 referrals per user
- 250 points earned per successful referral
- Referral tracking and statistics

#### Wallet Integration
- BSC wallet address storage
- Wallet connection status tracking
- Mock wallet connection for development

#### UI Components
- Responsive design with mobile-first approach
- Bottom navigation for mobile experience
- Dark/light theme toggle
- Toast notifications for user feedback
- Success popups for completed actions

## Data Flow

1. **User Registration**: User signs up with email/username/password, optionally using referral code
2. **Authentication**: Session created on login, stored in database with expiration
3. **Task Completion**: Users complete tasks, points awarded and stored in database
4. **Referral Process**: Users share referral codes, successful referrals tracked and rewarded
5. **Wallet Connection**: Users connect BSC wallet addresses for future token distribution

## External Dependencies

### Frontend Dependencies
- React ecosystem (React, React DOM, React Router via Wouter)
- TanStack Query for server state management
- Radix UI primitives for accessible components
- Tailwind CSS for styling
- Lucide React for icons
- Various utility libraries (clsx, class-variance-authority)

### Backend Dependencies
- Express.js for server framework
- Drizzle ORM for database operations
- Neon Database serverless driver
- bcryptjs for password security
- Cookie parser for session management
- Zod for schema validation

### Development Dependencies
- Vite for build tooling
- TypeScript for type safety
- ESBuild for backend bundling
- PostCSS and Autoprefixer for CSS processing

## Deployment Strategy

### Build Process
- Frontend: Vite builds React app to `dist/public`
- Backend: ESBuild bundles Express server to `dist/index.js`
- Database: Drizzle migrations handled via `drizzle-kit`

### Environment Configuration
- Database URL required for PostgreSQL connection
- Session-based authentication (no JWT tokens)
- Production/development environment detection

### Database Schema
- Users table with authentication and wallet info
- Tasks table for available tasks
- UserTasks junction table for completion tracking
- Referrals table for referral relationship tracking
- Sessions table for authentication state

### Key Features
- Mobile-responsive design with bottom navigation
- Real-time point tracking and updates
- Social media task verification system
- Referral program with limits and rewards
- Wallet connection preparation for token distribution
- Theme switching (light/dark mode)
- Toast notifications and success feedback

The application is designed to be a complete airdrop platform where users can earn points through social engagement and referrals, with plans for future token distribution to connected wallets.

## Recent Changes (January 16, 2025)

### Completed Features
- ✅ Created comprehensive crypto-themed landing page with animated elements
- ✅ Implemented user authentication with session-based login/signup
- ✅ Added points reward system (500 for registration, 100 for wallet connection, 250 per referral)
- ✅ Built BSC wallet connection with multiple wallet options (MetaMask, Trust Wallet, Binance Chain)
- ✅ Created 6 task types: Referral (3 users, 500 points), Telegram Group/Channel (100 points each), Twitter Follow (150 points), YouTube Subscribe (200 points), YouTube Like (50 points)
- ✅ Implemented referral system with 50 referral limit and progress tracking
- ✅ Added dark/light theme toggle throughout application
- ✅ Created withdrawal page with locked status and informative notice
- ✅ Built About page with updated project description and 3D tokenomics visualization
- ✅ Added animated success popups for user actions
- ✅ Implemented wallet connection requirement for task completion
- ✅ Fixed JavaScript errors and accessibility warnings

### Database Schema Updates
- Users table includes wallet connection status and referral codes
- Tasks table with 6 predefined social media tasks
- UserTasks junction table for completion tracking
- Referrals table with earnings tracking
- Sessions table for authentication

### UI/UX Improvements
- Mobile-responsive design with bottom navigation
- Floating crypto-themed animations on landing page
- Progress indicators for referral system
- Real-time point balance updates
- Theme-consistent styling across all pages