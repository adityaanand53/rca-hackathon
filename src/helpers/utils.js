import { CITIES, COLORS } from "../constants/constants";
import * as options from "../constants/options";
import BarChartContainer from "../components/BarChart";
import DoughnutChartContainer from "../components/DoughnutChart";
import cityRCA from "./../constants/citydata.json";

export function loadOptions(entity) {
  let result;
  switch (entity) {
  case CITIES:
    result = options[CITIES];
    break;
  default:
    result = options[CITIES];
  }
  return result;
}

export function constructData(arr, key, label) {
  return {
    labels: arr.map((c) => label ? c[label] : c[Object.keys(c)[0]]),
    datasets: [
      {
        label: key,
        data: arr.map((c) => c[key]),
        barThickness: 4,
        backgroundColor: COLORS.slice(0, arr.length),
        hoverOffset: 4,
      },
    ],
  };
}

export function getRCAData(entity){
  let result;
  switch (entity) {
  case CITIES:
    result = cityRCA;
    break;
  default: 
    result = cityRCA;
    return result;
  }
}

const charts = {
  DoughnutChartContainer: DoughnutChartContainer,
  BarChartContainer: BarChartContainer,
};
export function getContainer(chartType) {
  return charts[chartType];
}
