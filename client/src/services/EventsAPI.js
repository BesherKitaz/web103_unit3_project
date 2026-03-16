const API_BASE = '/api/events'

const getAllEvents = async () => {
    const response = await fetch(API_BASE)

    if (!response.ok) {
        throw new Error('Unable to fetch events')
    }

    return response.json()
}

const getEventsById = async (eventId) => {
    const response = await fetch(`${API_BASE}/${eventId}`)

    if (!response.ok) {
        throw new Error('Unable to fetch event')
    }

    return response.json()
}

const EventsAPI = {
    getAllEvents,
    getEventsById
}

export default EventsAPI
