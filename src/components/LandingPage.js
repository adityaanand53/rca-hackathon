import { React, useState } from "react";
import cityRCA from "./../constants/citydata.json";
import BarChartContainer from "./BarChart";
import Filters from "./Filters";
import { LoadOptions, constructData } from "./../helpers/utils";
const options = LoadOptions("city");

function LandingPage() {
  const [data, setNewData] = useState(constructData(cityRCA, "Total Votes"));
  const changeOption = (key) => {
    const newData = constructData(cityRCA, key);
    setNewData(newData);
  };

  return (
    <div>
      <Filters options={options} changeOption={changeOption} />
      <BarChartContainer dataSource={data}></BarChartContainer>
    </div>
  );
}

export default LandingPage;
