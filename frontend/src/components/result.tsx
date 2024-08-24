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
  avgTemp: string;
  avgHumidity: string;
  avgRainfall: string;
  soilSuitable: string;
  variety: string;
  marketPrice: string;
  success: string;
  profit: string;
}

export const Result = () => {
  const [details, setDetails] = useState<Details>({
    cropName: '',
    location: '',
    soilType: '',
  });
  const [data, setData] = useState<Data>({
    avgTemp: '',
    avgHumidity: '',
    avgRainfall: '',
    soilSuitable: '',
    variety: '',
    marketPrice: '',
    success: '',
    profit: ''
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
          try {
            const parsedResult = JSON.parse(result);
            setData(prevData => ({ ...prevData, ...parsedResult }));
          } catch (parseError) {
            console.error("Failed to parse data:", result, parseError);
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
        `location : ${details.location}, crop: ${details.cropName}, soil: ${details.soilType}, provide avg weather in °C combined for the months crop is grown, follow format => {"avgTemp":"value with unit °C in string"}`,
        `location : ${details.location}, crop: ${details.cropName}, soil: ${details.soilType}, provide avg humidity in [g/m^3] combined for the months crop is grown, follow format => {"avgHumidity":"value with unit [g/m^3] in string"}`,
        `location : ${details.location}, crop: ${details.cropName}, soil: ${details.soilType}, provide avg rainfall in mm combined for the months crop is grown, follow format => {"avgRainfall":"value with unit mm in string"}`,
        `location : ${details.location}, crop: ${details.cropName}, soil: ${details.soilType}, check if the crop will grow in the given soil, follow format => {"soilSuitable":"boolean as string"}`,
        `location : ${details.location}, crop: ${details.cropName}, soil: ${details.soilType}, provide the best variety of the crop that will grow in the given conditions, follow format => {"variety":"value in string"}`,
        `location : ${details.location}, crop: ${details.cropName}, soil: ${details.soilType}, provide the market price for the crop in that particular location, follow format => {"marketPrice":"value in string in INR"}`,
        `location : ${details.location}, crop: ${details.cropName}, soil: ${details.soilType}, provide the probability of crop successfully growing in that particular location and is healthy, follow format => {"success":"percentage without unit in string"}`,
        `location : ${details.location}, crop: ${details.cropName}, soil: ${details.soilType}, provide the percentage of crop producing estimated profit in that particular location after proper yield, follow format => {"profit":"percentage with unit in string"}`,
      ];

      prompts.forEach((command) => fetchData(command));
    }
  }, [details]);

  if (loading) {
    return <Loading />;
  }

  if (!data || Object.keys(data).length === 0) {
    return <div>No data available</div>;
  }

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
                <p><span className='font-medium'>Avg. Temperature:</span> {data.avgTemp ? data.avgTemp.toUpperCase() : "N/A"}</p>
              </div>
              <div className='flex items-center'>
                <Droplet className='text-blue-500 mr-2' />
                <p><span className='font-medium'>Avg. Humidity:</span> {data.avgHumidity ? data.avgHumidity.toUpperCase() : "N/A"}</p>
              </div>
              <div className='flex items-center'>
                <Wind className='text-gray-500 mr-2' />
                <p><span className='font-medium'>Avg. Rainfall:</span> {data.avgRainfall ? data.avgRainfall.toUpperCase() : "N/A"}</p>
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
              <p><span className='font-medium'>Soil Suitability:</span> {data.soilSuitable.toUpperCase()}</p>
              <p><span className='font-medium'>Estimated Profit:</span> {data.profit ? data.profit.toUpperCase() : "N/A"}</p>
            </div>
            <div className='mt-6'>
              <h3 className='text-xl font-semibold mb-2 text-green-600'>Success Rate</h3>
              <div className='w-full h-50'>
                <ChartRadialStacked successRate={Number(data.success)} />
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