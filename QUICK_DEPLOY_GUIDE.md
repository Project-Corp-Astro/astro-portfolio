# 🚀 Render Deployment Quick Reference

## Deploy Order: Backend First, Then Frontend

---

## 📦 BACKEND DEPLOYMENT

### 1. Create Web Service on Render
```
Dashboard → New + → Web Service → Connect GitHub Repo
```

### 2. Configuration
```
Name:           astro-backend
Region:         Singapore
Root Directory: server
Runtime:        Node
Build Command:  npm install
Start Command:  npm start
```

### 3. Environment Variables (Add in Render Dashboard)
```bash
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/astrology?retryWrites=true&w=majority
EMAIL_USER=youremail@gmail.com
EMAIL_PASS=your_gmail_app_password
EMAIL_TO=recipient@gmail.com
OPENAI_API_KEY=sk-proj-xxxxx
RAZORPAY_KEY_ID=rzp_live_xxxxx
RAZORPAY_KEY_SECRET=xxxxx
BUSINESS_TZ=Asia/Kolkata
```

### 4. After Deployment
- ✅ Save your backend URL: `https://_______.onrender.com`
- ✅ Test: `curl https://your-backend.onrender.com/api/test`

---

## 🎨 FRONTEND DEPLOYMENT

### 1. Update .env.production
Edit `tumul_sir/.env.production`:
```bash
VITE_API_URL=https://your-backend-url.onrender.com
```

### 2. Commit & Push
```bash
git add tumul_sir/.env.production
git commit -m "Update production API URL"
git push
```

### 3. Create Static Site on Render
```
Dashboard → New + → Static Site → Connect GitHub Repo
```

### 4. Configuration
```
Name:            astro-frontend
Region:          Singapore
Root Directory:  tumul_sir
Build Command:   npm install && npm run build
Publish Dir:     dist
```

### 5. After Deployment
- ✅ Save your frontend URL: `https://_______.onrender.com`
- ✅ Test all pages and features

---

## 🔄 UPDATE BACKEND CORS

After frontend deploys, add its URL to backend CORS:

Edit `server/index.js` line ~25:
```javascript
const allowedOrigins = [
  'http://localhost:8080',
  'https://your-frontend-url.onrender.com', // ADD THIS
];
```

Commit and push - backend will auto-redeploy.

---

## ✅ POST-DEPLOYMENT CHECKLIST

### Backend:
- [ ] `/api/test` returns `{"message": "Server is running!"}`
- [ ] MongoDB connected (check logs)
- [ ] Email works (test contact form)
- [ ] Chatbot responds

### Frontend:
- [ ] All pages load
- [ ] No console errors
- [ ] Forms work
- [ ] Chatbot works
- [ ] Payments work

---

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Build fails | Check logs in Render dashboard |
| MongoDB fails | Whitelist `0.0.0.0/0` in Atlas Network Access |
| CORS errors | Add frontend URL to backend allowedOrigins |
| API calls fail | Verify VITE_API_URL is correct |
| 404 on refresh | Already fixed with `_redirects` file |
| Email not sending | Use Gmail App Password (not regular password) |

---

## 📱 Important URLs

**Render Dashboard**: https://dashboard.render.com

**Your Services**:
- Backend: https://__________.onrender.com
- Frontend: https://__________.onrender.com

**MongoDB Atlas**: https://cloud.mongodb.com
**Gmail App Passwords**: https://myaccount.google.com/apppasswords

---

## 💡 Pro Tips

1. **Free tier**: Backend spins down after 15 min → first request takes ~30s
2. **Logs**: Always check logs first when debugging
3. **Auto-deploy**: Disabled by default, enable in Settings
4. **Environment**: Changes require manual rebuild for frontend
5. **HTTPS**: Automatic and free with Render

---

## 🆘 Need Help?

- Full guide: `RENDER_DEPLOYMENT_COMPLETE.md`
- Backend guide: `server/RENDER_DEPLOYMENT.md`
- Frontend guide: `tumul_sir/RENDER_DEPLOYMENT.md`

---

*Deploy with confidence! 🎉*
