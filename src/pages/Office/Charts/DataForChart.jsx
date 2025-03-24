import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import styles from "./Charts.module.scss";


ChartJS.register(ArcElement, Tooltip, Legend);

const DataForChart = ({ data }) => {
  
  const labels = Object.keys(data); 
  const chartData = Object.values(data); 

  const backgroundColor = [
    "#36A2EB",
    "#FFCE56",
    "#FF6384",
    "#4BC0C0",
    "#FF9F40",
    "#FFB6C1",
    "#8A2BE2",
    "#302010",
    "#F90B2E",
    "#380468",
    "#029AFF",
    "#6D5D32",
    "#E10736",
    "#30AE69",
    "#E912A5",
    "#62F773",
  ]; 

  const chartOptions = {
    labels,
    datasets: [
      {
        data: chartData,
        backgroundColor: backgroundColor.slice(0, data.length),
        hoverBackgroundColor: backgroundColor.slice(0, data.length),
      },
    ],
  };

  return (
    <div className={styles.doughnut}>
      <Doughnut  data={chartOptions} />
    </div>
  );
};

export default DataForChart;
