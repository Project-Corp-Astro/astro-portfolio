# Tumul Sir Portfolio Backend

This is the backend server for the Tumul Sir portfolio website, handling contact form submissions and appointment bookings with MongoDB integration.

## Features

- Contact form submission with email notifications
- Appointment booking system with slot availability checking
- MongoDB database integration for persistent storage
- Admin endpoints for managing bookings
- Double booking prevention

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Copy the example environment file and configure your variables:

```bash
cp env.example .env
```

Edit `.env` with your actual values:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/tumul_sir_portfolio
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/tumul_sir_portfolio

# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_TO=admin@tumulsir.com

# Server Configuration
PORT=5000
```

### 3. MongoDB Setup

#### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Use `mongodb://localhost:27017/tumul_sir_portfolio` as your MONGODB_URI

#### Option B: MongoDB Atlas (Recommended for production)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Replace the MONGODB_URI in your .env file

### 4. Email Setup (Gmail)

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
3. Use this password as EMAIL_PASS in your .env file

### 5. Start the Server

```bash
npm start
```

The server will run on `http://localhost:5000`

## Database Schema

The Contact model includes:
- Personal information (name, email, company)
- Service details
- Appointment date and time
- Booking status
- Timestamps

## API Endpoints

### Contact Form
- `POST /api/contact` - Submit contact form and book appointment
- `GET /api/available-slots?date=YYYY-MM-DD` - Get available time slots for a date

### Admin Endpoints
- `GET /api/bookings` - Get all bookings
- `PATCH /api/bookings/:id` - Update booking status (pending/confirmed/cancelled)

## Error Handling

The server includes comprehensive error handling for:
- Duplicate bookings
- Invalid data
- Database connection issues
- Email sending failures

## Production Deployment

For production deployment:
1. Use MongoDB Atlas for database
2. Set up proper environment variables
3. Use a process manager like PM2
4. Set up SSL/TLS certificates
5. Configure proper CORS settings 