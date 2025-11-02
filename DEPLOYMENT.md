# EventSync - Deployment Guide

## 🌐 Deploy to Production

### Option 1: Railway (Backend) + Vercel (Frontend) [Recommended]

#### Backend on Railway

1. **Create Railway Account**: https://railway.app

2. **Deploy Backend**:
```bash
# In project root
cd server
git init
git add .
git commit -m "Initial commit"
```

3. **Push to Railway**:
- Click "New Project" → "Deploy from GitHub"
- Or use Railway CLI: `railway up`

4. **Set Environment Variables** in Railway Dashboard:
```
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_app_password
FROM_EMAIL=your_email
```

5. **Note your backend URL**: e.g., `https://your-app.railway.app`

#### Frontend on Vercel

1. **Create Vercel Account**: https://vercel.com

2. **Deploy Frontend**:
```bash
cd client
git init
git add .
git commit -m "Initial commit"
git push origin main
```

3. **Import to Vercel**:
- Click "New Project"
- Import from Git
- Set Root Directory: `client`
- Build Command: `npm run build`
- Output Directory: `dist`

4. **Add Environment Variable**:
```
VITE_API_URL=https://your-backend.railway.app/api
```

5. **Deploy!** ✅

---

### Option 2: Render (Full Stack)

#### Backend on Render

1. **Create account**: https://render.com

2. **New Web Service**:
- Connect GitHub repo
- Root Directory: `server`
- Build Command: `npm install`
- Start Command: `npm start`

3. **Add Environment Variables** (same as above)

4. **Create MongoDB Atlas** (if not done):
- https://mongodb.com/atlas
- Create cluster
- Get connection string
- Add to MONGO_URI

#### Frontend on Render

1. **New Static Site**:
- Root Directory: `client`
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`

2. **Add Environment Variable**:
```
VITE_API_URL=https://your-backend.onrender.com/api
```

---

### Option 3: Heroku (Backend) + Netlify (Frontend)

#### Backend on Heroku

1. **Install Heroku CLI**: `npm install -g heroku`

2. **Login**: `heroku login`

3. **Create app**:
```bash
cd server
heroku create your-app-name
```

4. **Add Procfile**:
```
web: node index.js
```

5. **Set environment variables**:
```bash
heroku config:set MONGO_URI=your_mongo_uri
heroku config:set JWT_SECRET=your_secret
# ... set all other env vars
```

6. **Deploy**:
```bash
git push heroku main
```

#### Frontend on Netlify

1. **Create account**: https://netlify.com

2. **Drag & drop build**:
```bash
cd client
npm run build
# Drag dist/ folder to Netlify
```

Or use **Netlify CLI**:
```bash
npm install -g netlify-cli
netlify deploy --prod
```

3. **Set environment**:
```
VITE_API_URL=https://your-app.herokuapp.com/api
```

---

## 🔐 Production Security Checklist

### Before Going Live:

- [ ] **Change admin password**
- [ ] **Use strong JWT_SECRET** (generate: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
- [ ] **Enable HTTPS** (usually automatic on platforms)
- [ ] **Add rate limiting**:
```bash
npm install express-rate-limit
```

- [ ] **Update CORS** in `server/index.js`:
```javascript
app.use(cors({
  origin: 'https://your-frontend-domain.com'
}));
```

- [ ] **Add helmet** for security headers:
```bash
npm install helmet
```
```javascript
const helmet = require('helmet');
app.use(helmet());
```

- [ ] **Environment check**:
```javascript
if (!process.env.JWT_SECRET || !process.env.MONGO_URI) {
  throw new Error('Missing required environment variables');
}
```

- [ ] **Add logging** (Winston/Morgan)
- [ ] **Set up monitoring** (New Relic/DataDog)
- [ ] **Configure backup** for MongoDB
- [ ] **Add health check endpoint**

---

## 🚀 Post-Deployment Testing

### Test Checklist:

1. **Backend Health**:
```bash
curl https://your-api.com/
# Should return: {"ok":true,"msg":"EventSync API"}
```

2. **User Flow**:
- [ ] Register new user
- [ ] Login
- [ ] Browse events
- [ ] Register for event
- [ ] Check email received
- [ ] View dashboard

3. **Admin Flow**:
- [ ] Admin login
- [ ] Create event with image
- [ ] View dashboard stats
- [ ] Delete event

4. **Security**:
- [ ] Try accessing admin routes without token
- [ ] Try SQL injection in forms
- [ ] Check HTTPS enforcement

---

## 🐛 Common Deployment Issues

### Backend Issues

**"Cannot connect to MongoDB"**
```
Solution: 
- Check MongoDB Atlas IP whitelist (allow 0.0.0.0/0 for cloud platforms)
- Verify MONGO_URI format
- Test connection with mongosh
```

**"Port already in use"**
```
Solution:
- Use process.env.PORT
- Railway/Render assign port automatically
```

**"Module not found"**
```
Solution:
- Run npm install on server
- Check package.json dependencies
- Clear node_modules and reinstall
```

### Frontend Issues

**"API not reachable"**
```
Solution:
- Check VITE_API_URL is correct
- Ensure backend URL includes /api
- Check CORS settings on backend
- Verify backend is running
```

**"Build failed"**
```
Solution:
- Run npm run build locally first
- Check for console errors
- Verify all imports are correct
- Check node version compatibility
```

**"Blank page after deployment"**
```
Solution:
- Check browser console
- Verify build output directory (dist/)
- Check routing configuration
- Enable error reporting
```

---

## 📊 Monitoring & Maintenance

### Set Up Monitoring

1. **Backend Monitoring**:
- Add health check: `GET /health`
- Set up uptime monitoring (UptimeRobot)
- Configure error tracking (Sentry)

2. **Database Monitoring**:
- MongoDB Atlas alerts
- Set up backup schedule
- Monitor connection pool

3. **Frontend Monitoring**:
- Google Analytics
- Error tracking (Sentry/LogRocket)
- Performance monitoring (Lighthouse)

### Regular Maintenance

- [ ] Weekly: Check logs for errors
- [ ] Monthly: Update dependencies
- [ ] Quarterly: Review and update security
- [ ] Yearly: Backup data, review infrastructure

---

## 🎯 Performance Optimization

### Backend:
- [ ] Enable compression
- [ ] Add Redis caching
- [ ] Optimize database queries
- [ ] Use CDN for static assets

### Frontend:
- [ ] Code splitting
- [ ] Lazy load components
- [ ] Optimize images (Cloudinary auto)
- [ ] Enable service worker

---

## 📞 Support Resources

- **Railway**: https://railway.app/help
- **Vercel**: https://vercel.com/support
- **Render**: https://render.com/docs
- **MongoDB Atlas**: https://docs.atlas.mongodb.com

---

## 🎉 You're Live!

Your EventSync platform is now accessible to users worldwide!

**Next Steps**:
1. Share the URL with users
2. Monitor for errors
3. Collect feedback
4. Plan new features
5. Scale as needed

Good luck! 🚀
