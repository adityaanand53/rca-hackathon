import React from "react";
import { Routes, Route } from "react-router-dom";
import "./styles/App.scss";
import LandingPage from "./components/LandingPage";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path=":entity" element={<LandingPage />} />
      </Routes>
    </div>
  );
}

export default App;
