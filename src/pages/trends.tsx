import { useState } from "react";
import { AppBar } from "../components/appbar";
import { BarGraph } from "../components/bargraph";
import { CommentSection } from "../components/commentsSection";
import MySelect from "../components/selectcomponent";
import { CommentBox } from "../components/commentBox";
import { Footer } from "../components/footer";
import Component from "@/components/discussionForm";

export enum Regions {
    AllStates = "All States",
    UttarPradesh = "Uttar Pradesh",
    MadhyaPradesh = "Madhya Pradesh",
    HimachalPradesh = "Himachal Pradesh",
    Bihar = "Bihar",
    WestBengal = "West Bengal"
}

export const Trends = () => {
    const [comment, setComment] = useState<string>('');  
    const [messages, setMessages] = useState<string[]>([]);  
    const [selectedRegion, setSelectedRegion] = useState<keyof typeof Regions | "">("");

    return (
        <div className="h-dvh w-full">
            <AppBar />
            <div className="h-16 w-full">
                {/* empty space */}
            </div>
            <div className="w-full h-1/3 p-10 ">
                <div className="flex justify-center items-center">
                    <h1 className="text-5xl font-medium flex justify-center items-center">
                        "PLANTING KNOWLEDGE HARVESTING EMPOWERMENT"
                    </h1>
                </div>
                <div className="p-10 text-xl">
                    <h1 className="flex justify-center items-center">
                        Welcome to the Market Trends page, your gateway to a wealth of insights that can revolutionize your farming strategy.
                    </h1>
                    <h1 className="flex justify-center items-center">
                        Stay ahead of the curve by delving into historical data and understanding the dynamic shifts in crop prices.
                    </h1>
                </div>
            </div>
            {/* bargraph */}
            <div className="w-full h-5/6">
                <BarGraph state={selectedRegion}/>
            </div>
            <MySelect selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} Regions={Regions} />
            <Component/>
            <Footer />
        </div>
    );
};


