import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Weather from "./pages/Weather.jsx";

function App() {
  return (
    <div>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Weather" element={<Weather />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
