import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import compression from 'compression'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

// Enable gzip compression
app.use(compression())

// Health check endpoint - for keeping service alive
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'ai-resume-frontend',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
})

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist'), {
  maxAge: '1y', // Cache static assets for 1 year
  etag: true,
  lastModified: true
}))

// Catch-all route - send index.html for client-side routing (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log(`Frontend server running on port ${PORT}`)
  console.log(`Health check: http://localhost:${PORT}/health`)
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
})

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server')
  process.exit(0)
})

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server')
  process.exit(0)
})
