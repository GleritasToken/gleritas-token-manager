# 🚀 Railway Deployment - Step by Step

## Prerequisites ✅
- ✅ Node.js project ready
- ✅ Build working (`npm run build` successful)
- ✅ Git repository initialized
- ✅ All changes committed

## Step 1: Create GitHub Repository

1. **Go to**: https://github.com
2. **Sign in** to your account
3. **Click "New repository"**
4. **Repository name**: `gleritas-token-manager`
5. **Description**: `This is the gleritas airdrop bot`
6. **Make it Public** (recommended for free hosting)
7. **Don't initialize** with README (we already have one)
8. **Click "Create repository"**

## Step 2: Connect to GitHub

Replace `GleritasToken` with your actual GitHub username:

```bash
# Remove the placeholder remote
git remote remove origin

# Add your actual GitHub repository
git remote add origin https://github.com/GleritasToken/gleritas-token-manager.git

# Push to GitHub
git push -u origin main
```

## Step 3: Deploy to Railway

1. **Go to**: https://railway.app
2. **Sign up** with your GitHub account
3. **Click "New Project"**
4. **Select "Deploy from GitHub repo"**
5. **Choose your repository**: `gleritas-token-manager`
6. **Click "Deploy Now"**

## Step 4: Configure Environment Variables

In Railway dashboard, go to your project and add these variables:

```env
DATABASE_URL=postgresql://neondb_owner:npg_JCOAcUb7BFt4@ep-weathered-meadow-aeplsp5l-pooler.c-2.us-east-2.aws.neon.tech/gleritas_db?sslmode=require&channel_binding=require
SESSION_SECRET=7a99473d613397dcbe70a8f99da5f287e705ee095f683f7075df6e0741d7e2b0
NODE_ENV=production
PORT=5000
```

### Get Your Neon Database URL:
1. Go to https://neon.tech
2. Sign in to your account
3. Select your project
4. Copy the connection string
5. Paste it as `DATABASE_URL` in Railway

### Generate Session Secret:
```bash
# Generate a random session secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Step 5: Set Up Database

1. **In Railway dashboard**, click "New Service"
2. **Select "Database"** → "PostgreSQL"
3. **Wait for it to provision**
4. **Copy the PostgreSQL URL** from Railway
5. **Update your `DATABASE_URL`** environment variable
6. **Run database migrations**:
   ```bash
   npm run db:push
   ```

## Step 6: Deploy and Test

1. **Railway will automatically deploy** when you push to GitHub
2. **Check the deployment logs** in Railway dashboard
3. **Visit your app URL** (provided by Railway)
4. **Test all features**:
   - User registration
   - Referral system
   - Admin dashboard
   - Tasks completion

## Step 7: Custom Domain (Optional)

1. **In Railway dashboard**, go to "Settings"
2. **Click "Domains"**
3. **Add your custom domain**
4. **Configure DNS** to point to Railway
5. **SSL certificate** will be automatic

## 🎯 Success Checklist

- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Railway project created
- [ ] Environment variables configured
- [ ] Database connected
- [ ] Application deployed
- [ ] All features working
- [ ] Custom domain configured (optional)

## 🆘 Troubleshooting

### Build Fails:
- Check Railway logs
- Verify `package.json` scripts
- Ensure all dependencies are in `dependencies` (not `devDependencies`)

### Database Connection Fails:
- Verify `DATABASE_URL` format
- Check if Neon database is accessible
- Ensure SSL is enabled

### App Not Loading:
- Check Railway logs
- Verify `PORT` environment variable
- Ensure build completed successfully

## 📞 Support

If you encounter issues:
1. Check Railway logs
2. Verify environment variables
3. Test locally first
4. Check this guide again

---

**Your Gleritas Token Manager will be live on Railway!** 🎉 

🎉 **Excellent! Your code is now on GitHub!**

## 🎉 **Success! Your App is Now on GitHub**

### ✅ **What Just Happened:**
- ✅ **All changes committed** and pushed to GitHub
- ✅ **Merge conflicts resolved**
- ✅ **Repository is up to date**
- ✅ **Ready for Railway deployment**

### 📍 **Your GitHub Repository:**
**https://github.com/GleritasToken/gleritas-token-manager**

### 🚀 **Next Step: Deploy to Railway**

Now you can deploy your app to Railway:

1. **Go to**: https://railway.app
2. **Sign up/Sign in** with your GitHub account
3. **Click "New Project"**
4. **Select "Deploy from GitHub repo"**
5. **Choose**: `GleritasToken/gleritas-token-manager`
6. **Click "Deploy Now"**

### 🔧 **Environment Variables to Add in Railway:**
```env
DATABASE_URL=postgresql://neondb_owner:npg_JCOAcUb7BFt4@ep-weathered-meadow-aeplsp5l-pooler.c-2.us-east-2.aws.neon.tech/gleritas_db?sslmode=require&channel_binding=require
SESSION_SECRET=7a99473d613397dcbe70a8f99da5f287e705ee095f683f7075df6e0741d7e2b0
NODE_ENV=production
PORT=5000
```

**Your app is ready for deployment!** 🚀

Would you like me to help you with the Railway deployment process now? 