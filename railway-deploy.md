# Railway Deployment Guide

## 🚀 Quick Railway Deployment

### Step 1: Prepare Your Repository
1. **Push to GitHub**: Ensure your code is in a GitHub repository
2. **Check Environment**: Make sure `.env` is in `.gitignore`
3. **Verify Build**: Test `npm run build` locally

### Step 2: Deploy to Railway
1. **Visit**: [railway.app](https://railway.app)
2. **Sign Up**: Use GitHub account
3. **New Project**: Click "New Project"
4. **Deploy from GitHub**: Select your repository
5. **Auto-Deploy**: Railway will detect Node.js and deploy

### Step 3: Configure Environment Variables
In Railway dashboard, add these variables:

```env
DATABASE_URL=your-neon-database-url
SESSION_SECRET=your-production-session-secret
NODE_ENV=production
PORT=5000
```

### Step 4: Set Up Database
1. **Add PostgreSQL**: In Railway, add PostgreSQL service
2. **Update DATABASE_URL**: Use Railway's PostgreSQL URL
3. **Run Migrations**: 
   ```bash
   npm run db:push
   ```

### Step 5: Custom Domain (Optional)
1. **Add Domain**: In Railway dashboard
2. **Configure DNS**: Point your domain to Railway
3. **SSL**: Automatic HTTPS

## 💰 Pricing Comparison

### Railway Pricing:
- **Free Tier**: 500 hours/month, 1GB RAM
- **Pro Plan**: $5/month, 2GB RAM, unlimited hours
- **Team Plan**: $20/month, 4GB RAM

### Render Pricing:
- **Free Tier**: 750 hours/month, 512MB RAM
- **Individual**: $7/month, 1GB RAM
- **Standard**: $25/month, 2GB RAM

## 🎯 Why Railway Wins for Your Project

1. **Full-Stack Ready**: Perfect for React + Express apps
2. **Database Integration**: Seamless PostgreSQL setup
3. **Simpler Configuration**: Less setup required
4. **Better Developer Experience**: Real-time logs, easy debugging
5. **Cost Effective**: Free tier covers most needs

## 🔧 Railway-Specific Optimizations

### Update package.json Scripts:
```json
{
  "scripts": {
    "build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
    "start": "cross-env NODE_ENV=production node dist/index.js"
  }
}
```

### Railway Configuration:
Railway automatically detects:
- Node.js runtime
- Build command: `npm run build`
- Start command: `npm start`
- Port: From `PORT` environment variable

## 🚀 Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Environment variables configured
- [ ] Database connected
- [ ] Build successful
- [ ] Application accessible
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active
- [ ] Admin dashboard working
- [ ] Referral system tested

## 🆘 Troubleshooting

### Common Issues:
1. **Build Fails**: Check `npm run build` locally
2. **Database Connection**: Verify `DATABASE_URL`
3. **Port Issues**: Ensure `PORT` is set
4. **Environment Variables**: Check all required vars

### Railway Commands:
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link project
railway link

# Deploy
railway up

# View logs
railway logs

# Open dashboard
railway open
```

## 🎉 Success Metrics

After deployment, verify:
- ✅ Application loads without errors
- ✅ User registration works
- ✅ Referral codes generate correctly
- ✅ Admin dashboard accessible
- ✅ Database operations work
- ✅ SSL certificate active
- ✅ Mobile responsiveness

---

**Railway is the clear winner for your Gleritas Token Manager project!** 🏆 