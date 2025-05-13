import EventCard from "../components/EventCard";
import { useState } from "react";

function Home(){
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const events = [ 
        { id: 1, title: "Project Done", date: "17-05-2025"},
        { id: 2, title: "Knzy Celebrates", date: "17-05-2025"},
        { id: 3, title: "Please Accept Me", date: "17-05-2025"},
        { id: 4, title: "Semester Done", date: "01-06-2025"},
    ]

    const handleSearch = (e) => {
        e.preventDefault();
        const filteredEvents = events.filter((event) => event.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
        setFilteredEvents(filteredEvents);
        setIsSearching(true);
        setSearchQuery("");
    };

    return (
    <div className="home">
        <form onSubmit={handleSearch} className="search-form"> 
            <input type="text" 
            placeholder="Search for events..." 
            className="search-input"  
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}/>
            <button type="submit" className="search-btn">Search</button>
        </form>
        <div className="events-grid">
            {isSearching ? (
                filteredEvents.length > 0 ?
                (
                    filteredEvents.map((event) => <EventCard event={event} key={event.id}/>)
                ):(
                    <p>No events found matching your search.</p>
                )
            ):(
                events.map((event) => <EventCard event={event} key={event.id} />)
            )
            }
        </div>
    </div>
    )
}

export default Home