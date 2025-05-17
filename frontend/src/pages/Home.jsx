import { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import "../css/Home.css";

function Home() {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch events on mount with Authorization header
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/events/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch events");
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Handle booking event
  const handleBookNow = async (eventId) => {
    try {
      const response = await fetch("http://localhost:8000/api/bookings/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({ event: eventId }),
      });

      if (!response.ok) {
        throw new Error("Booking failed");
      }

      // Update the event in state to mark it as booked
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === eventId ? { ...event, is_booked: true } : event
        )
      );
      alert("Booking successful!");
    } catch (err) {
      alert(err.message);
    }
  };

  // Search filtering
  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = events.filter((event) =>
      event.event_name.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
    setFilteredEvents(filtered);
    setIsSearching(true);
    setSearchQuery("");
  };

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>Error: {error}</p>;

  const displayEvents = isSearching ? filteredEvents : events;

  return (
    <>
    <div className="background">
      <div className="shape"></div>
      <div className="shape"></div>
    </div>
    <div className="home-container">
      {/* <form className="search-form"> */}
        <div onSubmit={handleSearch} className="search-wrapper">
          <input
            type="text"
            placeholder="Search for events..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      {/* </form> */}

      <h2 className="section-heading">
        {isSearching ? "Search Results" : "All Events"}
      </h2>

      <div className="events-grid">
        {displayEvents.length > 0 ? (
          displayEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onBookNowClick={handleBookNow} // pass down the booking handler
            />
          ))
        ) : (
          <p className="no-results">No events found.</p>
        )}
      </div>
    </div>
    </>
  );
}

export default Home;
