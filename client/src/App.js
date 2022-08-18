import "./App.css";
import { Route, Routes } from "react-router-dom";

//Components
import Landing from "./Components/Landing/Landing";
import Home from "./Components/Home/Home";
import GameDetail from "./Components/Game Detail/GameDetail";
import GameCreate from "./Components/Game Create/GameCreate";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Landing />} />
        <Route path="/videogame/:id" element={<GameDetail />} />
        <Route path="/create" element={<GameCreate />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
