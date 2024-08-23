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
import { UpBarData } from "../assets/bardata";
import { MpBarData } from "../assets/bardata";
import { HpBarData } from "../assets/bardata";
import { BiBarData } from "../assets/bardata";
import { BaBarData } from "../assets/bardata";
import { Regions } from "../pages/trends"; // Import the Regions enum

ChartJs.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarGraphProps {
  state: keyof typeof Regions | "";
}

export const BarGraph: React.FC<BarGraphProps> = ({ state }) => {
  let data;

  switch (state) {
    case Regions.UttarPradesh as keyof typeof Regions:
      data = UpBarData;
      break;
    case Regions.MadhyaPradesh as keyof typeof Regions:
      data = MpBarData;
      break;
    case Regions.HimachalPradesh as keyof typeof Regions:
      data = HpBarData;
      break;
    case Regions.Bihar as keyof typeof Regions:
      data = BiBarData;
      break;
    case Regions.WestBengal as keyof typeof Regions:
      data = BaBarData;
      break;
    case Regions.AllStates as keyof typeof Regions:
    default:
      data = BarData;
      break;
  }
  

  const options = {
    // Add any specific chart options here
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-5/6 ">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
};
