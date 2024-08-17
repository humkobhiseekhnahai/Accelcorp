import { useState } from "react";
import { AppBar } from "../components/appbar";
import { CropInput } from "../components/cropInput";
import { Footer } from "../components/footer";
import { KrishiBannerImg } from "../components/krishiBannerImg";
import { Result } from "../components/result";

export const KrishiAI = () => {
    const [location, setLocation] = useState("");
    const [cropName, setCropName] = useState("");
    const [soilType, setSoilType] = useState("");
    const [showResult, setShowResult] = useState(false);

    const handleResult = () => {
        setShowResult(true);
    };

    return (
        <>
            <div className="h-dvh w-full relative">
                <AppBar />
                <KrishiBannerImg />
                {!showResult ? (
                    <CropInput
                        setLocation={setLocation}
                        setCropName={setCropName}
                        setSoilType={setSoilType}
                        onClick={handleResult}
                    />
                ) : (
                    <Result location={location} cropName={cropName} soilType={soilType} />
                )}
                <Footer />
            </div>
        </>
    );
};