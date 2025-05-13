import './App.css';
import Home from "./pages/Home";
import Favourites from "./pages/Favourites";
import { Routes, Route } from "react-router-dom";
import NavigationBar from "./components/navigationBar";

function App() {

  return (
    <div>
      <NavigationBar></NavigationBar>
    <main className="main-content">
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/favorites" element={<Favourites />}/>
      </Routes>
    </main>
    </div>
  );
}

export default App
