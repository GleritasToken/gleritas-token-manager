# Deployment Guide

This guide covers deploying the Gleritas Token Manager application to various platforms.

## 🚀 Quick Deployment Options

### Railway (Recommended)

Railway is perfect for full-stack applications with PostgreSQL support.

1. **Fork/Clone** your repository to Railway
2. **Add Environment Variables**:
   ```
   DATABASE_URL=your-postgresql-url
   SESSION_SECRET=your-session-secret
   NODE_ENV=production
   PORT=5000
   ```
3. **Deploy** - Railway will automatically detect the Node.js app and build it

### Render

1. **Connect** your GitHub repository to Render
2. **Create a Web Service** with these settings:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment**: Node
3. **Add Environment Variables** (same as Railway)
4. **Deploy**

### Vercel

For Vercel deployment, you'll need to separate frontend and backend:

1. **Frontend**: Deploy the `client/` directory
2. **Backend**: Use Vercel Serverless Functions or deploy separately

### Heroku

1. **Install Heroku CLI** and login
2. **Create app**: `heroku create your-app-name`
3. **Add PostgreSQL**: `heroku addons:create heroku-postgresql:mini`
4. **Set environment variables**:
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set SESSION_SECRET=your-secret
   ```
5. **Deploy**: `git push heroku main`

## 🔧 Environment Setup

### Required Environment Variables

```env
# Database (PostgreSQL)
DATABASE_URL="postgresql://username:password@host:port/database"

# Session Security
SESSION_SECRET="your-super-secret-key-here"

# Server Configuration
NODE_ENV=production
PORT=5000
```

### Database Setup

1. **Create PostgreSQL Database** (local or cloud)
2. **Run Migrations**:
   ```bash
   npm run db:push
   ```
3. **Verify Connection**:
   ```bash
   npm run db:studio
   ```

## 📦 Build Process

The application uses a custom build process:

```bash
# Install dependencies
npm install

# Build for production
npm run build
```

This creates:
- **Frontend**: `dist/public/` (static files)
- **Backend**: `dist/index.js` (server bundle)

## 🔒 Security Considerations

### Production Checklist

- [ ] **Environment Variables**: All secrets properly configured
- [ ] **Database**: PostgreSQL with SSL enabled
- [ ] **HTTPS**: SSL certificate configured
- [ ] **CORS**: Proper CORS settings for your domain
- [ ] **Session Secret**: Strong, unique session secret
- [ ] **Database Access**: Restricted database access

### Security Headers

Add these headers to your production server:

```javascript
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    scriptSrc: ["'self'"],
    imgSrc: ["'self'", "data:", "https:"],
  },
}));
```

## 📊 Monitoring & Logging

### Recommended Tools

- **Application Monitoring**: Sentry, LogRocket
- **Database Monitoring**: Neon Console, pgAdmin
- **Performance**: Vercel Analytics, Google Analytics

### Health Check Endpoint

Add a health check endpoint:

```javascript
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV 
  });
});
```

## 🔄 CI/CD Pipeline

### GitHub Actions Example

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run type-check
      # Add your deployment steps here
```

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check `DATABASE_URL` format
   - Verify database is accessible
   - Check SSL requirements

2. **Build Fails**
   - Ensure all dependencies are installed
   - Check TypeScript errors
   - Verify environment variables

3. **Session Issues**
   - Verify `SESSION_SECRET` is set
   - Check cookie settings
   - Ensure HTTPS in production

### Debug Commands

```bash
# Check database connection
npm run db:studio

# Type checking
npm run type-check

# Build locally
npm run build

# Test production build
npm start
```

## 📈 Performance Optimization

### Frontend

- **Code Splitting**: Implemented via Vite
- **Image Optimization**: Use WebP format
- **Caching**: Configure proper cache headers

### Backend

- **Database Indexing**: Add indexes for frequent queries
- **Connection Pooling**: Configure database connection pool
- **Caching**: Implement Redis for session storage

## 🔄 Updates & Maintenance

### Regular Tasks

1. **Security Updates**: Keep dependencies updated
2. **Database Backups**: Regular PostgreSQL backups
3. **Monitoring**: Check application health
4. **Logs**: Monitor error logs

### Update Process

```bash
# Update dependencies
npm update

# Test locally
npm run dev

# Deploy to staging
# Deploy to production
```

---

**Need Help?** Check the main README.md for more detailed information or create an issue in the repository. 