import "../css/MovieCard.css"

function EventCard({event}){

    function onBookNowClick(){
        alert("clicked")
    }

    return <div className="event-card">
        <div className="event-poster"> </div>
            <img src={event.url} alt={event.title}/>
            <div className="booking">
                <button className="book-now-btn" onClick={onBookNowClick}>
                    📓
                </button>
            </div>
            <div className="event-info">
                <h3>{event.name}</h3>
                <p>{event.date}</p>
            </div>
    </div>
}

export default EventCard