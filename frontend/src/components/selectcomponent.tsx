import React, { ChangeEvent } from 'react';

// Define the enum for regions
enum Regions {
    AllStates = "All States",
    UttarPradesh = "Uttar Pradesh",
    MadhyaPradesh = "Madhya Pradesh",
    HimachalPradesh = "Himachal Pradesh",
    Bihar = "Bihar",
    WestBengal = "West Bengal"
}

// Define props interface
interface MySelectProps {
    selectedRegion: keyof typeof Regions | "";
    setSelectedRegion: React.Dispatch<React.SetStateAction<keyof typeof Regions | "">>;
    Regions: typeof Regions;
}

// Component definition
const MySelect: React.FC<MySelectProps> = ({ selectedRegion, setSelectedRegion, Regions }) => {

    // Handle select option change
    const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value as keyof typeof Regions;
        setSelectedRegion(value);
    };

    return (
        <div className='w-full py-5 bg-gray-100'>
            <h1 className='w-full text-sm font-light flex justify-center items-center  text-gray-500'>
                    **Historical yield data of crops (in metric tons)**
            </h1>
            <div className='w-1/6 ml-5'>
                <select 
                    className='w-full p-2 flex items-center border-2 border-slate-500 justify-center font-sm bg-cyan-100 shadow-lg focus:ring-0 focus-visible:0 focus:outline-none rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-xl'
                    onChange={handleOptionChange} 
                    value={selectedRegion}
                >
                    <option value="" disabled>Select a region</option>
                    {Object.values(Regions).map((region) => (
                        <option key={region} value={region}>
                            {region}
                        </option>
                    ))}
                </select>
            </div>
            <div className='w-full flex items-center pl-6 mt-4'>
                <p className='text-lg font-medium text-gray-700'>Selected Region: </p><p className='font-sm font-bold p-2'>{selectedRegion || Regions.AllStates}</p>
                
            </div>
        </div>
    );
};

export default MySelect;
