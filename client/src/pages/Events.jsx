import React, { useEffect, useMemo, useState } from 'react'
import EventsAPI from '../services/EventsAPI'
import LocationsAPI from '../services/LocationsAPI'
import Event from '../components/Event'
import '../css/LocationEvents.css'

const Events = () => {
    const [events, setEvents] = useState([])
    const [locations, setLocations] = useState([])
    const [selectedLocationId, setSelectedLocationId] = useState('')

    useEffect(() => {
        (async () => {
            try {
                const [eventsData, locationsData] = await Promise.all([
                    EventsAPI.getAllEvents(),
                    LocationsAPI.getAllLocations()
                ])

                setEvents(eventsData)
                setLocations(locationsData)
            } catch (error) {
                console.error(error)
            }
        })()
    }, [])

    const filteredEvents = useMemo(() => {
        if (!selectedLocationId) {
            return events
        }

        return events.filter((event) => String(event.location_id) === selectedLocationId)
    }, [events, selectedLocationId])

    return (
        <section>
            <h2>All Events</h2>
            <div className='location-events'>
                <div className='events-filter'>
                    <label htmlFor='events-location-filter'>Location</label>
                    <select
                        id='events-location-filter'
                        value={selectedLocationId}
                        onChange={(event) => setSelectedLocationId(event.target.value)}
                    >
                        <option value=''>All locations</option>
                        {
                            locations.map((location) => (
                                <option key={location.id} value={location.id}>
                                    {location.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <main>
                    {
                        filteredEvents.length > 0 ? filteredEvents.map((event) => (
                            <Event
                                key={event.id}
                                title={event.title}
                                date={event.date}
                                time={event.time}
                                image={event.image}
                            />
                        )) : <h3>No events available for this location.</h3>
                    }
                </main>
            </div>
        </section>
    )
}

export default Events
