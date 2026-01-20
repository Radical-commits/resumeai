# Quick Start - 5 Minutes to Your AI Resume Website

Get your AI-powered resume website running in 5 minutes. No technical knowledge required - just follow these steps.

**Note:** The app comes with a sample resume (Sarah Chen, Senior Product Manager) so you can see it working immediately. You'll replace this with your own information in Step 4.

## What You'll Need

- A computer (Mac, Windows, or Linux)
- 15 minutes of your time
- Your resume information

## Step 1: Get the Code

### Option A: Download ZIP (Easiest)
1. Click the green "Code" button at the top of this page
2. Click "Download ZIP"
3. Unzip the file to your Desktop or Documents folder

### Option B: Use Git (If you know how)
```bash
git clone https://github.com/Radical-commits/resumeai.git
cd resumeai
```

## Step 2: Install Node.js

If you don't have Node.js installed:

1. Go to https://nodejs.org
2. Download the version labeled "LTS" (Long Term Support)
3. Run the installer
4. Follow the installation wizard (just keep clicking "Next")

**Check if it worked:**
Open Terminal (Mac) or Command Prompt (Windows) and type:
```bash
node --version
```
You should see something like `v20.10.0` or `v18.19.0`.

## Step 3: Install Dependencies

In Terminal or Command Prompt, navigate to your project folder:

```bash
cd path/to/resumeai
npm install
```

This installs all the required packages. It takes 1-2 minutes.

## Step 4: Add Your Information

Open these two files in any text editor (Notepad, TextEdit, VS Code, etc.):

### File 1: `config.json`

Change the basic info to yours:

```json
{
  "site": {
    "name": "Your Name",                    ← Change this
    "title": "Your Job Title",              ← Change this
    "domain": "https://yourname.com",       ← Change this
    "description": "A brief description"    ← Change this
  },
  "contact": {
    "email": "your.email@example.com",      ← Change this
    "phone": "+1 (555) 123-4567",           ← Change this (optional)
    "location": "Your City, State",         ← Change this
    "linkedin": "https://linkedin.com/in/you",  ← Change this
    "github": "https://github.com/you"      ← Change this (optional)
  }
}
```

**Don't change anything else yet!** Just replace the values in quotes.

### File 2: `data/resume.json`

**This file contains a sample resume** (Sarah Chen's) to show you the structure. Replace her information with yours:

- `personalInfo` - Your name and contact details
- `summary` - A brief paragraph about your experience
- `highlights` - 3-4 bullet points of your top achievements
- `experience` - Your work history
- `skills` - Your skills organized by category
- `education` - Your degrees and schools

**Tip:** Keep Sarah Chen's structure and just replace the content. The format matters!

## Step 5: Get an AI API Key (Free)

For the AI chat feature, you need an API key. We recommend Groq (it's free):

1. Go to https://console.groq.com
2. Sign up for a free account
3. Click "API Keys" in the sidebar
4. Click "Create API Key"
5. Copy the key (it looks like `gsk_...`)

**Save this somewhere safe!** You'll need it in the next step.

## Step 6: Set Up Environment Files

### Frontend Environment File

Create a file named `.env` in the `frontend` folder:

```bash
# In frontend/.env
VITE_API_URL=http://localhost:3001
```

### Backend Environment File

Create a file named `.env` in the `backend` folder:

```bash
# In backend/.env
AI_API_KEY=gsk_your_key_here     ← Paste your Groq API key here
PORT=3001
FRONTEND_URL=http://localhost:5173
```

**Replace `gsk_your_key_here` with your actual API key from Step 5!**

## Step 7: Start Your Website

Open **two** Terminal/Command Prompt windows.

### Window 1 - Start Backend (AI Server)
```bash
cd backend
npm install
npm run dev
```

You should see: "✓ Backend server running on port 3001"

### Window 2 - Start Frontend (Website)
```bash
cd frontend
npm install
npm run dev
```

You should see: "Local: http://localhost:5173"

## Step 8: View Your Website

Open your web browser and go to:
```
http://localhost:5173
```

**You should see your resume website!** 🎉

## Test the AI Chat

1. Click the "Ask AI About Me" button
2. Type a question like "What's your experience with product management?"
3. The AI will answer based on your resume data

## Common Issues

### "Command not found: npm"
- Node.js isn't installed. Go back to Step 2.

### "Port 5173 is already in use"
- Another app is using that port. Close other dev servers or use a different port.

### AI chat doesn't work
- Check that your API key is correct in `backend/.env`
- Make sure the backend server is running (Window 1)

### Resume looks weird
- Check `data/resume.json` for syntax errors (missing commas, quotes, brackets)
- Copy the structure from `examples/software-engineer.json` if needed

## What's Next?

Now that it's working, you can customize it:

1. **Change the look** - See [CUSTOMIZATION.md](docs/CUSTOMIZATION.md) to pick a theme and change colors
2. **Add your photo** - Put `profile.jpg` in `frontend/public/`
3. **Deploy online** - See [ADVANCED.md](docs/ADVANCED.md#deployment) to put it on the internet

## Need Help?

- **Customization** → Read [CUSTOMIZATION.md](docs/CUSTOMIZATION.md)
- **All config options** → Read [ADVANCED.md](docs/ADVANCED.md)
- **Something broken?** → Open an issue on GitHub

## Quick Reference

**Stop the servers:** Press `Ctrl+C` in each Terminal window

**Restart the servers:** Run `npm run dev` again in each folder

**Update your resume:** Edit `data/resume.json` and refresh the browser

**Change colors/theme:** Edit `config.json` under the `theme` or `branding` sections

**Files you'll edit most:**
- `config.json` - Site settings and colors
- `data/resume.json` - Your resume content
- `backend/.env` - API keys (keep this secret!)

---

**Congratulations!** You have a working AI resume website. Now make it yours! 🚀
