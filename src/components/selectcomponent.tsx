import React, { useState, ChangeEvent } from 'react';

enum Regions {
    AllStates = "All States",
    UttarPradesh = "Uttar Pradesh",
    MadhyaPradesh = "Madhya Pradesh",
    HimachalPradesh = "Himachal Pradesh",
    Bihar = "Bihar",
    WestBengal = "West Bengal"
}

const MySelect: React.FC = () => {
    const [selectedRegion, setSelectedRegion] = useState<Regions | "">("");

    const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value as Regions;
        setSelectedRegion(value);
    };

    return (
        <div className='w-full p-5 '>
            <div className='w-2/6 flex items-center p-2'>
                <select 
                className='bg-lime-200'
                onChange={handleOptionChange} 
                value={selectedRegion}>
                    <option value="">Please select a region</option>
                    {Object.values(Regions).map((region, index) => (
                        <option key={index} value={region}>
                            {region}
                        </option>
                    ))}
                </select>
            </div>
            <div className='flex items-center w-2/6 p-2'>
                <p>Selected Region: {selectedRegion || Regions.AllStates}</p>
                <h1>
                    
                </h1>
            </div>
        </div>
    );
};

export default MySelect;
