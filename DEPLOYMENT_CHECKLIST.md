# Pre-Deployment Checklist

## ✅ Before You Deploy

### 1. Code Repository
- [ ] All code is committed to GitHub
- [ ] `.gitignore` excludes `.env` files
- [ ] `README.md` is up to date
- [ ] No sensitive data in code

### 2. Environment Variables Ready

#### Backend (.env):
- [ ] `MONGODB_URI` (from MongoDB Atlas)
- [ ] `EMAIL_USER` (Gmail address)
- [ ] `EMAIL_PASS` (Gmail App Password - NOT regular password!)
- [ ] `EMAIL_TO` (recipient email)
- [ ] `OPENAI_API_KEY` (from OpenAI)
- [ ] `RAZORPAY_KEY_ID` (optional)
- [ ] `RAZORPAY_KEY_SECRET` (optional)
- [ ] `BUSINESS_TZ` (default: Asia/Kolkata)

#### Frontend (.env.production):
- [ ] Will be updated after backend deployment

### 3. Third-Party Services

#### MongoDB Atlas:
- [ ] Account created
- [ ] Cluster created (free tier OK)
- [ ] Database user created with password
- [ ] Connection string copied
- [ ] Network access configured (allow 0.0.0.0/0 for now)

#### Gmail:
- [ ] 2FA enabled on Google account
- [ ] App Password generated (16 characters)
- [ ] Test email sent successfully locally

#### OpenAI:
- [ ] Account created
- [ ] API key generated
- [ ] Billing set up (required for API access)
- [ ] Free credits available OR payment method added

#### Razorpay (Optional):
- [ ] Account created
- [ ] Test keys obtained
- [ ] Live keys obtained (for production)

### 4. Local Testing
- [ ] Backend runs: `cd server && npm start`
- [ ] Frontend runs: `cd tumul_sir && npm run dev`
- [ ] All features tested locally
- [ ] No console errors
- [ ] Database operations work
- [ ] Email sending works
- [ ] Chatbot responds
- [ ] Forms submit successfully

### 5. Files Created/Updated
- [x] `server/render.yaml`
- [x] `server/.node-version`
- [x] `server/RENDER_DEPLOYMENT.md`
- [x] `tumul_sir/render.yaml`
- [x] `tumul_sir/.node-version`
- [x] `tumul_sir/.env.production`
- [x] `tumul_sir/.env.development`
- [x] `tumul_sir/public/_redirects`
- [x] `tumul_sir/src/config/api.ts`
- [x] `RENDER_DEPLOYMENT_COMPLETE.md`
- [x] `QUICK_DEPLOY_GUIDE.md`

---

## 🚀 Deployment Steps

### Phase 1: Backend (Do This First!)
1. [ ] Login to Render: https://dashboard.render.com
2. [ ] Create new Web Service
3. [ ] Connect GitHub repository
4. [ ] Configure service (see QUICK_DEPLOY_GUIDE.md)
5. [ ] Add all environment variables
6. [ ] Deploy and wait
7. [ ] Test backend: `curl https://your-backend.onrender.com/api/test`
8. [ ] **SAVE BACKEND URL**: ___________________________

### Phase 2: Frontend (After Backend)
9. [ ] Update `tumul_sir/.env.production` with backend URL
10. [ ] Commit and push changes
11. [ ] Create new Static Site on Render
12. [ ] Configure service (see QUICK_DEPLOY_GUIDE.md)
13. [ ] Deploy and wait
14. [ ] **SAVE FRONTEND URL**: ___________________________

### Phase 3: Finalize
15. [ ] Update backend CORS with frontend URL
16. [ ] Commit and push backend changes
17. [ ] Wait for auto-redeploy
18. [ ] Test all features on live site

---

## 🧪 Post-Deployment Testing

### Backend Tests:
```bash
# Health check
curl https://your-backend.onrender.com/api/test

# Chatbot test
curl -X POST https://your-backend.onrender.com/api/chatbot \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Hello"}]}'
```

### Frontend Tests:
- [ ] Homepage loads
- [ ] All services pages work
- [ ] Contact form submits
- [ ] Chatbot opens and responds
- [ ] Payment flow works (test mode)
- [ ] Legal pages load
- [ ] Navigation works
- [ ] No console errors
- [ ] Mobile responsive

### Integration Tests:
- [ ] Contact form → email received
- [ ] Chatbot → backend → response
- [ ] Payment → Razorpay → success
- [ ] Booking → saved to database

---

## 📝 Notes & URLs

### Backend
- Render URL: ___________________________
- MongoDB Cluster: ___________________________
- Email: ___________________________

### Frontend
- Render URL: ___________________________
- Custom Domain (future): ___________________________

### Credentials Storage
⚠️ **Important**: Store all passwords/keys securely!
- Use a password manager (1Password, LastPass, etc.)
- Keep backup of environment variables
- Don't share in chat/email

---

## 🎯 Next Steps After Deployment

### Immediate:
- [ ] Monitor logs for first 24 hours
- [ ] Test all features thoroughly
- [ ] Share link with team/stakeholders
- [ ] Set up error monitoring (optional: Sentry)

### Within a Week:
- [ ] Set up custom domain
- [ ] Configure DNS
- [ ] Update SSL certificates (automatic)
- [ ] Add Google Analytics (optional)

### Production Readiness:
- [ ] Upgrade from free tier if needed
- [ ] Set up monitoring/alerts
- [ ] Configure backup strategy
- [ ] Document any issues found

---

## 🆘 Emergency Contacts

- **Render Support**: https://render.com/docs
- **MongoDB Support**: https://cloud.mongodb.com/support
- **OpenAI Support**: https://help.openai.com

---

## 📚 Reference Documents

1. **Complete Guide**: `RENDER_DEPLOYMENT_COMPLETE.md`
2. **Quick Reference**: `QUICK_DEPLOY_GUIDE.md`
3. **Backend Details**: `server/RENDER_DEPLOYMENT.md`
4. **Frontend Details**: `tumul_sir/RENDER_DEPLOYMENT.md`

---

**Good luck with your deployment! 🚀**

*Last updated: October 2025*
