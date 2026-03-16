const API_BASE = '/api/locations'

const getAllLocations = async () => {
    const response = await fetch(API_BASE)

    if (!response.ok) {
        throw new Error('Unable to fetch locations')
    }

    return response.json()
}

const getLocationById = async (locationId) => {
    const response = await fetch(`${API_BASE}/${locationId}`)

    if (!response.ok) {
        throw new Error('Unable to fetch location')
    }

    return response.json()
}

const getEventsByLocationId = async (locationId) => {
    const response = await fetch(`${API_BASE}/${locationId}/events`)

    if (!response.ok) {
        throw new Error('Unable to fetch location events')
    }

    return response.json()
}

const LocationsAPI = {
    getAllLocations,
    getLocationById,
    getEventsByLocationId
}

export default LocationsAPI
