import React, { useState } from "react";
import { useParams } from "react-router-dom";
import SideNav from "./SideNav";
import BarChartContainer from "./BarChart";
import DoughnutChartContainer from "./DoughnutChart";
import Filters from "./Filters";
import { loadOptions, constructData, getContainer, getRCAData } from "../helpers/utils";
import { chartTypeOptions, votesOptions } from "../constants/options";

function LandingPage() {
  let params = useParams();
  const options = loadOptions(params.entity);
  const [RCAData, setRCAData] = useState(getRCAData(params.entity));
  const [data, setNewData] = useState(constructData(RCAData, "Total Votes"));
  const [chartType, setChartType] = useState("BarChartContainer");
  const [customCharts, setCustomCharts] = useState([]);

  const changeOption = (key) => {
    const newData = constructData(RCAData, key);
    setNewData(newData);
  };

  const changeChartTypeOption = (key) => {
    setChartType(key);
  };

  const changeVotesOption = (val) => {
    const isPlusInVal = val.charAt(val.length - 1) === "+";
    const filteredVal = val.charAt(val.length - 1) === "+" ? +(val.substring(0, val.length - 1)) : +val;
    let filteredCityRCA = RCAData.filter((item) => {
      return isPlusInVal ? item["Total Votes"] > filteredVal : item["Total Votes"] < filteredVal;
    });
    setNewData(constructData(filteredCityRCA, "Total Votes"));
    setRCAData(filteredCityRCA);
  }

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
      <SideNav />
      <div className="landing-container">
        <div className="header-component">
          <div className="left-header">
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
          <div className="right-header">
            <label> Filter by No. of Votes: </label>
            <Filters options={votesOptions} changeOption={changeVotesOption} defaultValue={'Greater than 100'} />
          </div>
        </div>

        <div className="charts-container">
          {customCharts.map((cChart, i) => {
            const Container = getContainer(cChart.chartType);
            return <Container key={i} dataSource={cChart.data}></Container>;
          })}
          <DoughnutChartContainer
            helpText="Number of votes per city"
            dataSource={constructData(RCAData, "Total Votes")}
            header="Votes per city"
          ></DoughnutChartContainer>
          <BarChartContainer
            helpText="Rating based on Total Overall %"
            dataSource={constructData(RCAData, "TOTAL OVERALL %")}
            header="Rating: Total Overall %"
          ></BarChartContainer>
          <BarChartContainer
            helpText="Rating based on Total Venue Avg %"
            dataSource={constructData(RCAData, "Total Venue Avg %")}
            header="Rating: Total Venue Avg %"
          ></BarChartContainer>
          <BarChartContainer
            helpText="Rating based on Total Feedback %"
            dataSource={constructData(RCAData, "TOTAL TNS %")}
            header="Rating: Total Feedback %"
          ></BarChartContainer>
        </div>
      </div>
    </React.Fragment>
  );
}

export default LandingPage;
