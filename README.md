# EventSync 🎉

A professional full-stack college event management platform built with the MERN stack.

## Features

✨ **User Features:**
- Browse all upcoming college events
- Register for events and receive QR codes via email
- View registered events in personal dashboard
- Secure authentication with JWT

🔐 **Admin Features:**
- Secure admin login
- Create, edit, and delete events
- Upload event images (Cloudinary integration)
- View all registrations and analytics
- Send confirmation emails to registrants

## Tech Stack

**Frontend:**
- React.js 18
- Vite (Build tool)
- TailwindCSS (Styling)
- React Router DOM (Navigation)
- Axios (HTTP client)

**Backend:**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT + bcrypt (Authentication)
- Cloudinary (Image uploads)
- QRCode (QR generation)
- Nodemailer (Email service)

## Project Structure

```
eventsync/
├── client/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── api/
│   │   └── styles/
│   └── package.json
├── server/          # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── utils/
│   ├── config/
│   ├── scripts/
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account (for image uploads)
- SMTP credentials (Gmail recommended)

### Installation

1. **Clone and navigate to project:**
```bash
cd /home/arshdeep/Desktop/eventsyc
```

2. **Backend Setup:**
```bash
cd server
npm install
```

3. **Configure environment variables:**
```bash
# Copy the example file
cp .env.example .env
```

Edit `server/.env` with your credentials:
```env
PORT=5000
MONGO_URI=mongodb+srv://rajput24:Arsh0987k@cluster0.ojmklpo.mongodb.net/eventsync?retryWrites=true&w=majority
JWT_SECRET=eventsync_super_secret_jwt_key_2025
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
FROM_EMAIL=eventsync@example.com
```

4. **Seed admin user:**
```bash
npm run seed:admin
```
Default admin credentials:
- Email: `admin@eventsync.com`
- Password: `admin123`

5. **Start backend:**
```bash
npm run dev
```
Server runs on http://localhost:5000

6. **Frontend Setup (in new terminal):**
```bash
cd client
npm install
npm run dev
```
Frontend runs on http://localhost:3000

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/admin/login` - Admin login

### Events
- `GET /api/events` - Get all events (public)
- `GET /api/events/:id` - Get event details (public)
- `POST /api/events` - Create event (admin only)
- `PUT /api/events/:id` - Update event (admin only)
- `DELETE /api/events/:id` - Delete event (admin only)

### Registrations
- `POST /api/register` - Register for event (authenticated)
- `GET /api/register/me` - Get user's registrations (authenticated)

### Admin
- `GET /api/admin/dashboard` - Get dashboard data (admin only)

## Usage Guide

### For Users:
1. Visit http://localhost:3000
2. Register or login
3. Browse events on the home page
4. Click "View Details" on any event
5. Register for the event
6. Check your email for QR code
7. View all registrations in "My Events" dashboard

### For Admins:
1. Click "Admin" link in navbar
2. Login with admin credentials
3. View dashboard with statistics
4. Click "+ Create Event" to add new event
5. Fill form and upload image
6. Manage events from admin panel

## Scripts

### Backend
```bash
npm start          # Production server
npm run dev        # Development with nodemon
npm run seed:admin # Create admin user
npm run lint       # Run ESLint
npm test           # Run tests
```

### Frontend
```bash
npm run dev        # Development server
npm run build      # Production build
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

## Environment Variables

### Required Backend Variables:
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT tokens
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret
- `SMTP_HOST` - SMTP server host
- `SMTP_PORT` - SMTP server port
- `SMTP_USER` - SMTP username
- `SMTP_PASS` - SMTP password (use App Password for Gmail)
- `FROM_EMAIL` - Sender email address

### Optional Frontend Variables:
- `VITE_API_URL` - Backend API URL (defaults to http://localhost:5000/api)

## Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Input validation middleware
- Protected admin routes
- Secure image uploads
- Email verification for registrations

## Performance Optimizations

- Lazy loading for components
- Optimized images via Cloudinary
- MongoDB indexing
- Efficient React state management
- Tailwind CSS purging in production

## Troubleshooting

**MongoDB connection fails:**
- Check your MongoDB URI
- Ensure IP is whitelisted in MongoDB Atlas
- Verify network connection

**Cloudinary upload fails:**
- Verify Cloudinary credentials
- Check image size (max 5MB recommended)
- Ensure proper API permissions

**Email not sending:**
- For Gmail, use App Password (not regular password)
- Enable "Less secure app access" if needed
- Check SMTP credentials
- Verify email in .env matches SMTP_USER

**Port already in use:**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or use different port in .env
PORT=5001
```

## Future Enhancements

- [ ] Event categories with filters
- [ ] Search functionality
- [ ] Event capacity limits
- [ ] Ticket booking with payments
- [ ] Real-time notifications
- [ ] QR code scanning app
- [ ] Event feedback/ratings
- [ ] Calendar integration
- [ ] Social media sharing
- [ ] Multi-language support

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues or questions:
- Create an issue in the repository
- Email: support@eventsync.com

---

Built with ❤️ for college event management
