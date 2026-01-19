import express from 'express'
import { handleChat, handleAssessJob } from '../controllers/chatController.js'

const router = express.Router()

// General chat endpoint
router.post('/', handleChat)

// Job fit assessment endpoint
router.post('/assess-fit', handleAssessJob)

export default router
