# Deployment Guide

Complete guide for deploying your AI Resume Website to various hosting platforms.

## Table of Contents

1. [Platform Comparison](#platform-comparison)
2. [Render.com (Reference Implementation)](#rendercom-reference-implementation)
3. [Vercel](#vercel)
4. [Netlify](#netlify)
5. [Railway](#railway)
6. [AWS](#aws)
7. [Self-Hosted (Docker)](#self-hosted-docker)
8. [Environment Variables](#environment-variables)
9. [Domain Configuration](#domain-configuration)
10. [Troubleshooting](#troubleshooting)

## Platform Comparison

| Platform | Free Tier | Best For | Difficulty | Build Time |
|----------|-----------|----------|------------|------------|
| **Render.com** | ✅ Yes | Full-stack apps | Easy | ~5 min |
| **Vercel** | ✅ Yes | Frontend + serverless | Easy | ~3 min |
| **Netlify** | ✅ Yes | Static + functions | Easy | ~3 min |
| **Railway** | ✅ Limited | Containers, databases | Medium | ~5 min |
| **AWS** | ⚠️ Complex | Enterprise, scale | Hard | ~30 min |
| **Self-hosted** | N/A | Full control | Hard | Varies |

### Recommended Choice

**For most users:** Start with **Render.com** (reference implementation)
- Free tier includes backend + frontend
- Easy setup with GitHub integration
- Auto-deploys on git push
- Built-in SSL certificates
- No credit card required for free tier

## Render.com (Reference Implementation)

### Prerequisites
- GitHub account
- Render.com account (free at [render.com](https://render.com))
- Your Groq API key or other LLM provider key

### Step 1: Prepare Your Repository

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/your-resume-site
git push -u origin main
```

2. Ensure you have a `render.yaml` file in your root:

```yaml
services:
  # Backend service
  - type: web
    name: resume-backend
    env: node
    buildCommand: cd backend && npm install && npm run build
    startCommand: cd backend && npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 3001
      - key: GROQ_API_KEY
        sync: false  # Set manually in Render dashboard
      - key: CORS_ORIGIN
        sync: false  # Set to your frontend URL

  # Frontend service
  - type: web
    name: resume-frontend
    env: static
    buildCommand: cd frontend && npm install && npm run build
    staticPublishPath: frontend/dist
    envVars:
      - key: VITE_API_URL
        sync: false  # Set to your backend URL
```

### Step 2: Deploy on Render

1. **Connect GitHub:**
   - Go to [dashboard.render.com](https://dashboard.render.com)
   - Click "New +" → "Blueprint"
   - Connect your GitHub repository
   - Select the repository with your resume site

2. **Configure Services:**
   - Render will detect `render.yaml`
   - Review the services to be created
   - Click "Apply"

3. **Set Environment Variables:**

   For **backend service**:
   - Go to backend service → Environment
   - Add:
     - `GROQ_API_KEY`: Your Groq API key
     - `CORS_ORIGIN`: Your frontend URL (e.g., `https://yourname-resume.onrender.com`)

   For **frontend service**:
   - Go to frontend service → Environment
   - Add:
     - `VITE_API_URL`: Your backend URL (e.g., `https://yourname-backend.onrender.com`)

4. **Deploy:**
   - Services will auto-deploy
   - Wait 5-10 minutes for first deployment
   - Check logs for any errors

### Step 3: Verify Deployment

Visit your frontend URL and test:
- [ ] Page loads correctly
- [ ] AI chat responds
- [ ] Job fit assessment works
- [ ] All sections display properly

### Step 4: Custom Domain (Optional)

1. Go to frontend service → Settings → Custom Domain
2. Add your domain (e.g., `resume.yourdomain.com`)
3. Follow DNS configuration instructions
4. SSL certificate will be auto-generated

## Vercel

Perfect for static sites with serverless functions.

### Prerequisites
- Vercel account ([vercel.com](https://vercel.com))
- GitHub repository

### Deployment Steps

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Prepare Project:**

Create `vercel.json` in root:
```json
{
  "buildCommand": "cd frontend && npm run build",
  "outputDirectory": "frontend/dist",
  "devCommand": "cd frontend && npm run dev",
  "installCommand": "npm install",
  "framework": null,
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/api/:path*"
    }
  ]
}
```

3. **Move Backend to Serverless:**

Convert backend to Vercel serverless functions in `/api` directory.

4. **Deploy:**
```bash
vercel
```

5. **Set Environment Variables:**
```bash
vercel env add GROQ_API_KEY
vercel env add VITE_API_URL
```

6. **Production Deployment:**
```bash
vercel --prod
```

### Notes
- Free tier: 100 GB bandwidth/month
- Serverless functions have 10s timeout on free tier
- Excellent for frontend-heavy apps

## Netlify

Similar to Vercel, great for JAMstack sites.

### Deployment Steps

1. **Install Netlify CLI:**
```bash
npm install -g netlify-cli
```

2. **Create `netlify.toml`:**
```toml
[build]
  base = "frontend"
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
```

3. **Convert Backend to Functions:**

Move backend logic to `netlify/functions/` directory.

4. **Deploy:**
```bash
netlify init
netlify deploy --prod
```

5. **Set Environment Variables:**
- Go to Netlify dashboard → Site settings → Environment variables
- Add `GROQ_API_KEY` and other variables

### Notes
- Free tier: 100 GB bandwidth/month
- Functions: 125k requests/month
- Great DX with instant rollbacks

## Railway

Excellent for containerized applications.

### Deployment Steps

1. **Connect GitHub:**
   - Go to [railway.app](https://railway.app)
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository

2. **Configure Services:**

Railway will auto-detect your setup. Configure:

**Backend:**
- Root Directory: `/backend`
- Build Command: `npm install && npm run build`
- Start Command: `npm start`

**Frontend:**
- Root Directory: `/frontend`
- Build Command: `npm install && npm run build`
- Start Command: `npm run preview` or serve static files

3. **Set Environment Variables:**
- Click service → Variables
- Add all required environment variables

4. **Deploy:**
- Push to main branch triggers auto-deploy
- Monitor logs for issues

### Notes
- Free tier: $5 credit/month
- Sleeps after inactivity
- Great for databases + backend

## AWS

For enterprise deployments and high scalability.

### Architecture

```
CloudFront (CDN)
    ├── S3 (Frontend static files)
    └── API Gateway → Lambda (Backend)
```

### Deployment Steps (Simplified)

1. **Frontend to S3 + CloudFront:**
```bash
# Build frontend
cd frontend && npm run build

# Upload to S3
aws s3 sync dist/ s3://your-bucket-name/

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

2. **Backend to Lambda:**

Use AWS SAM or Serverless Framework:
```bash
npm install -g serverless
serverless deploy
```

3. **Configure API Gateway:**
- Set up routes to Lambda functions
- Enable CORS
- Set up custom domain

### Notes
- Most complex setup
- Best for high traffic (>100k visitors/month)
- Fine-grained cost control
- Requires AWS expertise

## Self-Hosted (Docker)

Full control over your hosting.

### Docker Setup

Create `Dockerfile` in backend:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npm", "start"]
```

Create `docker-compose.yml` in root:
```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - GROQ_API_KEY=${GROQ_API_KEY}
      - PORT=3001
    restart: unless-stopped

  frontend:
    image: nginx:alpine
    volumes:
      - ./frontend/dist:/usr/share/nginx/html
      - ./nginx.conf:/etc/nginx/conf.d/default.conf
    ports:
      - "80:80"
      - "443:443"
    depends_on:
      - backend
    restart: unless-stopped
```

### Deployment

```bash
# Build and start
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

### Notes
- Requires server management
- You handle SSL, backups, updates
- Best for developers with DevOps experience
- Use DigitalOcean, Linode, or Hetzner for VPS

## Environment Variables

### Backend (.env)

```bash
# AI Provider Configuration (Recommended: Use generic AI_API_KEY)
AI_API_KEY=your_api_key_here
AI_PROVIDER=groq  # or openai, google, anthropic
AI_MODEL=llama-3.3-70b-versatile

# Alternative: Provider-specific keys (for backward compatibility)
# GROQ_API_KEY=your_groq_api_key
# OPENAI_API_KEY=your_openai_key
# GOOGLE_API_KEY=your_google_key
# ANTHROPIC_API_KEY=your_anthropic_key

# Server Configuration
PORT=3001
NODE_ENV=production
CORS_ORIGIN=https://yourdomain.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=10

# Session
SESSION_SECRET=random-secret-string
SESSION_TIMEOUT_MS=1800000
```

### Frontend (.env)

```bash
# API Configuration
VITE_API_URL=https://your-backend-url.com

# Optional: Analytics
# VITE_GA_TRACKING_ID=G-XXXXXXXXXX
```

## Domain Configuration

### DNS Settings

Add these records to your DNS provider:

**For Render.com:**
```
Type: CNAME
Name: www (or @)
Value: your-app.onrender.com
```

**For Vercel:**
```
Type: CNAME
Name: www (or @)
Value: cname.vercel-dns.com
```

**For Custom Setup:**
```
Type: A
Name: @
Value: Your-Server-IP

Type: CNAME
Name: www
Value: yourdomain.com
```

### SSL Certificates

Most platforms auto-generate SSL certificates:
- **Render**: Automatic with custom domains
- **Vercel**: Automatic
- **Netlify**: Automatic
- **Self-hosted**: Use Let's Encrypt with Certbot

## Troubleshooting

### Build Fails

**Check:**
- Node.js version (should be 18+)
- All dependencies in package.json
- Build command is correct
- Environment variables are set

**Fix:**
```bash
# Locally test build
npm run build

# Check logs
tail -f /var/log/app.log
```

### AI Chat Not Working

**Check:**
- API key is set correctly
- CORS origin matches frontend URL
- Backend is running and accessible
- Network requests in browser devtools

**Fix:**
- Verify API key is valid
- Check backend logs for errors
- Test API endpoint directly with curl

### Slow Performance

**Solutions:**
- Enable CDN (CloudFlare, CloudFront)
- Optimize images (use WebP, lazy loading)
- Enable caching headers
- Minify JavaScript and CSS
- Use compression (gzip/brotli)

### High Costs

**Solutions:**
- Use free tiers (Render, Vercel, Netlify)
- Implement caching to reduce API calls
- Set up rate limiting
- Monitor usage dashboards
- Use serverless for variable traffic

## Post-Deployment Checklist

- [ ] Site loads on custom domain
- [ ] SSL certificate is active (https://)
- [ ] All pages work correctly
- [ ] AI chat responds
- [ ] Job fit assessment works
- [ ] Mobile responsive
- [ ] Fast load times (<3s)
- [ ] SEO meta tags present
- [ ] Analytics connected (optional)
- [ ] Error monitoring set up (optional)
- [ ] Backup strategy in place

## Monitoring & Maintenance

### Recommended Tools

- **Uptime Monitoring:** UptimeRobot (free)
- **Error Tracking:** Sentry (free tier)
- **Analytics:** Google Analytics, Plausible
- **Performance:** Google PageSpeed Insights

### Regular Maintenance

- **Weekly:** Check error logs
- **Monthly:** Review analytics, update dependencies
- **Quarterly:** Update resume content, refresh design
- **Yearly:** Review hosting costs, consider migrations

## Support

- Platform documentation links
- Community forums
- GitHub issues for template bugs

---

**Recommendation:** Start with Render.com for the easiest deployment experience. Migrate to other platforms as your needs grow.
