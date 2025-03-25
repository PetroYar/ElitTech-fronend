import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import styles from './Charts.module.scss'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";


ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const ActivityChart = ({ activityStats }) => {
  const [viewMode, setViewMode] = useState("days"); 

  const getWeekOfYear = (date) => {
    const currentDate = new Date(date);
    const startDate = new Date(currentDate.getFullYear(), 0, 1);
    const days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + 1) / 7); 
  };

  const formatData = (stats) => {
    const labels = [];
    const data = [];

    if (viewMode === "days") {
      
      for (const date in stats) {
        labels.push(date);
        data.push(stats[date]);
      }
    } else if (viewMode === "weeks") {
      
      const weeksStats = {};
      for (const date in stats) {
        const week = getWeekOfYear(date);
        if (!weeksStats[week]) {
          weeksStats[week] = 0;
        }
        weeksStats[week] += stats[date];
      }

      
      for (const week in weeksStats) {
        labels.push(`Тиждень ${week}`);
        data.push(weeksStats[week]);
      }
    } else if (viewMode === "months") {
     
      const monthsStats = {};
      for (const date in stats) {
        const month = new Date(date).getMonth() + 1; 
        if (!monthsStats[month]) {
          monthsStats[month] = 0;
        }
        monthsStats[month] += stats[date];
      }

     
      for (const month in monthsStats) {
        labels.push(`Місяць ${month}`);
        data.push(monthsStats[month]);
      }
    }

    return {
      labels,
      datasets: [
        {
          label: "Активність",
          data,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: true,
        },
      ],
    };
  };

  const chartData = formatData(activityStats);

  return (
    <div style={{width:'100%',maxWidth: '700px'}}>
      <div>
        <label>Вибір періоду:</label>
        <select onChange={(e) => setViewMode(e.target.value)} value={viewMode}>
          <option value="days">Дні</option>
          <option value="weeks">Тижні</option>
          <option value="months">Місяці</option>
        </select>
      </div>

      <Line data={chartData} />
    </div>
  );
};

export default ActivityChart;
