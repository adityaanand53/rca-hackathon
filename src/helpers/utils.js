import { CITIES, COLORS } from "./../constants/constants";
import options from "./../constants/options";

export function LoadOptions(entity) {
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

export function constructData(arr, key) {
  return {
    labels: arr.map((c) => c.city),
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
