# Deployment Guide for cPanel

## 📋 Pre-Deployment Checklist

Your application has been built successfully! The production build is in the `tumul_sir/dist` folder.

### Required Environment Variables

#### Backend Server (.env file)
```env
# MongoDB Connection
MONGODB_URI=your_mongodb_connection_string

# Email Configuration (Gmail SMTP)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_TO=recipient_email@gmail.com

# Payment Gateway (Razorpay)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret

# OpenAI (for Chatbot)
OPENAI_API_KEY=your_openai_api_key

# Server Configuration
PORT=3001
BUSINESS_TZ=Asia/Kolkata
```

#### Frontend (.env.production)
```env
VITE_API_BASE=https://yourdomain.com/api
VITE_CONTACT_WIZARD_ENABLED=false
VITE_NODE_ENV=production
```

---

## 🚀 cPanel Deployment Steps

### Step 1: Prepare Your cPanel Hosting

1. **Login to cPanel** at your hosting provider
2. **Enable Node.js** (usually in Software section)
   - Select Node.js version: **18.x or higher**
   - Set application root
   - Set application startup file

### Step 2: Upload Files

#### Option A: Using File Manager
1. Navigate to **File Manager** in cPanel
2. Go to your public_html or desired directory
3. Create two folders:
   - `api` (for backend)
   - `public` (for frontend) or use root

#### Option B: Using FTP
1. Use FileZilla or any FTP client
2. Connect to your server
3. Upload files as described below

### Step 3: Deploy Backend (Server)

1. **Upload backend files to `/api` folder:**
   ```
   /api/
   ├── config/
   ├── models/
   ├── node_modules/ (install on server)
   ├── index.js
   ├── package.json
   └── .env
   ```

2. **SSH into your server** (or use Terminal in cPanel):
   ```bash
   cd ~/public_html/api
   npm install --production
   ```

3. **Create .env file** in `/api` folder with your production values

4. **Setup Node.js Application in cPanel:**
   - Go to **Setup Node.js App**
   - Application root: `/public_html/api`
   - Application URL: `yourdomain.com/api` or subdomain
   - Application startup file: `index.js`
   - Click "Create"

5. **Start the application** and note the port number assigned

### Step 4: Deploy Frontend

1. **Upload the built frontend:**
   - Upload everything from `tumul_sir/dist/` to your public_html root
   ```
   /public_html/
   ├── assets/
   ├── index.html
   └── (other files from dist)
   ```

2. **Configure .htaccess** for React Router (create in public_html):
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteCond %{REQUEST_FILENAME} !-l
     RewriteRule . /index.html [L]
   </IfModule>
   ```

### Step 5: Configure API Proxy (Important!)

Since your frontend expects API at a specific URL, you have two options:

#### Option A: Update Frontend API URL
Rebuild frontend with production API URL:
```bash
# Update .env.production
VITE_API_BASE=https://yourdomain.com:PORT

# Rebuild
npm run build
# Re-upload dist folder
```

#### Option B: Setup Reverse Proxy in .htaccess
Add to .htaccess:
```apache
# Proxy API requests to Node.js backend
RewriteEngine On
RewriteRule ^api/(.*)$ http://localhost:PORT/api/$1 [P,L]
ProxyPassReverse /api http://localhost:PORT/api
```

### Step 6: Setup MongoDB

You have two options:

1. **MongoDB Atlas** (Recommended - Free tier available)
   - Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
   - Create free cluster
   - Get connection string
   - Add to .env: `MONGODB_URI=mongodb+srv://...`

2. **Install MongoDB on cPanel** (if available)
   - Check if your hosting supports MongoDB
   - Configure connection string accordingly

---

## 🔧 Alternative: Using PM2 for Process Management

If your cPanel supports PM2:

```bash
# Install PM2 globally
npm install -g pm2

# Start your app
cd ~/public_html/api
pm2 start index.js --name "astro-backend"

# Auto-restart on server reboot
pm2 startup
pm2 save
```

---

## ✅ Post-Deployment Checklist

- [ ] Backend server running on cPanel Node.js
- [ ] MongoDB connection successful
- [ ] Frontend files uploaded to public_html
- [ ] .htaccess configured for React Router
- [ ] API proxy working correctly
- [ ] Environment variables set correctly
- [ ] Test payment gateway (Razorpay)
- [ ] Test email notifications
- [ ] Test booking system
- [ ] Check chatbot functionality
- [ ] SSL certificate installed (HTTPS)

---

## 🧪 Testing Your Deployment

1. **Test Backend:**
   ```
   https://yourdomain.com/api/test
   ```
   Should return: `{"message": "Server is running!"}`

2. **Test Frontend:**
   ```
   https://yourdomain.com
   ```
   Should load your React application

3. **Test API Connection:**
   - Try booking a consultation
   - Check if slots are loading
   - Test payment flow

---

## 🐛 Troubleshooting

### Issue: 500 Internal Server Error
- Check Node.js app logs in cPanel
- Verify .env file exists and has correct values
- Check MongoDB connection

### Issue: API requests failing
- Verify CORS settings in backend
- Check API URL in frontend .env
- Verify reverse proxy setup

### Issue: Routes not working (404)
- Ensure .htaccess is in place
- Check mod_rewrite is enabled

### Issue: Node.js app won't start
- Check package.json has all dependencies
- Run `npm install` again
- Verify Node.js version compatibility

---

## 📞 Need MongoDB Atlas?

Your backend requires MongoDB. If your cPanel doesn't have it:

1. Sign up at https://www.mongodb.com/atlas
2. Create a free cluster (M0)
3. Create database user
4. Whitelist all IPs (0.0.0.0/0) for cPanel
5. Get connection string
6. Add to .env file

---

## 🎯 Quick Deploy Commands

```bash
# On your local machine - rebuild for production
cd tumul_sir
npm run build

# Upload via FTP or cPanel File Manager:
# - Backend: server/* → /public_html/api/
# - Frontend: tumul_sir/dist/* → /public_html/

# On server via SSH or cPanel Terminal:
cd ~/public_html/api
npm install --production
# Configure Node.js app in cPanel and start it
```

---

## 📌 Important Notes

1. **Port Numbers:** cPanel assigns ports automatically. Note the port and update your configuration.
2. **MongoDB:** You MUST have MongoDB running (Atlas recommended).
3. **Email:** Use App Passwords for Gmail, not your regular password.
4. **SSL:** Ensure SSL is installed for HTTPS (Let's Encrypt is free in cPanel).
5. **Razorpay:** Register and get API keys from Razorpay dashboard.

---

## 🚨 Security Reminder

- Never commit .env files to Git
- Use strong passwords for database
- Enable SSL/HTTPS
- Keep dependencies updated
- Use environment variables for all secrets

---

**Your app is production-ready! The build created these optimized files:**
- Total bundle size: ~420KB (gzipped: ~160KB)
- Built with Vite for optimal performance
- All assets optimized and code-split

Good luck with your deployment! 🎉
