import "../css/EventCard.css"

function EventCard({event, onBookNowClick }){

    return (
    <div className="event-card">
        {event.image && <img src={event.image} alt={event.event_name} />}
        <h3>{event.event_name}</h3>
        <p>{new Date(event.date).toLocaleDateString()}</p>
        <button className="book-now-btn" onClick={onBookNowClick} disabled={event.is_booked} >
        {event.is_booked ? "Booked" : "Book now! 📓"}
        </button>        
    </div>
    );
}

export default EventCard