# EventSync - Quick Start Guide

## 🚀 Your Application is Ready!

Both backend and frontend servers are now running:
- **Backend API**: http://localhost:5000
- **Frontend App**: http://localhost:3000

## ✅ What's Been Set Up

### 1. Backend (Node.js + Express + MongoDB)
- ✓ MongoDB Atlas connected
- ✓ JWT authentication configured
- ✓ Admin user created
- ✓ All API endpoints ready
- ✓ Input validation middleware
- ✓ Cloudinary & Nodemailer configured

### 2. Frontend (React + Vite + Tailwind)
- ✓ Modern UI with animations
- ✓ Responsive design
- ✓ Route protection
- ✓ Admin dashboard
- ✓ Event management UI

## 🔑 Default Admin Credentials

```
Email: admin@eventsync.com
Password: admin123
```

**⚠️ Change this password in production!**

## 📋 Next Steps

### 1. Configure Email (Important for QR codes)

Edit `server/.env`:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
FROM_EMAIL=your_email@gmail.com
```

**For Gmail:**
1. Go to Google Account → Security
2. Enable 2-Step Verification
3. Generate App Password
4. Use that password in SMTP_PASS

### 2. Configure Cloudinary (For image uploads)

1. Sign up at https://cloudinary.com
2. Get your credentials from Dashboard
3. Update in `server/.env`:
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Test the Application

**As User:**
1. Visit http://localhost:3000
2. Click "Register" → Create account
3. Browse events on home page
4. Click any event → Register
5. Check email for QR code
6. View registrations in "My Events"

**As Admin:**
1. Click "Admin" in navbar
2. Login with admin credentials
3. View dashboard statistics
4. Click "+ Create Event"
5. Fill form, upload image, submit
6. Manage events from admin panel

## 🛠️ Development Commands

### Backend (server/)
```bash
npm run dev        # Start with nodemon
npm start          # Production start
npm run seed:admin # Recreate admin user
npm run lint       # Check code quality
```

### Frontend (client/)
```bash
npm run dev        # Development server
npm run build      # Build for production
npm run preview    # Preview build
npm run lint       # Check code quality
```

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
lsof -i :5000

# Kill process if needed
kill -9 <PID>
```

### Frontend won't start
```bash
# Check if port 3000 is in use
lsof -i :3000

# Kill process if needed
kill -9 <PID>
```

### MongoDB connection error
- Check MONGO_URI in .env
- Ensure IP whitelisted in MongoDB Atlas
- Test connection: `mongosh "your_connection_string"`

### Images not uploading
- Verify Cloudinary credentials
- Check image size (keep under 5MB)
- Check browser console for errors

### Emails not sending
- Use App Password for Gmail (not regular password)
- Check SMTP credentials
- Test with: https://www.smtper.net/

## 📱 Features to Test

- [ ] User registration & login
- [ ] Browse events with filters
- [ ] View event details
- [ ] Register for event
- [ ] Receive QR code email
- [ ] View dashboard with registrations
- [ ] Admin login
- [ ] Create event with image
- [ ] View admin dashboard
- [ ] Delete events

## 🎨 Customization Ideas

1. **Brand Colors**: Edit `client/tailwind.config.cjs`
2. **Logo**: Add image to navbar in `client/src/components/Navbar.jsx`
3. **Email Template**: Edit `server/controllers/registerController.js`
4. **Event Categories**: Add more in `client/src/pages/CreateEvent.jsx`

## 📦 Deployment

### Backend (Railway/Render/Heroku)
1. Push code to GitHub
2. Connect repository to platform
3. Set environment variables
4. Deploy!

### Frontend (Vercel/Netlify)
1. Push code to GitHub
2. Connect repository
3. Set build command: `cd client && npm run build`
4. Set build directory: `client/dist`
5. Add env var: `VITE_API_URL=https://your-backend-url.com/api`
6. Deploy!

## 🔒 Security Checklist

Before going live:
- [ ] Change admin password
- [ ] Use strong JWT_SECRET
- [ ] Enable HTTPS
- [ ] Set up rate limiting
- [ ] Add input sanitization
- [ ] Enable CORS only for your domain
- [ ] Use environment variables (never commit .env)
- [ ] Regular dependency updates

## 📚 Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Manual](https://docs.mongodb.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Cloudinary Docs](https://cloudinary.com/documentation)

## 🆘 Need Help?

- Check logs: `npm run dev` shows errors
- Browser DevTools → Console for frontend errors
- Test API with Postman/Thunder Client
- Check MongoDB Compass for data issues

## 🎉 You're All Set!

Your EventSync platform is ready. Start by:
1. Testing user flow (register → browse → register for event)
2. Testing admin flow (login → create event)
3. Configuring email & image uploads
4. Customizing branding
5. Adding more features!

Happy coding! 🚀
