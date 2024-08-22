import { useState } from "react";
import { AppBar } from "../components/appbar";
import { BarGraph } from "../components/bargraph";
import MySelect from "../components/selectcomponent";
import { Footer } from "../components/footer";
import DiscussionFormComponent from "@/components/discussionForm";
import marketBlock from "../assets/images/marketBlock.jpg"

export enum Regions {
    AllStates = "All States",
    UttarPradesh = "Uttar Pradesh",
    MadhyaPradesh = "Madhya Pradesh",
    HimachalPradesh = "Himachal Pradesh",
    Bihar = "Bihar",
    WestBengal = "West Bengal"
}

export const Trends = () => {
    const [selectedRegion, setSelectedRegion] = useState<keyof typeof Regions | "">("");

    return (
        <div className="h-dvh w-full">
            <AppBar />
            <div className="h-16 w-full">
                {/* empty space */}
            </div>
            <div 
                className="relative overflow-hidden bg-cover bg-center bg-no-repeat text-center"
                style={{
                    backgroundImage: `url(${marketBlock})`,
                    height: "500px",
                }}
            >
                <div className="absolute inset-0 flex flex-col justify-center items-center p-4 bg-black bg-opacity-50">
                    <h1 className="text-5xl font-bold text-neutral-100">
                        "PLANTING KNOWLEDGE HARVESTING EMPOWERMENT"
                    </h1>
                    <div className="text-xl font-sm text-white mt-10">
                        <p>Welcome to the Market Trends page, your gateway to a wealth of insights that can revolutionize your farming strategy.</p>
                        <p>Stay ahead of the curve by delving into historical data and understanding the dynamic shifts in crop prices.</p>
                    </div>
                </div>
            </div>
            {/* bargraph */}
            <div className="w-full bg-gray-100 h-5/6">
                <BarGraph state={selectedRegion} />
            </div>
            <MySelect selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} Regions={Regions} />
            <DiscussionFormComponent />
            <Footer />
        </div>
    );
};
