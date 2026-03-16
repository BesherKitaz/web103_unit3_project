import { pool } from './database.js'

const resetDatabase = async () => {
	const query = `
		DROP TABLE IF EXISTS events;
		DROP TABLE IF EXISTS locations;

		CREATE TABLE locations (
			id SERIAL PRIMARY KEY,
			name VARCHAR(100) NOT NULL,
			slug VARCHAR(100) UNIQUE NOT NULL,
			address VARCHAR(150) NOT NULL,
			city VARCHAR(80) NOT NULL,
			state VARCHAR(10) NOT NULL,
			zip VARCHAR(10) NOT NULL,
			image TEXT NOT NULL
		);

		CREATE TABLE events (
			id SERIAL PRIMARY KEY,
			location_id INTEGER NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
			title VARCHAR(120) NOT NULL,
			date DATE NOT NULL,
			time TIME NOT NULL,
			image TEXT NOT NULL
		);

		INSERT INTO locations (name, slug, address, city, state, zip, image)
		VALUES
			('Echo Lounge', 'echolounge', '431 Unity Ave', 'Dallas', 'TX', '75201', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80'),
			('House of Blues', 'houseofblues', '2200 N Lamar St', 'Dallas', 'TX', '75202', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80'),
			('Pavilion', 'pavilion', '400 Event Center Blvd', 'Dallas', 'TX', '75207', 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80'),
			('American Airlines Center', 'americanairlines', '2500 Victory Ave', 'Dallas', 'TX', '75219', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80');

		INSERT INTO events (location_id, title, date, time, image)
		VALUES
			(1, 'Late Night Jazz Collective', '2026-04-10', '20:00:00', 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&w=1200&q=80'),
			(1, 'Indie Bass Showcase', '2026-04-19', '21:00:00', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80'),
			(2, 'Blues Revival Night', '2026-05-01', '19:30:00', 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1200&q=80'),
			(2, 'Soul & Brass Weekend', '2026-05-14', '20:30:00', 'https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=1200&q=80'),
			(3, 'Open Air Electronic Fest', '2026-06-06', '18:00:00', 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80'),
			(4, 'Arena Pop Tour', '2026-07-22', '19:00:00', 'https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=1200&q=80');
	`

	try {
		await pool.query(query)
		console.log('Database reset complete.')
	} catch (error) {
		console.error('Failed to reset database:', error)
	} finally {
		await pool.end()
	}
}

resetDatabase()
