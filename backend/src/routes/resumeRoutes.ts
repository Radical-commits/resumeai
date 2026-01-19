import express from 'express'
import { getResumeSummary, getFullResume } from '../controllers/resumeController.js'

const router = express.Router()

// Get resume summary (key information)
router.get('/summary', getResumeSummary)

// Get full parsed resume
router.get('/full', getFullResume)

export default router
