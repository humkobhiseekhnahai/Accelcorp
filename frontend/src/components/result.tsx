import { useEffect, useState } from 'react';
import Gemini from '../utils/lib/gemini';
import { Loading } from './loading';
import axios from "axios";
import ChartRadialStacked from './ui/radicalStackedGraph';
import { AppBar } from './appbar';
import { Footer } from './footer';
import { motion } from 'framer-motion';
import { ArrowRight, Droplet, Thermometer, Wind } from 'lucide-react';

interface Details {
    cropName: string;
    location: string;
    soilType: string;
}

interface Data {
    minTemp: string;
    minHumidity: string;
    minRainfall: string;
    maxTemp: string;
    maxHumidity: string;
    maxRainfall: string;
    cropRainfall: string;
    cropHumidity: string;
    cropTemperature: string;
    soilSuitable: string;
    variety: string;
    marketPrice: string;
    profit: string;
    success: string;
    suggestions: string
}

export const Result = () => {
    const [details, setDetails] = useState<Details>({
        cropName: '',
        location: '',
        soilType: '',
    });
    const [data, setData] = useState<Data>({
        minTemp: '',
        minHumidity: '',
        minRainfall: '',
        maxTemp: '',
        maxHumidity: '',
        maxRainfall: '',
        cropRainfall: "",
        cropHumidity: "",
        cropTemperature: "",
        soilSuitable: '',
        variety: '',
        marketPrice: '',
        profit: '',
        success: '',
        suggestions: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await axios.get("http://localhost:3000/get");
                setDetails({
                    cropName: response.data.cropName,
                    location: response.data.location,
                    soilType: response.data.soilType,
                });
            } catch (error) {
                console.error("Error fetching details:", error);
            }
        };

        fetchDetails();
    }, []);

    useEffect(() => {
        const fetchData = async (prompt: string) => {
            setLoading(true);
            try {
                const result = await Gemini(prompt);
                if (result) {
                    // Log the result for debugging
                    console.log("Raw result:", result);
        
                    // Clean up the result if it contains extra characters like triple backticks
                    const cleanedResult = result.replace(/```json|```/g, '').trim();
        
                    try {
                        const parsedResult = JSON.parse(cleanedResult);
                        setData(prevData => ({ ...prevData, ...parsedResult }));
                    } catch (parseError) {
                        console.error("Failed to parse data:", cleanedResult, parseError);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setLoading(false);
            }
        };
        
        if (details.location && details.cropName && details.soilType) {
            const prompts = [
                `location : ${details.location}, provide minimum weather in °C based on previous years, follow format => {"minTemp":"value with unit °C in string"}`,
                `location : ${details.location}, provide minimum humidity for the provided location based on previous years, follow format => {"minHumidity":"value without unit in string"}`,
                `location : ${details.location}, provide minimum rainfall in mm for the provided location based on previous years , follow format => {"minRainfall":"value without unit in string"}`,
                `location : ${details.location}, provide maximun weather in °C based on previous years, follow format => {"maxTemp":"value with unit °C in string"}`,
                `location : ${details.location}, provide maximun humidity for the provided location based on previous years, follow format => {"maxHumidity":"value without unit in string"}`,
                `location : ${details.location}, provide maximun rainfall for the provided location based on previous years, follow format => {"maxRainfall":"value without unit in string"}`,
                `location : ${details.location}, provide major crops that grow in the provided location based on previous years max three crop names, follow format => {"suggestions":crop1,crop2,crop3 in string"}`,
                `crop: ${details.cropName}, provide the avg rainfall in mm that is required for the given crop to grow, follow format => {"cropRainfall":"value without unit in string"}`,
                `crop: ${details.cropName}, provide the avg humidity in gm/m^3 that is required for the given crop to grow, follow format => {"cropRainfall":"value without unit in string"}`,
                `crop: ${details.cropName}, provide the avg temperature in °C that is required for the given crop to grow, follow format => {"cropRainfall":"value without unit in string"}`,
                `location : ${details.location}, crop: ${details.cropName}, soil: ${details.soilType}, check if the crop will grow in the given soil, follow format => {"soilSuitable":"boolean as string"}`,
                `location : ${details.location}, crop: ${details.cropName}, soil: ${details.soilType}, provide the best variety of the crop that will grow in the given conditions, follow format => {"variety":"value in string"}`,
                `location : ${details.location}, crop: ${details.cropName}, soil: ${details.soilType}, provide the market price for the crop in that particular location, follow format => {"marketPrice":"value in string in INR"}`,
                `location : ${details.location}, crop: ${details.cropName}, soil: ${details.soilType}, provide the percentage of crop producing estimated profit in that particular location after proper yield, follow format => {"profit":"percentage with unit in string"}`,
                `location : ${details.location}, crop: ${details.cropName}, soil: ${details.soilType}, please answer me if the crop can successfully grow in given location, follow format => {"success":"either Highly unlikely or Unlikely or Likely or Highly likely in string"}`,
            ];

            prompts.forEach((command) => (fetchData(command)));
        }
    }, [details]);

    if (loading) {
        return <Loading />;
    }

    if (!data || Object.keys(data).length === 0) {
        return <div>No data available</div>;
    }

    const prompt = () => {
        if (data.success === "Highly unlikely") {
            return 0;
        } else if (data.success === "Unlikely") {
            return 25;
        } else if (data.success === "Likely") {
            return 75;
        } else if (data.success === "Highly likely") {
            return 95;
        }else{
            if(data.soilSuitable == "Yes" || "yes" || "YES"){
                return 50;
            }else{
                return 15;
            }
        }
        return 0; // Default value in case success is not one of the expected values
    };

    return (
        <div className='min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-green-100'>
            <AppBar />
            <div className="h-16 w-full">
                {/* empty space */}
            </div>
            <main className='flex-grow container mx-auto px-4 py-8'>
                <motion.h1
                    className='text-4xl font-bold text-center text-green-800 mb-8'
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Crop Analysis Results
                </motion.h1>
                <div className='grid md:grid-cols-2 gap-8'>
                    <motion.div
                        className='bg-white rounded-lg shadow-lg p-6'
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h2 className='text-2xl font-semibold mb-4 text-green-700'>Location Details</h2>
                        <div className='space-y-2'>
                            <p><span className='font-medium'>Location:</span> {details.location ? details.location.toUpperCase() : "N/A"}</p>
                            <p><span className='font-medium'>Crop:</span> {details.cropName ? details.cropName.toUpperCase() : "N/A"}</p>
                            <p><span className='font-medium'>Soil Type:</span> {details.soilType ? details.soilType.toUpperCase() : "N/A"}</p>
                        </div>
                        <div className='mt-6 space-y-4'>
                            <div className='flex items-center'>
                                <Thermometer className='text-red-500 mr-2' />
                                <p><span className='font-medium'>Min Temperature:</span> {data.minTemp ? data.minTemp.toUpperCase() : "N/A"}</p>
                            </div>
                            <div className='flex items-center'>
                                <Droplet className='text-blue-500 mr-2' />
                                <p><span className='font-medium'>Min Humidity:</span> {data.minHumidity ? data.minHumidity.toUpperCase() : "N/A"}</p>
                            </div>
                            <div className='flex items-center'>
                                <Wind className='text-gray-500 mr-2' />
                                <p><span className='font-medium'>Min Rainfall:</span> {Number(data.minRainfall) < Number(data.maxRainfall) ? data.minRainfall.toUpperCase() : data.maxRainfall.toUpperCase()}</p>
                            </div>
                            <br />
                            <div className='flex items-center'>
                                <Thermometer className='text-red-500 mr-2' />
                                <p><span className='font-medium'>Max Temperature:</span> {data.maxTemp ? data.maxTemp.toUpperCase() : "N/A"}</p>
                            </div>
                            <div className='flex items-center'>
                                <Droplet className='text-blue-500 mr-2' />
                                <p><span className='font-medium'>Max Humidity:</span> {data.maxHumidity ? data.maxHumidity.toUpperCase() : "N/A"}</p>
                            </div>
                            <div className='flex items-center'>
                                <Wind className='text-gray-500 mr-2' />
                                <p><span className='font-medium'>Max Rainfall:</span> {Number(data.maxRainfall) > Number(data.minRainfall) ? data.maxRainfall.toUpperCase() : data.minRainfall.toUpperCase()}</p>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        className='bg-white rounded-lg shadow-lg p-6'
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <h2 className='text-2xl font-semibold mb-4 text-green-700'>Crop Analysis</h2>
                        <div className='space-y-2'>
                            <p><span className='font-medium'>Variety:</span> {data.variety ? data.variety.toUpperCase() : "N/A"}</p>
                            <p><span className='font-medium'>Market Price:</span> {data.marketPrice ? data.marketPrice.toUpperCase() : "N/A"}</p>
                            {/* <p><span className='font-medium'>Soil Suitability:</span> {data.soilSuitable.toUpperCase()}</p> */}
                            {/* <p><span className='font-medium'>Temperature required:</span> {data.cropTemperature ? data.cropTemperature.toUpperCase() : "N/A"}</p>
                            <p><span className='font-medium'>Humidity required:</span> {data.cropHumidity ? data.cropHumidity.toUpperCase() : "N/A"}</p>
                            <p><span className='font-medium'>Rainfall required:</span> {data.cropRainfall ? data.cropRainfall.toUpperCase() : "N/A"}</p> */}
                        </div>
                        <div className='mt-6'>
                            <h3 className='text-xl font-semibold mb-2 text-green-600'>Success Rate</h3>
                            <div className='w-full h-50'>
                                <ChartRadialStacked successRate={prompt()} suggest={data.suggestions} />
                            </div>
                        </div>
                    </motion.div>
                </div>
                <motion.div
                    className='mt-8 text-right'
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <a
                        href="/practices"
                        className="inline-flex items-center text-green-700 hover:text-green-800 transition-colors duration-200"
                    >
                        <span className="text-lg font-medium">Farming Practices</span>
                        <ArrowRight className="ml-2" />
                    </a>
                </motion.div>
            </main>
            <Footer />
        </div>
    );
};
