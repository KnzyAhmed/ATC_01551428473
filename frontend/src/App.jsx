import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favourites from "./pages/Favourites";
import NavigationBar from "./components/navigationBar";
import "./css/App.css"
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
