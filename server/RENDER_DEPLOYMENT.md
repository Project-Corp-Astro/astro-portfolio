# Backend Deployment Guide for Render

## Prerequisites
- A Render account (sign up at https://render.com)
- Your MongoDB Atlas connection string
- Email credentials (Gmail App Password)
- Razorpay API keys (optional)
- OpenAI API key (for chatbot)

## Step-by-Step Deployment

### 1. Push Code to GitHub
Make sure your code is pushed to a GitHub repository.

### 2. Create a New Web Service on Render
1. Go to https://dashboard.render.com
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Select the repository containing this backend code

### 3. Configure the Service
- **Name**: `astro-backend` (or your preferred name)
- **Region**: Singapore (or closest to your target audience)
- **Branch**: `main` (or your default branch)
- **Root Directory**: `server` (important!)
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Instance Type**: Free or Starter (depending on your needs)

### 4. Add Environment Variables
In the Render dashboard, add these environment variables:

```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/astrology?retryWrites=true&w=majority
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
EMAIL_TO=recipient@gmail.com
RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret_key
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxx
BUSINESS_TZ=Asia/Kolkata
```

**Important**: 
- For Gmail, use an App Password, not your regular password
- Generate at: https://myaccount.google.com/apppasswords
- Make sure to enable 2FA on your Google account first

### 5. Deploy
Click "Create Web Service" and Render will automatically deploy your backend.

### 6. Get Your Backend URL
After deployment, Render will provide a URL like:
`https://astro-backend.onrender.com`

Save this URL - you'll need it for the frontend configuration.

## Testing Your Deployment

Test your backend with:
```bash
curl https://your-backend-url.onrender.com/api/test
```

You should get: `{"message": "Server is running!"}`

## Important Notes

1. **Free Tier Limitations**:
   - Free tier services spin down after 15 minutes of inactivity
   - First request after spin-down may take 30-60 seconds
   - Consider upgrading to Starter plan for production use

2. **CORS Configuration**:
   - The backend already has CORS enabled
   - Update CORS if you need to restrict origins

3. **MongoDB Atlas**:
   - Whitelist Render's IP addresses in MongoDB Atlas
   - Or use "Allow access from anywhere" (0.0.0.0/0)

4. **Logs**:
   - View logs in the Render dashboard under "Logs" tab
   - Monitor for any startup errors

## Troubleshooting

If deployment fails:
1. Check the logs in Render dashboard
2. Verify all environment variables are set correctly
3. Ensure MongoDB connection string is correct
4. Check that PORT is set to 10000
5. Verify Node version compatibility

## Auto-Deploy

Render automatically deploys when you push to your connected branch.
You can disable this in Settings if needed.
