import React, { ChangeEvent } from 'react';

enum Regions {
    AllStates = "All States",
    UttarPradesh = "Uttar Pradesh",
    MadhyaPradesh = "Madhya Pradesh",
    HimachalPradesh = "Himachal Pradesh",
    Bihar = "Bihar",
    WestBengal = "West Bengal"
}

interface MySelectProps {
    selectedRegion: keyof typeof Regions | ""; // Use keyof typeof Regions for specific string keys
    setSelectedRegion: React.Dispatch<React.SetStateAction<keyof typeof Regions | "">>;
    Regions: typeof Regions;
}

const MySelect: React.FC<MySelectProps> = ({ selectedRegion, setSelectedRegion, Regions }) => {
    
    const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value as keyof typeof Regions;
        setSelectedRegion(value);
    };

    return (
        <div className='w-full p-5'>
            <div className='w-2/6 flex items-center px-2'>
                <select 
                    className='bg-neutral-900/10 shadow-xl focus:ring-0 rounded-md p-2'
                    onChange={handleOptionChange} 
                    value={selectedRegion}
                >
                    <option value="">Please select a region</option>
                    {Object.values(Regions).map((region, index) => (
                        <option key={index} value={region}>
                            {region}
                        </option>
                    ))}
                </select>
            </div>
            <div className='flex justify-between items-center w-full p-2 mr-2'>
                <p>Selected Region: {selectedRegion || Regions.AllStates}</p>
                <h1 className='w-6/12 pb-10 pr-10 mr-20 text-sm font-thin'>
                    **Historical yield data of crops (in metric tons)**
                </h1>
            </div>
        </div>
    );
};

export default MySelect;
