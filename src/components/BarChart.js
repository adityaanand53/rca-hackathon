import React from "react";
import PropTypes from "prop-types";

import { Bar } from "react-chartjs-2";
import styles from "./../styles/Chart.module.scss";

function BarChartContainer(props) {
  return (
    <div className={styles.canvasContainer}>
      <div className={styles.headerContainer}>
        <h3>{props.header}</h3>
        <div className={styles.infoContainer}>
          <img
            className={styles.infoIcon}
            src="https://cdn.dam.gettyimages.com/OF2XQA42/as/qcc4cg-4rd4qg-1ndwjv/information_circle.svg"
            alt="info"
          ></img>
          <a href="#" className={styles.tip}>
            <span>{props.helpText}</span>
          </a>
        </div>
      </div>
      <div>
        <Bar
          data={props.dataSource}
          options={{
            plugins: {
              legend: {
                display: true,
                position: "bottom",
              },
            },
          }}
        />
      </div>
    </div>
  );
}

BarChartContainer.propTypes = {
  header: PropTypes.string,
  helpText: PropTypes.string,
  dataSource: PropTypes.array,
};

export default BarChartContainer;
