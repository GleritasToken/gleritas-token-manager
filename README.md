# Gleritas Token Manager

A full-stack web application for the GLRS (Gleritas) token airdrop platform. Built with React, Express.js, and PostgreSQL, this application allows users to earn points through various social media tasks and referrals, with the goal of converting these points to GLRS tokens later.

## 🚀 Features

- **User Authentication**: Session-based authentication with secure password hashing
- **Task Management**: Complete social media tasks to earn points
- **Referral System**: Earn points by referring new users (250 points per referral)
- **Wallet Integration**: Connect BSC wallet addresses for future token distribution
- **Points System**: Track and manage user points across all activities
- **Responsive Design**: Mobile-first design with bottom navigation
- **Theme Support**: Light/dark mode toggle throughout the application
- **Real-time Updates**: Live point tracking and task completion status

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Wouter** for client-side routing
- **TanStack Query** for server state management
- **Tailwind CSS** with shadcn/ui components
- **Framer Motion** for animations

### Backend
- **Express.js** with TypeScript
- **Drizzle ORM** for database operations
- **PostgreSQL** with Neon Database (serverless)
- **bcryptjs** for password security
- **Express Session** for authentication

### Development
- **TypeScript** for type safety
- **ESBuild** for backend bundling
- **Drizzle Kit** for database migrations

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/) (local or cloud instance)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd GleritasTokenManagerr
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Copy the environment example file and configure your variables:

```bash
cp env.example .env
```

Edit `.env` with your configuration:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/gleritas_db"

# Session Configuration
SESSION_SECRET="your-super-secret-session-key-here"

# Server Configuration
PORT=5000
NODE_ENV=development
```

### 4. Database Setup

Push the database schema to your PostgreSQL instance:

```bash
npm run db:push
```

### 5. Start Development Server

Run both frontend and backend in development mode:

```bash
npm run dev
```

This will start:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📁 Project Structure

```
GleritasTokenManagerr/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility libraries
│   │   └── main.tsx       # Application entry point
│   └── index.html         # HTML template
├── server/                # Backend Express application
│   ├── routes.ts          # API route definitions
│   ├── db.ts             # Database connection
│   ├── storage.ts        # Session storage configuration
│   └── index.ts          # Server entry point
├── shared/               # Shared types and schemas
│   └── schema.ts         # Database schema definitions
├── attached_assets/      # Static assets
└── dist/                # Build output (generated)
```

## 🎯 Available Scripts

- `npm run dev` - Start development server (frontend + backend)
- `npm run dev:client` - Start frontend development server only
- `npm run dev:server` - Start backend development server only
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:push` - Push database schema changes
- `npm run db:generate` - Generate database migrations
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Drizzle Studio
- `npm run type-check` - Run TypeScript type checking

## 🔧 Development

### Database Management

The application uses Drizzle ORM with PostgreSQL. Key commands:

```bash
# Push schema changes to database
npm run db:push

# Generate migration files
npm run db:generate

# Run migrations
npm run db:migrate

# Open Drizzle Studio (database GUI)
npm run db:studio
```

### Adding New Features

1. **Backend API**: Add routes in `server/routes.ts`
2. **Database Schema**: Update `shared/schema.ts`
3. **Frontend Components**: Create components in `client/src/components/`
4. **Pages**: Add new pages in `client/src/pages/`

### Code Style

- Use TypeScript for all new code
- Follow the existing component patterns
- Use Tailwind CSS for styling
- Implement proper error handling
- Add appropriate TypeScript types

## 🚀 Deployment

### Production Build

```bash
npm run build
```

This creates:
- Frontend build in `dist/public/`
- Backend build in `dist/index.js`

### Environment Variables for Production

Set these environment variables in your production environment:

```env
NODE_ENV=production
DATABASE_URL="your-production-database-url"
SESSION_SECRET="your-production-session-secret"
PORT=5000
```

### Deployment Platforms

This application can be deployed to various platforms:

- **Vercel**: Frontend deployment with serverless functions
- **Railway**: Full-stack deployment
- **Render**: Full-stack deployment
- **Heroku**: Full-stack deployment
- **DigitalOcean App Platform**: Full-stack deployment

## 🔐 Security Features

- Session-based authentication with secure cookies
- Password hashing with bcryptjs
- CORS protection in development
- Input validation with Zod schemas
- SQL injection protection via Drizzle ORM

## 📱 Mobile Support

The application is fully responsive with:
- Mobile-first design approach
- Bottom navigation for mobile devices
- Touch-friendly interface elements
- Optimized layouts for various screen sizes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Include error messages and steps to reproduce

## 🔄 Recent Updates

- ✅ Removed Replit-specific dependencies
- ✅ Added proper development scripts
- ✅ Configured CORS for local development
- ✅ Updated Vite configuration for local development
- ✅ Added comprehensive documentation
- ✅ Created environment configuration examples

---

**Note**: This application is designed for the GLRS token airdrop platform. Make sure to configure your database and environment variables before running the application. 