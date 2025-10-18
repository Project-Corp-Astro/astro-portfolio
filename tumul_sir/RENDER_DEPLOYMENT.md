# Frontend Deployment Guide for Render

## Prerequisites
- A Render account (sign up at https://render.com)
- Your backend URL from the backend deployment
- Code pushed to GitHub

## Step-by-Step Deployment

### 1. Update Environment Variables

Before deploying, update `.env.production` file with your actual backend URL:
```
VITE_API_URL=https://your-backend-url.onrender.com
```

Replace `your-backend-url` with the actual URL from your backend deployment.

### 2. Update API Calls to Use Environment Variable

The frontend needs to use the VITE_API_URL environment variable for API calls.
We'll need to update the services and API configuration.

### 3. Create a New Static Site on Render

1. Go to https://dashboard.render.com
2. Click "New +" and select "Static Site"
3. Connect your GitHub repository
4. Select the repository containing your frontend code

### 4. Configure the Static Site

- **Name**: `astro-frontend` (or your preferred name)
- **Region**: Singapore (or closest to your target audience)
- **Branch**: `main` (or your default branch)
- **Root Directory**: `tumul_sir` (important!)
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`

### 5. Add Environment Variables

In the Render dashboard, add this environment variable:

```
VITE_API_URL=https://your-backend-url.onrender.com
```

Replace with your actual backend URL.

### 6. Deploy

Click "Create Static Site" and Render will automatically build and deploy your frontend.

### 7. Get Your Frontend URL

After deployment, Render will provide a URL like:
`https://astro-frontend.onrender.com`

## Configure Redirects for SPA

The `render.yaml` file already includes the redirect configuration to handle client-side routing.
All routes will redirect to `index.html` for proper React Router functionality.

## Testing Your Deployment

1. Visit your frontend URL
2. Check that the site loads correctly
3. Test navigation between pages
4. Test API calls (contact form, chatbot, etc.)
5. Verify payment integration works

## Important Notes

### 1. **Environment Variables**
- Vite environment variables must start with `VITE_`
- They are bundled into the build at build time
- Changing environment variables requires a rebuild

### 2. **CORS Configuration**
Make sure your backend CORS settings allow requests from your frontend domain:
```javascript
app.use(cors({
  origin: ['https://your-frontend-url.onrender.com', 'http://localhost:8080']
}));
```

### 3. **Static Site Limitations**
- Changes to environment variables require a manual rebuild
- Static sites are automatically deployed on git push

### 4. **Custom Domain** (Optional)
You can add a custom domain in Render dashboard:
1. Go to your static site settings
2. Click "Custom Domains"
3. Add your domain and follow the DNS configuration steps

## Troubleshooting

### Build Fails
1. Check build logs in Render dashboard
2. Verify all dependencies are in `package.json`
3. Try building locally: `npm run build`
4. Check Node version compatibility

### API Calls Don't Work
1. Verify `VITE_API_URL` is set correctly
2. Check browser console for CORS errors
3. Verify backend is running and accessible
4. Check that backend CORS allows frontend domain

### Routes Don't Work (404 errors)
1. Verify the redirect configuration in `render.yaml`
2. Check that `staticPublishPath` is set to `./dist`
3. Ensure React Router is properly configured

### Assets Not Loading
1. Check that Vite base path is correct
2. Verify all assets are in the `public` folder or imported in code
3. Check browser console for 404 errors

## Auto-Deploy

Render automatically deploys when you push to your connected branch.
You can disable this in Settings if needed.

## Performance Optimization

For production:
1. Enable gzip compression (Render does this automatically)
2. Optimize images before deployment
3. Use lazy loading for routes (already implemented)
4. Consider using a CDN for static assets

## Monitoring

Monitor your deployment:
1. Check deployment logs in Render dashboard
2. Use browser DevTools Network tab
3. Monitor Core Web Vitals
4. Set up error tracking (Sentry, etc.)
