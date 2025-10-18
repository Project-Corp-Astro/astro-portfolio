# Render YAML Configuration - Notes

## ✅ YAML Files Fixed

Both `render.yaml` files have been corrected to match Render's Blueprint schema.

### Frontend (tumul_sir/render.yaml)
```yaml
services:
  - type: web
    name: astro-frontend
    buildCommand: npm install && npm run build
    staticPublishPath: ./dist
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
```

**What was removed:**
- `region: singapore` - Not allowed in Blueprint schema
- `publishPath` - Correct property is `staticPublishPath`
- `runtime: static` - Not needed (inferred from staticPublishPath)
- `env: static` - Not allowed

**What remains:**
- Minimal required configuration
- SPA routing via routes (redirects all to index.html)
- `.node-version` file still specifies Node 18.17.0

### Backend (server/render.yaml)
✅ Already correct - No changes needed

```yaml
services:
  - type: web
    name: astro-backend
    runtime: node
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_VERSION
        value: 18.17.0
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 10000
```

## 📝 Important Notes

1. **Region Selection**: You can select the region in the Render dashboard when creating the service. It doesn't need to be in the YAML.

2. **Node Version**: Specified via `.node-version` file (18.17.0) in both folders.

3. **Environment Variables**: Add these in the Render dashboard, not in the YAML (for security).

4. **SPA Routing**: The `routes` section ensures all URLs redirect to index.html for React Router to handle.

5. **Fallback**: The `public/_redirects` file provides a fallback if routes aren't working.

## 🚀 Ready to Deploy

Both YAML files are now valid and ready for Render deployment!

Follow the deployment guides:
- `QUICK_DEPLOY_GUIDE.md` for quick reference
- `RENDER_DEPLOYMENT_COMPLETE.md` for detailed steps
