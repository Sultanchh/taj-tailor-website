# Netlify Deployment - Quick Start (5 Minutes)

Deploy your Taj Tailor frontend to Netlify in 5 minutes!

---

## Prerequisites

✅ GitHub account with access to: `https://github.com/Sultanchh/taj-tailor-website`
✅ Netlify account: https://app.netlify.com
✅ Backend API running (for API calls from frontend)

---

## Step 1: Connect GitHub to Netlify (2 minutes)

1. Go to https://app.netlify.com
2. Click **"Add new site"** → **"Import an existing project"**
3. Select **GitHub** as your Git provider
4. Authorize Netlify
5. Select repository: **Sultanchh/taj-tailor-website**

---

## Step 2: Configure Build Settings (1 minute)

Enter these exact values:

```
Base directory:    .
Build command:     pnpm install && pnpm run build:netlify
Publish directory: client/dist
```

---

## Step 3: Set Environment Variables (2 minutes)

Click **"Advanced build settings"** and add:

```
VITE_APP_ID = your-manus-app-id
VITE_APP_TITLE = Taj Tailor
VITE_OAUTH_PORTAL_URL = https://api.manus.im
VITE_FRONTEND_FORGE_API_URL = https://api.manus.im
VITE_FRONTEND_FORGE_API_KEY = your-manus-api-key
```

---

## Step 4: Deploy

Click **"Deploy site"** and wait for the build to complete.

---

## That's It! 🎉

Your site will be live at: `https://your-site-name.netlify.app`

---

## Verify

1. ✅ Visit your Netlify URL
2. ✅ Click around - all pages should load
3. ✅ Check browser console (F12) for any errors

---

## Need Help?

See **NETLIFY_DEPLOYMENT.md** for detailed troubleshooting and configuration.

---

**Your Taj Tailor frontend is now live on Netlify!**
