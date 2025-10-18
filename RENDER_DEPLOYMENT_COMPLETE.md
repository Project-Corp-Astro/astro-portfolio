# Complete Render Deployment Guide

This guide covers deploying both the **backend** (Node.js/Express/MongoDB) and **frontend** (React/Vite) to Render.

---

## 🚀 Quick Overview

1. **Backend**: Node.js web service (Express + MongoDB)
2. **Frontend**: Static site (React + Vite)

**Deployment Order**: Deploy backend first, then frontend (frontend needs backend URL).

---

## 📋 Prerequisites

Before starting, gather these credentials:

### Required for Backend:
- [ ] MongoDB Atlas connection string
- [ ] Gmail account with App Password enabled
- [ ] OpenAI API key (for chatbot)
- [ ] Razorpay API keys (for payments - optional)
- [ ] GitHub repository with your code

### Required for Frontend:
- [ ] Backend URL from Render (after backend deployment)

---

## 🔧 PART 1: Backend Deployment

### Step 1: Prepare Backend

Your backend is already configured! The following files are set up:
- ✅ `server/render.yaml` - Render configuration
- ✅ `server/.node-version` - Node version specification
- ✅ `server/package.json` - Dependencies
- ✅ `server/RENDER_DEPLOYMENT.md` - Detailed backend guide

### Step 2: Deploy to Render

1. **Login to Render**
   - Go to https://dashboard.render.com
   - Sign in or create an account

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub account if not already connected
   - Select your repository

3. **Configure Service**
   ```
   Name: astro-backend
   Region: Singapore (or closest to you)
   Branch: main
   Root Directory: server
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   Instance Type: Free (or Starter for production)
   ```

4. **Add Environment Variables**
   
   Click "Environment" and add these variables:

   ```bash
   NODE_ENV=production
   PORT=10000
   
   # MongoDB (REQUIRED)
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/astrology?retryWrites=true&w=majority
   
   # Email (REQUIRED)
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_gmail_app_password
   EMAIL_TO=recipient@gmail.com
   
   # OpenAI (REQUIRED for chatbot)
   OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxx
   
   # Payment Gateway (OPTIONAL)
   RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
   RAZORPAY_KEY_SECRET=your_razorpay_secret_key
   
   # Timezone
   BUSINESS_TZ=Asia/Kolkata
   ```

   **Important Notes:**
   - For Gmail, use an App Password (not your regular password)
   - Generate App Password at: https://myaccount.google.com/apppasswords
   - Enable 2FA on your Google account first

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (usually 2-5 minutes)
   - Render will provide a URL like: `https://astro-backend.onrender.com`

6. **Test Backend**
   ```bash
   curl https://your-backend-url.onrender.com/api/test
   ```
   Expected response: `{"message": "Server is running!"}`

7. **Save Your Backend URL**
   ```
   Backend URL: https://your-backend-url.onrender.com
   ```
   ⚠️ You'll need this for frontend deployment!

---

## 🎨 PART 2: Frontend Deployment

### Step 1: Update Frontend Configuration

1. **Update `.env.production`**
   
   Edit `tumul_sir/.env.production`:
   ```bash
   VITE_API_URL=https://your-backend-url.onrender.com
   ```
   Replace with your actual backend URL from Step 1.

2. **Commit and Push Changes**
   ```bash
   cd tumul_sir
   git add .env.production
   git commit -m "Update production API URL for Render"
   git push
   ```

### Step 2: Deploy to Render

1. **Create New Static Site**
   - Go to https://dashboard.render.com
   - Click "New +" → "Static Site"
   - Select your repository

2. **Configure Static Site**
   ```
   Name: astro-frontend
   Region: Singapore (or same as backend)
   Branch: main
   Root Directory: tumul_sir
   Build Command: npm install && npm run build
   Publish Directory: dist
   ```

3. **Add Environment Variables** (Optional)
   
   If you want to override the .env.production:
   ```bash
   VITE_API_URL=https://your-backend-url.onrender.com
   ```

4. **Deploy**
   - Click "Create Static Site"
   - Wait for build and deployment (usually 3-7 minutes)
   - Render will provide a URL like: `https://astro-frontend.onrender.com`

### Step 3: Update Backend CORS (Important!)

After frontend deployment, update backend CORS to allow your frontend domain:

1. Edit `server/index.js`:
   ```javascript
   app.use(cors({
     origin: [
       'https://your-frontend-url.onrender.com',
       'http://localhost:8080',
       'http://localhost:3000'
     ],
     credentials: true
   }));
   ```

2. Commit and push:
   ```bash
   git add server/index.js
   git commit -m "Update CORS for production frontend"
   git push
   ```

3. Render will auto-deploy the backend with new CORS settings.

---

## ✅ Testing Your Deployment

### Test Backend:
```bash
# Health check
curl https://your-backend-url.onrender.com/api/test

# Test chatbot (optional)
curl -X POST https://your-backend-url.onrender.com/api/chatbot \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Hello"}]}'
```

### Test Frontend:
1. Visit `https://your-frontend-url.onrender.com`
2. Navigate through all pages
3. Test the chatbot
4. Submit a contact form
5. Try the payment flow (with test credentials)

---

## 🔒 MongoDB Atlas Configuration

**Important**: Allow Render to access your MongoDB Atlas database.

### Option 1: Allow All IPs (Easiest)
1. Go to MongoDB Atlas → Network Access
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere"
4. Add IP: `0.0.0.0/0`

### Option 2: Whitelist Render IPs (More Secure)
Get Render's outbound IPs from: https://render.com/docs/static-outbound-ip-addresses
Add each IP to MongoDB Atlas Network Access.

---

## 🎯 Post-Deployment Checklist

### Backend:
- [ ] Backend URL is accessible
- [ ] `/api/test` endpoint returns success
- [ ] MongoDB connection is working (check logs)
- [ ] Email sending works (test contact form)
- [ ] Chatbot responds correctly
- [ ] Payment gateway is configured (if using)

### Frontend:
- [ ] Site loads without errors
- [ ] All pages are accessible
- [ ] Navigation works correctly
- [ ] API calls succeed (check Network tab)
- [ ] Forms submit successfully
- [ ] Payment flow works
- [ ] Chatbot communicates with backend
- [ ] No CORS errors in console

---

## 🐛 Troubleshooting

### Backend Issues:

**Problem**: Build fails
```
Solution: Check logs in Render dashboard
- Verify package.json is valid
- Check Node version compatibility
- Ensure all dependencies are listed
```

**Problem**: MongoDB connection fails
```
Solution: 
- Verify MONGODB_URI is correct
- Check MongoDB Atlas network access
- Ensure database user has correct permissions
```

**Problem**: Email not sending
```
Solution:
- Use Gmail App Password, not regular password
- Enable 2FA on Google account first
- Check EMAIL_USER and EMAIL_PASS are correct
```

### Frontend Issues:

**Problem**: Build fails
```
Solution:
- Check build logs in Render dashboard
- Try building locally: npm run build
- Verify all dependencies are in package.json
```

**Problem**: API calls fail (CORS errors)
```
Solution:
- Update backend CORS to include frontend URL
- Verify VITE_API_URL is set correctly
- Check Network tab for exact error
```

**Problem**: 404 on page refresh
```
Solution:
- Already fixed with _redirects file
- Verify dist folder has _redirects
- Check Render publish directory is set to 'dist'
```

**Problem**: Environment variables not working
```
Solution:
- Vite env vars must start with VITE_
- Rebuild after changing env vars
- Check build logs to confirm vars are set
```

---

## 🔄 Auto-Deploy Configuration

Both services auto-deploy on git push to your configured branch.

**To disable auto-deploy**:
1. Go to service Settings in Render
2. Find "Auto-Deploy" section
3. Toggle off

**To manually deploy**:
1. Go to service in Render dashboard
2. Click "Manual Deploy" → "Deploy latest commit"

---

## 💰 Cost Considerations

### Free Tier Limitations:
- **Backend**: Spins down after 15 min of inactivity
- **Frontend**: Always available (static hosting)
- **First request**: May take 30-60 seconds after spin-down
- **Hours**: 750 free hours/month per service

### Upgrade Options:
- **Starter Plan** ($7/month): No spin-down, better performance
- **Standard Plan** ($25/month): More resources, priority support

**Recommendation**: Start with free tier for testing, upgrade to Starter for production.

---

## 🌐 Custom Domain Setup (Optional)

### For Frontend:
1. Go to Static Site → Settings → Custom Domains
2. Add your domain (e.g., `www.corpastro.com`)
3. Update DNS records as instructed:
   ```
   Type: CNAME
   Name: www
   Value: your-site.onrender.com
   ```

### For Backend:
1. Go to Web Service → Settings → Custom Domains
2. Add API subdomain (e.g., `api.corpastro.com`)
3. Update DNS records:
   ```
   Type: CNAME
   Name: api
   Value: your-backend.onrender.com
   ```

4. Update frontend .env.production:
   ```bash
   VITE_API_URL=https://api.corpastro.com
   ```

---

## 📊 Monitoring & Logs

### View Logs:
1. Go to service in Render dashboard
2. Click "Logs" tab
3. Filter by date/time

### Monitor Performance:
- Check response times in Logs
- Monitor error rates
- Set up status page (Render provides this)

### Alerts:
- Render sends email alerts for deployment failures
- Configure additional alerts in Settings

---

## 🔐 Security Best Practices

1. **Environment Variables**:
   - Never commit .env files to git
   - Use Render dashboard for sensitive data
   - Rotate API keys regularly

2. **MongoDB**:
   - Use strong database passwords
   - Limit IP access when possible
   - Enable MongoDB Atlas auditing

3. **CORS**:
   - Specify exact frontend domains
   - Don't use wildcard (*) in production

4. **HTTPS**:
   - Render provides free SSL certificates
   - Always use https:// in production

---

## 📝 Important Files

### Backend:
- `server/render.yaml` - Render configuration
- `server/.node-version` - Node version
- `server/package.json` - Dependencies
- `server/index.js` - Main server file
- `server/.env.example` - Environment template

### Frontend:
- `tumul_sir/render.yaml` - Render configuration
- `tumul_sir/.node-version` - Node version
- `tumul_sir/package.json` - Dependencies
- `tumul_sir/.env.production` - Production environment
- `tumul_sir/public/_redirects` - SPA routing
- `tumul_sir/vite.config.ts` - Build configuration

---

## 🆘 Getting Help

- **Render Docs**: https://render.com/docs
- **Render Community**: https://community.render.com
- **Support**: Available in Render dashboard (paid plans)

---

## 🎉 You're Done!

Your application is now live on Render! 

**Next Steps**:
1. Monitor logs for any errors
2. Test all functionality thoroughly
3. Set up custom domain (optional)
4. Consider upgrading for production use
5. Set up monitoring/analytics

**Your URLs**:
- Frontend: `https://your-frontend.onrender.com`
- Backend: `https://your-backend.onrender.com`

---

*Last Updated: October 2025*
