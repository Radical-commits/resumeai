# Deploy to Render.com

This guide helps you deploy ResumeAI to Render.com's free tier.

## Deployment Options

### Option 1: Single Service (Recommended for Free Tier)

Deploy both frontend and backend as a single web service.

#### Step 1: Create Web Service

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository: `https://github.com/Radical-commits/resumeai`
4. Configure the service:

**Basic Settings:**
- Name: `resumeai` (or your preferred name)
- Region: Oregon (US West) or closest to you
- Branch: `main`
- Runtime: `Node`

**Build & Deploy:**
- Build Command: `npm run build:prod`
- Start Command: `npm start`

**Instance Type:**
- Free

#### Step 2: Set Environment Variables

Click "Environment" and add these variables:

```
NODE_ENV=production
PORT=10000
AI_API_KEY=your_groq_api_key_here
FRONTEND_URL=https://your-app-name.onrender.com
VITE_API_URL=https://your-app-name.onrender.com
```

**Important:** Replace `your_groq_api_key_here` with your actual API key and `your-app-name` with your Render service name.

#### Step 3: Deploy

1. Click "Create Web Service"
2. Wait for the build to complete (5-10 minutes first time)
3. Your site will be live at `https://your-app-name.onrender.com`

### Option 2: Separate Services (Better Performance)

Deploy frontend and backend as separate services using the included `render.yaml`.

#### Automatic Deployment with render.yaml

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Blueprint"
3. Connect your GitHub repository
4. Render will detect `render.yaml` and create both services automatically
5. Set environment variables for each service:

**Backend Service:**
```
AI_API_KEY=your_groq_api_key_here
FRONTEND_URL=https://your-frontend-name.onrender.com
```

**Frontend Service:**
```
VITE_API_URL=https://your-backend-name.onrender.com
```

## Troubleshooting

### Build Fails with "Exit handler never called"

This is usually caused by validation errors. The `build:prod` command skips validation to avoid this issue.

If you're manually setting the build command, use:
```
npm run build:prod
```

NOT:
```
npm run build
```

### "Not allowed by CORS" Error

Make sure `FRONTEND_URL` in backend environment variables matches your actual frontend URL.

### AI Chat Not Working

1. Verify `AI_API_KEY` is set in backend environment variables
2. Check that `VITE_API_URL` in frontend points to your backend service
3. Make sure backend service is running (check logs)

### Free Tier Limitations

- Services spin down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds
- 750 hours/month free (enough for one service 24/7)

## Post-Deployment

1. Update `config.json` with your actual domain:
   ```json
   {
     "site": {
       "domain": "https://your-app-name.onrender.com"
     }
   }
   ```

2. Update social media preview image path if needed

3. Test all features:
   - Resume displays correctly
   - AI chat works
   - Job fit assessment works
   - Theme switching works
   - Language switching works (if enabled)

## Custom Domain

To use your own domain:

1. In Render dashboard, go to your service
2. Click "Settings" → "Custom Domain"
3. Add your domain and follow DNS instructions
4. Update `config.json` with your custom domain

## Need Help?

- [Render Documentation](https://render.com/docs)
- [ResumeAI Issues](https://github.com/Radical-commits/resumeai/issues)
