import { Router } from 'express'
import { getLocationById, getLocations } from '../controllers/locations.js'
import { getEventsByLocation } from '../controllers/events.js'

const router = Router()

router.get('/', getLocations)
router.get('/:locationId', getLocationById)
router.get('/:locationId/events', getEventsByLocation)

export default router
