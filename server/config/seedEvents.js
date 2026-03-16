import { pool } from './database.js'

const seedEvents = async () => {
	const query = `
		DELETE FROM events;

		WITH location_ids AS (
			SELECT id, slug
			FROM locations
			WHERE slug IN ('echolounge', 'houseofblues', 'pavilion')
		)
		INSERT INTO events (location_id, title, date, time, image)
		VALUES
			((SELECT id FROM location_ids WHERE slug = 'echolounge'), 'Late Night Jazz Collective', '2026-04-10', '20:00:00', 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&w=1200&q=80'),
			((SELECT id FROM location_ids WHERE slug = 'echolounge'), 'Indie Bass Showcase', '2026-04-19', '21:00:00', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80'),
			((SELECT id FROM location_ids WHERE slug = 'houseofblues'), 'Blues Revival Night', '2026-05-01', '19:30:00', 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1200&q=80'),
			((SELECT id FROM location_ids WHERE slug = 'houseofblues'), 'Soul and Brass Weekend', '2026-05-14', '20:30:00', 'https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=1200&q=80'),
			((SELECT id FROM location_ids WHERE slug = 'pavilion'), 'Open Air Electronic Fest', '2026-06-06', '18:00:00', 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80');
	`

	try {
		await pool.query(query)
		console.log('Events seeded successfully (5 total: 2-2-1 across locations).')
	} catch (error) {
		console.error('Failed to seed events:', error)
	} finally {
		await pool.end()
	}
}

seedEvents()
