import { pool } from './database.js'

const seedLocations = async () => {
	const query = `
		INSERT INTO locations (name, slug, address, city, state, zip, image)
		VALUES
			('Echo Lounge', 'echolounge', '431 Unity Ave', 'Dallas', 'TX', '75201', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80'),
			('House of Blues', 'houseofblues', '2200 N Lamar St', 'Dallas', 'TX', '75202', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80'),
			('Pavilion', 'pavilion', '400 Event Center Blvd', 'Dallas', 'TX', '75207', 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80')
		ON CONFLICT (slug)
		DO UPDATE SET
			name = EXCLUDED.name,
			address = EXCLUDED.address,
			city = EXCLUDED.city,
			state = EXCLUDED.state,
			zip = EXCLUDED.zip,
			image = EXCLUDED.image;
	`

	try {
		await pool.query(query)
		console.log('Locations seeded successfully.')
	} catch (error) {
		console.error('Failed to seed locations:', error)
	} finally {
		await pool.end()
	}
}

seedLocations()
