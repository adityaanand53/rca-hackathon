import React from "react";
import "./App.scss";
import cityRCA from "./citydata.json";
import BarChartContainer from "./components/BarChart";
import { Chart, registerables } from "chart.js";
import DoughnutChartContainer from "./components/DoughnutChart";
import { COLORS } from "./shared/constants";

Chart.register(...registerables);

function App() {
  const data = (keyName) => ({
    labels: cityRCA.map((c) => c.city),
    datasets: [
      {
        label: "Votes for cities",
        data: cityRCA.map((c) => c[keyName]),
        backgroundColor: COLORS.slice(0, cityRCA.length),
        hoverOffset: 4,
      },
    ],
  });
  return (
    <div className="App charts-container">
      <DoughnutChartContainer
        helpText="Number of votes per city"
        dataSource={data("Total Votes")}
        header="Votes per city"
      ></DoughnutChartContainer>

      <BarChartContainer
        helpText="Rating based on Total Overall %"
        dataSource={data("TOTAL OVERALL %")}
        header="Rating: Total Overall %"
      ></BarChartContainer>
      <BarChartContainer
        helpText="Rating based on Total Venue Avg %"
        dataSource={data("Total Venue Avg %")}
        header="Rating: Total Venue Avg %"
      ></BarChartContainer>
      <BarChartContainer
        helpText="Rating based on Total Feedback %"
        dataSource={data("TOTAL TNS %")}
        header="Rating: Total Feedback %"
      ></BarChartContainer>
    </div>
  );
}

export default App;
