import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
const Graph = () => {
  const [catRevenue, setCatRevenue] = useState({});
  useEffect(async () => {
    const data = await fetch(
      process.env.REACT_APP_API_URL + "/analytics/getRevenueAllCat"
    );
    const res = await data.json();
    if (data.status === 200) {
      setCatRevenue(res.catRevenue);
    }
  }, []);

  const [graphData, setGraphData] = useState({});
  useEffect(() => {
    const data = {
      labels: [...Object.keys(catRevenue)],
      datasets: [
        {
          label: "Total Revenue",
          data: [...Object.values(catRevenue)],
          backgroundColor: "rgb(118, 247, 182)",
          barThickness: "35",
          borderRadius: "25",
        },
      ],
    };
    setGraphData(data);
  }, [catRevenue]);

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div className="barchart">
      <div className="barchart-heading">Revenue generated each category</div>
      <Bar data={graphData} options={options} />
    </div>
  );
};

export default Graph;
