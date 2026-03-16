import { Router } from 'express'
import { getEventById, getEvents } from '../controllers/events.js'

const router = Router()

router.get('/', getEvents)
router.get('/:eventId', getEventById)

export default router
