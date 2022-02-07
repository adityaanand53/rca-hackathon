import React from "react";
import "./App.css";
import cityRCA from "./citydata.json";
import BarChartContainer from "./components/BarChart";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

function App() {
  const data = {
    labels: cityRCA.map((c) => c.city),
    datasets: [
      {
        label: "Votes for cities",
        data: cityRCA.map((c) => c["Total Votes"]),
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };
  return (
    <div className="App">
      <BarChartContainer
        helpText="Number of votes per city"
        dataSource={data}
        header="Votes per city"
      ></BarChartContainer>
    </div>
  );
}

export default App;
