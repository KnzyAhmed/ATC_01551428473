import { Link } from "react-router-dom"

function NavigationBar(){
    return (
        <nav className="navigationBar">
            <div className="navbar-brand">
                <Link to="/">Events App</Link>
            </div>
            <div className="navbar-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/favorites" className="nav-link">Favourites</Link>
            </div>
        </nav>
    )
}

export default NavigationBar;
