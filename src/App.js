import React from "react";
import "./styles/App.scss";
import LandingPage from "./components/LandingPage";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

function App() {
  return (
    <div className="App">
      <LandingPage />
    </div>
  );
}

export default App;
