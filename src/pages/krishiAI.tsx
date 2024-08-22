import { useState } from "react";
import { AppBar } from "../components/appbar";
import { CropInput } from "../components/cropInput";
import { Footer } from "../components/footer";
import { KrishiBannerImg } from "../components/krishiBannerImg";
import { Result } from "../components/result";
import { RecoilRoot } from "recoil";
import { useNavigate } from "react-router-dom";

export const KrishiAI = () => {
    const [showResult, setShowResult] = useState(false);
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/report");
    };

    console.log("ShowResult State:", showResult);

    return (
        <div className="h-dvh w-full relative">
            <AppBar />
            <KrishiBannerImg />
            <RecoilRoot>    
            <CropInput onClick={handleNavigate} /> 
            </RecoilRoot>
            <Footer />
        </div>
    );
};
