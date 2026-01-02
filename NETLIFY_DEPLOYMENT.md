# Taj Tailor Frontend - Netlify Deployment Guide

This document provides complete instructions for deploying the React frontend of the Taj Tailor website to Netlify while keeping the Express backend separate.

---

## Architecture Overview

**Frontend (Deployed to Netlify):**
- React 19 + Vite + TypeScript
- Location: `/client` directory
- Build output: `client/dist`
- Hosted on: Netlify CDN

**Backend (Separate Deployment):**
- Express.js server
- Location: `/server` directory
- Database: MySQL
- Deployment: Railway, Render, or Manus hosting
- Frontend communicates via API calls

---

## Prerequisites

Before deploying to Netlify, ensure you have:

1. ✅ GitHub repository: `https://github.com/Sultanchh/taj-tailor-website`
2. ✅ Netlify account: https://app.netlify.com
3. ✅ Backend API running (for frontend to communicate with)

---

## Frontend Build Configuration

### Build Scripts

The project includes two build scripts:

```bash
# Full-stack build (frontend + backend)
pnpm run build

# Frontend-only build for Netlify
pnpm run build:netlify
```

### Vite Configuration Files

- **`vite.config.ts`** - Default config (builds to `dist/public` for Manus)
- **`vite.config.netlify.ts`** - Netlify config (builds to `client/dist`)

### Netlify Routing

**File:** `client/public/_redirects`

This file ensures all routes are handled by React Router:

```
/* /index.html 200
```

This rule tells Netlify to serve `index.html` for all routes, allowing React Router to handle client-side routing.

---

## Frontend Environment Variables

The frontend requires the following environment variables (all must use `VITE_` prefix):

| Variable | Purpose | Example Value |
|----------|---------|----------------|
| `VITE_APP_ID` | Manus OAuth application ID | `your-app-id` |
| `VITE_APP_TITLE` | Website title | `Taj Tailor` |
| `VITE_OAUTH_PORTAL_URL` | Manus OAuth portal URL | `https://api.manus.im` |
| `VITE_FRONTEND_FORGE_API_URL` | Manus API endpoint | `https://api.manus.im` |
| `VITE_FRONTEND_FORGE_API_KEY` | Manus API key | `your-api-key` |

**Important:** These variables are injected at build time by Vite. They must be set in Netlify's environment variables before deployment.

---

## Step-by-Step Netlify Deployment

### Step 1: Connect GitHub to Netlify

1. Go to https://app.netlify.com
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** as your Git provider
4. Authorize Netlify to access your GitHub account
5. Select repository: **Sultanchh/taj-tailor-website**

### Step 2: Configure Build Settings

When Netlify asks for build settings, use these exact values:

| Setting | Value |
|---------|-------|
| **Base directory** | `.` (root) |
| **Build command** | `pnpm install && pnpm run build:netlify` |
| **Publish directory** | `client/dist` |

**Important:** Do NOT use the default build command. Use the exact command above.

### Step 3: Set Environment Variables

1. In Netlify dashboard, go to **Site settings** → **Build & deploy** → **Environment**
2. Click **"Edit variables"**
3. Add the following environment variables:

```
VITE_APP_ID = your-manus-app-id
VITE_APP_TITLE = Taj Tailor
VITE_OAUTH_PORTAL_URL = https://api.manus.im
VITE_FRONTEND_FORGE_API_URL = https://api.manus.im
VITE_FRONTEND_FORGE_API_KEY = your-manus-api-key
```

**Note:** Replace the values with your actual Manus credentials.

### Step 4: Deploy

1. Click **"Deploy site"**
2. Netlify will automatically:
   - Clone your GitHub repository
   - Install dependencies: `pnpm install`
   - Build frontend: `pnpm run build:netlify`
   - Deploy to CDN: `client/dist` → Netlify servers

---

## Verify Deployment

After deployment completes:

1. ✅ Check the **Deploy log** for any errors
2. ✅ Visit your Netlify URL (e.g., `https://taj-tailor-website.netlify.app`)
3. ✅ Test navigation (all routes should work without 404 errors)
4. ✅ Verify API calls to backend (check browser console for errors)

---

## Automatic Deployments

Once deployed, Netlify will automatically:

1. **Watch GitHub repository** for changes
2. **Trigger builds** on every push to `main` branch
3. **Deploy automatically** if build succeeds
4. **Rollback** if build fails (previous version stays live)

### To disable auto-deploy:
1. Go to **Site settings** → **Build & deploy** → **Deploy contexts**
2. Uncheck **"Auto publish"**

---

## Backend API Communication

The frontend needs to communicate with your backend API. Ensure the backend URL is correctly configured in your frontend code.

### Option 1: Hardcode Backend URL
If your backend has a fixed URL (e.g., Railway, Render):

```typescript
const backendUrl = 'https://your-backend-api.com';
```

### Option 2: Use Environment Variable
Add another environment variable in Netlify:
```
VITE_BACKEND_URL = https://your-backend-api.com
```

Then use in frontend:
```typescript
const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://default-backend.com';
```

---

## Troubleshooting

### Issue: 404 errors on page refresh

**Solution:** Ensure `client/public/_redirects` file exists with content:
```
/* /index.html 200
```

### Issue: Environment variables not loading

**Solution:** 
1. Verify variables are set in Netlify dashboard
2. Check variable names use `VITE_` prefix
3. Redeploy after adding variables

### Issue: Backend API calls failing

**Solution:**
1. Verify backend is running and accessible
2. Check CORS settings on backend
3. Verify API URL is correct in frontend code
4. Check browser console for error messages

### Issue: Build fails

**Solution:**
1. Check build log in Netlify dashboard
2. Ensure `pnpm-lock.yaml` is committed to Git
3. Verify all dependencies are installed locally
4. Run `pnpm install && pnpm run build:netlify` locally to test

---

## Custom Domain Setup (Optional)

To use a custom domain (e.g., `tajtailor.com`):

1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Enter your domain name
4. Follow DNS configuration instructions
5. Wait for DNS propagation (usually 24-48 hours)

---

## Production Checklist

Before going live:

- [ ] Frontend builds successfully with `pnpm run build:netlify`
- [ ] All routes work without 404 errors
- [ ] Backend API is accessible and responding
- [ ] Environment variables are set correctly in Netlify
- [ ] HTTPS is enabled (automatic on Netlify)
- [ ] Custom domain is configured (if needed)
- [ ] Analytics are tracking (if configured)
- [ ] Error monitoring is set up (optional)

---

## Backend Deployment (Separate)

The Express backend is NOT deployed to Netlify. Deploy it separately:

### Option 1: Railway (Recommended)
1. Go to https://railway.app
2. Create new project
3. Connect GitHub repository
4. Select `/server` as root directory
5. Set environment variables
6. Deploy

### Option 2: Render
1. Go to https://render.com
2. Create new Web Service
3. Connect GitHub repository
4. Set build command: `pnpm install && pnpm run build`
5. Set start command: `pnpm run start`
6. Deploy

### Option 3: Manus (Built-in)
1. Click **Publish** in Manus Management UI
2. Manus handles backend + frontend deployment

---

## Support & Resources

- **Netlify Docs:** https://docs.netlify.com
- **Vite Docs:** https://vitejs.dev
- **React Router:** https://reactrouter.com
- **GitHub:** https://github.com/Sultanchh/taj-tailor-website

---

## Summary

✅ **Frontend deployed to Netlify**
✅ **React routing configured**
✅ **Environment variables set**
✅ **Automatic deployments enabled**
✅ **Backend remains separate**

Your Taj Tailor frontend is now ready for Netlify deployment!
