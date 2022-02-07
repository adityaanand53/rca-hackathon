const { CITIES } = require("./../constants/constants");
const options = require("./../constants/options");

module.exports = {
  LoadOptions(entity) {
    let result;
    switch (entity) {
    case CITIES:
      result = options[CITIES];
      break;
    default:
      result = options[CITIES];
    }
    return result;
  },
  constructData(arr, key) {
    return {
      labels: arr.map((c) => c.city),
      datasets: [
        {
          label: key,
          data: arr.map((c) => c[key]),
          barThickness: 4,
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 4,
        },
      ],
    };
  },
};
