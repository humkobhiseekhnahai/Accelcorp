import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { BarData } from "../assets/bardata";

ChartJs.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const BarGraph = () => {

  const options = {
  };

  return (
    <div className="w-full h-full flex justify-center items-center bg-gray-100">
      <Bar options={options} data={BarData} />
    </div>
  );
};
