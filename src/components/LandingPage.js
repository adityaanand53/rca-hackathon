/* eslint-disable indent */
import React, { useEffect, useState } from "react";
import { JsonToExcel } from "react-json-excel";
import { useParams } from "react-router-dom";

import cityRCA from "./../constants/citydata.json";
import SideNav from "./SideNav";
import BarChartContainer from "./BarChart";
import DoughnutChartContainer from "./DoughnutChart";
import Filters from "./Filters";
import {
  loadOptions,
  constructData,
  getContainer,
  getRCAData,
} from "../helpers/utils";
import { chartTypeOptions, votesOptions, city } from "../constants/options";

const columns = { city: "City", state: "State", country: "Country" };
city.forEach((c) => {
  columns[c.value] = c.label;
});

function LandingPage() {
  let params = useParams();
  const options = loadOptions(params.entity);
  const [RCAData, setRCAData] = useState(getRCAData(params.entity));
  const [data, setNewData] = useState(constructData(RCAData, "Total Votes"));
  const [chartType, setChartType] = useState("BarChartContainer");
  const [chartHeaderText, setChartHeaderText] = useState("");
  const [customCharts, setCustomCharts] = useState([]);
  const [highestVotes, setHighestVotes] = useState(cityRCA[0]["Total Votes"]);
  const [highestVotesCity, setHighestVotesCity] = useState(cityRCA[0]["city"]);
  const [highestOverall, setHighestOverall] = useState(
    cityRCA[0]["TOTAL OVERALL %"]
  );
  const [highestOverallCity, setHighestOverallCity] = useState(
    cityRCA[0]["city"]
  );
  const [highestVenueAvg, setHighestVenueAvg] = useState(
    cityRCA[0]["Total Venue Avg %"]
  );
  const [highestVenueAvgCity, setHighestVenueAvgCity] = useState(
    cityRCA[0]["city"]
  );
  const [highestFeedbackAvg, setHighestFeedbackAvg] = useState(
    cityRCA[0]["Total TNS %"]
  );
  const [highestFeedbackAvgCity, setHighestFeedbackAvgCity] = useState(
    cityRCA[0]["city"]
  );

  useEffect(() => {
    changeVotesOption("100+");
  }, []);

  const getHighestVotes = (filteredData) => {
    let maxVotes = filteredData[0]["Total Votes"];
    let maxVotesCity = filteredData[0]["city"];
    for (let i = 1; i < filteredData.length; i++) {
      if (filteredData[i]["Total Votes"] > maxVotes) {
        maxVotes = filteredData[i]["Total Votes"];
        maxVotesCity = filteredData[i]["city"];
      }
    }
    setHighestVotes(maxVotes);
    setHighestVotesCity(maxVotesCity);
  };

  const getHighestOverall = (filteredData) => {
    let maxOverall = filteredData[0]["TOTAL OVERALL %"];
    let maxOverallCity = filteredData[0]["city"];
    for (let i = 1; i < filteredData.length; i++) {
      if (filteredData[i]["TOTAL OVERALL %"] > maxOverall) {
        maxOverall = filteredData[i]["TOTAL OVERALL %"];
        maxOverallCity = filteredData[i]["city"];
      }
    }
    setHighestOverall(maxOverall);
    setHighestOverallCity(maxOverallCity);
  };

  const getHighestVenueAvg = (filteredData) => {
    let maxVenueAvg = filteredData[0]["Total Venue Avg %"];
    let maxVenueAvgCity = filteredData[0]["city"];
    for (let i = 1; i < filteredData.length; i++) {
      if (filteredData[i]["Total Venue Avg %"] > maxVenueAvg) {
        maxVenueAvg = filteredData[i]["Total Venue Avg %"];
        maxVenueAvgCity = filteredData[i]["city"];
      }
    }
    setHighestVenueAvg(maxVenueAvg);
    setHighestVenueAvgCity(maxVenueAvgCity);
  };

  const getHighestFeedbackAvg = (filteredData) => {
    let maxVenueAvg = filteredData[0]["TOTAL TNS %"];
    let maxVenueAvgCity = filteredData[0]["city"];
    for (let i = 1; i < filteredData.length; i++) {
      if (filteredData[i]["TOTAL TNS %"] > maxVenueAvg) {
        maxVenueAvg = filteredData[i]["TOTAL TNS %"];
        maxVenueAvgCity = filteredData[i]["city"];
      }
    }
    setHighestFeedbackAvg(maxVenueAvg);
    setHighestFeedbackAvgCity(maxVenueAvgCity);
  };

  const changeOption = (key) => {
    const newData = constructData(RCAData, key);
    setNewData(newData);
    setChartHeaderText(key);
  };

  const changeChartTypeOption = (key) => {
    setChartType(key);
  };

  const changeVotesOption = (val) => {
    const isPlusInVal = val.charAt(val.length - 1) === "+";
    const filteredVal =
      val.charAt(val.length - 1) === "+"
        ? +val.substring(0, val.length - 1)
        : +val;
    const rcaDataToFilter = getRCAData(params.entity);
    let filteredCityRCA = filteredVal
      ? rcaDataToFilter.filter((item) => {
          return isPlusInVal
            ? item["Total Votes"] > filteredVal
            : item["Total Votes"] < filteredVal;
        })
      : rcaDataToFilter;
    // setNewData(constructData(filteredCityRCA, "Total Votes"));

    setRCAData(filteredCityRCA);
    getHighestVotes(filteredCityRCA);
    getHighestOverall(filteredCityRCA);
    getHighestVenueAvg(filteredCityRCA);
    getHighestFeedbackAvg(filteredCityRCA);
    const updatedChart = customCharts.map((chart) => {
      const newRCAData = constructData(filteredCityRCA, chart.chartHeaderText);
      chart.data = newRCAData;
      return chart;
    });
    setCustomCharts(updatedChart);
  };

  const addChart = () => {
    setCustomCharts([
      {
        chartType,
        data,
        chartHeaderText,
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
            <Filters
              options={options}
              changeOption={changeOption}
              placeholder="Select variable"
            />
            <Filters
              options={chartTypeOptions}
              changeOption={changeChartTypeOption}
              placeholder="Select chart type"
            />
            <div className="filter-component">
              <button className="add-button" onClick={addChart}>
                Plot new chart
              </button>
            </div>
          </div>
          <div className="right-header">
            <label> Filter by No. of Votes: </label>
            <Filters
              options={votesOptions}
              changeOption={changeVotesOption}
              defaultValue={{ label: "Greater than 100", value: "100+" }}
            />
            <JsonToExcel
              data={RCAData}
              className="add-button"
              filename="RCA_Export"
              fields={columns}
              text="Export to excel"
            />
          </div>
        </div>
        <div className="content-container">
          <div className="high-votes-content">
            <div className="highest-votes-text">Highest Votes</div>

            <div className="highest-votes">{highestVotes}</div>
            <div className="highest-votes-city">{highestVotesCity}</div>
          </div>

          <div className="high-votes-content">
            <div className="highest-votes-text">Best Overall %</div>
            <div className="highest-votes">{highestOverall}</div>
            <div className="highest-votes-city">{highestOverallCity}</div>
          </div>

          <div className="high-votes-content">
            <div className="highest-votes-text">Best Ratings %</div>
            <div className="highest-votes">{highestVenueAvg}</div>
            <div className="highest-votes-city">{highestVenueAvgCity}</div>
          </div>

          <div className="high-votes-content">
            <div className="highest-votes-text">Best Feedback %</div>
            <div className="highest-votes">{highestFeedbackAvg}</div>
            <div className="highest-votes-city">{highestFeedbackAvgCity}</div>
          </div>
        </div>
        <div className="charts-container">
          {customCharts.map((cChart, i) => {
            const Container = getContainer(cChart.chartType);
            return (
              <Container
                key={i}
                dataSource={cChart.data}
                header={cChart.chartHeaderText}
              ></Container>
            );
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
