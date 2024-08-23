import { AppBar } from "../components/appbar";
import { CropInput } from "../components/cropInput";
import { Footer } from "../components/footer";
import { KrishiBannerImg } from "../components/krishiBannerImg";
import { RecoilRoot, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { cropNameAtom } from "@/store/atoms/atom";

export const KrishiAI = () => {
    const crop = useRecoilValue(cropNameAtom);
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/report");
        console.log(crop)
    };

    

    return (
        <div className="h-dvh w-full relative">
             <RecoilRoot>    
            <AppBar />
            <KrishiBannerImg />
           
            <CropInput onClick={handleNavigate} /> 
            
            <Footer />
            </RecoilRoot>
        </div>
    );
};
