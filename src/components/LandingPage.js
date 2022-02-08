import React, { useState } from "react";
import cityRCA from "./../constants/citydata.json";
import BarChartContainer from "./BarChart";
import DoughnutChartContainer from "./DoughnutChart";
import Filters from "./Filters";
import { LoadOptions, constructData, getContainer } from "../helpers/utils";
import { chartTypeOptions } from "../constants/options";
const options = LoadOptions("city");

function LandingPage() {
  const [data, setNewData] = useState(constructData(cityRCA, "Total Votes"));
  const [chartType, setChartType] = useState("BarChartContainer");
  const [customCharts, setCustomCharts] = useState([]);

  const changeOption = (key) => {
    const newData = constructData(cityRCA, key);
    setNewData(newData);
  };

  const changeChartTypeOption = (key) => {
    setChartType(key);
  };

  const addChart = () => {
    setCustomCharts([
      {
        chartType,
        data,
      },
      ...customCharts,
    ]);
  };

  return (
    <React.Fragment>
      <div className="header-component">
        <Filters options={options} changeOption={changeOption} />
        <Filters
          options={chartTypeOptions}
          changeOption={changeChartTypeOption}
        />
        <div className="filter-component">
          <button className="add-button" onClick={addChart}>
          Add
          </button>
        </div>
        
      </div>

      <div className="charts-container">
        {customCharts.map((cChart, i) => {
          const Container = getContainer(cChart.chartType);
          return <Container key={i} dataSource={cChart.data}></Container>;
        })}
        <DoughnutChartContainer
          helpText="Number of votes per city"
          dataSource={constructData(cityRCA, "Total Votes")}
          header="Votes per city"
        ></DoughnutChartContainer>
        <BarChartContainer
          helpText="Rating based on Total Overall %"
          dataSource={constructData(cityRCA, "TOTAL OVERALL %")}
          header="Rating: Total Overall %"
        ></BarChartContainer>
        <BarChartContainer
          helpText="Rating based on Total Venue Avg %"
          dataSource={constructData(cityRCA, "Total Venue Avg %")}
          header="Rating: Total Venue Avg %"
        ></BarChartContainer>
        <BarChartContainer
          helpText="Rating based on Total Feedback %"
          dataSource={constructData(cityRCA, "TOTAL TNS %")}
          header="Rating: Total Feedback %"
        ></BarChartContainer>
      </div>
    </React.Fragment>
  );
}

export default LandingPage;
