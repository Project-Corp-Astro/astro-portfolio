# Dr. Tumul Raathi - Astro Portfolio Website

A full-stack astrology consultation platform with payment integration, chatbot assistance, and booking management.

## 🌟 Features

- **Vedic Astrology Consultation** - Personal and business guidance
- **Numerology & Nameology** - Life path and destiny analysis
- **Commercial Vaastu** - Business space optimization
- **Signature Analysis** - Personality insights
- **AI Chatbot** - Powered by OpenAI for customer assistance
- **Online Booking** - Schedule appointments with available slots
- **Payment Integration** - Razorpay for secure transactions
- **Email Notifications** - Automated booking confirmations

## 🏗️ Tech Stack

### Frontend (tumul_sir/)
- React 18 with TypeScript
- Vite for build tooling
- TailwindCSS + Radix UI for styling
- Framer Motion for animations
- React Router for navigation
- Tanstack Query for data fetching

### Backend (server/)
- Node.js + Express
- MongoDB with Mongoose
- OpenAI API for chatbot
- Razorpay for payments
- Nodemailer for email
- CORS enabled for cross-origin requests

## 📂 Project Structure

```
astro-portfolio/
├── server/                 # Backend API
│   ├── config/            # Database and service configs
│   ├── models/            # MongoDB models
│   ├── index.js           # Main server file
│   ├── package.json       # Backend dependencies
│   └── render.yaml        # Render deployment config
│
├── tumul_sir/             # Frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utility functions
│   │   ├── config/        # App configuration
│   │   └── types/         # TypeScript types
│   ├── public/            # Static assets
│   ├── package.json       # Frontend dependencies
│   └── render.yaml        # Render deployment config
│
├── DEPLOYMENT_CHECKLIST.md       # Pre-deployment checklist
├── QUICK_DEPLOY_GUIDE.md         # Quick reference guide
└── RENDER_DEPLOYMENT_COMPLETE.md # Complete deployment guide
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account
- Gmail account with App Password
- OpenAI API key

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd astro-portfolio
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   cp .env.example .env
   # Edit .env with your credentials
   npm start
   ```
   Backend runs on http://localhost:3001

3. **Setup Frontend**
   ```bash
   cd tumul_sir
   npm install
   npm run dev
   ```
   Frontend runs on http://localhost:8080

4. **Access the application**
   - Frontend: http://localhost:8080
   - Backend API: http://localhost:3001/api/test

## 🌐 Deployment to Render

### Quick Deploy

1. **Deploy Backend First**
   - See `QUICK_DEPLOY_GUIDE.md` for step-by-step
   - Add environment variables in Render dashboard
   - Save your backend URL

2. **Deploy Frontend**
   - Update `.env.production` with backend URL
   - Deploy to Render as static site
   - Update backend CORS with frontend URL

3. **Complete Guide**
   - Full instructions: `RENDER_DEPLOYMENT_COMPLETE.md`
   - Checklist: `DEPLOYMENT_CHECKLIST.md`

## 📝 Environment Variables

### Backend (.env)
```bash
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://...
EMAIL_USER=your@gmail.com
EMAIL_PASS=app_password
EMAIL_TO=recipient@gmail.com
OPENAI_API_KEY=sk-proj-...
RAZORPAY_KEY_ID=rzp_...
RAZORPAY_KEY_SECRET=...
BUSINESS_TZ=Asia/Kolkata
```

### Frontend (.env.production)
```bash
VITE_API_URL=https://your-backend.onrender.com
```

## 🔧 Configuration

### MongoDB Atlas
1. Create cluster (free tier OK)
2. Create database user
3. Whitelist IP: 0.0.0.0/0 (for Render)
4. Get connection string

### Gmail App Password
1. Enable 2FA on Google account
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Use 16-character password (not regular password)

### OpenAI API
1. Create account: https://platform.openai.com
2. Set up billing (required)
3. Generate API key
4. Add to environment variables

### Razorpay (Optional)
1. Create account: https://razorpay.com
2. Get test/live API keys
3. Configure webhook (optional)

## 🧪 Testing

### Backend
```bash
# Health check
curl http://localhost:3001/api/test

# Chatbot
curl -X POST http://localhost:3001/api/chatbot \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Hello"}]}'
```

### Frontend
- Run development server: `npm run dev`
- Build for production: `npm run build`
- Preview production build: `npm run preview`

## 📱 Features & Pages

- **Home** - Landing page with services overview
- **Services** - Detailed service descriptions
- **About** - About Dr. Tumul Raathi
- **Contact** - Booking form with slot selection
- **Payment** - Razorpay integration
- **Legal Pages** - Terms, Privacy, Refund policies
- **Chatbot** - AI-powered assistance

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Fails**
- Check connection string format
- Verify network access in Atlas
- Ensure database user has correct permissions

**Email Not Sending**
- Use Gmail App Password (not regular password)
- Enable 2FA first
- Check EMAIL_USER and EMAIL_PASS

**CORS Errors**
- Add frontend URL to backend CORS config
- Check VITE_API_URL is correct
- Verify backend is running

**Build Fails**
- Check Node version (18+ required)
- Clear node_modules and reinstall
- Check for TypeScript errors

## 📚 Documentation

- **Deployment Guides**
  - `DEPLOYMENT_CHECKLIST.md` - Pre-deployment checklist
  - `QUICK_DEPLOY_GUIDE.md` - Quick reference
  - `RENDER_DEPLOYMENT_COMPLETE.md` - Complete guide

- **Component Guides**
  - `docs/CONTACT_WIZARD_GUIDE.md` - Contact wizard usage
  - `docs/ROUTE_AWARE_MODALS.md` - Modal routing

## 🔐 Security

- Environment variables stored securely
- CORS configured for specific origins
- HTTPS enforced in production
- MongoDB uses connection string auth
- Payment handled by Razorpay (PCI compliant)

## 📄 License

All rights reserved. Copyright © 2025 CORPASTRO CONSULTANCY PRIVATE LIMITED

## 👥 Contact

- **Business**: CORPASTRO CONSULTANCY PRIVATE LIMITED
- **Email**: consult@corpastro.com
- **Phone**: +91 93460 35354
- **Address**: 502, Lalithanjali Apartment, 6-3-347/11, Dwarakapuri Colony, Punjagutta, Hyderabad, Telangana, India - 500082

---

**Built with ❤️ for Dr. Tumul Raathi**
