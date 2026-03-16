import React from 'react'
import '../css/Event.css'

const Event = ({ title, date, time, image }) => {
    const formattedDate = new Date(date).toLocaleDateString(undefined, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    })

    const formattedTime = new Date(`1970-01-01T${time}`).toLocaleTimeString(undefined, {
        hour: 'numeric',
        minute: '2-digit'
    })

    return (
        <article className='event-information'>
            <img src={image} alt={title} />

            <div className='event-information-overlay'>
                <div className='text'>
                    <h3>{title}</h3>
                    <p>{formattedDate} <br /> {formattedTime}</p>
                </div>
            </div>
        </article>
    )
}

export default Event