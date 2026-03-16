import { pool } from '../config/database.js'

export const getLocations = async (_, res) => {
	try {
		const result = await pool.query('SELECT id, name, slug, address, city, state, zip, image FROM locations ORDER BY id')
		res.status(200).json(result.rows)
	} catch (error) {
		console.error('Error fetching locations:', error)
		res.status(500).json({ error: 'Internal Server Error' })
	}
}

export const getLocationById = async (req, res) => {
	const locationId = Number(req.params.locationId)

	if (Number.isNaN(locationId)) {
		return res.status(400).json({ error: 'Invalid location id' })
	}

	try {
		const result = await pool.query(
			'SELECT id, name, slug, address, city, state, zip, image FROM locations WHERE id = $1',
			[locationId]
		)

		if (result.rows.length === 0) {
			return res.status(404).json({ error: 'Location not found' })
		}

		return res.status(200).json(result.rows[0])
	} catch (error) {
		console.error('Error fetching location:', error)
		return res.status(500).json({ error: 'Internal Server Error' })
	}
}

