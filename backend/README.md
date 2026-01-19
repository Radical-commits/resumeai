# AI Resume Backend

Node.js/Express backend API that powers the AI chatbot for your resume website. This backend processes resume data and integrates with AI providers to provide an interactive career assistant.

## Features

- Resume loading from JSON configuration (single source of truth)
- AI-powered chatbot using Groq with Llama 3.3 70B Versatile
- Bilingual support (English and Russian)
- Job fit assessment based on job descriptions
- Session-based conversation management
- In-memory session storage with automatic cleanup
- RESTful API endpoints
- CORS configuration for frontend integration

## Tech Stack

- Node.js with Express
- TypeScript
- Groq API with Llama 3.3 70B
- In-memory session storage

## Project Structure

```
backend/
├── src/
│   ├── config/           # Configuration files
│   │   ├── gemini.ts     # Gemini API configuration and system prompts
│   │   └── resume.ts     # Static resume data (legacy)
│   ├── controllers/      # Request handlers
│   │   ├── chatController.ts    # Chat and job assessment handlers
│   │   └── resumeController.ts  # Resume data handlers
│   ├── routes/          # API route definitions
│   │   ├── chatRoutes.ts        # Chat endpoints
│   │   └── resumeRoutes.ts      # Resume endpoints
│   ├── services/        # Business logic
│   │   ├── aiService.ts         # Multi-provider AI integration
│   │   ├── geminiService.ts     # Legacy Gemini service (deprecated)
│   │   ├── resumeParser.ts      # Resume JSON parser
│   │   └── sessionService.ts    # Session management
│   ├── types/           # TypeScript type definitions
│   │   └── index.ts     # All interface definitions
│   └── index.ts         # Application entry point
├── ../data/             # Shared data (single source of truth)
│   └── resume.json      # Resume data used by both backend and frontend
├── .env.example         # Environment variables template
├── package.json         # Dependencies and scripts
└── tsconfig.json        # TypeScript configuration
```

## Setup

### Prerequisites

- Node.js 18+ and npm
- AI provider API key (choose one):
  - [Groq](https://console.groq.com/keys) - Free, fast (recommended)
  - [OpenAI](https://platform.openai.com) - High quality, $5 credit
  - [Google Gemini](https://makersuite.google.com/app/apikey) - Free tier
  - [Anthropic](https://console.anthropic.com) - Premium quality

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp backend/.env.example backend/.env
```

3. Add your AI provider API key to `backend/.env`:
```bash
# Generic API key (works for all providers)
AI_API_KEY=your_api_key_here
AI_PROVIDER=groq  # or openai, google, anthropic
AI_MODEL=llama-3.3-70b-versatile

# Alternatively, use provider-specific keys:
# GROQ_API_KEY=gsk_your_groq_key_here
# OPENAI_API_KEY=sk-your_openai_key_here
# GOOGLE_API_KEY=your_google_key_here
# ANTHROPIC_API_KEY=sk-ant-your_anthropic_key_here
```

4. Build the project:
```bash
npm run build
```

## Running the Server

### Development mode (with hot reload):
```bash
npm run dev
```

### Production mode:
```bash
npm run build
npm start
```

The server will start on port 3001 by default.

## API Endpoints

### Chat Endpoints

#### POST /api/chat
General chat with AI assistant about the resume.

**Request:**
```json
{
  "message": "What experience does Sarah have with product management?",
  "sessionId": "optional-session-id"
}
```

**Response:**
```json
{
  "reply": "Sarah has 8+ years of experience building and scaling B2C SaaS products...",
  "sessionId": "generated-or-provided-session-id"
}
```

#### POST /api/chat/assess-fit
Assess how well the candidate fits a job description.

**Request:**
```json
{
  "jobDescription": "We are looking for a Senior Product Manager with AI experience...",
  "sessionId": "optional-session-id"
}
```

**Response:**
```json
{
  "assessment": "Sarah is an excellent fit for this role...",
  "fitScore": 9,
  "sessionId": "generated-or-provided-session-id"
}
```

### Resume Endpoints

#### GET /api/resume/summary
Get a summary of the resume with key information.

**Response:**
```json
{
  "summary": "Seasoned product leader with extensive experience...",
  "keySkills": ["Agentic AI", "Product Strategy", "Python", ...],
  "yearsOfExperience": 20,
  "currentRole": "Senior Product Manager",
  "languages": ["English: Fluent", "Russian: Native"]
}
```

#### GET /api/resume/full
Get the full parsed resume data.

**Response:**
```json
{
  "contact": {...},
  "summary": "...",
  "skills": {...},
  "experience": [...],
  "education": [...],
  "certifications": [...],
  "languages": {...},
  "patents": [...]
}
```

### Utility Endpoints

#### GET /health
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-16T12:00:00.000Z"
}
```

#### GET /api/debug/sessions
Debug endpoint for session statistics (development only).

**Response:**
```json
{
  "totalSessions": 3,
  "sessionAges": [5, 15, 30],
  "averageHistoryLength": 6.7
}
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3001 |
| `NODE_ENV` | Environment (development/production) | development |
| `CORS_ORIGIN` | Allowed CORS origin | http://localhost:5173 |
| `AI_API_KEY` | Generic AI provider API key (recommended) | (required) |
| `AI_PROVIDER` | AI provider (groq/openai/google/anthropic) | groq |
| `AI_MODEL` | Model to use | llama-3.3-70b-versatile |
| `GROQ_API_KEY` | Groq-specific API key (fallback) | - |
| `OPENAI_API_KEY` | OpenAI-specific API key (fallback) | - |
| `GOOGLE_API_KEY` | Google-specific API key (fallback) | - |
| `ANTHROPIC_API_KEY` | Anthropic-specific API key (fallback) | - |

## Key Features Explained

### Resume Loading
- Loads resume from `data/resume.json` (single source of truth shared with frontend)
- Caches parsed data in memory for fast access
- Converts JSON to AI-friendly text context for prompts
- Extracts structured sections: contact, summary, skills, experience, education, languages, certifications

### Session Management
- Generates unique session IDs for each conversation
- Maintains conversation history (last 10 messages per session)
- Automatic cleanup of sessions older than 24 hours
- In-memory storage (suitable for free tier deployment)

### AI Integration
- Multi-provider support: Groq, OpenAI, Google Gemini, Anthropic
- Uses provider-agnostic abstraction layer (`aiService.ts`)
- Bilingual support: automatically detects language and responds accordingly
- System prompts optimized for career assistant and job assessment roles
- Rate limiting awareness with graceful error handling
- Generic `AI_API_KEY` configuration for easy provider switching

### Bilingual Support
The AI automatically detects the language of the user's message and responds in the same language:
- English questions get English responses
- Russian questions (Cyrillic) get Russian responses

## Error Handling

The API returns appropriate HTTP status codes:
- `200` - Success
- `400` - Bad request (missing or invalid parameters)
- `429` - Rate limit exceeded
- `500` - Internal server error

Error response format:
```json
{
  "error": "Error message",
  "details": "Additional details (in development mode)"
}
```

## Development

### Code Quality
```bash
npm run lint
```

### Building
```bash
npm run build
```

The compiled JavaScript will be in the `dist/` directory.

## Deployment

### Render.com Deployment

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
4. Add environment variables:
   - `GROQ_API_KEY`
   - `CORS_ORIGIN` (set to your frontend URL)
   - `NODE_ENV=production`

### Other Platforms

The backend is a standard Node.js/Express application and can be deployed to:
- Heroku
- Railway
- Fly.io
- AWS (EC2, Elastic Beanstalk, Lambda)
- Google Cloud Run
- DigitalOcean App Platform

## Notes

- API keys are never exposed to the client (always server-side only)
- Session data is stored in memory (will reset on server restart)
- For production with high traffic, consider Redis for session storage
- The free tier of Gemini API has rate limits (requests per minute)
- Conversation history is limited to 10 messages per session to manage memory

## License

MIT
