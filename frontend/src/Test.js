import React from "react";
import Chart from "chart.js/auto";
import { Pie,Bar,Line } from "react-chartjs-2";
const labels = ["January", "February", "March", "April", "May", "June"];
const data = {
  labels: labels,
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(0,0,255)",
      data: [0, 10, 5, 2, 20, 30, 45],
    },
  ],
};

function Test(){
    return (
        <div className="bg-slate-300">
            <div className="w-84 flex">
                <Pie data={data} />
                <Bar data={data} />
                <Line data={data} />
            </div>
        </div>
      );
}

export default Test