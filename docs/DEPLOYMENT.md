# Deployment Guide

This guide shows you how to deploy your ResumeAI website to various hosting platforms.

## Before You Deploy

1. **Test locally** - Make sure everything works on your computer first
2. **Get an API key** - You'll need an AI provider API key (Groq, OpenAI, etc.)
3. **Update config.json** - Add your actual information (not placeholder values)
4. **Commit to Git** - Push your code to GitHub, GitLab, or Bitbucket

## Deployment Options

| Platform | Cost | Difficulty | Best For | Frontend | Backend | AI Features |
|----------|------|------------|----------|----------|---------|-------------|
| **Render.com** | Free tier | Easy | Full-stack apps | ✅ | ✅ | ✅ |
| **Vercel** | Free tier | Easy | Static sites | ✅ | Limited | Limited |
| **Netlify** | Free tier | Easy | Static + functions | ✅ | ✅ | ✅ |
| **Railway** | Trial credits | Medium | Containerized apps | ✅ | ✅ | ✅ |
| **Self-hosted** | Server cost | Medium | Full control | ✅ | ✅ | ✅ |

## Render.com (Recommended)

Render is recommended because it's free, easy to set up, and supports both frontend and backend.

### Option 1: Single Service (Easiest)

Deploy everything as one service. Backend serves the frontend files.

**Step 1: Create Web Service**

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your Git repository
4. Configure:

```
Name: resumeai (or your preferred name)
Region: Oregon (or closest to you)
Branch: main
Runtime: Node
Root Directory: backend

Build Command: npm install --loglevel=error && npm run build && cd ../frontend && npm install --loglevel=error && npm run build
Start Command: npm start
```

**Step 2: Add Environment Variables**

```
NODE_ENV=production
PORT=10000
AI_API_KEY=your_api_key_here
```

**Step 3: Deploy**

Click "Create Web Service" and wait 5-10 minutes. Your site will be live at `https://your-name.onrender.com`

### Option 2: Separate Services (Better Performance)

Deploy frontend and backend separately.

**Using render.yaml (Automatic):**

1. Click "New +" → "Blueprint"
2. Connect your repository
3. Render will detect `render.yaml` and create both services
4. Add environment variables for each service:

**Backend:**
```
AI_API_KEY=your_api_key_here
FRONTEND_URL=https://your-frontend.onrender.com
```

**Frontend:**
```
VITE_API_URL=https://your-backend.onrender.com
```

**Manual Setup:**

Create two services:

**Backend Service:**
```
Type: Web Service
Build Command: cd backend && npm install && npm run build
Start Command: cd backend && npm start
Environment: AI_API_KEY, PORT=10000, FRONTEND_URL
```

**Frontend Service:**
```
Type: Static Site
Build Command: cd frontend && npm install && npm run build
Publish Directory: ./frontend/dist
Environment: VITE_API_URL
```

### Free Tier Limitations

- Services sleep after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds to wake up
- 750 hours/month free (enough for one 24/7 service)

## Vercel

Good for frontend-only deployment or with serverless functions.

### Frontend Only

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
cd frontend
vercel
```

3. Follow prompts

**Note:** AI features require separate backend hosting or serverless functions.

### With Serverless Functions

Vercel can run your backend as serverless functions, but requires code changes. See [Vercel documentation](https://vercel.com/docs/functions) for details.

## Netlify

Similar to Vercel, works well with serverless functions.

### Netlify + Functions

1. Go to [Netlify](https://netlify.com)
2. Click "Add new site" → "Import from Git"
3. Connect your repository
4. Configure:

```
Build Command: npm run build:prod
Publish Directory: frontend/dist
```

5. Add environment variables:
```
NODE_ENV=production
AI_API_KEY=your_api_key_here
```

6. Deploy

**For backend:** Create Netlify Functions from your Express routes. See [Netlify Functions docs](https://docs.netlify.com/functions/).

## Railway

Railway offers simple deployment with generous trial credits.

### Steps

1. Go to [Railway](https://railway.app)
2. "New Project" → "Deploy from GitHub"
3. Select your repository
4. Add environment variables:
```
NODE_ENV=production
PORT=3001
AI_API_KEY=your_api_key_here
```
5. Configure build:
```
Build Command: npm run build:prod
Start Command: npm start
```
6. Deploy

**Cost:** $5/month after trial credits expire.

## Self-Hosted (VPS)

Deploy to any Linux server (DigitalOcean, Linode, AWS EC2, etc.).

### Prerequisites

- Ubuntu/Debian server
- Domain name (optional)
- SSH access

### Setup

**1. Install Node.js:**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**2. Install Git:**
```bash
sudo apt-get install git
```

**3. Clone and build:**
```bash
git clone https://github.com/your-username/resumeai.git
cd resumeai
npm run build:prod
```

**4. Set up environment:**
```bash
cd backend
nano .env
```

Add:
```
NODE_ENV=production
PORT=3001
AI_API_KEY=your_api_key_here
```

**5. Install process manager:**
```bash
sudo npm install -g pm2
```

**6. Start application:**
```bash
pm2 start npm --name "resumeai" -- start
pm2 save
pm2 startup
```

**7. Set up Nginx (optional):**
```bash
sudo apt-get install nginx
sudo nano /etc/nginx/sites-available/resumeai
```

Add:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/resumeai /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

**8. Add SSL (optional):**
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## Environment Variables Reference

These are the environment variables you'll need:

### Backend
```
NODE_ENV=production          # Enables production optimizations
PORT=10000                   # Port to run on (10000 for Render, 3001 otherwise)
AI_API_KEY=xxx              # Your AI provider API key (required)
FRONTEND_URL=https://...    # Your frontend URL (for CORS)
CORS_ORIGIN=https://...     # Allowed origins (same as FRONTEND_URL)
```

### Frontend
```
VITE_API_URL=https://...    # Your backend URL (where API calls go)
```

## Post-Deployment Checklist

After deploying, verify:

- [ ] Site loads correctly
- [ ] Resume data displays
- [ ] Theme looks correct
- [ ] AI chat works (test a question)
- [ ] Job fit assessment works
- [ ] Language switcher works (if enabled)
- [ ] Mobile view looks good
- [ ] Social media preview works (check with Facebook/Twitter debugger)

## Update Your Site

Update `config.json` with your production domain:

```json
{
  "site": {
    "domain": "https://your-actual-domain.com"
  }
}
```

Commit and push to trigger redeployment (most platforms auto-deploy on push).

## Troubleshooting

### Build Fails

**Problem:** `npm run validate` fails during build

**Solution:** Use `npm run build:prod` instead (skips validation)

### CORS Errors

**Problem:** Frontend can't connect to backend

**Solution:**
- Set `FRONTEND_URL` environment variable in backend
- Make sure it matches your actual frontend URL
- No trailing slash

### AI Chat Not Working

**Problem:** Chat button doesn't respond or shows errors

**Solution:**
- Verify `AI_API_KEY` is set correctly
- Check backend logs for errors
- Verify `VITE_API_URL` points to your backend
- Test backend health endpoint: `https://your-backend.com/health`

### Slow First Load

**Problem:** Site takes 30+ seconds to load initially

**Solution:** This is normal on free tiers (services sleep when inactive). Upgrade to paid tier for always-on hosting.

### Images Not Loading

**Problem:** Profile photo or other images don't show

**Solution:**
- Make sure images are in `frontend/public/` folder
- Check file names match exactly (case-sensitive)
- Verify images were included in build

## Custom Domain

Most platforms support custom domains:

### Render
1. Go to service settings
2. "Custom Domain" → Add your domain
3. Update DNS records as shown
4. Wait for SSL certificate (automatic)

### Vercel/Netlify
1. Project settings → "Domains"
2. Add custom domain
3. Update DNS (usually CNAME to their server)
4. SSL is automatic

### Self-Hosted
1. Point A record to your server IP
2. Update Nginx config with your domain
3. Run Certbot for SSL

## Need Help?

- Check platform-specific documentation
- Review error logs in your deployment dashboard
- Open an issue on [GitHub](https://github.com/Radical-commits/resumeai/issues)
- Make sure all environment variables are set correctly
