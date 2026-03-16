import { pool } from '../config/database.js'

export const getEvents = async (_, res) => {
    try {
        const result = await pool.query('SELECT id, location_id, title, date, time, image FROM events ORDER BY date, time')
        res.status(200).json(result.rows)
    } catch (error) {
        console.error('Error fetching events:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export const getEventById = async (req, res) => {
    const eventId = Number(req.params.eventId)

    if (Number.isNaN(eventId)) {
        return res.status(400).json({ error: 'Invalid event id' })
    }

    try {
        const result = await pool.query(
            'SELECT id, location_id, title, date, time, image FROM events WHERE id = $1',
            [eventId]
        )

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Event not found' })
        }

        return res.status(200).json(result.rows[0])
    } catch (error) {
        console.error('Error fetching event:', error)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

export const getEventsByLocation = async (req, res) => {
    const locationId = Number(req.params.locationId)

    if (Number.isNaN(locationId)) {
        return res.status(400).json({ error: 'Invalid location id' })
    }

    try {
        const result = await pool.query(
            'SELECT id, location_id, title, date, time, image FROM events WHERE location_id = $1 ORDER BY date, time',
            [locationId]
        )

        return res.status(200).json(result.rows)
    } catch (error) {
        console.error('Error fetching events by location:', error)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}
