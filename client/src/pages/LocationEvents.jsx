import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Event from '../components/Event'
import LocationsAPI from '../services/LocationsAPI'
import '../css/LocationEvents.css'

const LocationEvents = () => {
    const { locationId } = useParams()
    const [location, setLocation] = useState(null)
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            try {
                const [locationData, eventsData] = await Promise.all([
                    LocationsAPI.getLocationById(locationId),
                    LocationsAPI.getEventsByLocationId(locationId)
                ])

                setLocation(locationData)
                setEvents(eventsData)
            } catch (error) {
                console.error(error)
                setLocation(null)
                setEvents([])
            } finally {
                setLoading(false)
            }
        })()
    }, [locationId])

    if (loading) {
        return <h2>Loading location events...</h2>
    }

    if (!location) {
        return <h2>Location not found.</h2>
    }

    return (
        <div className='location-events'>
            <header>
                <div className='location-image'>
                    <img src={location.image} alt={location.name} />
                </div>

                <div className='location-info'>
                    <h2>{location.name}</h2>
                    <p>{location.address}, {location.city}, {location.state} {location.zip}</p>
                </div>
            </header>

            <main>
                {
                    events.length > 0 ? events.map((event) =>
                        <Event
                            key={event.id}
                            id={event.id}
                            title={event.title}
                            date={event.date}
                            time={event.time}
                            image={event.image}
                        />
                    ) : <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> {'No events scheduled at this location yet!'}</h2>
                }
            </main>
        </div>
    )
}

export default LocationEvents