import { Input } from "@material-tailwind/react";
import agriPhoto from "../assets/images/AgriPhoto.jpg";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CropInput: React.FC = () => {
    const [cropName, setCropName] = useState("");
    const [location, setLocation] = useState("");
    const [soilType, setSoilType] = useState("");
    const navigate = useNavigate();

    const handleNavigate = async () => {
        try {
            await axios.post("http://localhost:3000/send", {
                cropName: cropName,
                location: location,
                soilType: soilType
            });
            navigate("/report");
        } catch (error) {
            console.error("Failed to send data", error);
        }
    };

    return (
        <div className="w-full h-1/2 flex bg-gray-100 justify-center items-center my-10">
            <div className="w-full h-full bg-gray-100 backdrop-opacity-75 shadow-2xl mx-10 flex my-4">
                <div className="flex flex-col w-1/2 h-full text-black bg-gray-100">
                    <div className="w-full h-full flex flex-col justify-center items-center bg-gray-100">
                        <h1 className="p-4 text-3xl font-medium">Enter Details For Analysis</h1>
                        <br />
                        <div className="w-3/6 flex flex-col items-center">
                            <Input
                                className="w-full p-2 focus:outline-none focus:ring-0 focus:border-gray-200 text-gray-400"
                                variant="static"
                                placeholder="Crop Name"
                                onChange={(e) => setCropName(e.target.value)}
                            />
                            <br />
                            <br />
                            <Input
                                className="w-full p-2 focus:outline-none focus:ring-0 focus:border-gray-200 text-gray-400"
                                variant="static"
                                placeholder="Location"
                                onChange={(e) => setLocation(e.target.value)}
                            />
                            <br />
                            <br />
                            <select
                                className="block w-full py-2.5 pl-2 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-900 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                                onChange={(e) => setSoilType(e.target.value)}
                            >
                                <option value="">Select type of soil</option>
                                <option value="Loamy">Loamy</option>
                                <option value="Silty">Silty</option>
                                <option value="Clayey">Clayey</option>
                                <option value="Sandy">Sandy</option>
                                <option value="Arid">Arid</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end mb-10 mx-10">
                        <svg onClick={handleNavigate} className="w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
                            <path style={{ fill: "#232326" }} d="m17.5 5.999-.707.707 5.293 5.293H1v1h21.086l-5.294 5.295.707.707L24 12.499l-6.5-6.5z" data-name="Right"/>
                        </svg>
                    </div>
                </div>
                <div className="h-full w-1/2">
                    <img className="w-full h-full" src={agriPhoto} alt="Input" />   
                </div>
            </div>
        </div>
    );
};
