# 🚀 Railway Deployment Checklist

## ✅ Pre-Deployment Checklist

- [x] **Project builds successfully** (`npm run build` works)
- [x] **All changes committed** to Git
- [x] **Environment variables** configured locally
- [x] **Database schema** ready
- [x] **Admin account** created
- [x] **Sample tasks** added

## 🔑 Production Environment Variables

Use these exact values in Railway:

```env
DATABASE_URL=postgresql://neondb_owner:npg_JCOAcUb7BFt4@ep-weathered-meadow-aeplsp5l-pooler.c-2.us-east-2.aws.neon.tech/gleritas_db?sslmode=require&channel_binding=require
SESSION_SECRET=7a99473d613397dcbe70a8f99da5f287e705ee095f683f7075df6e0741d7e2b0
NODE_ENV=production
PORT=5000
```

## 📋 Step-by-Step Deployment

### 1. Create GitHub Repository
- [ ] Go to https://github.com
- [ ] Create new repository: `gleritas-token-manager`
- [ ] Make it public
- [ ] Don't initialize with README

### 2. Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/gleritas-token-manager.git
git push -u origin main
```

### 3. Deploy to Railway
- [ ] Go to https://railway.app
- [ ] Sign up with GitHub
- [ ] Create new project
- [ ] Deploy from GitHub repo
- [ ] Select your repository

### 4. Configure Environment Variables
- [ ] Add `DATABASE_URL` (your Neon database)
- [ ] Add `SESSION_SECRET` (generated above)
- [ ] Add `NODE_ENV=production`
- [ ] Add `PORT=5000`

### 5. Test Deployment
- [ ] Check Railway logs for errors
- [ ] Visit your app URL
- [ ] Test user registration
- [ ] Test referral system
- [ ] Test admin login

## 🎯 Admin Login Credentials

**URL**: `https://your-app.railway.app/admin`

**Credentials**:
- **Username**: `Gleritastoken@gmail.com`
- **Password**: `Gtoken234@@`

## 🔍 Testing Checklist

### User Features
- [ ] User registration works
- [ ] Referral codes generate correctly
- [ ] Tasks are available
- [ ] Points system works
- [ ] Wallet connection works
- [ ] Referral tracking works

### Admin Features
- [ ] Admin login works
- [ ] User management accessible
- [ ] Task management works
- [ ] Analytics visible

### Technical
- [ ] Database connection stable
- [ ] SSL certificate active
- [ ] Mobile responsive
- [ ] No console errors

## 🆘 Common Issues & Solutions

### Build Fails
- Check Railway logs
- Verify all dependencies are in `dependencies`
- Ensure `package.json` scripts are correct

### Database Connection
- Verify `DATABASE_URL` format
- Check Neon database is accessible
- Ensure SSL is enabled

### App Not Loading
- Check `PORT` environment variable
- Verify build completed
- Check Railway logs for errors

## 📞 Support Resources

- **Railway Docs**: https://docs.railway.app
- **Neon Docs**: https://neon.tech/docs
- **Project Logs**: Check Railway dashboard

## 🎉 Success Metrics

After deployment, you should have:
- ✅ Live application accessible via HTTPS
- ✅ User registration and login working
- ✅ Referral system fully functional
- ✅ Admin dashboard operational
- ✅ Database properly connected
- ✅ All features tested and working

---

**Your Gleritas Token Manager will be live and ready for users!** 🚀 