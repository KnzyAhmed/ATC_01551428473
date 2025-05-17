import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Booking from "./pages/Bookings";
import NavigationBar from "./components/navigationBar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./css/App.css"
function App() {

  return (
    <div>
      <NavigationBar></NavigationBar>
    <main className="main-content">
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/booking" element={<Booking />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
      </Routes>
    </main>
    </div>
  );
}

export default App
