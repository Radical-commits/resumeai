import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import morgan from 'morgan'
import compression from 'compression'
import path from 'path'
import { fileURLToPath } from 'url'
import chatRoutes from './routes/chatRoutes.js'
import resumeRoutes from './routes/resumeRoutes.js'
import { startSessionCleanup, getSessionStats } from './services/sessionService.js'
import { parseResume } from './services/resumeParser.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001
const CORS_ORIGIN = process.env.CORS_ORIGIN || process.env.FRONTEND_URL || 'http://localhost:5173'
const NODE_ENV = process.env.NODE_ENV || 'development'

// Parse CORS origins - support multiple comma-separated origins
const allowedOrigins = CORS_ORIGIN.split(',').map(origin => origin.trim())

// Security middleware - helmet adds various HTTP headers for security
app.use(helmet({
  contentSecurityPolicy: false, // Disabled for API - frontend handles this
  crossOriginEmbedderPolicy: false
}))

// Compression middleware - gzip responses
app.use(compression())

// Request logging - use 'combined' format in production, 'dev' in development
app.use(morgan(NODE_ENV === 'production' ? 'combined' : 'dev'))

// Serve static files BEFORE CORS and other middleware (in production)
if (NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, 'public')
  console.log('Serving frontend from:', frontendPath)

  // Serve static assets with caching
  app.use(express.static(frontendPath, {
    maxAge: '1d',
    etag: true,
    index: false // Don't automatically serve index.html for directories
  }))
}

// CORS middleware - only for API routes
// In production with single-service deployment, be more permissive
app.use('/api', cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true)

    // In production single-service mode, allow same-origin requests
    if (NODE_ENV === 'production' && !process.env.FRONTEND_URL) {
      // Frontend and backend are served from same domain
      return callback(null, true)
    }

    // Check against allowed origins
    if (allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      console.warn(`CORS rejected origin: ${origin}`)
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}))

// Body parsing middleware
app.use(express.json())

// Rate limiting - prevent abuse (only on API routes)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: NODE_ENV === 'production' ? 100 : 1000, // limit each IP to 100 requests per windowMs in production
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
})
app.use('/api/', limiter)


// Routes
app.use('/api/chat', chatRoutes)
app.use('/api/resume', resumeRoutes)

// Health check endpoint - required by Render
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'ai-resume-backend',
    timestamp: new Date().toISOString(),
    environment: NODE_ENV
  })
})

// Debug endpoint for session stats - only enabled in development
if (NODE_ENV !== 'production') {
  app.get('/api/debug/sessions', (req, res) => {
    const stats = getSessionStats()
    res.json(stats)
  })
}

// Serve index.html for all non-API routes (SPA routing) - MUST be after static files
if (NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, 'public')

  app.get('*', (req, res) => {
    // Don't serve index.html for API routes or health check
    if (req.path.startsWith('/api') || req.path === '/health') {
      return res.status(404).json({
        error: 'Not found',
        path: req.path
      })
    }

    // Send index.html for all other routes (SPA routing)
    res.sendFile(path.join(frontendPath, 'index.html'), (err) => {
      if (err) {
        console.error('Error sending index.html:', err)
        res.status(500).json({ error: 'Failed to load application' })
      }
    })
  })
} else {
  // 404 handler for development (when running separately)
  app.use((req, res) => {
    res.status(404).json({
      error: 'Not found',
      path: req.path
    })
  })
}

// Global error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err)
  res.status(500).json({
    error: 'Internal server error',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  })
})

// Initialize services
async function initializeServer() {
  try {
    // Parse resume on startup (this will cache it)
    console.log('Parsing resume...')
    const resume = parseResume()
    console.log(`Resume loaded: ${resume.contact.name}`)
    console.log(`Experience entries: ${resume.experience.length}`)
    console.log(`Skills categories: ${Object.keys(resume.skills).length}`)

    // Start session cleanup
    startSessionCleanup()

    // Start server
    app.listen(PORT, () => {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      console.log(`Server running on port ${PORT}`)
      console.log(`CORS enabled for: ${CORS_ORIGIN}`)
      console.log(`Environment: ${NODE_ENV}`)
      console.log(`Security: Helmet enabled`)
      console.log(`Rate limiting: ${NODE_ENV === 'production' ? '100' : '1000'} requests per 15min`)
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    })

  } catch (error) {
    console.error('Failed to initialize server:', error)
    process.exit(1)
  }
}

// Start the server
initializeServer()

export default app
