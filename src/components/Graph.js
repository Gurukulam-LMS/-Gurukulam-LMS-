import React from "react";
import { Bar } from "react-chartjs-2";
const Graph = () => {
  return (
    <div className="barchart">
      <h2>Revenue generated each category</h2>
      <Bar
        data={{
          labels: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          datasets: [
            {
              label: null,
              data: [12, 19, 3, 5, 2, 3, 9],
              backgroundColor: "rgb(118, 247, 182)",
              barThickness: "35",
              borderRadius: "25",
            },
            {
              label: null,
              data: [15, 34, 33, 52, 24, 53, 45],
              backgroundColor: "rgb(236, 234, 234)",
              barThickness: "35",
              borderRadius: "15",
            },
          ],
        }}
        options={{
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
            },
          },
          plugins: {
            tooltip: {
              interaction: {
                mode: "point",
              },
              callbacks: {
                label: function (context) {
                  return `Triggering for dataset ${context.datasetIndex}`;
                },
              },
            },
          },
        }}
      />
    </div>
  );
};

export default Graph;
