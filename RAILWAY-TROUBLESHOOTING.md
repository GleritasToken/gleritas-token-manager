# Railway Deployment Troubleshooting

## 🚨 Common Crash Causes & Solutions

### 1. **Environment Variables Missing**
**Problem**: App crashes because required env vars are not set
**Solution**: Set these in Railway dashboard:
```env
DATABASE_URL=postgresql://neondb_owner:npg_JCOAcUb7BFt4@ep-weathered-meadow-aeplsp5l-pooler.c-2.us-east-2.aws.neon.tech/gleritas_db?sslmode=require&channel_binding=require
SESSION_SECRET=7a99473d613397dcbe70a8f99da5f287e705ee095f683f7075df6e0741d7e2b0
PORT=5000
NODE_ENV=production
```

### 2. **Database Connection Issues**
**Problem**: App can't connect to Neon database
**Solution**: 
- Verify DATABASE_URL is correct
- Check if Neon database is active
- Ensure SSL is enabled in connection string

### 3. **Build Failures**
**Problem**: Build process fails
**Solution**: 
- Check Railway build logs
- Verify all dependencies are in package.json
- Ensure build script works locally

### 4. **Port Binding Issues**
**Problem**: App can't bind to Railway's port
**Solution**: 
- Use `process.env.PORT` (Railway sets this automatically)
- Don't hardcode port numbers

### 5. **Memory/Resource Limits**
**Problem**: App exceeds Railway's resource limits
**Solution**: 
- Optimize build process
- Reduce bundle size
- Use simpler dependencies

## 🔧 Deployment Configurations

### Option 1: Simple Configuration (Recommended)
```json
{
  "build": { "builder": "NIXPACKS" },
  "deploy": {
    "startCommand": "node server.js",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 3
  }
}
```

### Option 2: Procfile
```
web: node server.js
```

### Option 3: Package.json Script
```json
{
  "scripts": {
    "start": "node server.js"
  }
}
```

## 🧪 Testing Steps

1. **Test locally first**:
   ```bash
   npm run build
   node server.js
   curl http://localhost:5000/health
   ```

2. **Check Railway logs** for specific error messages

3. **Verify environment variables** are set correctly

4. **Test database connection** manually

## 📊 Expected Logs

**Successful startup**:
```
🚀 Starting Gleritas Token Manager...
📊 Environment: production
🌐 Port: 5000
✅ Database connected successfully
🚀 Server running on 0.0.0.0:5000
✅ Gleritas Token Manager is ready!
```

**Common error logs**:
```
❌ Failed to start application: [error details]
❌ Database connection error: [error details]
❌ Server error: [error details]
```

## 🎯 Quick Fixes

1. **If build fails**: Check package.json dependencies
2. **If startup fails**: Check environment variables
3. **If database fails**: Verify DATABASE_URL
4. **If port fails**: Use process.env.PORT
5. **If memory fails**: Optimize build process

## 📞 Next Steps

1. Check Railway deployment logs
2. Identify specific error message
3. Apply corresponding fix from this guide
4. Redeploy and test 