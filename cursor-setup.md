# Cursor Setup Guide

This guide helps you set up the Gleritas Token Manager project in Cursor for optimal development experience.

## 🚀 Initial Setup

### 1. Open Project in Cursor

```bash
# Open the project directory in Cursor
cursor GleritasTokenManagerr
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Copy the environment example and configure:

```bash
cp env.example .env
```

Edit `.env` with your local configuration:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/gleritas_db"

# Session Configuration
SESSION_SECRET="your-local-development-secret"

# Server Configuration
PORT=5000
NODE_ENV=development
```

## 🔧 Cursor Configuration

### Recommended Extensions

Install these extensions in Cursor for the best development experience:

1. **TypeScript and JavaScript Language Features** (built-in)
2. **Tailwind CSS IntelliSense**
3. **ES7+ React/Redux/React-Native snippets**
4. **Prettier - Code formatter**
5. **ESLint**
6. **GitLens**
7. **Thunder Client** (for API testing)

### Workspace Settings

Create `.vscode/settings.json` for consistent development:

```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.suggest.autoImports": true,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.includeLanguages": {
    "typescript": "javascript",
    "typescriptreact": "javascript"
  },
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ],
  "files.associations": {
    "*.css": "tailwindcss"
  }
}
```

### Prettier Configuration

Create `.prettierrc`:

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

## 🎯 Development Workflow

### Starting Development

```bash
# Start both frontend and backend
npm run dev
```

This will start:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

### Database Management

```bash
# Push schema changes
npm run db:push

# Open Drizzle Studio (database GUI)
npm run db:studio

# Generate migrations
npm run db:generate
```

### Type Checking

```bash
# Check TypeScript types
npm run type-check
```

## 📁 File Organization

### Key Files to Focus On

1. **Frontend Components**: `client/src/components/`
2. **Pages**: `client/src/pages/`
3. **API Routes**: `server/routes.ts`
4. **Database Schema**: `shared/schema.ts`
5. **Styling**: `client/src/index.css`

### Quick Navigation

Use Cursor's file search (`Ctrl+P`) to quickly navigate:

- `@components` - UI components
- `@pages` - Page components
- `@hooks` - Custom hooks
- `@lib` - Utility functions
- `@shared` - Shared types and schemas

## 🔍 Debugging

### Frontend Debugging

1. **React DevTools**: Install browser extension
2. **Console Logs**: Check browser console
3. **Network Tab**: Monitor API calls

### Backend Debugging

1. **Server Logs**: Check terminal output
2. **Database**: Use `npm run db:studio`
3. **API Testing**: Use Thunder Client or Postman

### Common Debug Commands

```bash
# Check for TypeScript errors
npm run type-check

# Build and check for errors
npm run build

# Test production build
npm start
```

## 🎨 Styling Workflow

### Tailwind CSS

- Use Tailwind CSS IntelliSense for autocomplete
- Check `tailwind.config.ts` for custom configuration
- Use `@apply` directive for complex styles

### Component Styling

```tsx
// Example component with Tailwind
import { cn } from "@/lib/utils";

interface ButtonProps {
  variant?: "default" | "outline";
  className?: string;
}

export function Button({ variant = "default", className, ...props }) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-md font-medium transition-colors",
        variant === "default" && "bg-blue-600 text-white hover:bg-blue-700",
        variant === "outline" && "border border-gray-300 hover:bg-gray-50",
        className
      )}
      {...props}
    />
  );
}
```

## 🔄 Git Workflow

### Branch Strategy

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push to remote
git push origin feature/new-feature
```

### Commit Convention

Use conventional commits:

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test changes
- `chore:` Build/tooling changes

## 🚀 Productivity Tips

### Keyboard Shortcuts

- `Ctrl+P`: Quick file search
- `Ctrl+Shift+P`: Command palette
- `Ctrl+Space`: Trigger suggestions
- `F12`: Go to definition
- `Alt+F12`: Peek definition
- `Ctrl+K Ctrl+C`: Add line comment
- `Ctrl+K Ctrl+U`: Remove line comment

### Code Snippets

Create custom snippets in `.vscode/snippets.json`:

```json
{
  "React Component": {
    "prefix": "rfc",
    "body": [
      "import React from 'react';",
      "",
      "interface ${1:ComponentName}Props {",
      "  $2",
      "}",
      "",
      "export function ${1:ComponentName}({ $3 }: ${1:ComponentName}Props) {",
      "  return (",
      "    <div>",
      "      $0",
      "    </div>",
      "  );",
      "}"
    ]
  }
}
```

### AI Assistance

Use Cursor's AI features:

1. **Code Completion**: Let AI suggest code
2. **Code Explanation**: Ask AI to explain code
3. **Bug Fixing**: Ask AI to help debug issues
4. **Refactoring**: Ask AI to suggest improvements

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Kill process on port 3000
   npx kill-port 3000
   # Kill process on port 5000
   npx kill-port 5000
   ```

2. **Database Connection Issues**
   - Check PostgreSQL is running
   - Verify `DATABASE_URL` format
   - Test connection with `npm run db:studio`

3. **TypeScript Errors**
   - Run `npm run type-check`
   - Check for missing dependencies
   - Verify import paths

### Performance Tips

1. **Large Files**: Split large components into smaller ones
2. **Imports**: Use specific imports instead of wildcard imports
3. **Dependencies**: Keep dependencies updated
4. **Build**: Use `npm run build` to catch issues early

## 📚 Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [Express.js Documentation](https://expressjs.com/)

---

**Happy Coding!** 🚀

This setup should give you a smooth development experience in Cursor with all the tools you need to build and maintain the Gleritas Token Manager application. 