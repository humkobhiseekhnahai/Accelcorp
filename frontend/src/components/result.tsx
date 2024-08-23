import { useEffect, useState } from 'react';
import Gemini from '../utils/lib/gemini';
import { RadicalGraph } from './radicalGraph';
import { Loading } from './loading';
import { useRecoilValue } from 'recoil';
import { cropNameAtom,locationAtom,soilTypeAtom } from '../store/atoms/atom';

export const Result = () => {
    const cropName = useRecoilValue(cropNameAtom);
    const location = useRecoilValue(locationAtom);
    const soilType = useRecoilValue(soilTypeAtom);
    const crop = useRecoilValue(cropNameAtom)


    type CropData = {
        avgTemp: string;
        avgHumidity: string;
        avgRainfall: string;
        soilSuitable: boolean;
        variety: string;
        marketPrice: string;
        success: string;
        profit: string;
    };

    const [data, setData] = useState<CropData>({
        avgTemp: '',
        avgHumidity: '',
        avgRainfall: '',
        soilSuitable: false,
        variety: '',
        marketPrice: '',
        success: '',
        profit: ''
    });
    const [loading, setLoading] = useState<boolean>(true);

    const fetchData = async (prompt: string) => {
        setLoading(true);
        try {
            const result = await Gemini(prompt);
            // console.log(result);
            console.log(location)

            if (result) {
                try {
                    // const parsedResult: CropData = JSON.parse(result);
                    setData(prevData => ({ ...prevData, result }));
                } catch (jsonError) {
                    console.error("Failed to parse JSON, treating result as plain text:", jsonError);
                    setData(prevData => ({ ...prevData, result }));
                }
            } else {
                console.error("Received undefined or empty result string");
            }
        } catch (error) {
            console.error("Failed to fetch or parse data:", error);
        } finally {
            setLoading(false);
        }
    };

    if(location!=""){
        useEffect(() => {
            const prompts = [
                `location : ${location}, crop: ${cropName}, soil: ${soilType}, provide avg weather in °C combined for the months crop is grown, follow format => {\"avgTemp\":<value with unit °C in string>} as string`,
                `location : ${location}, crop: ${cropName}, soil: ${soilType}, provide avg humidity in [g/m^3] combined for the months crop is grown, follow format => {\"avgHumidity\":<value with unit [g/m^3] in string>} as string`,
                `location : ${location}, crop: ${cropName}, soil: ${soilType}, provide avg rainfall in mm combined for the months crop is grown, follow format => {\"avgRainfall\": <value with unit mm in string>} as string`,
                `location : ${location}, crop: ${cropName}, soil: ${soilType}, check if the crop will grow in the given soil, follow format => {\"soilSuitable\":<value in boolean>} as string`,
                `location : ${location}, crop: ${cropName}, soil: ${soilType}, provide the best variety of the crop that will grow in the given conditions, follow format => {\"variety\":<enter value in string max variety is 2 minimum is 1>} as string`,
                `location : ${location}, crop: ${cropName}, soil: ${soilType}, provide the market price for the crop in that particular location, follow format => {\"marketPrice\":<enter value in string in INR>} as string`,
                `location : ${location}, crop: ${cropName}, soil: ${soilType}, provide the probability of crop successfully growing in that particular location and is healthy, follow format => {\"success\":<enter percentage without unit in string>} as string`,
                `location : ${location}, crop: ${cropName}, soil: ${soilType}, provide the percentage of crop producing estimated profit in that particular location after proper yield, follow format => {\"profit\":<enter percentage without unit in string>} as string`,
            ];
    
            // Fetch data for each prompt
            prompts.forEach((command) => {
                fetchData(command);
            });
        }, [location, cropName, soilType]);
    }
   

    if (loading) {
        return <Loading />;
    }

    if (!data || Object.keys(data).length === 0) {
        return <div>No data available</div>;
    }

    console.log("Fetched Data:", data);
    console.log("cropName",{crop: crop ? crop:"Nil"})

    return (
        <div className='w-full h-1/2 flex justify-center items-center my-5 rounded-md shadow-3xl'>
            <div className='w-11/12 h-full flex justify-center items-center my-1'>
                <div className='bg-neutral-700 h-full w-full'>
                    <h1 className='font-sm text-xl text-white underline underline-offset-4 m-4'>REPORT</h1>
                    <div className='w-full h-5/6 flex justify-center items-center'>
                        <div className='flex flex-col h-full ml-20 w-1/2 text-gray-100 font-sm overflow-scroll'>
                            <div className='flex text-white items-center m-4'>
                                <p className='font-bold m-1 text-white'>Crop :</p> {cropName.toUpperCase()}
                            </div>
                            <div className='flex text-white items-center m-4'>
                                <p className='font-bold m-1'>Location :</p> {location.toUpperCase()}
                            </div>
                            <div className='flex text-white items-center m-4'>
                                <p className='font-bold m-1'>Soil :</p> {soilType.toUpperCase()}
                            </div>
                            <div className='flex text-white items-center m-4'>
                                <p className='font-bold m-1'>Soil Suitable:</p> {data.soilSuitable ? "YES" : "NO"}
                            </div>
                            <div className='flex text-white items-center m-4'>
                                <p className='font-bold m-1'>Avg Temperature :</p> {data.avgTemp.toUpperCase()}
                            </div>
                            <div className='flex text-white items-center m-4'>
                                <p className='font-bold m-1'>Avg Humidity :</p> {data.avgHumidity.toUpperCase()}
                            </div>
                            <div className='flex text-white items-center m-4'>
                                <p className='font-bold m-1'>Avg Rainfall :</p> {data.avgRainfall.toUpperCase()}
                            </div>
                            <div className='flex text-white items-center m-4'>
                                <p className='font-bold m-1'>Market Price :</p> {data.marketPrice.toUpperCase()}
                            </div>
                            <div className='flex text-white items-center m-4'>
                                <p className='font-bold m-1'>Variety :</p> <p>{data.variety.toUpperCase()}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-1/2 h-full bg-neutral-800 flex justify-center items-center'>
                    <RadicalGraph profit={Number(data.profit)} success={Number(data.success)} />
                </div>
            </div>
        </div>
        
    );
};
