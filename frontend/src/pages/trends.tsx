import { useState } from "react";
import { AppBar } from "../components/appbar";
import { BarGraph } from "../components/bargraph";
import MySelect from "../components/selectcomponent";
import { Footer } from "../components/footer";
import DiscussionFormComponent from "../components/discussionForm";
import marketBlock from "../assets/images/download.jpg"
//import React from "react";
//import graph from "../assets/images/graph.avif";
//import bgvideo from "../assets/images/bgvideo.mp4";


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
                <div className="absolute inset-0 flex flex-col justify-center items-center p-4 bg-black bg-opacity-60">
                    <h1
                        className="text-6xl font-extrabold text-green-500"
                        style={{
                            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                            transform: "translateZ(10px) perspective(100px)",
                        }}
                    >
                        "PLANTING KNOWLEDGE HARVESTING EMPOWERMENT"
                    </h1>


                    <div className="text-2xl text-gray-200 mt-8 leading-relaxed max-w-3xl mx-auto">
                        <p>Welcome to the Market Trends page, your gateway to a wealth of insights that can revolutionize your farming strategy.</p>
                        <p>Stay ahead of the curve by delving into historical data and understanding the dynamic shifts in crop prices.</p>
                    </div>
                </div>
            </div>


           
            <div className="relative w-full h-full bg-gray-100">
                {/* Video Background */}
                {/* <video
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    src={bgvideo}
                    autoPlay
                    loop
                    muted
                /> */}
                
                
                
                {/* BarGraph Content */}
                <div className="relative z-10 p-6">
                    <BarGraph state={selectedRegion} />
                </div>
            </div>

            <MySelect selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} Regions={Regions} />

            <DiscussionFormComponent />

            <div className="mb-16"></div>

            <Footer />
        </div>
    );
};